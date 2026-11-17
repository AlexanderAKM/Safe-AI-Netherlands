import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

import ChapterClose from "@/components/chapters/ChapterClose";
import ChapterHero from "@/components/chapters/ChapterHero";
import CourseBand from "@/components/chapters/CourseBand";
import CourseDisclosure, {
  type Course,
} from "@/components/chapters/CourseDisclosure";
import EvidenceBand from "@/components/chapters/EvidenceBand";
import PastEvents, {
  pastEventsThisYear,
  type RawPastEvent,
} from "@/components/chapters/PastEvents";
import PrintStrip, { type Print } from "@/components/chapters/PrintStrip";
import ShowUpBand from "@/components/chapters/ShowUpBand";
import TeamBand, { type TeamMember } from "@/components/chapters/TeamBand";
import lumaPastEventsAmsterdam from "@/data/lumaPastEventsAmsterdam.json";
import {
  BLUEDOT_URL,
  FRONTIER_AI_GOVERNANCE_URL,
  TECHNICAL_AI_SAFETY_URL,
  frontierAiGovernanceWeeks,
  technicalAiSafetyWeeks,
} from "@/data/bluedotCourses";
import { sainAmsTeam } from "@/data/sainAmsTeam";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { getDictionary, rich } from "@/i18n";

const locale = "en";
const dictionary = getDictionary(locale);
const t = dictionary.chapters.amsterdam;

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
};

const LUMA_CALENDAR_ID = "cal-WD5xl5IYLpY7xNm";
const LUMA_PUBLIC_URL = "https://luma.com/user/SAIN_Amsterdam";

const EVENTS_EMAIL = "eventsams@safeainetherlands.org";
const EDU_EMAIL = "eduams@safeainetherlands.org";
const INFO_EMAIL = "infoams@safeainetherlands.org";
const LINKTREE_URL = "https://linktr.ee/sainamsterdam";
const ELLIS_URL = "https://ivi.fnwi.uva.nl/ellis/";

const team: readonly TeamMember[] = sainAmsTeam;

const LINK =
  "underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy";

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={LINK}>
      {children}
      <span className="sr-only"> {dictionary.common.opensInNewTab}</span>
    </a>
  );
}

/* Said under each course rather than once under both, because a tab is read
   on its own. */
const courseNote = (
  <>
    {t.courses.note}
    <br />
    {rich(dictionary.chapter.course.questions, {}, {
      email: (
        <a href={`mailto:${EDU_EMAIL}`} className={LINK}>
          {EDU_EMAIL}
        </a>
      ),
    })}
  </>
);

/* A course summary's paragraphs, with BlueDot and the course itself linked
   where the words <bluedot> and <course> mark them. */
function summary(paragraphs: string[], courseUrl: string) {
  return (
    <>
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>
          {rich(paragraph, {
            bluedot: (chunk) => <ExternalLink href={BLUEDOT_URL}>{chunk}</ExternalLink>,
            course: (chunk) => <ExternalLink href={courseUrl}>{chunk}</ExternalLink>,
          })}
        </p>
      ))}
    </>
  );
}

/* The two courses behind the same disclosure tabs Utrecht uses, so a reader
   moving between chapter pages meets one device for "this chapter's courses".
   The copy is the chapter's own; the week-by-week outline is BlueDot's, shared
   with Groningen through bluedotCourses.ts. The course names are BlueDot's and
   stay in English. */
const courses: Course[] = [
  {
    id: "technical",
    title: "Technical AI Safety",
    summary: summary(t.courses.technical, TECHNICAL_AI_SAFETY_URL),
    outlineTitle: dictionary.chapter.course.weeklyOutline,
    outline: technicalAiSafetyWeeks(dictionary.bluedot),
    note: courseNote,
  },
  {
    id: "governance",
    title: "Frontier AI Governance",
    summary: summary(t.courses.governance, FRONTIER_AI_GOVERNANCE_URL),
    outlineTitle: dictionary.chapter.course.weeklyOutline,
    outline: frontierAiGovernanceWeeks(dictionary.bluedot),
    note: courseNote,
  },
];

/* The photographs; their alt text and captions are chapters.amsterdam.prints,
   in this order. */
const prints: Print[] = [
  {
    src: "/photos/events/amsterdam/governance-graduation.jpg",
    widths: [320, 640, 900],
    tilt: "xl:rotate-[-2deg]",
  },
  {
    src: "/photos/events/amsterdam/governance-course.jpg",
    widths: [320, 640, 900],
    tilt: "xl:rotate-[1.5deg]",
  },
  {
    src: "/photos/events/amsterdam/discussion-group.jpeg",
    widths: [320, 640, 900],
    tilt: "xl:rotate-[-1deg]",
  },
  {
    src: "/photos/events/amsterdam/chapter-meeting.jpg",
    widths: [320, 640, 900],
    tilt: "xl:rotate-[2deg]",
  },
].map((print, i) => ({ ...print, ...t.prints[i] }));

const pastEvents = pastEventsThisYear(
  lumaPastEventsAmsterdam as RawPastEvent[],
);

export default function AmsterdamPage() {
  return (
    <>
      <ChapterHero
        city="Amsterdam"
        subheading={t.hero.subheading}
        photo="/photos/cities/amsterdam-hero.jpg"
        photoAlt={t.hero.photoAlt}
        caption={t.hero.caption}
        locale={locale}
        belowCta={
          <p className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-1 font-sans text-footnote text-navy/65">
            {t.hero.supportedBy}
            <a
              href={ELLIS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center"
            >
              <img
                src="/logos/ellis.svg"
                alt="ELLIS Unit Amsterdam"
                width={98}
                height={28}
                className="h-7 w-auto"
              />
              <ArrowUpRight
                size={14}
                weight="regular"
                aria-hidden="true"
                className="ml-1 inline-block shrink-0 align-[-2px]"
              />
              <span className="sr-only"> {dictionary.common.opensInNewTab}</span>
            </a>
          </p>
        }
      />

      <ShowUpBand
        city="Amsterdam"
        calendarId={LUMA_CALENDAR_ID}
        calendarUrl={LUMA_PUBLIC_URL}
        eventsEmail={EVENTS_EMAIL}
        locale={locale}
      />

      <CourseBand
        city="Amsterdam"
        heading={t.courses.heading}
        locale={locale}
        tail={
          <>
            <p className="font-sans text-body text-navy/74">
              {t.courses.discussionGroup}
            </p>
            <p className="-mt-2 font-sans text-label text-navy/74">
              {rich(
                dictionary.chapter.course.findDiscussionGroup,
                {
                  link: (chunk) => (
                    <a
                      href="https://luma.com/SAIN_Amsterdam"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
                    >
                      {chunk}
                      <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
                      <span className="sr-only"> {dictionary.common.opensInNewTab}</span>
                    </a>
                  ),
                },
                { city: "Amsterdam" },
              )}
            </p>
            <p className="font-sans text-body text-navy/74">
              {t.courses.research}
            </p>
            <Link
              href="/research"
              className="inline-flex items-center gap-2 self-start font-sans text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
            >
              {dictionary.common.visitTheProjectHub}
              <ArrowRight size={16} weight="regular" aria-hidden="true" />
            </Link>
          </>
        }
      >
        <CourseDisclosure
          courses={courses}
          label={dictionary.chapter.course.label}
          opensInNewTab={dictionary.common.opensInNewTab}
        />
      </CourseBand>

      <TeamBand
        city="Amsterdam"
        body={t.teamBody}
        team={team}
        locale={locale}
      />

      <EvidenceBand
        heading={t.evidence.heading}
        body={t.evidence.body}
      >
        <PrintStrip
          prints={prints}
          label={t.evidence.photosLabel}
          previous={dictionary.chapter.photos.previous}
          next={dictionary.chapter.photos.next}
        />

        <PastEvents events={pastEvents} locale={locale} />
      </EvidenceBand>

      <ChapterClose
        city="Amsterdam"
        eventsEmail={EVENTS_EMAIL}
        eduEmail={EDU_EMAIL}
        infoEmail={INFO_EMAIL}
        linktreeUrl={LINKTREE_URL}
        locale={locale}
      />
    </>
  );
}
