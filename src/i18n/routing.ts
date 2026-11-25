import { defineRouting } from "next-intl/routing";

/* The site's languages. English is the source and the default: it lives at
   the root with no prefix (/courses). Every other language lives under its
   own prefix (/nl/courses).

   The site is a static export (next.config.mjs), so next-intl's middleware
   never runs: nothing negotiates a language from the browser, and nothing
   rewrites /courses to /en/courses. Instead, the English pages are their own
   route tree, app/(en), and the prefixed languages are app/[locale]. See
   README.md, "Languages". */
/** The cookie that remembers a reader's language choice. */
export const LOCALE_COOKIE = "NEXT_LOCALE";
/** A year: the reader's choice, kept until they make another one. */
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export const routing = defineRouting({
  locales: ["en", "nl"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  localeDetection: false,
  localeCookie: {
    name: LOCALE_COOKIE,
    maxAge: LOCALE_COOKIE_MAX_AGE,
    sameSite: "lax",
  },
});

export type Locale = (typeof routing.locales)[number];

export const defaultLocale: Locale = routing.defaultLocale;

/** The languages that carry a prefix, i.e. the [locale] segment's params. */
export const prefixedLocales = routing.locales.filter(
  (locale) => locale !== routing.defaultLocale,
);

export function isLocale(value: unknown): value is Locale {
  return routing.locales.includes(value as Locale);
}

/** "/courses" in a language: "/courses" in English, "/nl/courses" in Dutch.
 *  Keeps any query or hash. Leaves external and hash-only links alone. */
export function localizePath(path: string, locale: Locale): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  if (locale === defaultLocale) return path;
  if (path === "/" || path.startsWith("/?") || path.startsWith("/#")) {
    return `/${locale}${path.slice(1)}`;
  }
  return `/${locale}${path}`;
}

/** The inverse: "/nl/courses" -> "/courses". */
export function unlocalizePath(pathname: string): string {
  for (const locale of prefixedLocales) {
    if (pathname === `/${locale}`) return "/";
    if (pathname.startsWith(`/${locale}/`)) return pathname.slice(locale.length + 1);
  }
  return pathname;
}

/** The language a pathname is in, read from its prefix. */
export function localeOfPath(pathname: string): Locale {
  for (const locale of prefixedLocales) {
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) return locale;
  }
  return defaultLocale;
}

/** BCP 47 tags for Intl formatting. English is British on this site
 *  ("16 November 2026", "organisation"), so en formats as en-GB. */
export const intlLocale: Record<Locale, string> = {
  en: "en-GB",
  nl: "nl-NL",
};

/** Open Graph locale tags. */
export const ogLocale: Record<Locale, string> = {
  en: "en_GB",
  nl: "nl_NL",
};
