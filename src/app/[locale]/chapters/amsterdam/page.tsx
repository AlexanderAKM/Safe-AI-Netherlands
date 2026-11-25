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
  blueDotOutline,
} from "@/data/bluedotCourses";
import { sainAmsTeam } from "@/data/sainAmsTeam";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({
    locale,
    namespace: "chapters.amsterdam.metadata",
  });
  return {
    title: t("title"),
    description: t("description"),
    alternates: localeAlternates({ locale, path: "/chapters/amsterdam" }),
  };
}

const LUMA_CALENDAR_ID = "cal-WD5xl5IYLpY7xNm";
const LUMA_PUBLIC_URL = "https://luma.com/user/SAIN_Amsterdam";

const EVENTS_EMAIL = "eventsams@safeainetherlands.org";
const EDU_EMAIL = "eduams@safeainetherlands.org";
const INFO_EMAIL = "infoams@safeainetherlands.org";
const LINKTREE_URL = "https://linktr.ee/sainamsterdam";
const ELLIS_URL = "https://ivi.fnwi.uva.nl/ellis/";
/** A name, the same in every language. */
const ELLIS_NAME = "ELLIS Unit Amsterdam";

const team: readonly TeamMember[] = sainAmsTeam;

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

/* Alt text and captions are under amsterdam.record.prints.<id>. */
const prints: (Omit<Print, "alt" | "caption"> & { id: string })[] = [
  {
    id: "governanceGraduation",
    src: "/photos/events/amsterdam/governance-graduation.jpg",
    widths: [320, 640, 900],
    tilt: "xl:rotate-[-2deg]",
  },
  {
    id: "governanceCourse",
    src: "/photos/events/amsterdam/governance-course.jpg",
    widths: [320, 640, 900],
    tilt: "xl:rotate-[1.5deg]",
  },
  {
    id: "discussionGroup",
    src: "/photos/events/amsterdam/discussion-group.jpeg",
    widths: [320, 640, 900],
    tilt: "xl:rotate-[-1deg]",
  },
  {
    id: "chapterMeeting",
    src: "/photos/events/amsterdam/chapter-meeting.jpg",
    widths: [320, 640, 900],
    tilt: "xl:rotate-[2deg]",
  },
];

const pastEvents = pastEventsThisYear(
  lumaPastEventsAmsterdam as RawPastEvent[],
);

export default function AmsterdamPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = useTranslations("chapters.amsterdam");
  const tChapters = useTranslations("chapters");
  const tBlueDot = useTranslations("chapters.bluedot");
  const tActions = useTranslations("common.actions");
  const tA11y = useTranslations("common.a11y");

  /* Said under each course rather than once under both, because a tab is read
     on its own. */
  const courseNote = (
    <>
      {t("programs.courses.note")}
      <br />
      {tChapters.rich("courseBand.questions", {
        email: EDU_EMAIL,
        link: (chunks) => (
          <a href={`mailto:${EDU_EMAIL}`} className={LINK}>
            {chunks}
          </a>
        ),
      })}
    </>
  );

  /* The two courses behind the same disclosure tabs Utrecht uses, so a reader
     moving between chapter pages meets one device for "this chapter's courses".
     The copy is the chapter's own; the week-by-week outline is BlueDot's, shared
     with Groningen through bluedotCourses.ts. */
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
          <p>{t("programs.courses.technical.background")}</p>
        </>
      ),
      outlineTitle: tBlueDot("outlineTitle"),
      outline: blueDotOutline("technicalAiSafety", tBlueDot),
      note: courseNote,
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
          <p>{t("programs.courses.governance.background")}</p>
        </>
      ),
      outlineTitle: tBlueDot("outlineTitle"),
      outline: blueDotOutline("frontierAiGovernance", tBlueDot),
      note: courseNote,
    },
  ];

  return (
    <>
      <ChapterHero
        city="Amsterdam"
        subheading={t("hero.subheading")}
        photo="/photos/cities/amsterdam-hero.jpg"
        photoAlt={t("hero.photoAlt")}
        caption={t("hero.caption")}
        belowCta={
          <p className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-1 font-sans text-footnote text-navy/65">
            {t("hero.supportedBy")}
            <a
              href={ELLIS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center"
            >
              <img
                src="/logos/ellis.svg"
                alt={ELLIS_NAME}
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
              <span className="sr-only"> {tA11y("opensInNewTab")}</span>
            </a>
          </p>
        }
      />

      <ShowUpBand
        city="Amsterdam"
        calendarId={LUMA_CALENDAR_ID}
        calendarUrl={LUMA_PUBLIC_URL}
        eventsEmail={EVENTS_EMAIL}
      />

      <CourseBand
        city="Amsterdam"
        heading={t("programs.heading")}
        tail={
          <>
            <p className="font-sans text-body text-navy/74">
              {t("programs.discussionGroup")}
            </p>
            <p className="-mt-2 font-sans text-label text-navy/74">
              {tChapters.rich("courseBand.findDiscussionGroup", {
                city: "Amsterdam",
                link: (chunks) => (
                  <a
                    href="https://luma.com/SAIN_Amsterdam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
                  >
                    {chunks}
                    <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
                    <span className="sr-only"> {tA11y("opensInNewTab")}</span>
                  </a>
                ),
              })}
            </p>
            <p className="font-sans text-body text-navy/74">
              {t("programs.research")}
            </p>
            <Link
              href="/research"
              className="inline-flex items-center gap-2 self-start font-sans text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
            >
              {tActions("visitProjectHub")}
              <ArrowRight size={16} weight="regular" aria-hidden="true" />
            </Link>
          </>
        }
      >
        <CourseDisclosure
          courses={courses}
          label={tChapters("courseDisclosure.label")}
          newTabLabel={tA11y("opensInNewTab")}
        />
      </CourseBand>

      <TeamBand city="Amsterdam" body={t("team.body")} team={team} />

      <EvidenceBand heading={t("record.heading")} body={t("record.body")}>
        <PrintStrip
          prints={prints.map(({ id, ...print }) => ({
            ...print,
            alt: t(`record.prints.${id}.alt`),
            caption: t(`record.prints.${id}.caption`),
          }))}
          label={tChapters("printStrip.label", { city: "Amsterdam" })}
          previousLabel={tChapters("printStrip.previous")}
          nextLabel={tChapters("printStrip.next")}
        />

        <PastEvents events={pastEvents} />
      </EvidenceBand>

      <ChapterClose
        city="Amsterdam"
        eventsEmail={EVENTS_EMAIL}
        eduEmail={EDU_EMAIL}
        infoEmail={INFO_EMAIL}
        linktreeUrl={LINKTREE_URL}
      />
    </>
  );
}
