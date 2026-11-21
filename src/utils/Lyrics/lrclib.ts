import Logger from "../Logger.ts";
import { ProjectRepo } from "../../../project/config.ts";
import { SpotifyPlayer } from "../../components/Global/SpotifyPlayer.ts";

const lrclibLogger = new Logger("LRCLIB");

const LRCLIB_ENDPOINT = "https://lrclib.net/api/get";
const LRCLIB_TIMEOUT_MS = 6000;
// Identifies this client to LRCLIB, as its docs ask. Browsers can't set User-Agent,
// so the alternative header is used.
const LRCLIB_CLIENT = `SpicyLyrics (https://github.com/${ProjectRepo})`;

type LrclibRecord = {
  instrumental?: boolean;
  plainLyrics?: string | null;
  syncedLyrics?: string | null;
};

type LrclibTrack = {
  name: string;
  artist: string;
  album?: string;
  durationSeconds: number;
};

// [mm:ss], [mm:ss.x], [mm:ss.xx], [mm:ss.xxx] or [mm:ss:xx]; a line may carry several.
const TIMESTAMP = /\[(\d+):(\d{1,2})(?:[.:](\d{1,3}))?\]/g;

function toSeconds(minutes: string, seconds: string, fraction?: string): number {
  const frac = fraction ? Number(`0.${fraction}`) : 0;
  return Number(minutes) * 60 + Number(seconds) + frac;
}

/** Turns LRC text into time-ordered lines with start times in seconds. */
export function ParseLrc(lrc: string): Array<{ Text: string; StartTime: number }> {
  const lines: Array<{ Text: string; StartTime: number }> = [];
  for (const raw of lrc.split(/\r?\n/)) {
    const stamps = [...raw.matchAll(TIMESTAMP)];
    if (stamps.length === 0) continue; // metadata tags such as [ar:...] and blank lines
    const text = raw.replace(TIMESTAMP, "").trim();
    for (const stamp of stamps) {
      lines.push({ Text: text, StartTime: toSeconds(stamp[1], stamp[2], stamp[3]) });
    }
  }
  return lines.sort((a, b) => a.StartTime - b.StartTime);
}

/** Builds a Line payload; each line ends where the next begins, the last at the song's end. */
function buildSynced(lrc: string, durationSeconds: number): object | null {
  const parsed = ParseLrc(lrc);
  if (parsed.length === 0) return null;

  const content = parsed.map((line, index) => {
    const next = parsed[index + 1]?.StartTime;
    const end = next ?? Math.max(durationSeconds, line.StartTime + 3);
    return {
      Type: "Vocal",
      OppositeAligned: false,
      Text: line.Text,
      StartTime: line.StartTime,
      EndTime: end,
    };
  });

  return {
    Type: "Line",
    StartTime: content[0].StartTime,
    EndTime: content[content.length - 1].EndTime,
    Content: content,
    source: "lrclib",
  };
}

function buildStatic(plain: string): object | null {
  const lines = plain
    .split(/\r?\n/)
    .map((text) => ({ Text: text.trim() }))
    .filter((line) => line.Text !== "");
  if (lines.length === 0) return null;
  return { Type: "Static", Lines: lines, source: "lrclib" };
}

function currentTrack(): LrclibTrack | null {
  const name = SpotifyPlayer.GetName();
  const artists = SpotifyPlayer.GetArtists();
  const durationMs = SpotifyPlayer.GetDuration();
  if (!name || !artists?.length || !durationMs) return null;
  return {
    name,
    artist: artists.map((artist) => artist.name).join(", "),
    album: SpotifyPlayer.GetAlbumName(),
    durationSeconds: Math.round(durationMs / 1000),
  };
}

/** What LRCLIB has for a track, each form already built as a lyrics payload. */
export type LrclibLyrics = { synced: object | null; plain: object | null };

/**
 * Looks the playing track up on LRCLIB. `synced` is a Line payload and `plain` a
 * Static one; either is `null` when LRCLIB lacks that form. Resolves `null` when
 * there is nothing to show at all (not found, instrumental, or the request failed).
 */
export async function FetchLrclibLyrics(uri: string): Promise<LrclibLyrics | null> {
  const track = currentTrack();
  if (!track || SpotifyPlayer.GetUri() !== uri) return null;

  const params = new URLSearchParams({
    track_name: track.name,
    artist_name: track.artist,
    duration: String(track.durationSeconds),
  });
  if (track.album) params.set("album_name", track.album);

  try {
    const res = await fetch(`${LRCLIB_ENDPOINT}?${params}`, {
      headers: { "Lrclib-Client": LRCLIB_CLIENT },
      signal: AbortSignal.timeout(LRCLIB_TIMEOUT_MS),
    });
    if (!res.ok) {
      if (res.status !== 404) lrclibLogger.warn("LRCLIB answered", res.status);
      return null;
    }
    const record = (await res.json()) as LrclibRecord;
    if (record.instrumental) return null;

    const synced = record.syncedLyrics ? buildSynced(record.syncedLyrics, track.durationSeconds) : null;
    const plain = record.plainLyrics ? buildStatic(record.plainLyrics) : null;
    return synced || plain ? { synced, plain } : null;
  } catch (error) {
    lrclibLogger.warn("LRCLIB request failed", error);
    return null;
  }
}
