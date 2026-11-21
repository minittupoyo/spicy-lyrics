# Spicy Lyrics (fork)
[![Latest release](https://img.shields.io/github/v/release/minittupoyo/spicy-lyrics)](https://github.com/minittupoyo/spicy-lyrics/releases/latest)

This is a fork of [Spikerko/spicy-lyrics](https://github.com/Spikerko/spicy-lyrics), licensed under AGPL-3.0 like the original. It is not affiliated with or endorsed by the original project, and it is not in the Spicetify Marketplace.

**What the fork changes**

- **LRCLIB lyrics.** Each song is looked up on [LRCLIB](https://lrclib.net) first (synced lines, or plain lyrics); when LRCLIB has nothing, the usual Spicy Lyrics API is used. Settings → Experiments → *LRCLIB First* turns it off.
- **Releases come from this repository.** The extension is one self-contained file, and the update notice checks this repository's releases instead of the original's.

Lyrics from the Spicy Lyrics API still come from the original project's hosted service, which is separate from this fork.

Spicy Lyrics replaces Spotify's lyrics view with animated lyrics, dynamic backgrounds, romanization, and customization options. It is an open-source extension for the Spotify desktop client, built on [Spicetify](https://spicetify.app).

![Extension Example](./previews/wide_home.webp)

**Original project links:** [Guides](https://guides.spicylyrics.org/s/guides) · [FAQ](https://guides.spicylyrics.org/s/tools/doc/faq-anGSiKrnmX) · [Status](https://status.spicylyrics.org/) · [Discord](https://discord.gg/lyrc) · [Developers Platform](https://developers.spicylyrics.org)

## Installation

Spicy Lyrics runs only in the Spotify **desktop** client, through Spicetify. It does not need Spotify Premium.

### 1. Install Spicetify

**Windows** (PowerShell):

```powershell
iwr -useb https://raw.githubusercontent.com/spicetify/cli/main/install.ps1 | iex
```

**macOS / Linux** (Terminal):

```bash
curl -fsSL https://raw.githubusercontent.com/spicetify/cli/main/install.sh | sh
```

> [!WARNING]
> Spicetify cannot modify a Snap-based Spotify installation on Linux. See the [official Spicetify guide](https://spicetify.app/docs/getting-started) for other setups.

### 2. Install this fork

1. Download `spicy-lyrics.js` from the [latest release](https://github.com/minittupoyo/spicy-lyrics/releases/latest).
2. Put it in your Spicetify Extensions folder. [Find the folder for your OS](https://spicetify.app/docs/customization/extensions#manual-installation).
3. Run:

```bash
spicetify config extensions spicy-lyrics.js
spicetify apply
```

Play a song and open the lyrics view to confirm it loaded.

If you already have the original Spicy Lyrics installed (from the Marketplace or as `spicy-lyrics.mjs`), remove it first (`spicetify config extensions spicy-lyrics.mjs-`), or the two will load together.

### Updating

When a new release is out, the extension shows a notice with a button that opens the release page. Download `spicy-lyrics.js` again, replace the file in the Extensions folder, and run `spicetify apply`.

## Troubleshooting

If Spicy Lyrics disappears after a Spotify update or fails to load, try these in order:

```bash
spicetify apply
spicetify backup apply
spicetify update
spicetify restore backup apply
```

**Lyrics missing, outdated, or wrong?**

1. Make sure you opened the song version you meant to. Singles, albums, deluxe, clean, and remastered releases can have different lyrics or timing.
2. Try another release of the same recording.
3. Clear the lyrics cache in Spicy Lyrics' settings, then reopen the song.
4. If the wrong lyrics show up, they may come from LRCLIB, which matches by title, artist, and duration (within about 2 seconds). Turn off **LRCLIB First** in Settings → Experiments to use Spicy Lyrics only, and open an issue with the song link.
5. Check the original service's [status page](https://status.spicylyrics.org/).
6. Search the [issues](https://github.com/minittupoyo/spicy-lyrics/issues), then open a new one with the exact Spotify link.

**High CPU or memory use?** Animated lyrics, dynamic backgrounds, themes, custom CSS, and other extensions all add load. Restart Spotify, test without other extensions or snippets, and check Spotify's hardware-acceleration setting.

### Reporting a bug

Search the [issues](https://github.com/minittupoyo/spicy-lyrics/issues) first. If it's new, [open one](https://github.com/minittupoyo/spicy-lyrics/issues/new) and include (Settings → Got a Bug? copies your setup details for you):

- your operating system
- Spotify, Spicetify, and Spicy Lyrics versions
- exact steps to reproduce
- what you expected and what happened instead
- the affected song link, if relevant
- screenshots, video, or console errors

> [!CAUTION]
> Never share account tokens, cookies, authorization headers, or other secrets in a bug report.

Security issues go through [SECURITY.md](./SECURITY.md), not public channels.

## FAQ

<details>
<summary><strong>What types of lyrics are supported?</strong></summary>

| Type | What it does |
|------|--------------|
| Word-synced | Highlights individual words, or timed parts of words, as they're sung. |
| Line-synced | Advances one timed line at a time. |
| Static | Shows lyrics without timing. |

The sync type depends on the lyric data available for that exact track. There's no setting to turn line-synced lyrics into word-synced ones. LRCLIB provides line-synced and static lyrics only; word-synced lyrics come from the Spicy Lyrics API.

</details>

<details>
<summary><strong>Where do the lyrics come from?</strong></summary>

In this order:

1. [LRCLIB](https://lrclib.net) synced lyrics.
2. Spicy Lyrics synced lyrics: community-uploaded TTML first, then other supported sources, including Apple Music and Spotify.
3. LRCLIB plain (unsynced) lyrics.
4. Spicy Lyrics static lyrics.

Songs you import into the Lyrics Manager always win. **LRCLIB First** in Settings → Experiments turns LRCLIB off, leaving Spicy Lyrics only. What you see depends on availability, matching, and source priority.

</details>

<details>
<summary><strong>Can I use it on mobile?</strong></summary>

No. The extension runs in Spotify's desktop client only.

[Spicy Player](https://github.com/thex24/Spicy-Player/) is a separate offline Android music player by TX24 that ports the Spicy Lyrics experience. It is not a Spotify mobile extension.

</details>

<details>
<summary><strong>Can I use it offline?</strong></summary>

Online lyric lookup needs an internet connection. Lyrics you import into the **Lyrics Manager's** persistent local library stay on your device until you remove them.

</details>

<details>
<summary><strong>Can I use my own TTML file without uploading it?</strong></summary>

Yes. Open the **Lyrics Manager** and import the TTML as a temporary upload (for quick testing) or a persistent one (kept in your local library). There's no setting for adding online lyric providers beyond LRCLIB.

</details>

<details>
<summary><strong>Why is the timing off in Spotify?</strong></summary>

If one song is off, the lyric file may have been timed against a different release. LRCLIB lyrics are timed by their uploaders and can differ between releases too; turn off **LRCLIB First** to compare. Report it with the song link.

If every song is off on your device, use the playback-offset setting in Spicy Lyrics.

</details>

<details>
<summary><strong>Can I change the lyrics font?</strong></summary>

Install the font on your computer, then (this needs the [Spicetify Marketplace](https://github.com/spicetify/marketplace) installed):

1. Open **Marketplace → Snippets → Add CSS**.
2. Paste this, replacing `Your Font Name` with the font's exact name:

   ```css
   * {
     font-family: "Your Font Name" !important;
   }
   ```

3. Name and save the snippet.
4. In Spicy Lyrics settings, enable **Use System Font** under **Appearance**.

This changes Spotify's whole interface font, not only the lyrics. Disable the snippet if characters go missing or layouts break.

</details>

<details>
<summary><strong>Where can I request a feature?</strong></summary>

Search the [issues](https://github.com/minittupoyo/spicy-lyrics/issues) first, then open one if your idea isn't already there. Describe the problem and who it affects, not only the solution you want.

</details>

More answers are in the original project's [full FAQ](https://guides.spicylyrics.org/s/tools/doc/faq-anGSiKrnmX).

## Contributing lyrics

This section describes the original project's lyrics database, which this fork doesn't run: TTML submissions go to the original project, and its guides and rules apply there. Missing synced lyrics can also be added to [LRCLIB](https://lrclib.net), which this fork reads first.

Most word-synced lyrics in Spicy Lyrics are TTML files made by the community. TTML is an XML-based format that can store line and word timing, background vocals, duet positioning, and romanization, which LRC can't do consistently.

To make one, start with the [TTML Guide](https://guides.spicylyrics.org/s/ttml):

1. [Import the song](https://guides.spicylyrics.org/s/ttml/doc/1-import-the-song-iHfycCuOSU)
2. [Import the lyrics](https://guides.spicylyrics.org/s/ttml/doc/2-import-the-lyrics-CK0YxRxPwp)
3. [Check the lyrics](https://guides.spicylyrics.org/s/ttml/doc/3-check-the-lyrics-ZHDMonddCz)
4. [Sync the lyrics](https://guides.spicylyrics.org/s/ttml/doc/4-sync-the-lyrics-MJsQ3M0dIS)
5. [Add the songwriters](https://guides.spicylyrics.org/s/ttml/doc/5-add-the-songwriters-cP7OWZhyKd)
6. [Export and test the TTML](https://guides.spicylyrics.org/s/ttml/doc/6-export-and-test-the-ttml-nzae0Py9JJ)
7. [Submit your first TTML](https://guides.spicylyrics.org/s/ttml/doc/submit-your-first-ttml-sX53doCeNh)

Line-synced TTML is fully valid. If it's your first file, start with whole-word timing and learn syllable splitting later.

| Guide | Covers |
|-------|--------|
| [Transcription Guide](https://guides.spicylyrics.org/s/transcription) | Spelling, capitalization, punctuation, ad-libs, censored lyrics, repeats, and romanization |
| [Splitting Guide](https://guides.spicylyrics.org/s/splitting) | Splitting words into timed syllables, and which splits are accepted |
| [Uploading and TTML Rules](https://guides.spicylyrics.org/s/tools/doc/uploading-and-ttml-rules-rvofBBi0PV) | What an upload must meet to be approved |
| [Separating Vocals](https://guides.spicylyrics.org/s/tools/doc/separating-vocals-for-better-syncing-HYKpdByeMF) | Isolating vocals so words are easier to hear while syncing |
| [TTML Tool Feature Reference](https://guides.spicylyrics.org/s/tools/doc/ttml-tool-feature-reference-hx9XAG06L8) | Every feature of the TTML Tool |

The short version of the rules:

- **The recording is the source of truth.** Check copied lyrics against the exact song version; even official lyrics can be wrong.
- **No AI transcription or AI timing.** AI vocal separation is fine as a listening aid, and so is the TTML Tool's built-in automation, as long as you check its output.
- **No filler.** Don't add `[Instrumental]`, section headings, ellipses, or placeholders. Spicy Lyrics draws interludes itself.
- **One timing mode per file.** Line-synced or word-synced, never both.
- **One file per distinct version.** Different audio, censorship, intros, or timing need separate TTMLs.
- **No unreleased songs.** Wait until the song is playable on Spotify in at least one timezone.
- **Clear the lyrics cache after every upload**, then verify the result against the streamed song.

## Development

Requires [Bun](https://bun.sh) and a working Spicetify install.

```bash
bun install
bun run dev
bun run build
bun run lint
bun run fmt
```

### Releasing

Raise `ForkRevision` in `project/config.ts`, then run `bun run release`. It builds the extension and packages it as `release/spicy-lyrics.js`, then prints the `gh release create` command that publishes it as `v<version>-fork.<revision>`. Add `--publish` (`bun scripts/release.ts --publish`) to create the release directly.

## Support the project

- Contribute code to this repository, and [report bugs](https://github.com/minittupoyo/spicy-lyrics/issues) you can reproduce
- Add accurate lyrics to [LRCLIB](https://lrclib.net)
- Support the original project: donate to Spikerko on [Ko-fi](https://ko-fi.com/spikerko), boost its [Discord server](https://discord.gg/lyrc), or make TTML lyrics for it

## License

The extension is licensed under [AGPL-3.0](./LICENSE). The hosted services, databases, and websites behind Spicy Lyrics are the original project's and aren't covered by this license. LRCLIB is a separate service with its own terms.

*Inspired by [Beautiful Lyrics](https://github.com/surfbryce/beautiful-lyrics)*
