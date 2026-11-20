import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localeAlternates } from "@/i18n/metadata";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { ReactNode } from "react";

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
  blueDotOutline,
} from "@/data/bluedotCourses";
import { publications } from "@/data/research";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({
    locale,
    namespace: "chapters.groningen.metadata",
  });
  return {
    title: t("title"),
    description: t("description"),
    alternates: localeAlternates({ locale, path: "/chapters/groningen" }),
  };
}

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
  const t = useTranslations("common.a11y");
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={LINK}>
      {children}
      <span className="sr-only"> {t("opensInNewTab")}</span>
    </a>
  );
}

/* Four photographs from the archive. The archive also holds event posters;
   those are graphics rather than evidence of a room, so they stay on the
   archive page and out of the prints. Alt text and captions are under
   groningen.record.prints.<id>. */
const prints: (Omit<Print, "alt" | "caption"> & { id: string })[] = [
  {
    id: "graduationMarch2026",
    src: "/photos/events/archive/archive-04.jpeg",
    widths: [320, 640],
    tilt: "xl:rotate-[-2deg]",
  },
  {
    id: "graduationNovember2025",
    src: "/photos/events/archive/archive-08.jpeg",
    widths: [320, 640],
    tilt: "xl:rotate-[1.5deg]",
  },
  {
    id: "pubQuiz",
    src: "/photos/events/archive/archive-10.jpg",
    widths: [320, 640],
    tilt: "xl:rotate-[-1deg]",
  },
  {
    id: "introSocial",
    src: "/photos/events/archive/archive-13.jpeg",
    widths: [320, 640],
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

export default function GroningenPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = useTranslations("chapters.groningen");
  const tChapters = useTranslations("chapters");
  const tBlueDot = useTranslations("chapters.bluedot");
  const tActions = useTranslations("common.actions");
  const tA11y = useTranslations("common.a11y");

  /* The same two BlueDot courses as Amsterdam, behind the same disclosure tabs.
     The copy is the chapter's own (from its Education Lead); the governance
     course adds EU materials to BlueDot's curriculum. */
  const courses: Course[] = [
    {
      id: "technical",
      title: "Technical AI Safety",
      summary: (
        <>
          <p>{t("programs.courses.technical.intro")}</p>
          <p>
            {t.rich("programs.courses.technical.body", {
              bluedot: (chunks) => (
                <ExternalLink href={BLUEDOT_URL}>{chunks}</ExternalLink>
              ),
              course: (chunks) => (
                <ExternalLink href={TECHNICAL_AI_SAFETY_URL}>{chunks}</ExternalLink>
              ),
            })}
          </p>
        </>
      ),
      outlineTitle: tBlueDot("outlineTitle"),
      outline: blueDotOutline("technicalAiSafety", tBlueDot),
    },
    {
      id: "governance",
      title: "Frontier AI Governance",
      summary: (
        <>
          <p>{t("programs.courses.governance.intro")}</p>
          <p>
            {t.rich("programs.courses.governance.body", {
              bluedot: (chunks) => (
                <ExternalLink href={BLUEDOT_URL}>{chunks}</ExternalLink>
              ),
              course: (chunks) => (
                <ExternalLink href={FRONTIER_AI_GOVERNANCE_URL}>
                  {chunks}
                </ExternalLink>
              ),
            })}
          </p>
        </>
      ),
      outlineTitle: tBlueDot("outlineTitle"),
      outline: blueDotOutline("frontierAiGovernance", tBlueDot),
    },
  ];

  return (
    <>
      <ChapterHero
        city="Groningen"
        subheading={t("hero.subheading")}
        photo="/photos/cities/groningen-hero.jpg"
        photoAlt={t("hero.photoAlt")}
        caption={t("hero.caption")}
      />

      <ShowUpBand
        city="Groningen"
        calendarId={LUMA_CALENDAR_ID}
        calendarUrl={LUMA_PUBLIC_URL}
        eventsEmail={EVENTS_EMAIL}
      />

      <CourseBand
        city="Groningen"
        heading={t("programs.heading")}
        footnote={
          <>
            {t("programs.footnote")}{" "}
            {tChapters.rich("courseBand.questions", {
              email: EDU_EMAIL,
              link: (chunks) => (
                <a href={`mailto:${EDU_EMAIL}`} className={LINK}>
                  {chunks}
                </a>
              ),
            })}
          </>
        }
        tail={
          <p className="font-sans text-body text-navy/74">
            {t("programs.discussionGroups")}
          </p>
        }
      >
        <CourseDisclosure
          courses={courses}
          label={tChapters("courseDisclosure.label")}
          newTabLabel={tA11y("opensInNewTab")}
        />
      </CourseBand>

      <TeamBand city="Groningen" body={t("team.body")} team={team} />

      <EvidenceBand heading={t("record.heading")} body={t("record.body")}>
        <div>
          <PrintStrip
            prints={prints.map(({ id, ...print }) => ({
              ...print,
              alt: t(`record.prints.${id}.alt`),
              caption: t(`record.prints.${id}.caption`),
            }))}
            label={tChapters("printStrip.label", { city: "Groningen" })}
            previousLabel={tChapters("printStrip.previous")}
            nextLabel={tChapters("printStrip.next")}
          />
          <Link
            href="/chapters/groningen/events"
            className="btn-outline-ink mt-2"
          >
            {t("record.archive")}
          </Link>
        </div>

        <div className="max-w-[var(--container-copy-wide)]">
          <PublicationChips publications={chips} />
          <p className="mt-4">
            <Link
              href="/research"
              className="inline-flex items-center gap-2 font-sans text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
            >
              {tActions("visitProjectHub")}
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
