import type { Metadata } from "next";

import { routing, localizePath, defaultLocale, type Locale } from "./routing";

export const SITE_URL = "https://safeainetherlands.org";

/* Canonical and hreflang links for one page, in one language.

   - A translated page points to itself as canonical, and lists every
     language plus x-default (English) as alternates.
   - An English-only page (`englishOnly`: the handbook, the governing
     documents and the papers, until they are translated) has the same English
     text at /nl/..., with only the header, footer and a note in Dutch.
     Search engines count that as a duplicate, so the Dutch URL names the
     English page as canonical and neither page claims a Dutch alternate. The
     sitemap leaves those Dutch URLs out for the same reason.
   - `canonicalPath` keeps a page's existing choice to defer to another page
     (/team names /about), in every language. */
export function localeAlternates({
  locale,
  path,
  englishOnly = false,
  canonicalPath,
}: {
  locale: Locale;
  path: string;
  englishOnly?: boolean;
  canonicalPath?: string;
}): Metadata["alternates"] {
  const canonicalLocale = englishOnly ? defaultLocale : locale;
  const canonical = localizePath(canonicalPath ?? path, canonicalLocale);

  // A page that defers to another (or is English-only) claims no
  // alternates of its own: hreflang should only ever name canonical pages.
  if (englishOnly || (canonicalPath !== undefined && canonicalPath !== path)) {
    return { canonical };
  }

  const languages: Record<string, string> = {};
  for (const language of routing.locales) {
    languages[language] = localizePath(path, language);
  }
  languages["x-default"] = localizePath(path, defaultLocale);

  return { canonical, languages };
}

/** The usual metadata for a page: its title, its description, and its
 *  alternates. Titles fill the root layout's "%s | SAIN" template. */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  englishOnly,
  canonicalPath,
}: {
  locale: Locale;
  path: string;
  title?: string;
  description?: string;
  englishOnly?: boolean;
  canonicalPath?: string;
}): Metadata {
  return {
    ...(title !== undefined ? { title } : {}),
    ...(description !== undefined ? { description } : {}),
    alternates: localeAlternates({ locale, path, englishOnly, canonicalPath }),
  };
}
