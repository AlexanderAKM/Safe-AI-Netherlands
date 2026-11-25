"use client";

import { Fragment, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { CaretDown, ArrowRight } from "@phosphor-icons/react/dist/ssr";

import { chapterCourseHref } from "@/data/courseApplications";
import { TRACKS } from "@/data/courseTracks";
import { Link } from "@/i18n/navigation";

/**
 * The /courses variant of the landing's CourseTabs. Same three tracks, same
 * geometry: three square tabs over one panel, the active tab white with a 3px
 * orange underline that slides between tabs.
 *
 * It exists as its own file because each panel opens with a "who it suits"
 * line the landing does not carry: the reader here is choosing a track rather
 * than browsing. The tracks themselves are the landing's (src/data/courseTracks.ts),
 * and so are their words (messages/<locale>/courses.json, `tracks.<id>`):
 * names, taglines, summaries, outlines, city rows, photographs and captions.
 * Change a track there and both pages follow.
 *
 * On a phone the markup interleaves header, panel, header, panel, and a track
 * can close to nothing; from md the grid lifts the headers into a 3-up strip
 * over one shared panel cell, where one is always open. A disclosure group
 * rather than a tablist, because the headers have their panels between them.
 */

/* Row one, one column each. Written out because Tailwind reads class names as
   literals and cannot see an interpolated column number. */
const TAB_CELL = ["md:col-start-1", "md:col-start-2", "md:col-start-3"];

/* Row two, spanning all three columns: every panel shares this one cell. */
const PANEL_CELL = "md:col-start-1 md:col-end-4 md:row-start-2";

const COMPACT = "(max-width: 767.98px)";

/**
 * True while the headers are a stacked list rather than a strip.
 *
 * The server snapshot is `false`, so this only ever reports the strip until
 * the browser has said otherwise. That is safe because nothing here reaches
 * the markup: it decides what a click does, not what renders, so there is
 * no hydration to mismatch.
 */
function useCompact() {
  return useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia(COMPACT);
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    },
    () => window.matchMedia(COMPACT).matches,
    () => false,
  );
}

export default function CourseTabs() {
  const t = useTranslations("courses.tabs");
  const tTracks = useTranslations("courses.tracks");
  const [activeId, setActiveId] = useState<string | null>(TRACKS[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const compact = useCompact();

  /* Closing to nothing is right on a phone: the headers are a list, an open
     panel is most of the screen, and a reader who has finished with a track
     wants the other two back. On the strip it would leave three tabs pointing
     at an empty band, so there one is always open. */
  const toggle = (id: string) =>
    setActiveId((current) => (current === id && compact ? null : id));

  /* Carried back from a phone by a rotation or a resized window. */
  useEffect(() => {
    if (!compact && activeId === null) setActiveId(TRACKS[0].id);
  }, [compact, activeId]);

  /* The landing's track columns link to #track-<id>: open that track, then
     bring its header into view (the strip from md, where the panels share
     one cell, the track's own header below it). */
  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.replace("#track-", "");
      if (!TRACKS.some((t) => t.id === id)) return;
      setActiveId(id);
      const target = window.matchMedia(COMPACT).matches
        ? document.getElementById(`tab-${id}`)
        : document.getElementById("tracks");
      requestAnimationFrame(() => target?.scrollIntoView({ block: "start" }));
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const reduce = useReducedMotion();

  /* Arrow keys move between headers, and only between headers. Bound to the
     header itself so the open panel keeps its own keys. */
  const onHeaderKeyDown = (index: number) => (event: React.KeyboardEvent) => {
    const delta =
      event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const next = (index + delta + TRACKS.length) % TRACKS.length;
    setActiveId(TRACKS[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div
      className="bg-white md:grid md:grid-cols-3"
      role="group"
      aria-label={t("label")}
    >
      {TRACKS.map((active, i) => {
        const on = active.id === activeId;
        /* The track's words, from courses.json `tracks.<id>`. */
        const tTrack = (key: string) => tTracks(`${active.id}.${key}`);
        return (
          <Fragment key={active.id}>
            <button
              ref={(node) => {
                tabRefs.current[i] = node;
              }}
              type="button"
              id={`tab-${active.id}`}
              aria-expanded={on}
              aria-controls={`panel-${active.id}`}
              onClick={() => toggle(active.id)}
              onKeyDown={onHeaderKeyDown(i)}
              /* The divider belongs to the gap between two tabs, not to either
                 tab's state. Stacked, that rule runs above each header. */
              className={`relative flex w-full min-h-[88px] scroll-mt-36 items-center gap-4 border-t border-navy/12 px-6 py-5 text-left transition-colors md:flex-col md:items-stretch md:justify-center md:gap-1.5 md:border-t-0 ${
                i > 0 ? "md:border-l md:border-l-navy/10" : ""
              } ${
                on
                  ? /* The desktop indicator is a shared-layout element that
                       slides between tabs. Stacked there is nothing to slide
                       along, so the rule is drawn plainly. */
                    "border-b-[3px] border-b-orange md:border-b-transparent"
                  : "border-b-[3px] border-b-transparent hover:bg-cream focus-visible:bg-cream"
              } ${TAB_CELL[i]} md:row-start-1`}
            >
              {on && (
                <motion.span
                  layoutId="courses-page-tab-indicator"
                  className="absolute inset-x-0 -bottom-[3px] hidden h-[3px] bg-orange md:block"
                  transition={{
                    duration: reduce ? 0 : 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              )}
              {/* A column of label beside the caret, dissolving back into the
                  button's own column once the headers become a strip. */}
              <span className="flex min-w-0 flex-1 flex-col gap-1.5 md:contents">
                <span
                  className={`font-sans text-index tracking-normal ${
                    on ? "text-orange-ink" : "text-navy/65"
                  }`}
                >
                  {active.index}
                </span>
                <span
                  className={`font-serif text-xl leading-6 ${on ? "text-navy" : "text-navy/72"}`}
                >
                  {tTrack("title")}
                </span>
                <span className="font-sans text-caption text-navy/65">
                  {tTrack("tagline")}
                </span>
              </span>
              <CaretDown
                size={13}
                weight="bold"
                aria-hidden="true"
                className={`shrink-0 text-navy/45 transition-transform duration-200 md:hidden ${
                  on ? "rotate-180" : ""
                }`}
              />
            </button>

            <motion.div
              initial={false}
              aria-hidden={!on}
              /* `inert`, not `visibility: hidden`: the outgoing panel stays
                 painted while it fades but leaves the tab order and the
                 accessibility tree. Stacked there is no crossfade to protect,
                 so the closed panel leaves the flow outright. */
              {...(on ? {} : ({ inert: "" } as Record<string, string>))}
              id={`panel-${active.id}`}
              role="region"
              aria-labelledby={`tab-${active.id}`}
              tabIndex={on ? 0 : -1}
              className={`${on ? "grid" : "hidden md:grid"} ${PANEL_CELL} md:border-t md:border-navy/12 xl:grid-cols-[minmax(0,720px)_minmax(0,1fr)] ${
                on ? "" : "pointer-events-none"
              }`}
            >
              <motion.div
                /* Fade in only: the outgoing column leaves instantly, so no
                   frame holds two sets of glyphs, and the photograph
                   crossfading underneath carries the continuity. */
                initial={false}
                animate={{ opacity: on ? 1 : 0 }}
                transition={{
                  duration: reduce || !on ? 0 : 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex w-full max-w-[860px] flex-col gap-[18px] px-6 py-8 md:order-none md:px-8 md:pr-9 xl:max-w-none"
              >
                {/* Who the track is for, first: the one thing this page adds
                    over the landing's tabs, because the reader here is
                    choosing rather than browsing. Full ink against the
                    summary's 78%, so the two read as answer then evidence. */}
                <p className="max-w-[640px] font-sans text-[15.5px] leading-[25px] text-navy">
                  {tTrack("whoItSuits")}
                </p>
                <p className="max-w-[640px] font-sans text-[15.5px] leading-[25px] text-navy/78">
                  {tTrack("summary")}
                </p>

                <div>
                  <p className="kicker pb-2 text-kicker-sm text-navy/65">
                    {tTrack("outlineTitle")}
                  </p>
                  <ol className="font-sans text-ui text-navy">
                    {(tTracks.raw(`${active.id}.outline`) as string[]).map((item, i) => (
                      <li
                        key={item}
                        className="flex items-baseline gap-3 border-t border-navy/10 py-[7px]"
                      >
                        <span className="w-[22px] shrink-0 font-sans text-xs text-orange-ink">
                          {i + 1}
                        </span>
                        {item}
                      </li>
                    ))}
                  </ol>
                </div>

                <div>
                  <p className="kicker pb-2 text-kicker-sm text-navy/65">
                    {t("whereYouCanAttend")}
                  </p>
                  {/* The row is the route, to this track's own course tab
                      on the chapter page where it has one. Destination comes
                      from courseApplications, so this cannot drift from the
                      chapter pages. */}
                  {active.cities.map((city) => (
                    <Link
                      key={city}
                      href={chapterCourseHref(city, active.id)}
                      className="group/city flex flex-col gap-1 border-t border-navy/10 py-2.5 transition-colors duration-200 hover:bg-navy/5 focus-visible:bg-navy/5 sm:flex-row sm:items-baseline sm:gap-4"
                    >
                      <span className="flex w-[112px] shrink-0 items-center gap-1.5 font-serif text-base leading-[22px] text-navy">
                        <span className="underline decoration-navy/25 underline-offset-4 transition-colors duration-200 group-hover/city:decoration-navy group-focus-visible/city:decoration-navy">
                          {city}
                        </span>
                        {/* Regular at 16: the smallest size where Phosphor's
                            shaft is a full pixel and cannot dissolve on
                            fractional-DPR screens. */}
                        <ArrowRight
                          size={16}
                          weight="regular"
                          aria-hidden="true"
                          className="shrink-0 text-navy/45 transition-colors duration-200 group-hover/city:text-navy group-focus-visible/city:text-navy"
                        />
                      </span>
                      <span className="font-sans text-ui leading-[22px] text-navy/72">
                        {tTrack(`cities.${city.toLowerCase()}`)}
                      </span>
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* The photograph keeps its cross-dissolve, so the largest mass
                  on the panel never blanks while the text swaps underneath. */}
              <motion.div
                initial={false}
                animate={{ opacity: on ? 1 : 0 }}
                transition={{ duration: reduce ? 0 : 0.3, ease: "linear" }}
                className="relative order-first min-h-[350px] overflow-hidden md:order-none xl:min-h-[587px]"
              >
                <img
                  src={active.photo.replace(/\.jpg$/, `-${active.photoWidths[0]}.jpg`)}
                  srcSet={active.photoWidths
                    .map((w) => `${active.photo.replace(/\.jpg$/, `-${w}.jpg`)} ${w}w`)
                    .join(", ")}
                  /* Full shell width while the panel is stacked; the right
                     column once it splits at xl, capped at 624 in the 1440
                     canvas. */
                  sizes="(min-width: 1440px) 624px, (min-width: 1280px) calc(100vw - 816px), 100vw"
                  alt={tTrack("photoAlt")}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 size-full object-cover"
                  style={{ objectPosition: active.photoPosition ?? "50% 50%" }}
                />
                <p className="kicker absolute inset-x-0 bottom-0 bg-navy/88 px-5 py-2.5 text-kicker-sm text-white">
                  {tTrack("caption")}
                </p>
              </motion.div>
            </motion.div>
          </Fragment>
        );
      })}
    </div>
  );
}
