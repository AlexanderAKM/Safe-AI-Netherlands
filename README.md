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
      research/           # Project hub, handbook and paper pages
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
scripts/                  # Responsive image generation, Luma event fetches
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
   write the Dutch, copy the English in and say so in the pull request: the
   reviewer for that file (`.github/CODEOWNERS`) will translate it. A key that
   is missing in Dutch shows in English rather than breaking the page, but CI
   fails until both files have it.
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
  options and `<tags>`: `npm run i18n:check`.
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

## Brand

- **Colours**: Navy `#021c4d`, Orange `#ff6025`
- **Fonts**: IBM Plex Serif (display), Archivo (body)
- **Design system**: see `design/design.md`

## Deployment

Static export via `next build`. Every push to `main` triggers a Vercel production deploy (`.github/workflows/deploy.yml`) on `safeainetherlands.org`.
