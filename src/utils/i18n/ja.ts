// Japanese text for the UI, keyed by the English wording used in the code.
// Names of views and renderers (Fullscreen, Cinema View, Bloom, Spring, Kawarp,
// NowBar, Canvas) are kept as they appear on screen.

export const JA: Record<string, string> = {
  // ---- Settings shell ----
  Settings: "設定",
  Results: "検索結果",
  "Search settings": "設定を検索",
  "Search all settings": "すべての設定を検索",
  "Clear search": "検索をクリア",
  "Search results": "検索結果",
  "Settings sections": "設定のセクション",
  "Close settings": "設定を閉じる",
  "Peek at the lyrics": "歌詞をのぞく",
  "Hold to see the lyrics behind the settings": "押している間、設定の後ろの歌詞を表示します",
  "Check the spelling, or try a shorter word.": "綴りを確認するか、短い言葉で試してください。",
  "TTML Reviewer is on": "TTML レビュアーはオンです",
  "Update available": "アップデートがあります",
  "Up to date": "最新です",
  "No results for": "次の検索結果はありません:",
  "Nothing here yet.": "まだ何もありません。",
  "Checking for changes": "変更を確認中",
  Reset: "リセット",
  Clear: "クリア",
  "Forced on": "強制オン",
  "Forced off": "強制オフ",
  "Set by Spicy Lyrics, so it can't be changed here.": "Spicy Lyrics によって設定されているため、ここでは変更できません。",

  // ---- Sections and groups ----
  Lyrics: "歌詞",
  Background: "背景",
  Playback: "再生",
  Interface: "インターフェース",
  Appearance: "外観",
  Experiments: "実験的機能",
  Advanced: "詳細設定",
  "Got a Bug?": "不具合の報告",
  "TTML Reviewer": "TTML レビュアー",
  About: "このアプリについて",
  Text: "テキスト",
  Style: "スタイル",
  Lines: "行",
  Timing: "タイミング",
  Scrolling: "スクロール",
  Performance: "パフォーマンス",
  "Lyrics View": "歌詞ビュー",
  "Album Artwork": "アルバムアート",
  "Now Playing Sidebar": "再生中サイドバー",
  "Windows and Buttons": "ウィンドウとボタン",
  "Lyrics Cache": "歌詞キャッシュ",
  Developer: "開発者",
  Player: "プレーヤー",
  "Features still being shaped. Turn one off if you prefer how things worked before.":
    "開発途中の機能です。以前の動作のほうがよければ、オフにしてください。",
  "No experiments right now.": "現在、実験的機能はありません。",

  // ---- About / links ----
  "Fork on GitHub": "GitHub のフォーク",
  Website: "ウェブサイト",
  Version: "バージョン",
  Update: "アップデート",
  Build: "ビルド",

  // ---- Advanced ----
  "Clear This Song's Cache": "この曲のキャッシュを削除",
  "Remove everything cached for the song that's playing now.": "再生中の曲のキャッシュをすべて削除します。",
  "Clear Stored Lyrics": "保存済みの歌詞を削除",
  "Delete all saved lyrics. They are normally kept for up to 3 days.":
    "保存されたすべての歌詞を削除します。通常は最長 3 日間保持されます。",
  "Reset This Song's Lyrics": "この曲の歌詞をリセット",
  "Drop the playing song's lyrics from memory only, so they load again.":
    "再生中の曲の歌詞をメモリからのみ破棄し、再読み込みさせます。",
  "Developer Mode": "開発者モード",
  "Extra logging and debug tools.": "追加のログとデバッグツールを有効にします。",

  // ---- Appearance ----
  "Use System Font": "システムフォントを使用",
  "Use your system font instead of the Spicy Lyrics font.": "Spicy Lyrics のフォントの代わりにシステムフォントを使います。",
  "Limit Frame Rate": "フレームレートを制限",
  "Redraw the lyrics, background and scroll less often to save CPU, especially on high refresh rate displays.":
    "歌詞・背景・スクロールの再描画の頻度を下げて CPU 負荷を減らします。特にリフレッシュレートの高いディスプレイで有効です。",
  "Frame Rate": "フレームレート",
  "Frames per second while the limit is on.": "制限がオンのときの 1 秒あたりのフレーム数です。",

  // ---- Background ----
  "Dynamic (Kawarp) swirls the cover art in time with the music. Artist Image uses the artist's header photo, or the cover when there isn't one. None (Transparent) leaves the page see-through, so whatever is behind it shows.":
    "Dynamic (Kawarp) はカバーアートを音楽に合わせて渦のように動かします。Artist Image はアーティストのヘッダー写真を使い、無ければカバーを使います。None (Transparent) はページを透明にし、背後のものを見せます。",
  "Image Blur": "画像のぼかし",
  "Softens the Artist Image and Cover Art backgrounds.": "Artist Image と Cover Art の背景をぼかします。",
  "Animated Background": "アニメーション背景",
  "Show the Dynamic (Kawarp) background behind the Now Playing sidebar.":
    "再生中サイドバーの背後に Dynamic (Kawarp) 背景を表示します。",

  // ---- Bug report ----
  "Copy Bug Report": "不具合レポートをコピー",
  "Copies your setup to paste into a new GitHub issue.": "環境情報をコピーします。新しい GitHub Issue に貼り付けてください。",

  // ---- Interface ----
  "View Controls Position": "表示コントロールの位置",
  "Where the view controls (play, scroll and so on) sit.": "表示コントロール（再生、スクロールなど）を置く位置です。",
  "Timeline Outside Media Box": "タイムラインをメディアボックスの外に",
  "Show the playback timeline in the NowBar header instead of inside the media box. Compact Mode and PiP keep it inside.":
    "再生タイムラインをメディアボックス内ではなく NowBar のヘッダーに表示します。コンパクトモードと PiP では内側のままです。",
  "Release Year": "リリース年",
  "Show the song's release year in the NowBar, before or after the artists.":
    "曲のリリース年を NowBar のアーティスト名の前後に表示します。",
  "Lock Media Box in Compact Mode": "コンパクトモードでメディアボックスを固定",
  "Keep the media box from resizing while Forced Compact Mode is on.":
    "強制コンパクトモード中、メディアボックスのサイズが変わらないようにします。",
  "No Lyrics Notice": "歌詞なしの通知",
  "Explain why a song has no lyrics. Off hides it in the lyrics page, Fullscreen and Popup Lyrics, leaving just the song info. Errors still show their notice.":
    "曲に歌詞がない理由を説明します。オフにすると、歌詞ページ・Fullscreen・Popup Lyrics では曲情報のみを表示します。エラーの通知は引き続き表示されます。",
  "Show Queue When a Song Has No Lyrics": "歌詞がない曲ではキューを表示",
  "In Fullscreen and Cinema View, open the queue in place of the lyrics. It closes again on the next song with lyrics.":
    "Fullscreen と Cinema View で、歌詞の代わりにキューを開きます。歌詞のある次の曲で自動的に閉じます。",
  "Volume Slider": "音量スライダー",
  "Show a volume control on the artwork in Fullscreen, Cinema View and Popup Lyrics.":
    "Fullscreen・Cinema View・Popup Lyrics のアートワーク上に音量コントロールを表示します。",
  "Motion Artwork": "モーションアートワーク",
  "Play the album's animated cover over the still one in the NowBar, for albums that have one.":
    "アニメーションカバーのあるアルバムで、NowBar の静止カバーの代わりに再生します。",
  "Motion Artwork or Canvas": "モーションアートワークか Canvas か",
  "Which one plays when a song has both. Motion Artwork plays on the cover, or on the stage if it's allowed there below.":
    "両方ある曲でどちらを再生するかを選びます。モーションアートワークはカバー上、または下の設定で許可していればステージ上で再生されます。",
  Motion: "モーション",
  Canvas: "Canvas",
  "Motion Artwork on Canvas Stage": "Canvas Stage でモーションアートワークを再生",
  "Let motion artwork fill the Canvas Stage, cropped to fit since it's square. Off keeps it on the cover in the NowBar.":
    "モーションアートワークを Canvas Stage いっぱいに表示します（正方形のため切り取られます）。オフの場合は NowBar のカバー上に留まります。",
  "Lyrics Card": "歌詞カード",
  "Show lyrics in the Now Playing sidebar.": "再生中サイドバーに歌詞を表示します。",
  "Hide When a Song Has No Lyrics": "歌詞がない曲では非表示",
  "Remove the card instead of showing a notice. It comes back on the next song with lyrics.":
    "通知を出す代わりにカードを消します。歌詞のある次の曲で戻ります。",
  "Popup Lyrics": "Popup Lyrics",
  "Let lyrics open in a floating window.": "歌詞を別ウィンドウ（フローティング）で開けるようにします。",
  "Hide Spotify's Lyrics Button": "Spotify の歌詞ボタンを非表示",
  "Remove Spotify's own lyrics button from the playback bar. The Spicy Lyrics button stays.":
    "再生バーから Spotify 標準の歌詞ボタンを取り除きます。Spicy Lyrics のボタンは残ります。",

  // ---- Lyrics ----
  "Lyrics Size": "歌詞のサイズ",
  "Makes the lyrics bigger or smaller in every view, including romanization and background vocals. 100% is each view's usual size.":
    "ローマ字表記やバックボーカルを含め、すべてのビューで歌詞の大きさを変えます。100% が各ビューの標準サイズです。",
  "Renderer Visual Style": "レンダラーの見た目",
  'Visual design of rendered lyrics. "Spring" is the default Spicy Lyrics renderer you know.':
    "歌詞表示の見た目です。「Spring」は従来の Spicy Lyrics の標準レンダラーです。",
  "Fade Away Previous Lines": "歌い終えた行をフェードアウト",
  "Hide lines that have already been sung in Fullscreen and Cinema View.":
    "Fullscreen と Cinema View で、歌い終えた行を隠します。",
  "Join Split Words": "分割された単語をつなぐ",
  "Show a word sung in syllables as one word. Steadily Sung keeps only words with no gap and an even pace between parts; Held Words only those long enough to light up letter by letter.":
    "音節に分かれて歌われる単語を 1 語として表示します。Steadily Sung は間が空かず一定のペースの単語のみ、Held Words は 1 文字ずつ光らせられるほど長い単語のみが対象です。",
  "Keep Syllable Pace": "音節のペースを保つ",
  "A joined word that lights up letter by letter follows each syllable's timing, slow on a long syllable and quick on a short one.":
    "1 文字ずつ光る結合された単語が、各音節のタイミングに従います。長い音節はゆっくり、短い音節は素早く光ります。",
  Romanization: "ローマ字表記",
  "With romanization on, show it in place of the original lyrics, or as a smaller row under each line.":
    "ローマ字表記がオンのとき、元の歌詞の代わりに表示するか、各行の下に小さく表示するかを選びます。",
  "Highlight on Hover": "ホバー時にハイライト",
  "Show a soft box behind a line when you point at it.": "行にポインターを合わせると、背後に淡いボックスを表示します。",
  "Duet Line Padding": "デュエット行の余白",
  "Indent each singer's lines toward their side, so duets read as two columns.":
    "各歌手の行をそれぞれの側に寄せ、デュエットが 2 列に見えるようにします。",
  "Credits Follow the Last Singer": "クレジットを最後の歌手に合わせる",
  "When a song ends on a duet line on the right, show the songwriter and provider lines on the right too.":
    "曲が右側のデュエット行で終わる場合、作詞作曲者と提供元の行も右側に表示します。",
  "Pinned Credits": "クレジットを固定",
  "Keep the credits at the bottom of the lyrics while they scroll. No Writers pins the lyrics source and community line, Full pins the songwriters too.":
    "歌詞のスクロール中も、クレジットを歌詞の下部に固定します。No Writers は歌詞の提供元とコミュニティの行を、Full は作詞作曲者も固定します。",

  // ---- Playback ----
  "Playback Offset": "再生オフセット",
  "Shift the lyrics in time. Negative shows them earlier, positive later. A song's own offset adds to the one for all songs.":
    "歌詞のタイミングをずらします。負の値で早く、正の値で遅く表示します。曲ごとのオフセットは全曲共通のオフセットに加算されます。",
  "All songs": "すべての曲",
  "This song": "この曲",
  "Seek Fade-in Compensation": "シーク時のフェードイン補正",
  "Clicking a line starts 300 ms before it, so Spotify's fade-in doesn't clip the first word. Best for rap and fast songs.":
    "行をクリックすると 300 ms 手前から再生し、Spotify のフェードインで最初の単語が欠けないようにします。ラップや速い曲に向いています。",
  "Smooth Scrolling": "スムーズスクロール",
  "Glide from line to line instead of jumping.": "行から行へ、飛ばずに滑らかに移動します。",
  "Early Scroll": "先行スクロール",
  "Start scrolling to the next line just before it's sung.": "次の行が歌われる少し前からスクロールを始めます。",
  "Early Scroll Time": "先行スクロールの時間",
  "How far ahead of the line the scroll starts.": "行のどれだけ前からスクロールを始めるかを指定します。",
  "Auto-scroll Unsynced Lyrics": "非同期歌詞を自動スクロール",
  "Scroll lyrics without timing through the song. Basic skips quiet parts. Advanced follows the singing, falling back to Basic for songs Spotify has no voice data for. Either can drift on some songs.":
    "タイミング情報のない歌詞を曲に合わせてスクロールします。Basic は静かな部分を飛ばし、Advanced は歌声に追従します（Spotify に音声データがない曲では Basic に切り替わります）。どちらも曲によってはずれることがあります。",
  "Scroll to active button": "現在の行へ戻るボタン",
  "Show an arrow when the line being sung is scrolled out of view. In Cinema View and fullscreen it joins the Lyrics / Queue switch.":
    "歌唱中の行が画面外にスクロールされたとき、矢印を表示します。Cinema View と Fullscreen では、歌詞/キューの切り替えと並んで表示されます。",

  // ---- Experiments ----
  "New SliderBar Styling": "新しいスライダーバーのデザイン",
  "New glass-like style for the SliderBar. Disable to revert back to the original one.":
    "スライダーバーのガラス風の新デザインです。オフにすると元のデザインに戻ります。",
  "Lyrics Loading Skeleton": "歌詞読み込み中のスケルトン",
  'Shows placeholder lines and a small "Loading Lyrics" label while lyrics fetch and render, instead of the blurred spinner. Disable to bring the spinner back.':
    "歌詞の取得・描画中、ぼかしたスピナーの代わりに仮の行と小さな「Loading Lyrics」ラベルを表示します。オフにするとスピナーに戻ります。",
  "LRCLIB First": "LRCLIB を優先",
  "Looks each song up on LRCLIB. Order: LRCLIB synced, Spicy Lyrics synced, LRCLIB plain, then Spicy Lyrics plain. Disable to use Spicy Lyrics only.":
    "各曲を LRCLIB で検索します。順序は LRCLIB 同期 → Spicy Lyrics 同期 → LRCLIB プレーン → Spicy Lyrics プレーンです。オフにすると Spicy Lyrics のみを使います。",
  "Canvas Stage": "Canvas Stage",
  "When a song has a Spotify Canvas, it fills the Now Bar side of the screen in place of the album cover, and its colors drive the page background. Only applies with the dynamic background. Disable to keep the cover and the animated cover background.":
    "曲に Spotify Canvas がある場合、アルバムカバーの代わりに画面の Now Bar 側いっぱいに表示し、その色をページ背景に反映します。動的背景のときのみ適用されます。オフにするとカバーとアニメーションするカバー背景を維持します。",
  "Canvas NPV Background": "Canvas の NPV 背景",
  "When a song has a Spotify Canvas, the Now Playing View's dynamic background is drawn from the Canvas video playing there, frame for frame, instead of the album cover. Disable to keep the cover.":
    "曲に Spotify Canvas がある場合、再生中ビューの動的背景をアルバムカバーの代わりに、そこで再生中の Canvas 動画からフレームごとに描画します。オフにするとカバーを使います。",
  "Popup Player Dock": "ポップアッププレーヤーのドック",
  "Popup lyrics fill the whole window, with the player docked along the bottom like the Canvas Stage: title and artist at rest, the timeline and controls rising in when you move the mouse. Disable to bring back the cover header and the controls over the enlarged cover.":
    "ポップアップの歌詞をウィンドウ全体に広げ、Canvas Stage のようにプレーヤーを下部にドックします。通常はタイトルとアーティストのみで、マウスを動かすとタイムラインとコントロールが現れます。オフにするとカバーのヘッダーと、拡大したカバー上のコントロールに戻ります。",
  "Refined Background": "洗練された背景",
  "Background changes crossfade in place, including switching styles in Settings, and Cover Colors use the cover's deeper tones, changing with the song instead of a second later. Image backgrounds keep their edges instead of being cropped. Disable to bring back the sliding image transition and the brighter Cover Colors.":
    "設定でのスタイル切り替えを含め、背景の変更をその場でクロスフェードします。Cover Colors はカバーの深い色調を使い、1 秒遅れずに曲と同時に切り替わります。画像背景は切り取られず端が保たれます。オフにするとスライドする画像の切り替えと、明るい Cover Colors に戻ります。",
  "Music-Reactive Background": "音楽に反応する背景",
  "The Dynamic (Kawarp) background follows the song as it plays: it flows faster and swells slightly through loud parts, and slows through quiet ones. On the lyrics page, in Cinema View and in fullscreen it's also less blurred, so the movement shows. Disable to bring back the steadier, more blurred flow that only loosely follows the tempo.":
    "Dynamic (Kawarp) 背景が曲に追従します。大きな音の部分では速く流れて少し膨らみ、静かな部分ではゆっくりになります。歌詞ページ・Cinema View・Fullscreen ではぼかしも弱め、動きが見えるようにします。オフにすると、テンポにゆるく追従するだけの、より安定してぼかしの強い動きに戻ります。",
  "Larger Cinema View Lyrics (Bloom style only)": "Cinema View の歌詞を拡大（Bloom スタイルのみ）",
  "In Cinema View and fullscreen, Bloom lyrics grow with the screen instead of stopping at their usual size, so they read well from a distance on a big display. Small windows, the popup and compact mode keep the usual size. Disable to keep the usual size everywhere.":
    "Cinema View と Fullscreen で、Bloom の歌詞が標準サイズで止まらず画面に合わせて大きくなり、大型ディスプレイでも離れて読みやすくなります。小さなウィンドウ、ポップアップ、コンパクトモードでは標準サイズのままです。オフにするとどこでも標準サイズになります。",
  "Increased Line Spacing (Spring style only)": "行間を広げる（Spring スタイルのみ）",
  "With the Spring renderer style, lyrics lines sit further apart, spaced by the text size like Bloom (a little tighter) instead of by a sliver of the window width. Disable to bring back Spring's tighter spacing.":
    "Spring レンダラーで、歌詞の行間を広げます。ウィンドウ幅のわずかな割合ではなく、Bloom（それよりやや狭め）のように文字サイズを基準にします。オフにすると Spring の狭い行間に戻ります。",
  "Refined Credits": "洗練されたクレジット",
  "The credits under the lyrics become quiet type close under the last line, with no box: the songwriters, then the lyrics source beneath. Community lyrics say so on that second line, with the people who made and uploaded them linked by name. In synced lyrics the credits stay dim until the last line has been sung. Disable to bring back the previous credit lines.":
    "歌詞の下のクレジットを、枠なしで最後の行のすぐ下に控えめな文字で表示します。作詞作曲者の下に歌詞の提供元が続きます。コミュニティ歌詞は 2 行目でそう示し、作成・アップロードした人を名前でリンクします。同期歌詞では、最後の行を歌い終えるまでクレジットは薄く表示されます。オフにすると以前のクレジット表示に戻ります。",
  "Scrub Preview": "シークのプレビュー",
  "Hovering or dragging the progress bar shows the time a click would seek to, and the volume bar shows the level it would set. Disable to hide these previews.":
    "プログレスバーにポインターを合わせるかドラッグすると、クリックでシークされる時刻を表示し、音量バーでは設定される音量を表示します。オフにするとプレビューを隠します。",
  "Background Vocal Pop-Out": "バックボーカルのポップアウト",
  "Background vocal lines stay tucked away under their line until it's sung, then slide out from beneath it while the lines below make room, and tuck back in once both are done. Only applies with the Bloom renderer style. Disable to keep every background vocal line on screen at all times.":
    "バックボーカルの行は、その行が歌われるまで元の行の下にしまわれ、歌われると下から滑り出て、下の行が場所を空けます。双方が終わるとまたしまわれます。Bloom レンダラーのときのみ適用されます。オフにすると、すべてのバックボーカル行を常に表示します。",
  "Keep Overlapping Lines": "重なった行を残す",
  "With Fade Away Previous Lines on, a line that ends while one above it is still being sung (overlapping lines, background vocals) stays on screen, dimmed, instead of fading out early. Disable to fade every sung line out as soon as it ends.":
    "「歌い終えた行をフェードアウト」がオンのとき、上の行がまだ歌われている間に終わった行（重なった行やバックボーカル）を、早く消さず薄くして残します。オフにすると、歌い終えた行をすべて終わり次第フェードアウトします。",
  "Portrait Fullscreen Layout": "縦長 Fullscreen レイアウト",
  "In compact fullscreen on a window taller than it is wide, the lyrics use nearly the full width, the cover header sits as far from the top as the lyrics are from the sides, the song title and artist sit beside the cover, level with its bottom edge, and are sized to the lyrics, and the cover grows on hover without covering them. Disable to bring back the regular compact layout.":
    "幅より高さが大きいウィンドウのコンパクト Fullscreen で、歌詞をほぼ全幅で表示し、カバーのヘッダーは歌詞が左右から離れているのと同じだけ上端から離します。曲名とアーティストはカバーの横、下端に揃えて歌詞に合わせたサイズで配置し、ホバー時にカバーが歌詞を隠さず拡大します。オフにすると通常のコンパクトレイアウトに戻ります。",
  "Romaji as Written": "表記に沿ったローマ字",
  "Japanese romaji is spelled the way romanized lyrics usually are: long vowels as written (kyou, toukyou, koohii), particles as said (wa, e, wo), endings kept on their word (yonde ita), gaps between words even where the syllables are joined, and a capital at the start of the line. Disable to bring back the previous spelling (kyō, tōkyō, o, one word per token).":
    "日本語のローマ字を、ローマ字歌詞で一般的な綴りにします。長音は表記どおり（kyou, toukyou, koohii）、助詞は発音どおり（wa, e, wo）、語尾は単語にまとめ（yonde ita）、音節がつながっていても語の間は空け、行頭は大文字にします。オフにすると以前の綴り（kyō, tōkyō, o、トークンごとに 1 語）に戻ります。",
  "Up Next": "次の曲",
  "In fullscreen and Cinema View, the last 30 seconds of a song show the next one in the queue (cover, title and artist) at the bottom of the lyrics. Disable to never show it.":
    "Fullscreen と Cinema View で、曲の最後の 30 秒に、キュー内の次の曲（カバー・タイトル・アーティスト）を歌詞の下部に表示します。オフにすると表示しません。",
  "Player Below the Cover": "カバーの下にプレーヤー",
  "In Cinema View, when no Canvas is showing, the cover moves out toward the screen edge and the player sits under it, always on screen: the title and artist with the like button beside them, then the progress bar with its times, the playback controls and the volume bar. The view buttons line up in a column beside the cover instead of over it. Disable to keep the centered cover and title, with the controls that appear over the cover.":
    "Cinema View で Canvas が表示されていないとき、カバーを画面の端寄りに移し、その下にプレーヤーを常時表示します。タイトルとアーティスト（横にいいねボタン）、時刻付きのプログレスバー、再生コントロール、音量バーが並びます。表示ボタンはカバーの上ではなく、横に縦一列で並びます。オフにすると、中央のカバーとタイトル、およびカバー上に現れるコントロールに戻ります。",
  "Grouped View Controls": "まとめた表示コントロール",
  "The view buttons share one frosted capsule instead of each having its own. Buttons that switch something on, like romanization, compact mode or the NowBar, fill in white with their icon cut out while it is on. The button back to the current line becomes a matching frosted circle in the bottom corner. Disable to bring back the separate frosted buttons that change their icon instead, and the round button at the lyrics' edge.":
    "表示ボタンを、個別ではなく 1 つのすりガラス調のカプセルにまとめます。ローマ字表記・コンパクトモード・NowBar のようにオンにするボタンは、オン中は白く塗りつぶされアイコンが抜かれます。現在の行へ戻るボタンは、下隅の同じすりガラス調の円になります。オフにすると、アイコンが切り替わる個別のすりガラスボタンと、歌詞の端の丸いボタンに戻ります。",
  "Japanese UI": "日本語 UI",
  "Shows the settings in Japanese. Only the settings panel is translated so far; everything else stays in English. Disable to bring back English.":
    "設定を日本語で表示します。現時点で翻訳されているのは設定パネルのみで、それ以外は英語のままです。オフにすると英語に戻ります。",
};
