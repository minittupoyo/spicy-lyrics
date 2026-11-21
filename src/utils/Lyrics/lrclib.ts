import Logger from "../Logger.ts";
import { ProjectRepo } from "../../../project/config.ts";
import { isExperimentEnabled } from "../experiments.ts";
import { SpotifyPlayer } from "../../components/Global/SpotifyPlayer.ts";

const lrclibLogger = new Logger("LRCLIB");

const LRCLIB_API = "https://lrclib.net/api";
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
  artists: string[];
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
    artists: artists.map((artist) => artist.name),
    album: SpotifyPlayer.GetAlbumName(),
    durationSeconds: Math.round(durationMs / 1000),
  };
}

/** What LRCLIB has for a track, each form already built as a lyrics payload. */
export type LrclibLyrics = { synced: object | null; plain: object | null };

type LrclibCandidate = LrclibRecord & {
  trackName?: string;
  artistName?: string;
  duration?: number;
};

// A search hit may be this far off the song's length, in seconds. Beyond it the
// timings of a synced file can't be trusted to line up.
const FUZZY_MAX_DURATION_DIFF = 5;
// Within this, LRCLIB itself would have matched, so the hit counts as exact.
const EXACT_DURATION_DIFF = 2;

/**
 * Reduces a title or artist to what identifies it: bracketed notes, "- Remastered"
 * style suffixes, "feat." credits, accents, case and punctuation are dropped.
 */
export function NormalizeName(text: string): string {
  return text
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[(\[（【].*?[)\]）】]/g, " ")
    .replace(/\s[-–—]\s.*$/, " ")
    .replace(/\s(feat|ft|featuring|with)\b.*$/, " ")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

/** Both names match once normalized, or one contains the other on a word boundary. */
function namesMatch(a: string, b: string): boolean {
  const x = NormalizeName(a);
  const y = NormalizeName(b);
  if (!x || !y) return false;
  return x === y || ` ${x} `.includes(` ${y} `) || ` ${y} `.includes(` ${x} `);
}

/**
 * Picks the search hit that is the same song: the title matches, one of the
 * song's artists is credited, and the length is close. Hits LRCLIB would have
 * matched anyway and hits with synced lyrics rank first, then the closest length.
 */
export function PickCandidate(track: LrclibTrack, hits: LrclibCandidate[]): LrclibCandidate | null {
  const artists = track.artists;
  const usable = hits
    .filter((hit) => !hit.instrumental && (hit.syncedLyrics || hit.plainLyrics))
    .filter((hit) => hit.trackName && hit.artistName && typeof hit.duration === "number")
    .filter((hit) => namesMatch(track.name, hit.trackName!))
    .filter((hit) => artists.some((artist) => namesMatch(artist, hit.artistName!)))
    .map((hit) => ({ hit, diff: Math.abs(hit.duration! - track.durationSeconds) }))
    .filter(({ diff }) => diff <= FUZZY_MAX_DURATION_DIFF);

  usable.sort((a, b) => {
    const exact = Number(b.diff <= EXACT_DURATION_DIFF) - Number(a.diff <= EXACT_DURATION_DIFF);
    if (exact !== 0) return exact;
    const synced = Number(!!b.hit.syncedLyrics) - Number(!!a.hit.syncedLyrics);
    if (synced !== 0) return synced;
    return a.diff - b.diff;
  });
  return usable[0]?.hit ?? null;
}

async function lrclibFetch(path: string, params: URLSearchParams): Promise<Response> {
  return fetch(`${LRCLIB_API}${path}?${params}`, {
    headers: { "Lrclib-Client": LRCLIB_CLIENT },
    signal: AbortSignal.timeout(LRCLIB_TIMEOUT_MS),
  });
}

/** The exact lookup: title, artists, album and length as Spotify reports them. */
async function getExact(track: LrclibTrack): Promise<LrclibRecord | null> {
  const params = new URLSearchParams({
    track_name: track.name,
    artist_name: track.artists.join(", "),
    duration: String(track.durationSeconds),
  });
  if (track.album) params.set("album_name", track.album);
  const res = await lrclibFetch("/get", params);
  if (res.ok) return (await res.json()) as LrclibRecord;
  if (res.status !== 404) lrclibLogger.warn("LRCLIB answered", res.status);
  return null;
}

/** The keyword search, for when the exact lookup misses (differently spelled titles, another length). */
async function searchSimilar(track: LrclibTrack): Promise<LrclibRecord | null> {
  const params = new URLSearchParams({
    track_name: NormalizeName(track.name) || track.name,
    artist_name: track.artists[0],
  });
  const res = await lrclibFetch("/search", params);
  if (!res.ok) {
    lrclibLogger.warn("LRCLIB search answered", res.status);
    return null;
  }
  const hits = (await res.json()) as LrclibCandidate[];
  const hit = Array.isArray(hits) ? PickCandidate(track, hits) : null;
  if (hit) lrclibLogger.debug("Using a similar LRCLIB track", hit.trackName, hit.artistName, hit.duration);
  return hit;
}

/**
 * Looks the playing track up on LRCLIB. `synced` is a Line payload and `plain` a
 * Static one; either is `null` when LRCLIB lacks that form. Resolves `null` when
 * there is nothing to show at all (not found, instrumental, or the request failed).
 * When the exact lookup misses, a close match from the keyword search is used
 * (unless the fuzzy search experiment is off).
 */
export async function FetchLrclibLyrics(uri: string): Promise<LrclibLyrics | null> {
  const track = currentTrack();
  if (!track || SpotifyPlayer.GetUri() !== uri) return null;

  try {
    let record = await getExact(track);
    if (!record && isExperimentEnabled("lrclibFuzzySearch")) record = await searchSimilar(track);
    if (!record || record.instrumental) return null;

    const synced = record.syncedLyrics ? buildSynced(record.syncedLyrics, track.durationSeconds) : null;
    const plain = record.plainLyrics ? buildStatic(record.plainLyrics) : null;
    return synced || plain ? { synced, plain } : null;
  } catch (error) {
    lrclibLogger.warn("LRCLIB request failed", error);
    return null;
  }
}
