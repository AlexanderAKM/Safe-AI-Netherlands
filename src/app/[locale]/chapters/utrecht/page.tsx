import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localeAlternates } from "@/i18n/metadata";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

import ChapterClose from "@/components/chapters/ChapterClose";
import ChapterHero from "@/components/chapters/ChapterHero";
import CourseBand from "@/components/chapters/CourseBand";
import CourseDisclosure, {
  type Course,
  type OutlinePath,
} from "@/components/chapters/CourseDisclosure";
import EvidenceBand from "@/components/chapters/EvidenceBand";
import PastEvents, {
  pastEventsThisYear,
  type RawPastEvent,
} from "@/components/chapters/PastEvents";
import PrintStrip, { type Print } from "@/components/chapters/PrintStrip";
import PublicationChips, {
  type Publication,
} from "@/components/chapters/PublicationChips";
import ShowUpBand from "@/components/chapters/ShowUpBand";
import TeamBand, { type TeamMember } from "@/components/chapters/TeamBand";
import lumaPastEventsUtrecht from "@/data/lumaPastEventsUtrecht.json";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({
    locale,
    namespace: "chapters.utrecht.metadata",
  });
  return {
    title: t("title"),
    description: t("description"),
    alternates: localeAlternates({ locale, path: "/chapters/utrecht" }),
  };
}

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
/* The autumn 2026 Technical AI Safety curriculum, week by week. The plain
   /d/<id>/ link, so the doc opens in whatever view suits the reader's
   device rather than the mobile one it was shared as. */
const TECHNICAL_CURRICULUM_URL =
  "https://docs.google.com/document/d/1ycd9NJtLUWyyIQW9g6HnKEwz96iGelOTQR_QXxJsGB4/";

/* Role titles are under team.roles in the messages. */
const team: readonly TeamMember[] = [
  {
    name: "Riccardo Campanella",
    role: "director",
    linkedin: "https://www.linkedin.com/in/riccardo-campanella/",
  },
  {
    name: "Luca Dughera",
    role: "eventsLead",
    linkedin: "https://www.linkedin.com/in/luca-dughera/",
  },
  {
    name: "Asya Korshunova",
    role: "educationLead",
    linkedin:
      "https://www.linkedin.com/in/anastasiia-korshunova-resilient-changemaking/",
  },
  {
    name: "Elena Clacova",
    role: "communicationsLead",
    linkedin: "https://www.linkedin.com/in/elenaclacova/",
  },
  {
    name: "Ying-Kai Dang",
    role: "researchOps",
    linkedin: "https://www.linkedin.com/in/ying-kai-dang/",
  },
  {
    name: "Matthijs Vossen",
    role: "researchOps",
    linkedin: "https://www.linkedin.com/in/matthijsvossen/",
  },
  {
    name: "Carolien Tran",
    role: "discussionCoordinator",
    linkedin: "https://www.linkedin.com/in/carolientran/",
  },
  {
    name: "Prerna Chaudhary",
    role: "discussionFacilitator",
    linkedin: "https://www.linkedin.com/in/prerna-chaudhary/",
  },
  {
    name: "Cem Kaya",
    role: "facilitator",
    linkedin: "https://www.linkedin.com/in/cem-kaya-om8/",
  },
  {
    name: "Dimitra Tsolka",
    role: "facilitator",
    linkedin: "https://www.linkedin.com/in/dimitra-tsolka/",
  },
  {
    name: "Chetlur Vasundhara",
    role: "facilitator",
    linkedin: "https://www.linkedin.com/in/chetlur-vasundhara-a0a7a3288/",
  },
  {
    name: "Giovanni Varricchione",
    role: "facilitator",
    linkedin: "https://www.linkedin.com/in/giovannivarr/",
  },
  {
    name: "Milan Schouten",
    role: "facilitator",
    linkedin: "https://www.linkedin.com/in/milan-schouten/",
  },
  {
    name: "Qasim Sajjad",
    role: "facilitator",
    linkedin: "https://www.linkedin.com/in/rqasimsajjad/",
  },
  {
    name: "Nityaa Kalra",
    role: "facilitator",
    linkedin: "https://www.linkedin.com/in/nityaakalra/",
  },
  {
    name: "Jaffar Hussain",
    role: "advisor",
    linkedin: "https://www.linkedin.com/in/jaffar-hussain-3414383/",
  },
];

/* Alt text and captions are under utrecht.record.prints.<id>. */
const prints: (Omit<Print, "alt" | "caption"> & { id: string })[] = [
  {
    id: "graduation",
    src: "/photos/events/utrecht/aisfundamentals-graduation-ceremony.jpeg",
    widths: [320, 640, 900],
    tilt: "xl:rotate-[-2deg]",
  },
  {
    id: "win4AISafety",
    src: "/photos/events/utrecht/win4AISafety_congrats_the_winners.jpg",
    widths: [320, 640, 900],
    tilt: "xl:rotate-[1.5deg]",
  },
  {
    id: "europe2031",
    src: "/photos/events/utrecht/discussion-eu2031.jpeg",
    widths: [320, 640],
    tilt: "xl:rotate-[-1deg]",
  },
  {
    id: "technicalWeek2",
    src: "/photos/events/utrecht/technical-week-2.jpeg",
    widths: [320, 640, 900],
    tilt: "xl:rotate-[2deg]",
  },
];

const pastEvents = pastEventsThisYear(
  lumaPastEventsUtrecht as RawPastEvent[],
);

/* The paper as published, in English in every language. */
const papers: Publication[] = [
  {
    venue: "arXiv",
    title: "Are LLM Belief Updates Consistent with Bayes' Theorem?",
    url: "https://arxiv.org/abs/2507.17951",
    readLabel: true,
  },
];

export default function UtrechtPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = useTranslations("chapters.utrecht");
  const tChapters = useTranslations("chapters");
  const tActions = useTranslations("common.actions");
  const tA11y = useTranslations("common.a11y");

  /* One session of a course: its title, its session line (date, time, room)
     and what it covers, under utrecht.programs.courses.<course>.sessions. A
     session without a `meta` message prints as a plain theme. */
  const session = (key: string): OutlinePath => {
    const path = `programs.courses.${key}`;
    return {
      title: t(`${path}.title`),
      meta: t.has(`${path}.meta`) ? t(`${path}.meta`) : undefined,
      detail: t(`${path}.detail`),
    };
  };

  const courses: Course[] = [
    {
      id: "fundamentals",
      title: "AI Safety Fundamentals",
      summary: t("programs.courses.fundamentals.summary"),
      /* The autumn 2026 cohort's calendar, session by session, as the chapter
         published it (upstream #54). The dates and rooms are text in both
         languages' messages: update them with each cohort, or drop the meta
         lines back to plain themes between cohorts. */
      outlineTitle: t("programs.outlineTitle"),
      outline: [
        session("fundamentals.sessions.introduction"),
        session("fundamentals.sessions.risks"),
        session("fundamentals.sessions.difficulty"),
        {
          title: t("programs.courses.fundamentals.sessions.paths.title"),
          detail: t("programs.courses.fundamentals.sessions.paths.detail"),
          paths: [
            session("fundamentals.sessions.paths.technical"),
            session("fundamentals.sessions.paths.governance"),
          ],
        },
      ],
    },
    {
      id: "technical",
      title: "Technical AI Safety",
      summary: t("programs.courses.technical.summary"),
      outlineTitle: t("programs.outlineTitle"),
      outline: [
        session("technical.sessions.evaluationsIntro"),
        session("technical.sessions.evaluationsInPractice"),
        session("technical.sessions.embodied"),
        session("technical.sessions.agents"),
      ],
      curriculum: {
        label: t("programs.courses.technical.curriculum"),
        href: TECHNICAL_CURRICULUM_URL,
      },
    },
    {
      id: "governance",
      title: "AI Governance",
      summary: t("programs.courses.governance.summary"),
      outlineTitle: t("programs.outlineTitle"),
      outline: [
        session("governance.sessions.introduction"),
        session("governance.sessions.geopolitics"),
        session("governance.sessions.policymakerTools"),
        session("governance.sessions.europe"),
      ],
    },
  ];

  return (
    <>
      <ChapterHero
        city="Utrecht"
        subheading={t("hero.subheading")}
        photo="/photos/cities/utrecht-hero.jpg"
        photoAlt={t("hero.photoAlt")}
        caption={t("hero.caption")}
      />

      <ShowUpBand
        city="Utrecht"
        calendarId={LUMA_CALENDAR_ID}
        calendarUrl={LUMA_PUBLIC_URL}
        eventsEmail={EVENTS_EMAIL}
      />

      <CourseBand
        city="Utrecht"
        heading={t("programs.heading")}
        openLead={t("programs.openLead")}
        footnote={
          <>
            {t("programs.footnote")}{" "}
            {tChapters.rich("courseBand.questions", {
              email: EDU_EMAIL,
              link: (chunks) => (
                <a
                  href={`mailto:${EDU_EMAIL}`}
                  className="underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
                >
                  {chunks}
                </a>
              ),
            })}
          </>
        }
        tail={
          <>
            <p className="font-sans text-body text-navy/74">
              {t("programs.discussionGroups")}
            </p>
            <p className="-mt-2 font-sans text-label text-navy/74">
              {tChapters.rich("courseBand.findDiscussionGroup", {
                city: "Utrecht",
                link: (chunks) => (
                  <a
                    href={LUMA_PUBLIC_URL}
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

      <TeamBand city="Utrecht" body={t("team.body")} team={team} />

      <EvidenceBand heading={t("record.heading")} body={t("record.body")}>
        <div>
          <PrintStrip
            prints={prints.map(({ id, ...print }) => ({
              ...print,
              alt: t(`record.prints.${id}.alt`),
              caption: t(`record.prints.${id}.caption`),
            }))}
            label={tChapters("printStrip.label", { city: "Utrecht" })}
            previousLabel={tChapters("printStrip.previous")}
            nextLabel={tChapters("printStrip.next")}
          />
          <p className="font-sans text-footnote text-navy/65 xl:mt-2">
            <a
              href={DEVPOST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
            >
              {t("record.devpost")}
              <ArrowUpRight size={14} weight="regular" aria-hidden="true" />
              <span className="sr-only"> {tA11y("opensInNewTab")}</span>
            </a>
          </p>
        </div>

        <PastEvents
          events={pastEvents}
          recapsUrl={LINKEDIN_POSTS_URL}
          recapsLabel={t("record.recaps")}
        />

        <div className="max-w-[var(--container-copy-wide)]">
          <PublicationChips publications={papers} />
          <p className="mt-3 font-sans text-footnote text-navy/65">
            {t("record.paperNote")}
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
