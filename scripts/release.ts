/// <reference types="bun" />
// Builds the single-file extension and packages it for a GitHub release.
//
//   bun scripts/release.ts             build + package into release/, print the gh command
//   bun scripts/release.ts --publish   also create the release with the gh CLI
//
// The tag is `v<ProjectVersion>-fork.<ForkRevision>` (project/config.ts); raise
// ForkRevision for every fork release.

import { copyFileSync, mkdirSync } from "node:fs";
import { ForkRevision, ProjectName, ProjectRepo, ProjectVersion } from "../project/config.ts";

const tag = `v${ProjectVersion}-fork.${ForkRevision}`;
const asset = `release/${ProjectName}.js`;

const run = (cmd: string[]) => {
  const result = Bun.spawnSync(cmd, { stdio: ["inherit", "inherit", "inherit"] });
  if (result.exitCode !== 0) {
    console.error(`failed: ${cmd.join(" ")}`);
    process.exit(result.exitCode ?? 1);
  }
};

run(["bun", "run", "build"]);
mkdirSync("release", { recursive: true });
copyFileSync(`dist/${ProjectName}.js`, asset);

const createRelease = [
  "gh", "release", "create", tag, asset,
  "--repo", ProjectRepo,
  "--title", `Spicy Lyrics ${ProjectVersion} (fork ${ForkRevision})`,
  "--generate-notes",
];

if (process.argv.includes("--publish")) {
  run(createRelease);
} else {
  console.log(`\nBuilt ${asset}. To publish ${tag}:\n  ${createRelease.join(" ")}`);
}
