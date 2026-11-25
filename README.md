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
npm run dev          # → http://localhost:3000 (Dutch: /nl)
npm run build        # static export to /out
npm run i18n:check   # English and Dutch dictionaries in step
npm run i18n:routes  # after adding or removing a page
npm run images       # regenerate responsive image variants
npm run test:opportunities  # the rules behind the opportunities board
```

## Project structure

```
messages/
  en/<namespace>.json     # All text the reader sees, in English (the source)
  nl/<namespace>.json     # The same keys, in Dutch
  GLOSSARY.md             # How SAIN's terms are translated
src/
  app/
    [locale]/             # Every page, written once, for every language
      page.tsx            # Homepage
      about/              # About, plus the vision / theory of change / code of conduct documents
      community/          # Community and chapter overview
      courses/            # Free courses
      research/           # Project hub, handbook, paper pages and the opportunities board
      get-involved/       # Volunteering
      open-positions/     # Careers
      new-chapters/       # Starting teams for new chapters
      contact/
      chapters/
        groningen/        # SAIN Groningen chapter (+ events archive)
        amsterdam/        # SAIN Amsterdam chapter
        utrecht/          # SAIN Utrecht chapter
      team/
    (en)/                 # Generated: the same pages in English at the root (see Languages)
  components/             # Shared and per-page components
  data/                   # Site data (people, research, events, positions); its text is in messages/
  i18n/                   # Languages: routing, message loading, formatting, metadata

public/
  sain-symbol.svg         # SAIN network symbol (favicon, structured data)
  landing/                # Landing photographs and logo lockups, with responsive variants
  illustrations/          # Hero and research illustrations
  photos/                 # Event, city, team, advisory board and supervisor photos

docs/                     # SAIN documents rendered on the site (docs/nl/: their Dutch translations)
design/                   # Design system (design.md, sain-brand.css) and page copy briefs
scripts/                  # Responsive image generation, Luma event fetches, the Airtable and opportunities fetches
```

## Languages

The site is in English at the root (`/courses`) and in Dutch under `/nl`
(`/nl/courses`), with [next-intl](https://next-intl.dev). English is the
source: every text a reader sees, including page titles and descriptions,
alt text, aria-labels and button labels, lives in `messages/en/`, and
`messages/nl/` has the same keys in Dutch.

### How to add or change text

1. Find the namespace of the page (table below) and open
   `messages/en/<namespace>.json`. Change the English there, or add a key.
   Keys are named after what the text is (`hero.heading`, `apply.button`),
   never after the words.
2. Make the same change in `messages/nl/<namespace>.json`. If you cannot
   write the Dutch, leave the key out of the Dutch file: the Dutch page shows
   the English for it, `npm run i18n:check` and CI list it as a warning ("not
   translated yet", also shown on the pull request), and `npm run dev` lists
   it in the terminal. The reviewer for that file (`.github/CODEOWNERS`) will
   translate it. Inside a list there is no such fallback, so a list must have
   all its items in Dutch. `npm run i18n:check -- --strict` fails on the
   untranslated texts too.
3. In a component, read the text with `useTranslations("namespace.section")`
   (or `await getTranslations({ locale, namespace })` in async code and in
   `generateMetadata`). Inline links and bold text use `t.rich`:
   `"Read the <link>handbook</link>."`. A Client Component gets its messages
   through `<ClientMessages namespaces={[...]}>` (`src/i18n/ClientMessages.tsx`).
4. Run `npm run i18n:check` and `npm run lint`. CI runs both, plus the build.

Rules that the checks enforce:

- **No hard-coded text in components.** The lint rule
  `i18next/no-literal-string` (`.eslintrc.json`) fails on text in JSX and in
  `alt`, `aria-label`, `title` and `placeholder`. Names, brands, emails and
  Tailwind classes are allowed. Data files in `src/data` hold ids, links,
  flags and dates; their text goes in the messages too, keyed by the item's id.
- **Same keys in every language**, with the same `{placeholders}`, plural
  options and `<tags>`: `npm run i18n:check`. A key not yet translated is a
  warning; a left-over key, a list of a different length or a dropped
  placeholder or tag fails.
- **One message per sentence**, with placeholders (`"Apply by {date}."`), never
  sentences glued together from pieces: Dutch word order is different.
- **Dates** are ISO in `src/data` (`"2026-11-16"`) and printed with
  `formatDate` from `src/i18n/format.ts`: "16 November 2026" on the English
  site, "16 november 2026" on the Dutch one.
- **Internal links** use `Link` from `@/i18n/navigation`, which adds `/nl` on
  Dutch pages. External links and form URLs stay as they are.
- **Values sent to forms** (Airtable or Fillout prefill values, field names)
  stay English: only their labels are translated.

| Namespace | Pages |
| --- | --- |
| `common` | Header, footer, shared buttons, the course popup, site metadata |
| `home` | `/` |
| `courses` | `/courses`, and the course application notes shown everywhere |
| `community` | `/community` |
| `projectHub` | `/research`, `/research/apply`, `/research/handbook`, `/research/papers/...` |
| `chapters` | `/chapters/amsterdam`, `/chapters/groningen` (+ events), `/chapters/utrecht` |
| `about` | `/about`, `/about/vision`, `/about/theory-of-change`, `/about/code-of-conduct` |
| `getInvolved` | `/get-involved` |
| `team` | `/team` |
| `contact` | `/contact` |
| `openPositions` | `/open-positions` |
| `opportunities` | `/research/opportunities` |
| `newChapters` | `/new-chapters` |

### Still in English, on purpose

Project data from Airtable and supervisor bios, paper titles and the paper
pages, people's names, the embedded forms, and the long documents: the
Project Hub handbook, Vision, Theory of Change and Code of Conduct. Their
Dutch pages show the English with a short note, and point search engines to
the English page. To translate a document, add `docs/nl/<file>.md`
(`docs/nl/README.md`).

### How the two languages are built

The site is a static export, so next-intl's middleware cannot run: there is
no server to send `/courses` to an `/en` page, or to read a language from the
browser. Instead:

- Every page is written once, in `src/app/[locale]/`. It takes `params.locale`
  and calls `setRequestLocale(locale)` first. The build writes it for each
  prefixed language (`out/nl/...`).
- `src/app/(en)/` holds one generated file per page that renders the same page
  in English at the root (`out/courses.html`), under its own root layout.
  After adding or removing a page, run `npm run i18n:routes`;
  `npm run i18n:check` fails if the two trees differ. Don't edit `(en)` by hand.
- The header's EN | NL switcher links to the same page in the other language
  and keeps the `#anchor`. It stores the choice in a `NEXT_LOCALE` cookie for a
  year; an English page then sends a reader who chose Dutch to `/nl/...`. The
  browser's own language is never used.
- Each page sets `<html lang>`, a canonical URL and hreflang alternates
  (`localeAlternates` in `src/i18n/metadata.ts`), and the sitemap lists both
  languages.
- The one `404.html` is English (`src/app/not-found.tsx`).

To add a language: add it to `src/i18n/routing.ts`, add `messages/<locale>/`
and the imports in `src/i18n/messages.ts`.

## Opportunities board

`/research/opportunities` lists AI Safety work a reader in the Netherlands can
take: jobs, fellowships and projects based here, remote from the EU, or based
elsewhere in the EU or EEA. It sits under **Project hub** in the nav.

- **SAIN projects** are pinned first. They are the open projects in the
  Project Team's tracker, the same Airtable source as the Project Hub
  (`src/data/tracker.ts`), so nothing about them is kept twice.
- **Listings from other organisations** come from a JSON file. A daily
  workflow (`.github/workflows/refresh-opportunities.yml`) runs
  `scripts/fetch-opportunities.mjs`, commits the result to the
  `opportunities-data` branch when a listing changed, and asks Vercel for a
  deploy. The build reads that file (`src/data/opportunitiesFile.ts`); the copy
  in `src/data/opportunities.json` is the fallback. Nothing is fetched from
  another site in a reader's browser.
- A listing keeps only its title, organisation, locations, kind, deadline and
  the link to the original posting, which every card opens. The rules (who a
  posting is open to, duplicates, passed deadlines, keeping the last good data
  when a fetch fails) are in `scripts/lib/opportunities.mjs`, with tests:
  `npm run test:opportunities`.
- **The source is the 80,000 Hours job board, and it is off until they have
  agreed to it.** The board has no public feed; the fetch reads the search
  index its own pages use. Their robots.txt allows crawling, but their terms
  of use grant no right to republish, so ask first. Then set the repository
  secrets named at the top of `scripts/fetch-opportunities.mjs` and do one
  `npm run fetch-opportunities -- --dry-run` to check the field names. Until
  then the page shows SAIN's projects and a link to their board.

## Brand

- **Colours**: Navy `#021c4d`, Orange `#ff6025`
- **Fonts**: IBM Plex Serif (display), Archivo (body)
- **Design system**: see `design/design.md`

## Deployment

Static export via `next build`. Every push to `main` triggers a Vercel production deploy (`.github/workflows/deploy.yml`) on `safeainetherlands.org`.
