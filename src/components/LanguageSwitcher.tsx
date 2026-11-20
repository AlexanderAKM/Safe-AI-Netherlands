"use client";

import type { MouseEvent } from "react";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import {
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  localizePath,
  routing,
  unlocalizePath,
  type Locale,
} from "@/i18n/routing";

/* "EN | NL" in the header. Each language links to the page the reader is on,
   in that language, so the links work without JavaScript and crawlers can
   follow them. A click also keeps the reader's place (the #anchor and any
   query) and remembers the choice in a cookie for a year; an English page
   then sends a reader who chose Dutch on to /nl/... (SiteShell). The
   browser's own language is never consulted.

   The two languages are separate route trees with their own root layouts,
   so switching is a full page load by design. */

function remember(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax`;
}

export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("common.languageSwitcher");
  const pathname = usePathname() ?? "/";
  const page = unlocalizePath(pathname);

  function onSwitch(event: MouseEvent<HTMLAnchorElement>, target: Locale) {
    remember(target);
    // A new tab or window: let the browser open the plain link.
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    event.preventDefault();
    window.location.assign(
      localizePath(page, target) + window.location.search + window.location.hash,
    );
  }

  return (
    <div
      role="group"
      aria-label={t("label")}
      className={`flex items-center gap-1.5 font-sans text-sm leading-5 ${className}`}
    >
      {routing.locales.map((target, index) => (
        <span key={target} className="flex items-center gap-1.5">
          {index > 0 ? (
            <span aria-hidden="true" className="text-navy/30">
              |
            </span>
          ) : null}
          {/* The visible "EN" is a code; screen readers get the language's
              own name instead, in its own voice. */}
          {target === locale ? (
            <span
              lang={target}
              aria-current="true"
              className="inline-flex min-h-[44px] items-center px-1 font-medium text-navy"
            >
              <span aria-hidden="true" className="border-b border-navy py-0.5">
                {target.toUpperCase()}
              </span>
              <span className="sr-only">{t(`names.${target}`)}</span>
            </span>
          ) : (
            <a
              href={localizePath(page, target)}
              hrefLang={target}
              lang={target}
              onClick={(event) => onSwitch(event, target)}
              className="group inline-flex min-h-[44px] items-center px-1 text-navy/65 transition-colors hover:text-navy focus-visible:text-navy"
            >
              <span
                aria-hidden="true"
                className="border-b border-transparent py-0.5 transition-colors group-hover:border-navy/40 group-focus-visible:border-navy/40"
              >
                {target.toUpperCase()}
              </span>
              <span className="sr-only">{t(`names.${target}`)}</span>
            </a>
          )}
        </span>
      ))}
    </div>
  );
}
