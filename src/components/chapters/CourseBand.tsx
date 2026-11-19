import type { ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";

import SectionOrbits from "@/components/landing/SectionOrbits";
import {
  COURSE_APPLICATION_URL,
  applicationText,
  courseApplicationFor,
  type ChapterName,
} from "@/data/courseApplications";
import { COMMUNITY_JOIN_URL } from "@/data/siteContact";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import FormLanguageNote from "@/components/FormLanguageNote";

/**
 * The chapter's course, and whether you can apply to it today.
 *
 * Every word of the application state comes out of
 * `src/data/courseApplications.ts` and its `courses.applications` messages: a
 * cohort can never read open here and closed on the landing, and a deadline is
 * edited in one file. While a cohort is closed the band carries no accent
 * button at all, because the honest next step is the community, not a form
 * that will reject you.
 *
 * `#programs` is the anchor the rest of the site already links to. It does not
 * move.
 */
export default function CourseBand({
  city,
  heading,
  openLead,
  footnote,
  children,
  tail,
}: {
  city: ChapterName;
  heading: string;
  /** First sentence of the open state, where a city names its cohort;
   *  "Applications are open." otherwise. */
  openLead?: string;
  footnote?: ReactNode;
  children: ReactNode;
  /** What keeps running between cohorts, after the course's own footnote. */
  tail?: ReactNode;
}) {
  const application = courseApplicationFor(city);
  const locale = useLocale() as Locale;
  const text = applicationText(application, useTranslations("courses.applications"), locale);
  const t = useTranslations("chapters.courseBand");
  const tActions = useTranslations("common.actions");
  const tA11y = useTranslations("common.a11y");

  return (
    <section
      id="programs"
      aria-labelledby="programs-heading"
      className="relative isolate scroll-mt-36 overflow-hidden border-t border-navy/10 bg-white"
    >
      <SectionOrbits className="-left-20 top-10 h-[400px] w-[300px] md:-left-12" />
      <div className="shell band-section">
        <div className="max-w-[var(--container-copy)]">
          <h2
            id="programs-heading"
            className="font-serif text-heading text-navy"
          >
            {heading}
          </h2>

          {application.open ? (
            <>
              <p className="mt-3 font-sans text-body text-navy/74">
                {application.rolling ? (
                  text.chapterNote ?? text.rollingNote
                ) : (
                  <>
                    {openLead ?? t("openLead")}{" "}
                    {t("deadlines", {
                      participants: text.deadlines?.participants ?? "",
                      facilitators: text.deadlines?.facilitators ?? "",
                    })}
                  </>
                )}
              </p>
              <a
                href={COURSE_APPLICATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent mt-6 gap-2"
              >
                {tActions("applyFreeCourse")}
                <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
                <span className="sr-only"> {tA11y("opensInNewTab")}</span>
              </a>
              <FormLanguageNote className="mt-2" />
            </>
          ) : (
            <p className="mt-3 font-sans text-body text-navy/74">
              {t.rich("closed", {
                closedNote: text.closedNote ?? "",
                link: (chunks) => (
                  <a
                    href={COMMUNITY_JOIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
                  >
                    {chunks}
                    <ArrowUpRight size={14} weight="regular" aria-hidden="true" />
                    <span className="sr-only"> {tA11y("opensInNewTab")}</span>
                  </a>
                ),
              })}
              <FormLanguageNote inline />
            </p>
          )}
        </div>

        <div className="mt-10 flex flex-col gap-8">{children}</div>

        {footnote ? (
          <p className="mt-8 max-w-[var(--container-copy-wide)] border-t border-navy/10 pt-4 font-sans text-footnote text-navy/65">
            {footnote}
          </p>
        ) : null}

        {tail && (
          <div className="mt-10 flex max-w-[var(--container-copy)] flex-col gap-5">
            {tail}
          </div>
        )}
      </div>
    </section>
  );
}
