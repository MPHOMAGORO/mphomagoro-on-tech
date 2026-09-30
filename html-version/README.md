# Mpho Magoro on Tech — HTML version

A standalone, framework-free version of [mphomagoro.com](https://mphomagoro.com/)
built with plain HTML, CSS and a small amount of vanilla JavaScript.

The Docusaurus site in the repository root is unchanged; this folder is
self-contained and does not read from or write to anything outside it.

## Running it locally

Pages use root-relative URLs (`/css/styles.css`, `/articles/…`), so serve the
folder as the web root rather than opening files directly:

```bash
cd html-version
python3 -m http.server 8080
# or
npx serve .
```

Then open <http://127.0.0.1:8080/>. There is no install or build step.

## Deploying

Upload the contents of `html-version/` to any static host (GitHub Pages,
Netlify, S3, nginx…) as the site root.

- Every route is a folder with an `index.html`, so URLs keep the trailing-slash
  form (`/articles/github-copilot-customisation/`).
- `404.html` sits at the root, where most static hosts look for it.
- Google Analytics (`G-8BQ8W900ZZ`, IP anonymised) only loads on
  `mphomagoro.com`. The loader is at the end of `js/main.js`.

## Structure

```text
html-version/
├── index.html                          Home
├── about/index.html
├── articles/
│   ├── index.html                      Writing index
│   ├── gh300-github-copilot-lessons/index.html
│   ├── github-copilot-customisation/index.html
│   ├── tags/index.html                 Topics
│   ├── tags/ai-engineering/index.html
│   ├── tags/github-copilot/index.html
│   ├── archive/index.html
│   ├── authors/index.html
│   └── rss.xml, atom.xml (+ .xsl/.css) Feeds
├── guides/
│   ├── index.html
│   ├── ai-engineering/introduction/index.html
│   ├── github-copilot/index.html
│   ├── solution-architecture/index.html
│   └── software-engineering/index.html
├── 404.html
├── css/
│   ├── styles.css                      Design tokens, layout, navigation, prose, inner pages
│   └── home.css                        Homepage sections and the About block
├── js/
│   └── main.js                         Theme, menu, scroll-spy, reveals, diagram, tabs, TOC, share
├── fonts/                              Geist + Geist Mono (variable, latin, SIL OFL)
├── img/
│   ├── logo.svg                        Monogram; drawn with currentColor via <use>
│   ├── favicon/                        SVG, ICO and PNG icons generated from the monogram
│   └── articles/                       Article images (WebP for pages, JPEG for social cards)
├── README.md
└── NOTES.md                            Design system and implementation notes
```

## Design system in brief

All values live as custom properties at the top of `css/styles.css`:

- **Colour**: `--bg`, `--surface`, `--line`, `--text`, `--text-2`,
  `--text-3`, `--accent` (lime fill) and `--accent-ink` (accent used for text
  and lines — lime in dark mode, olive in light mode).
- **Type**: `--font-sans` (Geist), `--font-mono` (Geist Mono) and a fluid
  scale from `--fs-2xs` to `--fs-display`.
- **Space**: `--space-1` … `--space-10`, `--section-space`, `--gutter`.
- **Layout**: a 12-column grid inside `.container` (max 1280px).

Dark is the default theme; the toggle in the header switches to light and the
choice is remembered in `localStorage` (`theme`).

## Editing content

Each page is a complete HTML document. The header, mobile menu and footer are
repeated in every file, so a change to them must be made in all pages.

When adding an article:

1. Copy an existing article folder, e.g. `articles/gh300-github-copilot-lessons/`.
2. Update `<title>`, the meta description, canonical URL, Open Graph tags and
   `article:*` tags in `<head>`.
3. Replace the page header, hero image, article body and both tables of
   contents (desktop `.toc` and mobile `.toc-mobile`). Every `<h2 id="…">` in
   the body should have a matching contents link.
4. Add an entry to `articles/index.html`, the relevant tag pages,
   `articles/archive/index.html`, and the Journal list on the homepage; update
   the counts on `articles/tags/index.html` and `articles/authors/index.html`.
5. Update the Newer/Older links on neighbouring articles.
6. Add the article to `articles/rss.xml` and `articles/atom.xml`.

Article images go in `img/articles/<slug>/` as responsive WebP plus a JPEG for
social cards:

```bash
cwebp -q 80 -resize 960 0 hero.png -o hero-960.webp
cwebp -q 80 hero.png -o hero.webp
sips -s format jpeg -s formatOptions 80 hero.png --out hero.jpg
```
