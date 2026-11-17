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
import PrintStrip, { type Print } from "@/components/chapters/PrintStrip";
import PublicationChips from "@/components/chapters/PublicationChips";
import ShowUpBand from "@/components/chapters/ShowUpBand";
import TeamBand, { type TeamMember } from "@/components/chapters/TeamBand";
import { aisigTeam } from "@/data/aisigTeam";
import {
  BLUEDOT_URL,
  FRONTIER_AI_GOVERNANCE_URL,
  TECHNICAL_AI_SAFETY_URL,
  frontierAiGovernanceWeeks,
  technicalAiSafetyWeeks,
} from "@/data/bluedotCourses";
import { publications } from "@/data/research";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { getDictionary, rich } from "@/i18n";

const locale = "en";
const dictionary = getDictionary(locale);
const t = dictionary.chapters.groningen;

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
};

const LUMA_CALENDAR_ID = "cal-jjqTmBdWcqoyEUF";
const LUMA_PUBLIC_URL = "https://luma.com/user/SAINGroningen";

const EVENTS_EMAIL = "eventsgro@safeainetherlands.org";
const EDU_EMAIL = "edugro@safeainetherlands.org";
const INFO_EMAIL = "infogro@safeainetherlands.org";
const LINKTREE_URL = "https://linktr.ee/saingroningen";

/* The roster the chapter confirmed in September 2026, in the order it gave. */
const team: readonly TeamMember[] = aisigTeam;

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

/* The same two BlueDot courses as Amsterdam, behind the same disclosure tabs.
   The copy is the chapter's own (from its Education Lead); the governance
   course adds EU materials to BlueDot's curriculum. The course names are
   BlueDot's and stay in English. */
const courses: Course[] = [
  {
    id: "technical",
    title: "Technical AI Safety",
    summary: summary(t.courses.technical, TECHNICAL_AI_SAFETY_URL),
    outlineTitle: dictionary.chapter.course.weeklyOutline,
    outline: technicalAiSafetyWeeks(dictionary.bluedot),
  },
  {
    id: "governance",
    title: "Frontier AI Governance",
    summary: summary(t.courses.governance, FRONTIER_AI_GOVERNANCE_URL),
    outlineTitle: dictionary.chapter.course.weeklyOutline,
    outline: frontierAiGovernanceWeeks(dictionary.bluedot),
  },
];

/* Four photographs from the archive. The archive also holds event posters;
   those are graphics rather than evidence of a room, so they stay on the
   archive page and out of the prints. Their alt text and captions are
   chapters.groningen.prints, in this order. */
const prints: Print[] = [
  {
    src: "/photos/events/archive/archive-04.jpeg",
    widths: [320, 640],
    tilt: "xl:rotate-[-2deg]",
  },
  {
    src: "/photos/events/archive/archive-08.jpeg",
    widths: [320, 640],
    tilt: "xl:rotate-[1.5deg]",
  },
  {
    src: "/photos/events/archive/archive-10.jpg",
    widths: [320, 640],
    tilt: "xl:rotate-[-1deg]",
  },
  {
    src: "/photos/events/archive/archive-13.jpeg",
    widths: [320, 640],
    tilt: "xl:rotate-[2deg]",
  },
].map((print, i) => ({ ...print, ...t.prints[i] }));

/* The four papers this chapter's people are on, read out of the project hub's
   own file rather than retyped here. Venue, title and author list therefore
   cannot drift from /research, and the venues keep the word "workshop" they
   carry at source: these are workshop papers, and a bare "NeurIPS 2025" reads
   as the main conference to exactly the reader this page is written for. */
const CHIP_TITLES = [
  "Steering LLMs using Conceptors",
  "Self-Ablating Transformers",
  "The Anatomy of Alignment",
  "EU-Agent-Bench",
];

const chips = CHIP_TITLES.map((chipTitle) => {
  const paper = publications.find((p) => p.chipTitle === chipTitle);
  if (!paper) {
    throw new Error(`No publication in research.ts titled "${chipTitle}"`);
  }
  return {
    venue: paper.venueShort,
    title: paper.chipTitle,
    authors: paper.authors,
    url: paper.link,
  };
});

export default function GroningenPage() {
  return (
    <>
      <ChapterHero
        city="Groningen"
        subheading={t.hero.subheading}
        photo="/photos/cities/groningen-hero.jpg"
        photoAlt={t.hero.photoAlt}
        caption={t.hero.caption}
        locale={locale}
      />

      <ShowUpBand
        city="Groningen"
        calendarId={LUMA_CALENDAR_ID}
        calendarUrl={LUMA_PUBLIC_URL}
        eventsEmail={EVENTS_EMAIL}
        locale={locale}
      />

      <CourseBand
        city="Groningen"
        heading={t.courses.heading}
        locale={locale}
        footnote={rich(t.courses.note, {}, {
          email: (
            <a href={`mailto:${EDU_EMAIL}`} className={LINK}>
              {EDU_EMAIL}
            </a>
          ),
        })}
        tail={
          <p className="font-sans text-body text-navy/74">
            {t.courses.discussionGroups}
          </p>
        }
      >
        <CourseDisclosure
          courses={courses}
          label={dictionary.chapter.course.label}
          opensInNewTab={dictionary.common.opensInNewTab}
        />
      </CourseBand>

      <TeamBand
        city="Groningen"
        body={t.teamBody}
        team={team}
        locale={locale}
      />

      <EvidenceBand
        heading={t.evidence.heading}
        body={t.evidence.body}
      >
        <div>
          <PrintStrip
            prints={prints}
            label={t.evidence.photosLabel}
            previous={dictionary.chapter.photos.previous}
            next={dictionary.chapter.photos.next}
          />
          <Link
            href="/chapters/groningen/events"
            className="btn-outline-ink mt-2"
          >
            {t.evidence.browseArchive}
          </Link>
        </div>

        <div className="max-w-[var(--container-copy-wide)]">
          <PublicationChips publications={chips} locale={locale} />
          <p className="mt-4">
            <Link
              href="/research"
              className="inline-flex items-center gap-2 font-sans text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
            >
              {dictionary.common.visitTheProjectHub}
              <ArrowRight size={16} weight="regular" aria-hidden="true" />
            </Link>
          </p>
        </div>
      </EvidenceBand>

      <ChapterClose
        city="Groningen"
        eventsEmail={EVENTS_EMAIL}
        eduEmail={EDU_EMAIL}
        infoEmail={INFO_EMAIL}
        linktreeUrl={LINKTREE_URL}
        locale={locale}
      />
    </>
  );
}
