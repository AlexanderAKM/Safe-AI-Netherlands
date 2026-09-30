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
    research/             # Research hub and handbook
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

public/
  sain-symbol.svg         # SAIN network symbol (favicon, structured data)
  landing/                # Landing photographs and logo lockups, with responsive variants
  illustrations/          # Hero and research illustrations
  photos/                 # Event, city, team, advisory board and supervisor photos

docs/                     # SAIN documents rendered on the site
design/                   # Design system (design.md, sain-brand.css) and page copy briefs
scripts/                  # Responsive image generation, Luma event fetches
```

## Brand

- **Colours**: Navy `#021c4d`, Orange `#ff6025`
- **Fonts**: IBM Plex Serif (display), Archivo (body)
- **Design system**: see `design/design.md`

## Deployment

Static export via `next build`. Every push to `main` triggers a Vercel production deploy (`.github/workflows/deploy.yml`) on `safeainetherlands.org`.
