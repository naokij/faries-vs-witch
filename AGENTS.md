# AGENTS.md — Fairy Tale Audio Picture Book

Children's audio picture book site (Astro 7). Daughter provides story ideas/voiceover; parent handles engineering.

**Current state:** 14 episodes online. Latest: 藤小花又被变坏了 (EP.14).

**Story writing guide:** See `doc/story-writing-guide.md` for story writing standards, error lessons, and templates.

**Cover prompt guide:** See `doc/cover-prompt-guide.md` for cover image prompt writing standards and templates.

## Repo layout

- `stories/*.md` — story manuscripts (markdown, Chinese)
- `audio/*.mp3` — TTS voiceover (MiniMax, `Chinese (Mandarin)_Cute_Spirit`)
- `assets/characters/`, `assets/covers/`, `assets/banners/` — images at repo root
- `site/` — Astro 7 app. Source in `site/src/`, ASR data in `site/data/asr/`
- `site/public/` — generated at build time by `sync-assets.sh` (copies root `assets/` + `audio/`)

Assets live at repo root, NOT in `site/`. The `prebuild`/`predev` scripts sync them into `site/public/`.

## Naming convention

- `stories/N-标题.md` — story filename slug (matches `episodes.ts` `slug` field)
- `audio/N-标题.mp3` — TTS output filename
- `assets/covers/N-标题.jpg` — 1:1 cover art

**Important:** All three filenames must use the SAME slug. Renaming a story requires renaming the audio + cover + episode entry together.

## Commands

All commands run from `site/` directory:

```bash
npx astro dev --background   # start dev server (background)
npx astro dev stop            # stop it
npx astro dev status          # check if running
npm run build                 # build to dist/
npm run check:asr             # validate ASR aligned data (run after regenerating ASR)
```

## Adding a new episode — exact order

1. Write story: `stories/N-标题.md`
2. Generate cover prompt: See `doc/cover-prompt-guide.md` for prompt writing standards
3. Generate cover image: Use `mmx image generate` with the prompt, or use other image generation tools
4. Add cover: `assets/covers/N-标题.jpg` (1:1 square)
5. Add character portraits: `assets/characters/` (if new characters)
6. TTS: `mmx speech synthesize --text-file stories/N-标题.md --voice "Chinese (Mandarin)_Cute_Spirit" --language zh --out audio/N-标题.mp3`
7. ASR step A: `cd site && bash scripts/asr.sh ../audio/N-标题.mp3` → `data/asr/N-标题.json`
8. ASR step B: `python3 scripts/align-asr.py ../stories/N-标题.md data/asr/N-标题.json data/asr/N-标题.aligned.json`
9. Validate: `npm run check:asr` - must show 0 ERROR before publishing. WARN (TIME_REVERSE/ZERO_SPAN_HANZI) is acceptable.
10. Edit `site/src/data/episodes.ts` - add episode entry
11. Edit `site/src/data/characters.ts` - add new characters if any
12. Edit `site/src/pages/index.astro` - add character IDs to `featuredChars` array if new characters
13. Build & preview: `npm run build && npx astro dev --background`

Steps 5-7 are required — without ASR data, no per-character highlighting during playback. Step 7 catches highlight bugs (duplicate timestamps, title audio misalignment, tiny spans) before they reach users.

## Technical gotchas

### ASR data loading uses fs.readFileSync, NOT import.meta.glob
`site/src/pages/story/[slug].astro` reads aligned JSON via `fs.readFileSync` because `import.meta.glob` cannot access files outside `src/`. If you refactor the story page, keep this pattern.

### pinyin-pro must use type: 'array'
`pinyin()` with `type: 'string'` returns pinyin only (no Chinese characters). Always use `type: 'array'` and pair each character with its pinyin manually. See `[slug].astro` frontmatter for the correct pattern.

### Cloudflare Pages adds trailing slashes
Local dev: `/story-list`. Production: `/story-list/`. Navigation highlighting in `Base.astro` strips trailing slashes before comparing. If you change nav logic, test with trailing slashes.

### featuredChars is hardcoded
`site/src/pages/index.astro` has a hardcoded character ID array. New characters won't appear on the homepage unless added there.

### Episode status: 'soon' vs 'online'
- `'online'` — full content, audio player, story text
- `'soon'` — visible in list with cover, but story page shows "coming soon" lock screen

### Story text is read from markdown at build time
`[slug].astro` reads `stories/*.md` via `fs.readFileSync` and processes paragraphs. The markdown is split on `\n\n`, headers and trailing `*...*` lines are stripped.

### Story continuity matters
New episodes must connect to the previous episode's ending. Read the last episode before writing.

## Design system

OKLch color space, one color per character. Warm cream background `oklch(97% 0.018 80)`. Fonts: ZCOOL KuaiLe (headings), Noto Sans SC (body), Ma Shan Zheng (decorative). All local, no Google Fonts.
