import type { Metadata } from "next";
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
import PublicationChips from "@/components/chapters/PublicationChips";
import ShowUpBand from "@/components/chapters/ShowUpBand";
import TeamBand, { type TeamMember } from "@/components/chapters/TeamBand";
import lumaPastEventsUtrecht from "@/data/lumaPastEventsUtrecht.json";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Utrecht chapter",
  description:
    "A free AI safety course, two discussion groups, and a growing research track at Utrecht University. Run by volunteers, open to anyone in the city.",
};

/* Utrecht's Luma calendar, as read out of the chapter's own embed. The fetch
   script that writes lumaPastEventsUtrecht.json still points at a different
   `cal-` id; see the report filed with this page. */
const LUMA_CALENDAR_ID = "cal-2gYun0D26BriJ5z";
const LUMA_PUBLIC_URL = "https://lu.ma/sain-utrecht-events";

const EVENTS_EMAIL = "eventsutr@safeainetherlands.org";
const EDU_EMAIL = "eduutr@safeainetherlands.org";
const INFO_EMAIL = "infoutr@safeainetherlands.org";
const LINKTREE_URL = "https://linktr.ee/sainutrecht";
const LINKEDIN_POSTS_URL = "https://www.linkedin.com/company/sain-utrecht/posts/";
const DEVPOST_URL =
  "https://win4aisafety-sain-utrecht.devpost.com/project-gallery";

const courses: Course[] = [
  {
    id: "fundamentals",
    title: "AI Safety Fundamentals",
    summary:
      "AI Safety Fundamentals has run three times in Utrecht, reaching more than 100 participants: BSc and MSc students, researchers, engineers, and public-sector staff. Four weeks, one hour of reading and a one-hour lecture a week, at Utrecht University in the city centre. In week four you choose a technical path, a governance path, or both. You get a certificate for attending all sessions; no previous background is needed.",
    /* The autumn 2026 cohort's calendar, session by session, as the chapter
       published it (upstream #54). Update the dates and rooms with each
       cohort, or drop the meta lines back to plain themes between cohorts. */
    outlineTitle: "Sessions, autumn 2026",
    outline: [
      {
        title: "Introduction",
        meta: "Wed 23 Sep · 18:00-19:00 · Janskerkhof 2-3, Room 0.19",
        detail:
          "High-level overview of AI safety, why it matters now, capabilities and diffusion, types of risks, and solution strategies, technical and governance.",
      },
      {
        title: "Types of risks and incidents",
        meta: "Wed 30 Sep · 18:00-19:00 · Janskerkhof 2-3, Room 0.19",
        detail:
          "Social harms, frontier risks, misuse, loss of control; real-world cases and how research lags behind deployment.",
      },
      {
        title: "Why AI safety is difficult",
        meta: "Wed 7 Oct · 18:00-19:00 · Janskerkhof 15A, Room 101",
        detail:
          "Industry incentives, funding gaps, expert disagreement, slow regulation against fast labs, geopolitical race dynamics.",
      },
      {
        title: "Path specialisation",
        detail: "The fourth week splits in two. Take one path, or both.",
        paths: [
          {
            title: "Technical AI safety",
            meta: "Wed 14 Oct · 18:00-19:00 · Janskerkhof 2-3, Room 0.19",
            detail: "Jailbreaking, the scalable oversight problem, RLHF and reward signals.",
          },
          {
            title: "Governance",
            meta: "Thu 15 Oct · 18:00-19:00 · Drift 23, Room 103",
            detail:
              "Overview of the EU AI Act, accountability in AI systems, international actors in AI safety.",
          },
        ],
      },
    ],
  },
  {
    id: "technical",
    title: "Technical AI Safety",
    summary:
      "Technical AI Safety is a four-week, in-person course at SAIN Utrecht for people who can program and know the basics of AI. Knowing how transformers work is recommended. Each week covers one area of the field: the first two weeks focus on how AI safety evaluators test models, week three looks at safety in robots and other physical systems, and week four covers securing AI agents. The weekly assignments use material from ARENA, an established AI safety training programme, and especially strong solutions are sent to ARENA for review and may be added to their repository. A workshop every Saturday from 13:00 to 15:00 helps you complete them. After the course, we launch a research challenge where our mentors help you develop your own ideas. Each week has about one hour of reading, one to three hours of assignments and a 1.5-hour lecture.",
    outlineTitle: "Sessions, autumn 2026",
    outline: [
      {
        title: "Introduction to AI safety evaluations",
        meta: "Thu 19 Nov · 18:00-19:30 · Location TBD",
        detail:
          "What evaluations are and why we need them, capability versus alignment evaluations, and how to design one: threat models, datasets and scoring.",
      },
      {
        title: "Implementing and evaluating AI safety evaluations",
        meta: "Thu 26 Nov · 18:00-19:30 · Location TBD",
        detail:
          "Running evaluations in practice with tools, understanding the common problems that make results unreliable, and how results are communicated to policymakers.",
      },
      {
        title: "Embodied AI safety",
        meta: "Thu 3 Dec · 18:00-19:30 · Location TBD",
        detail:
          "The safety risks of robots and other physical AI systems, safety filters, using vision-language models to spot unsafe actions, and measuring uncertainty.",
      },
      {
        title: "Securing AI agents",
        meta: "Thu 10 Dec · 18:00-19:30 · Location TBD",
        detail:
          "How agents are attacked through prompt injection and their tools, why model-level defences fail, secure design and AI Control, and how AI can also act as a defender.",
      },
    ],
  },
  {
    id: "governance",
    title: "AI Governance",
    summary:
      "AI Governance is a new four-week course at SAIN Utrecht, open to everyone, with no previous background needed. Most AI governance courses focus on the US and China. In this course, we also look at their visions and ambitions and at where middle powers like the EU fit in. We also dedicate an entire lecture to how Europe and the Netherlands are regulating AI. Throughout the course, we read and discuss primary sources, such as government strategies, laws, and documents from AI labs, giving you the tools to follow developments in AI regulation and geopolitics independently. Each week has about one to two hours of reading and a 1.5-hour lecture.",
    outlineTitle: "Sessions, autumn 2026",
    outline: [
      {
        title: "Introduction to AI governance and AI safety",
        meta: "Wed 18 Nov · 18:00-19:30 · Location TBD",
        detail:
          "What AI governance is, how it differs from technical safety, why it matters now, and the main risks: misuse, loss of control, and concentration of power.",
      },
      {
        title: "AI geopolitics",
        meta: "Wed 25 Nov · 18:00-19:30 · Location TBD",
        detail:
          "The key actors (governments, labs, safety organisations, the UN), US and Chinese visions and ambitions, and where middle powers fit.",
      },
      {
        title: "The tools of the policymaker",
        meta: "Wed 2 Dec · 18:00-19:30 · Location TBD",
        detail:
          "Analysis of past incidents like the Hugging Face case, system cards, and future scenarios.",
      },
      {
        title: "Governance in Europe and the Netherlands",
        meta: "Wed 9 Dec · 18:00-19:30 · Location TBD",
        detail:
          "The EU AI Act and its gaps, the EU AI Office and the GPAI Code of Practice, the Dutch AI landscape.",
      },
    ],
  },
];

const team: readonly TeamMember[] = [
  {
    name: "Riccardo Campanella",
    title: "Director",
    linkedin: "https://www.linkedin.com/in/riccardo-campanella/",
  },
  {
    name: "Luca 'Dug' Dughera",
    title: "Events Lead",
    linkedin: "https://www.linkedin.com/in/luca-dughera/",
  },
  {
    name: "Carolien Tran",
    title: "Discussion Group Lead",
    linkedin: "https://www.linkedin.com/in/carolientran/",
  },
  {
    name: "Elena Clacova",
    title: "Communication Lead",
    linkedin: "https://www.linkedin.com/in/elenaclacova/",
  },
  {
    name: "Cem Kaya",
    title: "Research Operations",
    linkedin: "https://www.linkedin.com/in/cem-kaya-om8/",
  },
  {
    name: "Dimitra Tsolka",
    title: "Facilitator",
    linkedin: "https://www.linkedin.com/in/dimitra-tsolka/",
  },
  {
    name: "Max Schaffelder",
    title: "Advisor",
    linkedin: "https://www.linkedin.com/in/maxschaffelder/",
  },
];

const prints: Print[] = [
  {
    src: "/photos/events/utrecht/aisfundamentals-graduation-ceremony.jpeg",
    widths: [320, 640, 900],
    alt: "The AI Safety Fundamentals cohort together at their graduation",
    caption: "Programme graduation · SAIN Utrecht",
    tilt: "xl:rotate-[-2deg]",
  },
  {
    src: "/photos/events/utrecht/win4AISafety_congrats_the_winners.jpg",
    widths: [320, 640, 900],
    alt: "The winning team of the Win4AISafety research challenge",
    caption: "Win4AISafety winners · SAIN Utrecht",
    tilt: "xl:rotate-[1.5deg]",
  },
  {
    src: "/photos/events/utrecht/discussion-eu2031.jpeg",
    widths: [320, 640],
    alt: "A discussion group seated around a table in Utrecht",
    caption: "Europe 2031 scenario discussion",
    tilt: "xl:rotate-[-1deg]",
  },
  {
    src: "/photos/events/utrecht/technical-week-2.jpeg",
    widths: [320, 640, 900],
    alt: "A lecture during week two of the technical AI safety course",
    caption: "Technical course, week 2",
    tilt: "xl:rotate-[2deg]",
  },
];

const pastEvents = pastEventsThisYear(
  lumaPastEventsUtrecht as RawPastEvent[],
);

export default function UtrechtPage() {
  return (
    <>
      <ChapterHero
        city="Utrecht"
        subheading="A free AI safety course, two discussion groups, and a growing research track at Utrecht University. Run by volunteers, open to anyone in the city."
        photo="/photos/cities/utrecht-hero.jpg"
        photoAlt="The Dom tower rising over the houses of Utrecht city centre"
        caption="Utrecht city centre, where the course meets"
      />

      <ShowUpBand
        city="Utrecht"
        calendarId={LUMA_CALENDAR_ID}
        calendarUrl={LUMA_PUBLIC_URL}
        eventsEmail={EVENTS_EMAIL}
      />

      <CourseBand
        city="Utrecht"
        heading="Three free courses run in Utrecht"
        openLead="Applications for AI Governance and Technical AI Safety are open."
        footnote={
          <>
            These courses are independently run by SAIN Utrecht and are not
            affiliated with Utrecht University. Questions:{" "}
            <a
              href={`mailto:${EDU_EMAIL}`}
              className="underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
            >
              {EDU_EMAIL}
            </a>
            .
          </>
        }
        tail={
          <>
            <p className="font-sans text-body text-navy/74">
              Between cohorts, two discussion groups keep meeting: one on
              technical AI safety, currently a mechanistic interpretability
              reading group, and one on AI governance and policy.
            </p>
            <p className="-mt-2 font-sans text-label text-navy/74">
              Find the next discussion group on{" "}
              <a
                href={LUMA_PUBLIC_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
              >
                SAIN Utrecht&rsquo;s Luma page
                <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </p>
            <p className="font-sans text-body text-navy/74">
              The chapter is building a research track: red-teaming language
              models, safety evaluation, interpretability, and agent behaviour.
              The Project Hub launches in October 2026.
            </p>
            <Link
              href="/research"
              className="inline-flex items-center gap-2 self-start font-sans text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
            >
              Visit the Project hub
              <ArrowRight size={16} weight="regular" aria-hidden="true" />
            </Link>
          </>
        }
      >
        <CourseDisclosure courses={courses} />
      </CourseBand>

      <TeamBand
        city="Utrecht"
        body="SAIN Utrecht is directed by Riccardo Campanella. The team is growing across four areas: education, events, communication, and research. The chapter's work is funded by BERI, with mentorship from Pathfinder."
        team={team}
      />

      <EvidenceBand
        heading="This already happened in Utrecht"
        body="Over the past year the chapter ran the Win4AISafety open research summer challenge, a full technical course with a closing dinner, discussion groups including a Europe 2031 scenario session, and research talks, including an Anthropic researcher speaking to more than 60 people."
      >
        <div>
          <PrintStrip
            prints={prints}
            label="Photographs from SAIN Utrecht events"
          />
          <p className="font-sans text-footnote text-navy/65 xl:mt-2">
            <a
              href={DEVPOST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
            >
              See the submissions on Devpost
              <ArrowUpRight size={14} weight="regular" aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </div>

        <PastEvents
          events={pastEvents}
          recapsUrl={LINKEDIN_POSTS_URL}
          recapsLabel="Recaps on LinkedIn"
        />

        <div className="max-w-[var(--container-copy-wide)]">
          <PublicationChips
            publications={[
              {
                venue: "arXiv",
                title:
                  "Are LLM Belief Updates Consistent with Bayes' Theorem?",
                url: "https://arxiv.org/abs/2507.17951",
                readLabel: true,
              },
            ]}
          />
          <p className="mt-3 font-sans text-footnote text-navy/65">
            Members of SAIN Utrecht contributed to this research.
          </p>
        </div>
      </EvidenceBand>

      <ChapterClose
        city="Utrecht"
        eventsEmail={EVENTS_EMAIL}
        eduEmail={EDU_EMAIL}
        infoEmail={INFO_EMAIL}
        linktreeUrl={LINKTREE_URL}
      />
    </>
  );
}
