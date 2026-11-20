import { existsSync } from "fs";
import { readFile } from "fs/promises";
import path from "path";

import { defaultLocale, type Locale } from "./routing";

/* SAIN's governing documents are markdown in docs/: docs/vision.md is the
   English, and a translation lives beside it in a folder per language,
   docs/nl/vision.md. Until a translation exists, the Dutch page shows the
   English with a note (EnglishOnlyNote), and its canonical points to the
   English page. Adding docs/nl/vision.md is all it takes to switch both. */

const DOCS_DIR = path.join(process.cwd(), "docs");

function localizedPath(fileName: string, locale: Locale) {
  return locale === defaultLocale
    ? path.join(DOCS_DIR, fileName)
    : path.join(DOCS_DIR, locale, fileName);
}

/** True when docs/<locale>/<fileName> exists (always true for English). */
export function hasDocumentIn(fileName: string, locale: Locale): boolean {
  return existsSync(localizedPath(fileName, locale));
}

/** The document in the reader's language, or the English one. `locale` says
 *  which one came back. */
export async function readDocument(
  fileName: string,
  locale: Locale,
): Promise<{ markdown: string; locale: Locale }> {
  if (locale !== defaultLocale && hasDocumentIn(fileName, locale)) {
    return { markdown: await readFile(localizedPath(fileName, locale), "utf8"), locale };
  }
  return {
    markdown: await readFile(localizedPath(fileName, defaultLocale), "utf8"),
    locale: defaultLocale,
  };
}
