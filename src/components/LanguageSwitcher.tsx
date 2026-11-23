"use client";

import { useEffect, useId, useRef, useState, type MouseEvent } from "react";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr";

import {
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  localizePath,
  routing,
  unlocalizePath,
  type Locale,
} from "@/i18n/routing";

/* The language choice, in two shapes:

   - "dropdown", in the header on wide screens: the current code ("EN") and a
     caret, opening a small list of the codes.
   - "inline", at the bottom of the burger menu: "EN | NL", every language
     one tap away.

   Each language links to the page the reader is on, in that language, so
   the links work without JavaScript and crawlers can follow them. A click
   also keeps the reader's place (the #anchor and any query) and remembers
   the choice in a cookie for a year; an English page then sends a reader who
   chose Dutch on to /nl/... (SiteShell). The browser's own language is never
   consulted.

   The two languages are separate route trees with their own root layouts,
   so switching is a full page load by design. */

function remember(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax`;
}

function useSwitch() {
  const pathname = usePathname() ?? "/";
  const page = unlocalizePath(pathname);

  const hrefFor = (target: Locale) => localizePath(page, target);

  function onSwitch(event: MouseEvent<HTMLAnchorElement>, target: Locale) {
    remember(target);
    // A new tab or window: let the browser open the plain link.
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    event.preventDefault();
    window.location.assign(hrefFor(target) + window.location.search + window.location.hash);
  }

  return { hrefFor, onSwitch };
}

export default function LanguageSwitcher({
  variant = "dropdown",
  className = "",
}: {
  variant?: "dropdown" | "inline";
  className?: string;
}) {
  return variant === "inline" ? (
    <LanguageInline className={className} />
  ) : (
    <LanguageDropdown className={className} />
  );
}

function LanguageDropdown({ className }: { className: string }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("common.languageSwitcher");
  const { hrefFor, onSwitch } = useSwitch();
  const listId = useId();

  /* A click anywhere outside, or Escape, closes it (Escape hands focus back
     to the button). */
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!boxRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={boxRef} className={`relative ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`${t("label")}: ${t(`names.${locale}`)}`}
        onClick={() => setOpen(!open)}
        className="inline-flex min-h-[44px] items-center gap-1 px-1 font-sans text-sm leading-5 text-navy"
      >
        {locale.toUpperCase()}
        <CaretDownIcon
          size={11}
          weight="bold"
          aria-hidden="true"
          className={`text-navy/50 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          id={listId}
          className="absolute left-1/2 top-full z-50 -mt-1 -translate-x-1/2 border border-navy/15 bg-white py-1 shadow-[0_2px_8px_#021C4D14,0_12px_28px_-8px_#021C4D33]"
        >
          {routing.locales.map((target) => (
            <li key={target}>
              <a
                href={hrefFor(target)}
                hrefLang={target}
                lang={target}
                aria-current={target === locale ? "true" : undefined}
                aria-label={t(`names.${target}`)}
                onClick={(event) => {
                  if (target === locale) {
                    event.preventDefault();
                    setOpen(false);
                    return;
                  }
                  onSwitch(event, target);
                }}
                className={`block px-4 py-2 font-sans text-sm leading-5 transition-colors hover:bg-navy/[0.05] focus-visible:bg-navy/[0.05] ${
                  target === locale ? "font-medium text-navy" : "text-navy/65 hover:text-navy"
                }`}
              >
                {target.toUpperCase()}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* "EN | NL": the current language underlined, the other a link. */
function LanguageInline({ className }: { className: string }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("common.languageSwitcher");
  const { hrefFor, onSwitch } = useSwitch();

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
              href={hrefFor(target)}
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
