import type { Metadata } from "next";
import Link from "next/link";

import CourseTabs from "@/components/courses/CourseTabs";
import Reveal from "@/components/landing/Reveal";
import SectionOrbits from "@/components/landing/SectionOrbits";
import { COMMUNITY_JOIN_URL } from "@/data/siteContact";
import {
  courseApplications,
  formatCityList,
  openCourseApplications,
  type CourseApplication,
} from "@/data/courseApplications";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { format, getDictionary, rich } from "@/i18n";

const dictionary = getDictionary("en");
const t = dictionary.courses;

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
};

/* The reader arrived by clicking "Join a free course", so the page opens on the
   decision rather than on the case for AI Safety. What she is choosing between
   is a track, a city, and a deadline; everything here serves one of the three.

   Open chapters first, in the order the data lists them. A closed city under
   two open ones reads as the exception it is, and when its own cohort opens it
   moves up without anyone editing this file. */
const applications: CourseApplication[] = [
  ...courseApplications.filter((c) => c.open),
  ...courseApplications.filter((c) => !c.open),
];

const someoneIsOpen = openCourseApplications.length > 0;

/* How a cohort actually runs (courses.cadence.rows), which is the part a
   course card never says. Five rows rather than a paragraph: she is checking
   whether her weeks have room in them, and a row is something you scan for
   your own city. */

/* Deadlines carry their year in the data so a passed date reads as expired
   rather than ambiguous. In the apply row both dates sit in one sentence, so
   the facilitator date drops the year it shares with the participant date. */
function facilitatorDate(participants: string, facilitators: string): string {
  const year = participants.match(/\b(\d{4})$/)?.[1];
  return year && facilitators.endsWith(year)
    ? facilitators.slice(0, -year.length).trim()
    : facilitators;
}

const CITY_PAGES = [
  { city: "Utrecht", href: "/chapters/utrecht" },
  { city: "Groningen", href: "/chapters/groningen" },
  { city: "Amsterdam", href: "/chapters/amsterdam" },
];

export default function CoursesPage() {
  return (
    <>
      {/* Hero. A conversion page this slim earns no illustration: the copy
          column against open space, with the ornament bleeding off the left
          edge rather than sitting behind the words. */}
      <section
        aria-labelledby="courses-heading"
        className="relative isolate overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(in oklab 180deg, white 0%, white 95%, #f7f5f2 100%)",
        }}
      >
        <SectionOrbits className="-left-24 top-0 h-[420px] w-[320px] md:-left-14" />
        <div className="shell band-hero">
          <Reveal hero className="flex max-w-[720px] flex-col gap-6">
            <h1 id="courses-heading" className="font-serif text-display text-navy">
              {t.hero.heading}
            </h1>
            <p className="max-w-[620px] font-sans text-body text-navy/72">
              {t.hero.body}
            </p>
            {/* Read from the same file the chapter pages read, so this line can
                never advertise a city that is shut. When the last cohort
                closes it removes itself instead of going stale. */}
            {someoneIsOpen && (
              <p className="font-sans text-caption text-navy/65">
                {format(t.hero.applyNow, {
                  cities: formatCityList(openCourseApplications, dictionary.common.or),
                })}
              </p>
            )}
            <div className="pt-1">
              {someoneIsOpen ? (
                <a href="#apply" className="btn-accent self-start">
                  {t.hero.applyInYourCity}
                </a>
              ) : (
                /* Nothing to apply to is not nothing to do, and the community
                   is the door that is always open. */
                <a
                  href={COMMUNITY_JOIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-accent gap-2 self-start"
                >
                  {dictionary.common.joinTheCommunity}
                  <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
                  <span className="sr-only"> {dictionary.common.opensInNewTab}</span>
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* The three tracks. Same component geometry as the landing's courses
          chapter, same ground, and each panel opens with the line naming who
          the track is for. */}
      <section
        id="tracks"
        aria-labelledby="tracks-heading"
        className="relative isolate scroll-mt-36 overflow-hidden border-t border-navy/10 bg-white"
      >
        <SectionOrbits className="-left-20 top-6 h-[400px] w-[300px] md:-left-12" />
        <div className="shell band-section-top relative isolate pb-14">
          <div className="mx-auto mb-10 max-w-[640px] text-center">
            <h2 id="tracks-heading" className="font-serif text-heading text-navy">
              {t.tracks.heading}
            </h2>
            <p className="mt-2.5 font-sans text-body leading-[26px] text-navy/74">
              {t.tracks.body}
            </p>
          </div>
          <Reveal>
            <CourseTabs words={dictionary.tracks} t={dictionary.courseTabs} />
          </Reveal>
        </div>
      </section>

      {/* How cohorts run. Paper, because this band behaves like a schedule.
          The claim and the way out sit left, the five rows right, so the
          reader who only wants her own city can drop straight to the links. */}
      <section
        id="cadence"
        aria-labelledby="cadence-heading"
        className="scroll-mt-36 border-t border-navy/10 bg-cream"
      >
        <div className="shell band-index grid items-start gap-8 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-16">
          <div className="flex min-w-0 flex-col gap-4">
            <h2 id="cadence-heading" className="font-serif text-heading-sm text-navy">
              {t.cadence.heading}
            </h2>
            <p className="max-w-[420px] font-sans text-body text-navy/74">
              {t.cadence.body}
            </p>
            <ul className="flex flex-col gap-2">
              {CITY_PAGES.map((entry) => (
                <li key={entry.city}>
                  <Link
                    href={entry.href}
                    className="inline-flex items-center gap-1.5 font-sans text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
                  >
                    {entry.city}
                    <ArrowRight size={16} weight="regular" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Numbered rows without rules between them: the orange-ink numbers
              carry the sequence, and five hairlines beside a column of links
              read as a form. */}
          <ol className="flex min-w-0 flex-col gap-3 font-sans text-ui text-navy">
            {t.cadence.rows.map((item, i) => (
              <li key={item} className="flex items-baseline gap-3">
                <span className="w-[22px] shrink-0 font-sans text-xs text-orange-ink">
                  {i + 1}
                </span>
                <span className="max-w-[640px] leading-[23px]">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Apply. The page's one inverse band, because this is where it asks for
          the decision. Every row is read from courseApplications, so open here
          is open on the chapter page by construction. */}
      <section id="apply" aria-labelledby="apply-heading" className="scroll-mt-36 bg-navy">
        <div className="shell band-close">
          <div className="max-w-[620px]">
            <h2 id="apply-heading" className="font-serif text-closing text-white">
              {t.apply.heading}
            </h2>
            {/* One paragraph either way: while nothing is open it also says
                so, in place of a list with nothing to apply to. */}
            <p className="mt-4 font-sans text-body text-white/78">
              {t.apply.perChapter}
              {someoneIsOpen ? "" : ` ${t.apply.allClosed}`}
            </p>
          </div>

          {someoneIsOpen ? (
            <ul className="mt-10 flex flex-col">
              {applications.map((entry) => (
                <li
                  key={entry.chapter}
                  className="flex flex-col gap-4 border-t border-white/10 py-6 md:flex-row md:items-center md:justify-between md:gap-10"
                >
                  <div className="min-w-0">
                    <h3 className="font-serif text-title text-white">{entry.chapter}</h3>
                    {entry.open ? (
                      <>
                        {!entry.rolling && (
                          <p className="mt-1 font-sans text-label text-white/78">
                            {t.apply.open}
                          </p>
                        )}
                        <p className="font-sans text-label text-white/78">
                          {entry.rolling
                            ? entry.rollingNote
                            : format(t.apply.deadlines, {
                                participants: entry.deadlines.participants,
                                facilitators: facilitatorDate(
                                  entry.deadlines.participants,
                                  entry.deadlines.facilitators,
                                ),
                              })}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="mt-1 font-sans text-label text-white/78">
                          {t.apply.closed}
                        </p>
                        <p className="font-sans text-label text-white/78">
                          {entry.closedNote}
                        </p>
                      </>
                    )}
                  </div>

                  {entry.open ? (
                    <Link href={entry.href} className="btn-accent shrink-0 self-start md:self-auto">
                      {format(t.apply.applyIn, { chapter: entry.chapter })}
                    </Link>
                  ) : (
                    /* No button for a shut cohort: the row says when it
                       reopens, and the link goes where the reader can read the
                       rest of what that chapter does meanwhile. */
                    <Link
                      href={entry.href.replace(/#.*$/, "")}
                      className="inline-flex shrink-0 items-center gap-1.5 self-start font-sans text-label text-white underline decoration-white/35 underline-offset-4 hover:decoration-white focus-visible:decoration-white md:self-auto"
                    >
                      {t.apply.viewChapter}
                      <ArrowRight size={16} weight="regular" aria-hidden="true" />
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-10 flex flex-col gap-5 border-t border-white/15 pt-8 md:flex-row md:items-center md:justify-between md:gap-12">
            <p className="max-w-[520px] font-sans text-body text-white/78">
              {rich(t.apply.walkthrough, {
                link: (chunk) => (
                  <Link
                    href="/contact"
                    className="whitespace-nowrap text-white underline decoration-white/35 underline-offset-4 hover:decoration-white focus-visible:decoration-white"
                  >
                    {chunk}
                  </Link>
                ),
              })}
            </p>
            {/* The reader who is not ready for a cohort still has somewhere to
                go, and it is the same door the landing offers. */}
            <a
              href={COMMUNITY_JOIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost-inverse shrink-0 gap-2 self-start md:self-auto"
            >
              {dictionary.common.joinTheCommunity}
              <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
              <span className="sr-only"> {dictionary.common.opensInNewTab}</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
