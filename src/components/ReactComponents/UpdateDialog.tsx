import React from "react";
import { NoticeLink, showNotice } from "./NoticeDialog.tsx";
import { ProjectRepo } from "../../../project/config.ts";


const NEW_ISSUE_URL = `https://github.com/${ProjectRepo}/issues/new`;

export const RELEASES_URL = `https://github.com/${ProjectRepo}/releases`;

// Releases are tagged `v<version>-fork.<n>`; a bare version has no tag of its own.
export const releaseNotesUrl = (version: string) =>
  /-fork\.\d+/.test(version)
    ? `${RELEASES_URL}/tag/v${encodeURIComponent(version)}`
    : RELEASES_URL;

export function showUpdatedDialog(fromVersion: string, toVersion: string) {
  showNotice({
    title: `Updated to ${toVersion}`,
    content: [
      <p className="sl-notice-text">
        You were on <span className="sl-notice-version">{fromVersion}</span>. The release notes list everything that
        changed.
      </p>,
      <p className="sl-notice-text sl-notice-text--quiet">
        Something broke after the update? Tell us in a <NoticeLink href={NEW_ISSUE_URL}>GitHub issue</NoticeLink>.
      </p>,
    ],
    primary: {
      label: "Read release notes",
      onClick: () => window.open(releaseNotesUrl(toVersion), "_blank"),
    },
    secondaryLabel: "Close",
  });
}
