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
import { getDictionary, rich } from "@/i18n";

const locale = "en";
const dictionary = getDictionary(locale);
const t = dictionary.chapters.utrecht;

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
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

/* The course names are SAIN Utrecht's own and stay in English; everything
   else about each course is in en.json under chapters.utrecht.courses.

   The sessions are the autumn 2026 cohort's calendar, session by session, as
   the chapter published it (upstream #54). Update the dates and rooms with
   each cohort, or drop the meta lines back to plain themes between cohorts. */
const courses: Course[] = [
  {
    id: "fundamentals",
    title: "AI Safety Fundamentals",
    summary: t.courses.fundamentals.summary,
    outlineTitle: t.courses.sessionsTitle,
    outline: t.courses.fundamentals.sessions,
  },
  {
    id: "technical",
    title: "Technical AI Safety",
    summary: t.courses.technical.summary,
    outlineTitle: t.courses.sessionsTitle,
    outline: t.courses.technical.sessions,
  },
  {
    id: "governance",
    title: "AI Governance",
    summary: t.courses.governance.summary,
    outlineTitle: t.courses.sessionsTitle,
    outline: t.courses.governance.sessions,
  },
];

/* Role titles stay in English, as they do across the site. */
const team: readonly TeamMember[] = [
  {
    name: "Riccardo Campanella",
    title: "Director",
    linkedin: "https://www.linkedin.com/in/riccardo-campanella/",
  },
  {
    name: "Luca Dughera",
    title: "Events Lead",
    linkedin: "https://www.linkedin.com/in/luca-dughera/",
  },
  {
    name: "Asya Korshunova",
    title: "Education Lead",
    linkedin:
      "https://www.linkedin.com/in/anastasiia-korshunova-resilient-changemaking/",
  },
  {
    name: "Elena Clacova",
    title: "Communications Lead",
    linkedin: "https://www.linkedin.com/in/elenaclacova/",
  },
  {
    name: "Ying-Kai Dang",
    title: "Research Ops",
    linkedin: "https://www.linkedin.com/in/ying-kai-dang/",
  },
  {
    name: "Matthijs Vossen",
    title: "Research Ops",
    linkedin: "https://www.linkedin.com/in/matthijsvossen/",
  },
  {
    name: "Carolien Tran",
    title: "Discussion Coordinator",
    linkedin: "https://www.linkedin.com/in/carolientran/",
  },
  {
    name: "Prerna Chaudhary",
    title: "Discussion Facilitator",
    linkedin: "https://www.linkedin.com/in/prerna-chaudhary/",
  },
  {
    name: "Cem Kaya",
    title: "Facilitator",
    linkedin: "https://www.linkedin.com/in/cem-kaya-om8/",
  },
  {
    name: "Dimitra Tsolka",
    title: "Facilitator",
    linkedin: "https://www.linkedin.com/in/dimitra-tsolka/",
  },
  {
    name: "Chetlur Vasundhara",
    title: "Facilitator",
    linkedin: "https://www.linkedin.com/in/chetlur-vasundhara-a0a7a3288/",
  },
  {
    name: "Giovanni Varricchione",
    title: "Facilitator",
    linkedin: "https://www.linkedin.com/in/giovannivarr/",
  },
  {
    name: "Milan Schouten",
    title: "Facilitator",
    linkedin: "https://www.linkedin.com/in/milan-schouten/",
  },
  {
    name: "Qasim Sajjad",
    title: "Facilitator",
    linkedin: "https://www.linkedin.com/in/rqasimsajjad/",
  },
  {
    name: "Nityaa Kalra",
    title: "Facilitator",
    linkedin: "https://www.linkedin.com/in/nityaakalra/",
  },
  {
    name: "Jaffar Hussain",
    title: "Advisor",
    linkedin: "https://www.linkedin.com/in/jaffar-hussain-3414383/",
  },
];

/* The photographs; their alt text and captions are chapters.utrecht.prints,
   in this order. */
const prints: Print[] = [
  {
    src: "/photos/events/utrecht/aisfundamentals-graduation-ceremony.jpeg",
    widths: [320, 640, 900],
    tilt: "xl:rotate-[-2deg]",
  },
  {
    src: "/photos/events/utrecht/win4AISafety_congrats_the_winners.jpg",
    widths: [320, 640, 900],
    tilt: "xl:rotate-[1.5deg]",
  },
  {
    src: "/photos/events/utrecht/discussion-eu2031.jpeg",
    widths: [320, 640],
    tilt: "xl:rotate-[-1deg]",
  },
  {
    src: "/photos/events/utrecht/technical-week-2.jpeg",
    widths: [320, 640, 900],
    tilt: "xl:rotate-[2deg]",
  },
].map((print, i) => ({ ...print, ...t.prints[i] }));

const pastEvents = pastEventsThisYear(
  lumaPastEventsUtrecht as RawPastEvent[],
);

export default function UtrechtPage() {
  return (
    <>
      <ChapterHero
        city="Utrecht"
        subheading={t.hero.subheading}
        photo="/photos/cities/utrecht-hero.jpg"
        photoAlt={t.hero.photoAlt}
        caption={t.hero.caption}
        locale={locale}
      />

      <ShowUpBand
        city="Utrecht"
        calendarId={LUMA_CALENDAR_ID}
        calendarUrl={LUMA_PUBLIC_URL}
        eventsEmail={EVENTS_EMAIL}
        locale={locale}
      />

      <CourseBand
        city="Utrecht"
        heading={t.courses.heading}
        openLead={t.courses.openLead}
        locale={locale}
        footnote={rich(t.courses.note, {}, {
          email: (
            <a
              href={`mailto:${EDU_EMAIL}`}
              className="underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
            >
              {EDU_EMAIL}
            </a>
          ),
        })}
        tail={
          <>
            <p className="font-sans text-body text-navy/74">
              {t.courses.discussionGroups}
            </p>
            <p className="-mt-2 font-sans text-label text-navy/74">
              {rich(
                dictionary.chapter.course.findDiscussionGroup,
                {
                  link: (chunk) => (
                    <a
                      href={LUMA_PUBLIC_URL}
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
                { city: "Utrecht" },
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
        city="Utrecht"
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
          <p className="font-sans text-footnote text-navy/65 xl:mt-2">
            <a
              href={DEVPOST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
            >
              {t.evidence.devpost}
              <ArrowUpRight size={14} weight="regular" aria-hidden="true" />
              <span className="sr-only"> {dictionary.common.opensInNewTab}</span>
            </a>
          </p>
        </div>

        <PastEvents
          events={pastEvents}
          recapsUrl={LINKEDIN_POSTS_URL}
          recapsLabel={t.evidence.recaps}
          locale={locale}
        />

        <div className="max-w-[var(--container-copy-wide)]">
          {/* A paper's title stays as it was published. */}
          <PublicationChips
            locale={locale}
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
            {t.evidence.contributed}
          </p>
        </div>
      </EvidenceBand>

      <ChapterClose
        city="Utrecht"
        eventsEmail={EVENTS_EMAIL}
        eduEmail={EDU_EMAIL}
        infoEmail={INFO_EMAIL}
        linktreeUrl={LINKTREE_URL}
        locale={locale}
      />
    </>
  );
}
