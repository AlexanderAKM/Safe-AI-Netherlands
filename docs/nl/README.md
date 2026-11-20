# Dutch translations of the SAIN documents

The pages under /nl/about/... read their document from this folder, under the
same file name as the English in `docs/`: `docs/nl/vision.md` translates
`docs/vision.md`.

A document that is not here yet is shown in English on the Dutch site, with a
short note that it has not been translated, and its Dutch page names the
English one as canonical (`src/i18n/documents.ts`). Adding the file is all it
takes: the Dutch page then shows it, and the sitemap and hreflang tags list
the Dutch URL.

Keep a translation in step with its English original: when the English
changes, change this file in the same pull request, or remove it so the
English shows instead.
