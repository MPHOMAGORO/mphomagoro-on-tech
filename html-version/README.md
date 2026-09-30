# Mpho Magoro on Tech — standalone HTML version

A framework-free implementation of [mphomagoro.com](https://mphomagoro.com/),
built with plain HTML, CSS and a small amount of vanilla JavaScript.

The Docusaurus site in the repository root is still the source of truth. This
folder is self-contained: nothing outside `html-version/` is read or changed.

## Running it locally

The pages use root-relative URLs (`/css/styles.css`, `/articles/…`), exactly as
the live site does, so serve the folder as the web root rather than opening
files directly:

```bash
cd html-version
python3 -m http.server 8080
# or
npx serve .
```

Then open <http://127.0.0.1:8080/>.

No install or build step is needed.

## Deploying

Upload the contents of `html-version/` to any static host (GitHub Pages,
Netlify, S3, nginx…) as the site root.

- Every route is a folder with an `index.html`, so URLs keep the live site's
  trailing-slash form (`/articles/github-copilot-customisation/`).
- `404.html` sits at the root, where GitHub Pages and most static hosts look for it.
- Google Analytics (`G-8BQ8W900ZZ`, IP anonymised) loads only when the hostname
  is `mphomagoro.com`, so local and preview deployments are not tracked. The
  loader is at the bottom of `js/main.js`.

## Structure

```text
html-version/
├── index.html                          Home
├── about/index.html
├── articles/
│   ├── index.html                      Article list
│   ├── gh300-github-copilot-lessons/index.html
│   ├── github-copilot-customisation/index.html
│   ├── tags/index.html                 All tags
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
│   ├── styles.css                      Tokens, layout, navigation, content (all pages)
│   └── home.css                        Homepage sections
├── js/
│   └── main.js                         Theme, mobile menu, share, tabs, TOC, sidebar
├── img/                                Same paths as static/img in the Docusaurus site
├── README.md
└── NOTES.md                            Implementation and migration notes
```

## Editing content

Each page is a complete HTML document. The navbar, mobile menu and footer are
repeated in every file, so a change to them needs to be made in all pages (a
project-wide find-and-replace works well).

When adding an article:

1. Copy an existing article folder, e.g. `articles/gh300-github-copilot-lessons/`.
2. Update `<title>`, the meta description, canonical URL, Open Graph tags and
   `article:*` tags in `<head>`.
3. Replace the article body and the table of contents (`.toc`). Every
   `<h2 id="…">` in the body should have a matching TOC link.
4. Add the post to `articles/index.html`, the relevant tag pages,
   `articles/archive/index.html`, and update the counts on
   `articles/tags/index.html` and `articles/authors/index.html`.
5. Update the "Newer post / Older post" links on neighbouring articles.
6. Add the article to `articles/rss.xml` and `articles/atom.xml`.

Article images go in `img/articles/<slug>/`. Hero images are served as
responsive WebP (`hero-960.webp`, `hero.webp`) with a `hero.jpg` for social
cards:

```bash
cwebp -q 80 -resize 960 0 hero.png -o hero-960.webp
cwebp -q 80 hero.png -o hero.webp
sips -s format jpeg -s formatOptions 80 hero.png --out hero.jpg
```
