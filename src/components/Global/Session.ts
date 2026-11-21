import { $spicyLyricsVersion } from "../../utils/stores.ts";
import { getRemoteConfig } from "../../utils/remoteConfig.ts";
import { ForkRevision, ProjectRepo } from "../../../project/config.ts";
import Global from "./Global.ts";

interface Location {
  pathname: string;
  search?: string;
  hash?: string;
  state?: Record<string, any>;
}

type VersionParsedData =
  | {
      Text: string;
      Major: number;
      Minor: number;
      Patch: number;
      /** The fork release within that version (`-fork.N`); 0 when the string has none. */
      Revision?: number;
    }
  | undefined;

let sessionHistory: Location[] = [];

const Session = {
  Navigate: (data: Location) => {
    Spicetify.Platform.History.push(data);
    //Session.PushToHistory(data);
  },
  GoBack: () => {
    if (sessionHistory.length > 1) {
      Spicetify.Platform.History.goBack();
    } else {
      Session.Navigate({ pathname: "/" });
    }
  },
  /**
   * GoBack, but only while still on `pathname`. For flows that await something
   * (an exit animation) before navigating: if the user already went elsewhere
   * in the meantime, going back would undo *their* navigation instead.
   */
  GoBackFrom: (pathname: string) => {
    if (Spicetify.Platform.History.location?.pathname !== pathname) return;
    Session.GoBack();
  },
  GetPreviousLocation: () => {
    if (sessionHistory.length > 1) {
      return sessionHistory[sessionHistory.length - 2];
    }
    return null;
  },
  RecordNavigation: (data: Location) => {
    Session.PushToHistory(data);
    Global.Event.evoke("session:navigation", data);
  },
  FilterOutTheSameLocation: (data: Location) => {
    const filtered = sessionHistory.filter(
      (location) =>
        location.pathname !== data.pathname &&
        location.search !== data?.search &&
        location.hash !== data?.hash
    );
    sessionHistory = filtered;
  },
  PushToHistory: (data: Location) => {
    sessionHistory.push(data);
  },
  SpicyLyrics: {
    ParseVersion: (version: string): VersionParsedData => {
      const versionMatches = version.match(/(\d+)\.(\d+)\.(\d+)/);

      if (versionMatches === null) {
        return undefined;
      }

      return {
        Text: versionMatches[0],

        Major: parseInt(versionMatches[1]),
        Minor: parseInt(versionMatches[2]),
        Patch: parseInt(versionMatches[3]),
        Revision: parseInt(version.match(/-fork\.(\d+)/)?.[1] ?? "0"),
      };
    },
    GetCurrentVersion: (): VersionParsedData => {
      const current = Session.SpicyLyrics.ParseVersion($spicyLyricsVersion.get());
      // Text stays the plain version: it is what the API is told.
      return current && { ...current, Revision: ForkRevision };
    },
    /** The newest release of this fork, read from its GitHub releases. */
    GetLatestVersion: async (): Promise<VersionParsedData> => {
      const res = await fetch(`https://api.github.com/repos/${ProjectRepo}/releases/latest`, {
        headers: { Accept: "application/vnd.github+json" },
        cache: "no-store",
        signal: AbortSignal.timeout(getRemoteConfig().updates.latestVersionTimeoutMs),
      });
      if (!res.ok) return undefined;
      const body = (await res.json().catch(() => undefined)) as { tag_name?: unknown } | undefined;
      if (typeof body?.tag_name !== "string") return undefined;
      const latest = Session.SpicyLyrics.ParseVersion(body.tag_name);
      // Text names the release, so the notes link and the "is out" copy match its tag.
      return latest && { ...latest, Text: body.tag_name.replace(/^v/, "") };
    },
    IsOutdated: async (): Promise<boolean> => {
      const latestVersion = await Session.SpicyLyrics.GetLatestVersion();
      const currentVersion = Session.SpicyLyrics.GetCurrentVersion();
      return Session.SpicyLyrics.IsBehind(currentVersion, latestVersion);
    },
    /** Pure comparison, for callers that already hold both versions. */
    IsBehind: (currentVersion: VersionParsedData, latestVersion: VersionParsedData): boolean => {
      if (latestVersion === undefined || currentVersion === undefined) return false;

      // In order: Minor only decides once Major ties, and Patch once both do. Compared
      // one by one, 6.4.70 counted as behind 6.3.190.
      if (latestVersion.Major !== currentVersion.Major) return latestVersion.Major > currentVersion.Major;
      if (latestVersion.Minor !== currentVersion.Minor) return latestVersion.Minor > currentVersion.Minor;
      if (latestVersion.Patch !== currentVersion.Patch) return latestVersion.Patch > currentVersion.Patch;
      return (latestVersion.Revision ?? 0) > (currentVersion.Revision ?? 0);
    },
  },
};

export default Session;
