import en from "./en.json";

/* The site's languages. en.json is the source every other language is
   translated from, so its shape is the Dictionary type: a key missing from a
   component, or misspelt, fails the build rather than rendering blank.

   Dutch joins this list when nl.json comes back from the translator, together
   with the /nl routes and the language switch. Until then everything renders
   in English and nothing on the site offers a choice. */
export const locales = ["en"] as const;
export type Locale = (typeof locales)[number];
export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = { en };

/** The BCP 47 tag each language's dates are formatted with. */
export const dateLocale: Record<Locale, string> = { en: "en-GB" };

/* Server components only. A client component gets the slice it needs as a
   prop, so the dictionaries stay out of the browser bundle: it imports only
   the Dictionary type from here, and format/rich from "@/i18n/rich". */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export { format, rich } from "./rich";
