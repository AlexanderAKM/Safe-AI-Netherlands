"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { hasOpenPositions } from "@/data/openPositions";
import {
  SOFT_DEADLINE,
  STARTING_TEAMS_RECRUITING,
} from "@/data/newChapters";
import { CaretDownIcon, ListIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { formatDate } from "@/i18n/format";
import { Link, usePathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

/* The authorship shell: a civic broadcast strip, then the header. The strip
   scrolls away once read; the header pins to the top for the rest of the page.
   Nav is a flat row of routes. No filled active pill, no desktop hamburger:
   the /community page hands out the city doors, so Community is a plain link
   like the others. The language choice (LanguageSwitcher) is a dropdown of
   its own, which moves into the burger menu below lg.

   One item opens: Project hub, which has the opportunities board under it
   (/research/opportunities). The item itself stays a link to /research; its
   two pages show in a small panel under it for a pointer or a keyboard. In
   the mobile sheet the item is a heading with both pages indented under it. */

type NavItem = {
  /** Its label, under common.nav.items. */
  key: string;
  href: string;
  isActive: (path: string) => boolean;
  /** Carries the 7×7 orange kicker square: a time-bound door. */
  flagged?: boolean;
  /** The pages under this item, the item's own page first. `key` names each
   *  one's title and description under common.nav.<menu>. */
  menu?: { name: string; pages: { key: string; href: string; isActive: (path: string) => boolean }[] };
};

/* While the starting teams are being hired, /new-chapters is a nav item of
   its own, the one exception to "hiring lives in the bar and the footer".
   It sits next to Community because that is where the chapters live, and it
   leaves with the switch in data/newChapters.ts. */
const newChaptersItem: NavItem = {
  key: "newChapters",
  href: "/new-chapters",
  isActive: (p) => p.startsWith("/new-chapters"),
  flagged: true,
};

const baseNavigation: NavItem[] = [
  {
    key: "courses",
    href: "/courses",
    isActive: (p) => p === "/courses" || p.startsWith("/courses/"),
  },
  {
    key: "community",
    href: "/community",
    /* The chapter pages live under the Community door, so they light it up. */
    isActive: (p) =>
      p === "/community" ||
      p.startsWith("/community/") ||
      p.startsWith("/chapters"),
  },
  {
    key: "projectHub",
    href: "/research",
    isActive: (p) => p.startsWith("/research"),
    menu: {
      name: "projectHubMenu",
      pages: [
        {
          key: "hub",
          href: "/research",
          isActive: (p) => p.startsWith("/research") && !p.startsWith("/research/opportunities"),
        },
        {
          key: "opportunities",
          href: "/research/opportunities",
          isActive: (p) => p.startsWith("/research/opportunities"),
        },
      ],
    },
  },
  {
    key: "about",
    href: "/about",
    isActive: (p) => p === "/about" || p.startsWith("/about/"),
  },
];

const navigation: NavItem[] = STARTING_TEAMS_RECRUITING
  ? [...baseNavigation.slice(0, 2), newChaptersItem, ...baseNavigation.slice(2)]
  : baseNavigation;

function FlagSquare() {
  return (
    <span className="size-[7px] shrink-0 bg-orange" aria-hidden="true" />
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  /* The path without its language prefix, so /nl/courses lights Courses. */
  const pathname = usePathname();
  const locale = useLocale() as Locale;
  const t = useTranslations("common.nav");
  const tHiring = useTranslations("common.hiringBar");

  /* An item's panel is open while the pointer or the focus is in it, which
     is CSS alone. Following one of its links leaves the focus inside, so the
     panel is put away by hand on arrival, and on Escape. */
  const navRef = useRef<HTMLElement>(null);
  const closeMenus = () => {
    const focused = document.activeElement;
    if (focused instanceof HTMLElement && navRef.current?.contains(focused)) focused.blur();
  };

  useEffect(() => {
    setMobileOpen(false);
    closeMenus();
  }, [pathname]);

  const announceStartingTeams =
    STARTING_TEAMS_RECRUITING && !pathname.startsWith("/new-chapters");

  return (
    <>
      {/* The broadcast is read once on arrival, then it scrolls away. Only the
          header pins, so the nav sits at the very top rather than 42px down
          behind a strip the reader has already taken in. */}
      {/* While the starting teams are being hired they lead the broadcast,
          with every other opening one link along. On /new-chapters itself the
          bar falls back to the general positions, rather than pointing the
          reader at the page they are on. */}
      {announceStartingTeams ? (
        <div className="flex items-center justify-center gap-3 bg-orange px-6 py-[11px] md:px-12">
          <p className="kicker hidden shrink-0 text-kicker-sm text-white/85 sm:block">
            {tHiring("weAreHiring")}
          </p>
          <span
            className="hidden h-px w-[22px] shrink-0 bg-white/50 sm:block"
            aria-hidden="true"
          />
          <Link
            href="/new-chapters"
            className="text-center font-sans text-caption text-white underline decoration-white/45 underline-offset-4 transition-colors hover:decoration-white focus-visible:decoration-white"
          >
            <span className="sm:hidden">
              {tHiring("startingTeamsShort")}
            </span>
            <span className="hidden sm:inline">
              {tHiring("startingTeamsLong")}
            </span>
            <span className="hidden lg:inline">
              {tHiring("applyBy", {
                date: formatDate(SOFT_DEADLINE, locale, "dayMonth"),
              })}
            </span>
          </Link>
          {hasOpenPositions && (
            <>
              <span
                className="hidden h-px w-[22px] shrink-0 bg-white/50 md:block"
                aria-hidden="true"
              />
              <Link
                href="/open-positions"
                className="hidden shrink-0 font-sans text-caption text-white/85 underline decoration-white/35 underline-offset-4 transition-colors hover:text-white hover:decoration-white focus-visible:decoration-white md:inline"
              >
                {tHiring("allOpenPositions")}
              </Link>
            </>
          )}
        </div>
      ) : hasOpenPositions ? (
        <div className="flex items-center justify-center gap-3 bg-orange px-6 py-[11px] md:px-12">
          <p className="kicker text-kicker-sm text-white/85">
            {tHiring("weAreHiring")}
          </p>
          <span
            className="hidden h-px w-[22px] bg-white/50 sm:block"
            aria-hidden="true"
          />
          <Link
            href="/open-positions"
            className="font-sans text-caption text-white underline decoration-white/45 underline-offset-4 transition-colors hover:decoration-white focus-visible:decoration-white"
          >
            {tHiring("seeOpenPositions")}
          </Link>
        </div>
      ) : null}

      {/* The mobile panel lives inside the sticky box so it travels with the
          header instead of being left behind at its original offset. */}
      <div className="sticky top-0 z-50">
        <header className="border-b border-navy/10 bg-white/94 backdrop-blur-sm">
          <div className="shell flex min-h-[70px] items-center justify-between gap-6 py-2.5">
            <Link
              href="/"
              className="shrink-0"
              aria-label={t("homeLabel")}
            >
              <img
                src="/landing/logo-navy-140.png"
                srcSet="/landing/logo-navy-140.png 1x, /landing/logo-navy-280.png 2x, /landing/logo-navy-420.png 3x"
                alt="Safe AI Netherlands"
                /* The lockup is cropped tight to the symbol, which is the
                 tallest part; the wordmark stands about 85% of its height
                 (October 2026), so 37px of image is a 37px symbol beside a
                 32px wordmark. */
                className="h-[37px] w-auto"
                width={140}
                height={37}
              />
            </Link>

            <nav
              ref={navRef}
              className="hidden items-center gap-[22px] lg:flex xl:gap-[30px]"
              aria-label={t("primaryLabel")}
              onKeyDown={(event) => {
                if (event.key === "Escape") closeMenus();
              }}
            >
              {navigation.map((item) => {
                const active = item.isActive(pathname);
                const underline = active
                  ? "border-navy"
                  : "border-transparent hover:border-navy/40 focus-visible:border-navy/40";
                const link = (
                  <Link
                    key={item.key}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`inline-flex items-center gap-2 whitespace-nowrap border-b py-0.5 font-sans text-sm leading-5 text-navy transition-colors ${underline}`}
                  >
                    {item.flagged && <FlagSquare />}
                    {t(`items.${item.key}`)}
                    {item.menu && (
                      <CaretDownIcon
                        size={11}
                        weight="bold"
                        aria-hidden="true"
                        className="-ml-0.5 text-navy/50 transition-transform duration-200 group-focus-within/menu:rotate-180 group-hover/menu:rotate-180"
                      />
                    )}
                  </Link>
                );
                if (!item.menu) return link;

                const menu = item.menu;
                return (
                  <div key={item.key} className="group/menu relative">
                    {link}
                    {/* The panel hangs from the header's bottom edge; the
                        padding above it is the bridge the pointer crosses
                        without leaving the item. Hidden with `invisible`, so
                        its links are out of the tab order until it shows. */}
                    <div className="invisible absolute left-1/2 top-full z-50 w-[320px] -translate-x-1/2 pt-[23px] opacity-0 transition-[opacity,visibility] duration-150 group-focus-within/menu:visible group-focus-within/menu:opacity-100 group-hover/menu:visible group-hover/menu:opacity-100">
                      <ul
                        role="list"
                        aria-label={t(`${menu.name}.label`)}
                        className="border border-t-0 border-navy/12 bg-white shadow-[0_18px_40px_-12px_#021C4D38]"
                      >
                        {menu.pages.map((page) => {
                          const current = page.isActive(pathname);
                          return (
                            <li key={page.key} className="border-t border-navy/10 first:border-t-0">
                              <Link
                                href={page.href}
                                aria-current={current ? "page" : undefined}
                                className="flex flex-col gap-0.5 px-5 py-3.5 transition-colors hover:bg-cream focus-visible:bg-cream focus-visible:-outline-offset-2"
                              >
                                <span
                                  className={`self-start font-sans text-sm leading-5 text-navy ${
                                    current ? "underline decoration-navy underline-offset-4" : ""
                                  }`}
                                >
                                  {t(`${menu.name}.${page.key}.title`)}
                                </span>
                                <span className="font-sans text-footnote text-navy/60">
                                  {t(`${menu.name}.${page.key}.description`)}
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </nav>

            <div className="ml-auto flex items-center gap-2.5 lg:ml-0">
              {/* Below lg the language choice is in the burger menu. */}
              <LanguageSwitcher className="mr-1 hidden lg:block" />
              <div className="hidden items-center gap-2.5 sm:flex">
                <Link href="/get-involved" className="btn-ghost min-h-[44px] whitespace-nowrap">
                  {t("volunteer")}
                </Link>
                <Link href="/courses" className="btn-ink min-h-[44px] whitespace-nowrap">
                  {t("joinCourse")}
                </Link>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="inline-flex size-11 items-center justify-center border border-navy/20 lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
            >
              {mobileOpen ? (
                <XIcon size={18} weight="light" aria-hidden="true" />
              ) : (
                <ListIcon size={18} weight="light" aria-hidden="true" />
              )}
            </button>
          </div>
        </header>

        {mobileOpen && (
          <nav
            id="mobile-nav"
            className="border-b border-navy/10 bg-white lg:hidden"
            aria-label={t("mobileLabel")}
          >
            <div className="shell flex flex-col gap-1 py-4">
              {navigation.map((item) => (
                <Fragment key={item.key}>
                  {/* An item with a menu is a heading here, with all its pages
                      under it set in from a hairline, as in the desktop panel. */}
                  {item.menu ? (
                    <span className="flex min-h-[44px] items-center gap-2.5 font-sans text-sm leading-5 text-navy">
                      {t(`items.${item.key}`)}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      aria-current={item.isActive(pathname) ? "page" : undefined}
                      className="flex min-h-[44px] items-center gap-2.5 font-sans text-sm leading-5 text-navy"
                    >
                      {item.flagged && <FlagSquare />}
                      {t(`items.${item.key}`)}
                    </Link>
                  )}
                  {item.menu && (
                    <div className="mb-1 ml-1 flex flex-col border-l border-navy/14">
                      {item.menu.pages.map((page) => {
                        const current = page.isActive(pathname);
                        return (
                          <Link
                            key={page.key}
                            href={page.href}
                            onClick={() => setMobileOpen(false)}
                            aria-current={current ? "page" : undefined}
                            className={`flex min-h-[34px] items-center pl-4 font-sans text-sm leading-5 ${
                              current
                                ? "text-navy underline decoration-navy underline-offset-4"
                                : "text-navy/80"
                            }`}
                          >
                            {t(`${item.menu?.name}.${page.key}.title`)}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </Fragment>
              ))}
              {/* Under the links, above the calls to action: "EN | NL". */}
              <LanguageSwitcher variant="inline" className="-ml-1" />
              {/* The header keeps both calls to action from sm up, so the sheet
                  only carries them on the narrowest screens -- otherwise the
                  same two buttons show twice between sm and lg. */}
              <Link
                href="/get-involved"
                onClick={() => setMobileOpen(false)}
                className="mt-2 flex min-h-[44px] items-center justify-center border border-navy/20 px-4 text-center font-sans text-caption text-navy sm:hidden"
              >
                {t("volunteer")}
              </Link>
              <Link
                href="/courses"
                onClick={() => setMobileOpen(false)}
                className="flex min-h-[44px] items-center justify-center bg-navy px-4 text-center font-sans text-caption text-white sm:hidden"
              >
                {t("joinCourse")}
              </Link>
            </div>
          </nav>
        )}
      </div>
    </>
  );
}
