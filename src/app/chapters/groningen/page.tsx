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
  FRONTIER_AI_GOVERNANCE_WEEKS,
  TECHNICAL_AI_SAFETY_URL,
  TECHNICAL_AI_SAFETY_WEEKS,
} from "@/data/bluedotCourses";
import { publications } from "@/data/research";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Groningen chapter",
  description:
    "Free courses, hackathons, and published research, running in Groningen since 2023. It began as the AI Safety Initiative Groningen (AISIG) and continues as SAIN Groningen.",
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
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

/* The same two BlueDot courses as Amsterdam, behind the same disclosure tabs.
   The copy is the chapter's own (from its Education Lead); the governance
   course adds EU materials to BlueDot's curriculum. */
const courses: Course[] = [
  {
    id: "technical",
    title: "Technical AI Safety",
    summary: (
      <>
        <p>Curious to learn about the technical approaches to AI safety?</p>
        <p>
          SAIN Groningen facilitates the{" "}
          <ExternalLink href={BLUEDOT_URL}>BlueDot Impact</ExternalLink>{" "}
          <ExternalLink href={TECHNICAL_AI_SAFETY_URL}>
            Technical AI Safety
          </ExternalLink>{" "}
          course for people who want to learn about the open problems in
          technical AI safety and the techniques to address them. It takes six
          weeks, with about three hours of reading and a two-hour discussion
          session each week. The discussion sessions are guided by a
          facilitator, creating the perfect space to both discuss the material
          and connect with others who are eager to work on AI safety too.
        </p>
      </>
    ),
    outlineTitle: "What you will learn each week",
    outline: TECHNICAL_AI_SAFETY_WEEKS,
  },
  {
    id: "governance",
    title: "Frontier AI Governance",
    summary: (
      <>
        <p>Curious to learn about the governance challenges around AI safety?</p>
        <p>
          SAIN Groningen facilitates the{" "}
          <ExternalLink href={BLUEDOT_URL}>BlueDot Impact</ExternalLink>{" "}
          <ExternalLink href={FRONTIER_AI_GOVERNANCE_URL}>
            Frontier AI Governance
          </ExternalLink>{" "}
          course, which helps you build the judgment to shape how frontier AI
          is governed. Since the BlueDot course mainly covers the US and China
          dynamic, we have extended the curriculum with hand-picked materials
          on tackling AI safety from the EU&rsquo;s perspective. The course
          takes six weeks, with about three hours of reading and a two-hour
          discussion session each week. The discussion sessions are guided by
          a facilitator, creating the perfect space to both discuss the
          materials in detail and connect with others who are eager to work on
          AI safety too.
        </p>
      </>
    ),
    outlineTitle: "What you will learn each week",
    outline: FRONTIER_AI_GOVERNANCE_WEEKS,
  },
];

/* Four photographs from the archive. The archive also holds event posters;
   those are graphics rather than evidence of a room, so they stay on the
   archive page and out of the prints. */
const prints: Print[] = [
  {
    src: "/photos/events/archive/archive-04.jpeg",
    widths: [320, 640],
    alt: "A speaker in front of the graduation slide at a Groningen ceremony",
    caption: "Course graduation · March 2026",
    tilt: "xl:rotate-[-2deg]",
  },
  {
    src: "/photos/events/archive/archive-08.jpeg",
    widths: [320, 640],
    alt: "Two participants presenting their final project to the room",
    caption: "Course graduation · November 2025",
    tilt: "xl:rotate-[1.5deg]",
  },
  {
    src: "/photos/events/archive/archive-10.jpg",
    widths: [320, 640],
    alt: "Organisers presenting to a seated audience at a Groningen evening",
    caption: "Pub quiz · October 2025",
    tilt: "xl:rotate-[-1deg]",
  },
  {
    src: "/photos/events/archive/archive-13.jpeg",
    widths: [320, 640],
    alt: "A full room of students at the start-of-year introduction social",
    caption: "Intro social · September 2025",
    tilt: "xl:rotate-[2deg]",
  },
];

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
        subheading="Free courses, hackathons, and published research, running in Groningen since 2023. It began as the AI Safety Initiative Groningen (AISIG) and continues as SAIN Groningen."
        photo="/photos/cities/groningen-hero.jpg"
        photoAlt="A canal in Groningen with the Der Aa-kerk tower behind the houses"
        caption="Groningen, home of the chapter since 2023"
      />

      <ShowUpBand
        city="Groningen"
        calendarId={LUMA_CALENDAR_ID}
        calendarUrl={LUMA_PUBLIC_URL}
        eventsEmail={EVENTS_EMAIL}
      />

      <CourseBand
        city="Groningen"
        heading="Join one of our free courses!"
        footnote={
          <>
            The courses are independently run by SAIN Groningen and are not
            affiliated with the University of Groningen (RUG). The certificate
            of completion is awarded by SAIN Groningen, not BlueDot Impact.
            Questions:{" "}
            <a href={`mailto:${EDU_EMAIL}`} className={LINK}>
              {EDU_EMAIL}
            </a>
            .
          </>
        }
        tail={
          <p className="font-sans text-body text-navy/74">
            Two discussion groups meet through the year, each with at least one
            experienced mentor: technical AI alignment (scalable oversight,
            evaluation and red-teaming, preference learning, robustness,
            deployment risks) and AI governance and privacy (policies,
            regulations, accountability, transparency and fairness).
          </p>
        }
      >
        <CourseDisclosure courses={courses} />
      </CourseBand>

      <TeamBand
        city="Groningen"
        body="SAIN Groningen is directed by Tarteel Mohamed, with work organised across four teams: education, events, communications, and research operations; a structure other chapters are adopting as they spin up. The chapter grew out of the AI Safety Initiative Groningen (AISIG), running since 2023."
        team={team}
      />

      <EvidenceBand
        heading="30 events and counting"
        body="Since October 2023 the chapter has run 30 events: hackathons, course graduations, research talks, pub quizzes, and socials; first as AISIG and, since 30 April 2026, as SAIN Groningen. Members' research has been published at NeurIPS and ICLR workshops."
      >
        <div>
          <PrintStrip
            prints={prints}
            label="Photographs from SAIN Groningen events"
          />
          <Link
            href="/chapters/groningen/events"
            className="btn-outline-ink mt-2"
          >
            Browse the events archive
          </Link>
        </div>

        <div className="max-w-[var(--container-copy-wide)]">
          <PublicationChips publications={chips} />
          <p className="mt-4">
            <Link
              href="/research"
              className="inline-flex items-center gap-2 font-sans text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
            >
              Visit the Project hub
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
      />
    </>
  );
}
