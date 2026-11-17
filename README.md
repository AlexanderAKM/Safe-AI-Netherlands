# SAIN: Safe AI Netherlands

Website for Safe AI Netherlands (SAIN), the national AI Safety initiative with chapters in Groningen, Amsterdam, and Utrecht.

## Tech stack

- **Next.js 14** (App Router, static export)
- **React 18** + **TypeScript**
- **Tailwind CSS 4** with brand tokens in `src/app/globals.css`
- **Motion** for scroll animations

## Getting started

```bash
npm install
npm run dev     # → http://localhost:3000
npm run build   # static export to /out
npm run images  # regenerate responsive image variants
```

## Project structure

```
src/
  app/
    page.tsx              # Homepage
    about/                # About, plus the vision / theory of change / code of conduct documents
    community/            # Community and chapter overview
    courses/              # Free courses
    research/             # Project hub and handbook
    get-involved/         # Volunteering
    open-positions/       # Careers
    contact/
    chapters/
      groningen/          # SAIN Groningen chapter (+ events archive)
      amsterdam/          # SAIN Amsterdam chapter
      utrecht/            # SAIN Utrecht chapter
    team/
  components/             # Shared and per-page components
  data/                   # Site content (people, research, events, positions)
  i18n/                   # The site's words (en.json) and the helpers that render them

public/
  sain-symbol.svg         # SAIN network symbol (favicon, structured data)
  landing/                # Landing photographs and logo lockups, with responsive variants
  illustrations/          # Hero and research illustrations
  photos/                 # Event, city, team, advisory board and supervisor photos

docs/                     # SAIN documents rendered on the site
design/                   # Design system (design.md, sain-brand.css) and page copy briefs
scripts/                  # Responsive image generation, Luma event fetches
```

## Text and translation

The site is being made bilingual (English and Dutch). The text is moving out of the
components into `src/i18n/en.json`, page by page; the pages already moved are the
layout, navbar, footer and homepage. The Dutch version, `nl.json`, comes back from a
translator, and the `/nl` pages and the language switch arrive with it.

- To change wording on a moved page, edit `en.json`. Keys are grouped by page or
  component (`home.hero.title`, `nav.items.courses`).
- `<tag>words</tag>` in a message marks words a component wraps in a link, bold and so on;
  `{name}` is a value filled in at render time (a date, a list of cities). See
  `src/i18n/rich.tsx`.
- Names stay in the code, not the dictionary: cities, organisations, platforms, people.
- Server components call `getDictionary(locale)`. Client components get their words as
  props and import only `format`/`rich` from `@/i18n/rich`, so the dictionary stays out of
  the browser bundle.
- To check that a change moved text without altering it: build before and after, run
  `node scripts/i18n-text-snapshot.mjs out <folder>` each time, and diff the two folders.

## Brand

- **Colours**: Navy `#021c4d`, Orange `#ff6025`
- **Fonts**: IBM Plex Serif (display), Archivo (body)
- **Design system**: see `design/design.md`

## Deployment

Static export via `next build`. Every push to `main` triggers a Vercel production deploy (`.github/workflows/deploy.yml`) on `safeainetherlands.org`.
