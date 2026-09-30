# Design and implementation notes

## Direction

An engineering portfolio read as an architecture journal: a dark, warm-neutral
canvas, editorial typography, hairline rules instead of cards, and a single
restrained lime accent for links, active states and system highlights.
Technical motifs (a 12-column grid in the hero, mono annotations, numbered
sections, an architecture diagram) carry the "systems" identity without
decoration for its own sake.

## Design system

| Area | Choice |
| --- | --- |
| Type | Geist (display and body) and Geist Mono (labels, metadata, indices). Both self-hosted as variable WOFF2, 52 KB together. |
| Scale | Fluid, from `--fs-2xs` (11px mono labels) to `--fs-display` (44–112px). Headings are tightly tracked (`-0.045em` at display sizes). |
| Colour | Dark: `#0c0c0b` background, `#ece8df` text, `#c6ef6b` accent. Light: `#f3f0e8` paper, `#151412` ink, `#3f6b08` accent ink. Every text/background pair is at least WCAG AA; the lowest is muted text at 4.96:1 in light mode. |
| Space | `--space-1…10` and a fluid `--section-space` (80–152px). |
| Layout | 12-column grid inside a 1280px container; section index in columns 1–3, content from column 4. |
| Components | Section head, spec sheet, practice index, architecture diagram, responsibility stack, flow list (problem → structure → takeaway), entry list, guide index, pager, chips, buttons (lime primary, outlined ghost), arrow links. |
| Motion | Staggered hero entrance, fade/rise on scroll, a request that steps through the architecture diagram while it is visible, underline and rule transitions. Everything is disabled under `prefers-reduced-motion`, and content stays visible without JavaScript. |
| Brand | The "Mm" monogram (`img/logo.svg`) is drawn with `currentColor`, so it follows the theme and turns lime on hover. Favicons are generated from the same mark. |

Breakpoints: 1100px (guide TOC collapses), 900px (single-column sections,
mobile menu), 640px (stacked diagram tiers, full-width buttons).

## Content sources

Every statement on the site comes from existing content: the Docusaurus pages,
the two articles, the guides and `articles/tags.yml`. Nothing was invented.

| Homepage section | Source |
| --- | --- |
| Hero headline, intro | Homepage "About" block ("Engineering depth. Architecture thinking.", bio sentence) |
| 01 Approach | About page ("My work sits at the intersection of…") and guide/topic descriptions |
| 02 Areas of practice | Homepage topic cards, the about page's domains, and `tags.yml` descriptions |
| 03 Systems | Solution Architecture guide (title, lead and the four questions). The diagram is labelled as illustrative of the domains (cloud, integration, identity, distributed systems), not as a specific system. |
| 04 AI engineering | GH-300 article (lead, quote, the six lessons) and the customisation article (the six responsibilities and the decision framework) |
| 05 Featured writing | Direct lines from each article |
| 06 Journal | Articles, guides and the site tagline |
| 07 About | About page and the GH-300 article's "exploring next" list |
| 08 Next | The closing question of the GH-300 article |

## Content the brief asked for that does not exist yet

These sections are not on the site because there is no source content for
them. They should be added once the information is supplied:

- **Projects / systems built** — no project write-ups exist. The featured-writing
  section uses the problem → structure → takeaway format so real case studies
  can drop into the same component.
- **Experience timeline** — no employment history is published.
- **Contact** — no email or LinkedIn is published. The closing section links to
  the writing, the RSS feed and the public GitHub account
  (`github.com/MPHOMAGORO`).
- **Cloud platforms** (e.g. specific providers, IaC) — not described anywhere,
  so cloud appears only as a domain and in the architecture diagram.

## Other decisions

- **Dark first.** Dark is the default; light is available from the toggle and
  remembered. The previous system/light/dark cycle was simplified to two states.
- **Article pages** move the hero image out of the body into a full-width
  figure. Section headings get mono index numbers, and the contents list is
  numbered to match.
- **List pages** (writing, tags, archive) show an index of entries with
  descriptions instead of the full article bodies.
- **Guide pages** use the page title as the `<h1>`. The GitHub Copilot guide's
  in-content "About this section" heading was dropped to avoid a second `<h1>`.
- **Anchor offsets** use `scroll-margin-top` only, so in-page links land just
  below the sticky header.

## Content issue to review

The GitHub Copilot guide (`guides/github-copilot/index.md`) ends with the line
"If you'd like, I can also add a short checklist or linkable anchors to each
subsection for easier navigation." It is published on the live site and
reproduced here unchanged, but it reads like leftover drafting text and should
probably be removed at the source.

## Not carried over

- `/markdown-page` (Docusaurus starter example page).
- Client-side routing and search (the live site has no search).
