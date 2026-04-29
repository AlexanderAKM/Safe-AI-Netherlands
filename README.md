# SAIN: Safe AI Netherlands

Website for Safe AI Netherlands (SAIN), the national AI Safety initiative with chapters in Groningen, Amsterdam, and Utrecht.

## Tech stack

- **Next.js 14** (App Router, static export)
- **React 18** + **TypeScript**
- **Tailwind CSS 3.4** with custom brand tokens
- **Framer Motion** for scroll animations

## Getting started

```bash
npm install
npm run dev     # → http://localhost:3000
npm run build   # static export to /out
```

## Project structure

```
src/
  app/
    page.tsx              # Homepage
    about/                # About Us / Team
    research/             # Research & publications
    get-involved/         # How to join
    chapters/
      groningen/          # SAIN Groningen chapter
      amsterdam/          # SAIN Amsterdam chapter
      utrecht/            # SAIN Utrecht chapter
    team/                 # Team page
  components/             # Shared components (Navbar, Footer, Logo, etc.)

public/
  sain-symbol.svg         # SAIN network symbol (logo mark)
  sain-wordmark.svg       # "SAIN" text in brand colours (dark bg)
  sain-wordmark-light.svg # "SAIN" text for light-on-dark contexts
  photos/
    events/               # Event photos (talks, hackathons, graduations)
    cities/               # City hero images (Groningen, Amsterdam, etc.)
    team/                 # Team headshots

context_info/             # Internal strategy docs (not deployed)
comms/                    # Draft communications (not deployed)
```

## Brand

- **Colours**: Navy `#021c4d`, Orange `#ff6025`, Peach `#ffb966`
- **Fonts**: League Spartan (display), Poppins (body)
- **Logo**: Network node symbol + "SAIN" wordmark (S/N navy, A/I orange)

## Deployment

Static export via `next build`. Deploy to Vercel with custom domain `safeainetherlands.org`.
