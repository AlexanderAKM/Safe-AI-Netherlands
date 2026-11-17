"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { hasOpenPositions } from "@/data/openPositions";
import {
  SOFT_DEADLINE_SHORT,
  STARTING_TEAMS_RECRUITING,
} from "@/data/newChapters";
import { ListIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import type { Dictionary } from "@/i18n";
import { format } from "@/i18n/rich";

/* The authorship shell: a civic broadcast strip, then the header. The strip
   scrolls away once read; the header pins to the top for the rest of the page.
   Nav is a flat row of routes. No filled active pill, no desktop hamburger,
   no dropdowns: the /community page hands out the city doors, so Community is
   a plain link like the others. */

type NavItem = {
  key: keyof Dictionary["nav"]["items"];
  href: string;
  isActive: (path: string) => boolean;
  /** Carries the 7×7 orange kicker square: a time-bound door. */
  flagged?: boolean;
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

/* A client component: it gets its words from the layout, so the dictionary
   never ships to the browser. */
export default function Navbar({
  t,
  common,
}: {
  t: Dictionary["nav"];
  common: Dictionary["common"];
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
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
            {t.hiringKicker}
          </p>
          <span
            className="hidden h-px w-[22px] shrink-0 bg-white/50 sm:block"
            aria-hidden="true"
          />
          <Link
            href="/new-chapters"
            className="text-center font-sans text-caption text-white underline decoration-white/45 underline-offset-4 transition-colors hover:decoration-white focus-visible:decoration-white"
          >
            <span className="sm:hidden">{t.startingTeamsShort}</span>
            <span className="hidden sm:inline">{t.startingTeamsLong}</span>
            <span className="hidden lg:inline">
              {format(t.startingTeamsDeadline, { deadline: SOFT_DEADLINE_SHORT })}
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
                {t.allOpenPositions}
              </Link>
            </>
          )}
        </div>
      ) : hasOpenPositions ? (
        <div className="flex items-center justify-center gap-3 bg-orange px-6 py-[11px] md:px-12">
          <p className="kicker text-kicker-sm text-white/85">
            {t.hiringKicker}
          </p>
          <span
            className="hidden h-px w-[22px] bg-white/50 sm:block"
            aria-hidden="true"
          />
          <Link
            href="/open-positions"
            className="font-sans text-caption text-white underline decoration-white/45 underline-offset-4 transition-colors hover:decoration-white focus-visible:decoration-white"
          >
            {t.seeOpenPositions}
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
              aria-label={t.homeLinkLabel}
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
              className="hidden items-center gap-[22px] lg:flex xl:gap-[30px]"
              aria-label={t.primaryLabel}
            >
              {navigation.map((item) => {
                const active = item.isActive(pathname);
                const underline = active
                  ? "border-navy"
                  : "border-transparent hover:border-navy/40 focus-visible:border-navy/40";

                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`inline-flex items-center gap-2 whitespace-nowrap border-b py-0.5 font-sans text-sm leading-5 text-navy transition-colors ${underline}`}
                  >
                    {item.flagged && <FlagSquare />}
                    {t.items[item.key]}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden items-center gap-2.5 sm:flex">
              <Link href="/get-involved" className="btn-ghost min-h-[44px] whitespace-nowrap">
                {common.volunteer}
              </Link>
              <Link href="/courses" className="btn-ink min-h-[44px] whitespace-nowrap">
                {common.joinAFreeCourse}
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="inline-flex size-11 items-center justify-center border border-navy/20 lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? t.closeMenu : t.openMenu}
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
            aria-label={t.mobileLabel}
          >
            <div className="shell flex flex-col gap-1 py-4">
              {navigation.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  aria-current={item.isActive(pathname) ? "page" : undefined}
                  className="flex min-h-[44px] items-center gap-2.5 font-sans text-sm leading-5 text-navy"
                >
                  {item.flagged && <FlagSquare />}
                  {t.items[item.key]}
                </Link>
              ))}
              {/* The header keeps both calls to action from sm up, so the sheet
                  only carries them on the narrowest screens -- otherwise the
                  same two buttons show twice between sm and lg. */}
              <Link
                href="/get-involved"
                onClick={() => setMobileOpen(false)}
                className="mt-2 flex min-h-[44px] items-center justify-center border border-navy/20 px-4 text-center font-sans text-caption text-navy sm:hidden"
              >
                {common.volunteer}
              </Link>
              <Link
                href="/courses"
                onClick={() => setMobileOpen(false)}
                className="flex min-h-[44px] items-center justify-center bg-navy px-4 text-center font-sans text-caption text-white sm:hidden"
              >
                {common.joinAFreeCourse}
              </Link>
            </div>
          </nav>
        )}
      </div>
    </>
  );
}
