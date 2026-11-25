import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ClientMessages from "@/i18n/ClientMessages";
import { localeAlternates } from "@/i18n/metadata";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, BookOpen } from "@phosphor-icons/react/dist/ssr";

import Reveal from "@/components/landing/Reveal";
import FittingTheCurve from "@/components/research/FittingTheCurve";
import FeaturedPublications from "@/components/research/FeaturedPublications";
import SectionOrbits from "@/components/research/SectionOrbits";
import SupervisorRow from "@/components/research/SupervisorRow";
import HeroFacts from "@/components/research/HeroFacts";
import ProjectFinder from "@/components/research/ProjectFinder";
import {
  paperHref,
  publications,
  APPLY_PATH,
  PROJECTS_EMAIL,
  SUPERVISOR_INTEREST_FORM_URL,
} from "@/data/research";
import FormLanguageNote from "@/components/FormLanguageNote";

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "projectHub.metadata" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: localeAlternates({ locale, path: "/research" }),
  };
}

/* The subject stays English in every language: it is what the projects
   team's inbox sees, not page text. */
const PROJECTS_MAILTO = `mailto:${PROJECTS_EMAIL}?subject=${encodeURIComponent(
  "Project Hub: question",
)}`;

/* The three doors into a project. All three are normal, so all three are set
   the same way: no track is styled as the real one. Their words are under
   process.choose.routes in messages/<locale>/projectHub.json. */
const projectRoutes = ["supervisor", "open", "own"] as const;

/* Who the hub is open to, under eligibility.groups. */
const eligibility = ["students", "researchers", "policy", "unaffiliated"] as const;

function InverseLink({ href, children, external = false }: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  const className =
    "inline-flex items-center gap-3 text-label leading-6 text-white/80 underline decoration-white/35 underline-offset-4 hover:text-white focus-visible:text-white";
  const content = (
    <>
      {children}
      <ArrowRight size={16} weight="regular" aria-hidden="true" />
    </>
  );
  return external ? (
    <a href={href} className={className}>
      {content}
    </a>
  ) : (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

/* One step of the spine. The numeral is the page's own serif at the heading's
   size, so its baseline lands on the title's without a nudge, and a 1px white
   spine carries the eye from one step to the next. Same device as the landing's
   research band, because it is the same journey told at length. */
function Step({ step, id, title, children }: {
  step: string;
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <li
      id={id}
      className="relative scroll-mt-36 pb-12 before:absolute before:bottom-0 before:left-[19px] before:top-11 before:w-px before:bg-white/[0.08] last:pb-0 last:before:hidden md:pb-16"
    >
      <div className="grid grid-cols-[40px_minmax(0,1fr)] gap-x-4">
        <span aria-hidden="true" className="font-serif text-heading-sm tabular-nums text-white/40">
          {step}
        </span>
        <div className="min-w-0">
          <h3 className="font-serif text-heading-sm">{title}</h3>
          {children}
        </div>
      </div>
    </li>
  );
}

export default function ResearchPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = useTranslations("projectHub");
  const tA11y = useTranslations("common.a11y");
  return (
    <>
      {/* Hero. The claim on the left, the argument of the page drawn on the
          right: a scatter, two people fitting a line through it, and the line
          leaving the plot as a printed page. White fades into paper in the last
          5%, a seam rather than a sky. */}
      <section
        aria-labelledby="research-hero-heading"
        className="relative isolate overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(in oklab 180deg, white 0%, white 95%, #f7f5f2 100%)",
        }}
      >
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
          <div
            className="absolute -left-8 -top-20 h-[400px] w-[200px] opacity-[0.07] md:-left-4 md:-top-12 md:h-[440px] md:w-[260px] md:opacity-[0.12]"
            style={{
              backgroundImage: "url('/illustrations/hero-orbits.svg')",
              backgroundSize: "260px 440px",
              backgroundRepeat: "no-repeat",
              maskImage: "linear-gradient(to right, black 15%, transparent 100%)",
            }}
          />
          <svg
            className="absolute -bottom-10 -right-10 h-[190px] w-[190px] -scale-x-100 text-navy opacity-[0.06] md:h-[230px] md:w-[230px] md:opacity-[0.09]"
            viewBox="0 0 230 230"
            fill="none"
          >
            <g stroke="currentColor" strokeWidth="1">
              <circle cx="0" cy="230" r="85" />
              <circle cx="0" cy="230" r="119" />
              <circle cx="0" cy="230" r="153" />
            </g>
            <path d="M167 80 Q168 87 174 88 Q168 89 167 96 Q166 89 160 88 Q166 87 167 80Z" fill="currentColor" />
          </svg>
        </div>

        <div className="shell band-hero grid min-h-[60dvh] items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] xl:grid-cols-[minmax(0,700px)_minmax(0,1fr)]">
          <Reveal hero className="flex min-w-0 flex-col gap-6">
            <h1 id="research-hero-heading" className="font-serif text-display text-navy">
              {t("hero.heading")}
            </h1>
            <p className="max-w-[620px] font-sans text-body text-navy/72">
              {t("hero.intro")}
            </p>
            {/* Three ways on, in order of weight: apply (the one orange
                button), read how the hub works (an outline button, so the
                handbook is findable from the first screen), and the plain
                link down to the projects. */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4 pt-1">
              <Link href={APPLY_PATH} className="btn-accent gap-2">
                {t("actions.applyForProject")}
                <ArrowRight size={16} weight="regular" aria-hidden="true" />
              </Link>
              <Link href="/research/handbook" className="btn-outline-ink gap-2">
                <BookOpen size={18} weight="regular" aria-hidden="true" />
                {t("hero.readHandbook")}
              </Link>
              <Link
                href="#projects"
                className="inline-flex items-center gap-2 font-sans text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
              >
                {t("actions.browseProjects")}
                <ArrowRight size={16} weight="regular" aria-hidden="true" />
              </Link>
            </div>

            <ClientMessages namespaces={["projectHub.facts"]}>
              <HeroFacts />
            </ClientMessages>
          </Reveal>

          <Reveal hero delay={0.08} className="flex min-w-0 items-center justify-center lg:justify-end">
            <FittingTheCurve />
          </Reveal>
        </div>
      </section>

      {/* The projects themselves, straight after the claim: the reader came
          to find one. Every project goes through the same application form,
          so "Apply for a project" sits once beside the header instead of on
          each card. */}
      <section
        id="projects"
        aria-labelledby="projects-heading"
        className="scroll-mt-28 border-t border-navy/10 bg-cream"
      >
        <div className="shell band-section flex flex-col gap-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <div className="flex max-w-[760px] flex-col gap-4">
              <h2 id="projects-heading" className="font-serif text-heading text-navy">
                {t("projects.heading")}
              </h2>
              <p className="font-sans text-body text-navy/74">
                {t("projects.intro")}
              </p>
            </div>
            <Link href={APPLY_PATH} className="btn-accent shrink-0 gap-2 self-start lg:self-center">
              {t("actions.applyForProject")}
              <ArrowRight size={16} weight="regular" aria-hidden="true" />
            </Link>
          </div>
          {/* Both lists are here, as either can show: the tracker, or the
              hand-kept cards when it cannot be loaded. */}
          <ClientMessages
            namespaces={[
              "projectHub.finder",
              "projectHub.tracker",
              "projectHub.browser",
              "projectHub.availability",
              "common.a11y",
            ]}
          >
            <ProjectFinder />
          </ClientMessages>
        </div>
      </section>

      {/* Eligibility, on paper: this band is the terms page of a printed
          programme, so it runs on cream and stays a column plus a short list.
          Both bands are cream, so the rule between them stops at the content's
          edges rather than running the full width. */}
      <section aria-labelledby="eligibility-heading" className="bg-cream">
        <div className="shell" aria-hidden="true">
          <span className="block h-px bg-navy/10" />
        </div>
        <div className="shell band-section flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-16">
          <h2
            id="eligibility-heading"
            className="max-w-[420px] font-serif text-heading-sm text-navy lg:w-[360px] lg:shrink-0"
          >
            {t("eligibility.heading")}
          </h2>

          <div className="flex min-w-0 max-w-[720px] flex-col gap-5">
            <p className="font-sans text-body text-navy/74">
              {t("eligibility.offer")}
            </p>

            <div>
              <p className="font-sans text-body text-navy/74">
                {t("eligibility.openTo")}
              </p>
              {/* The landing's dash list rather than hairline rows: four
                  short items do not need a table, and the rules were reading
                  as a form inside a reading column. */}
              <ul role="list" className="mt-4 flex flex-col gap-2.5">
                {eligibility.map((group) => (
                  <li key={group} className="flex items-center gap-3 font-sans text-kicker-sm leading-[22px] text-navy">
                    <span className="h-px w-4 shrink-0 bg-navy/30" aria-hidden="true" />
                    {t(`eligibility.groups.${group}`)}
                  </li>
                ))}
              </ul>
            </div>

            <p className="font-sans text-body text-navy/74">
              {t("eligibility.remote")}
            </p>
            <p className="font-sans text-body text-navy/74">
              {t("eligibility.notAJob")}
            </p>
          </div>
        </div>
      </section>

      {/* The process. Inverse is earned here because the band ends in the
          page's proof: the three steps run into the papers they produced. */}
      <section id="process" aria-labelledby="process-heading" className="scroll-mt-36 bg-navy text-white">
        <div className="shell band-research">
          <Reveal className="max-w-[760px]">
            <h2 id="process-heading" className="font-serif text-heading">
              {t("process.heading")}
            </h2>
            <p className="mt-4 text-body text-white/75">
              {t("process.intro")}
            </p>
          </Reveal>

          <Reveal delay={0.05}>
          <ol role="list" aria-label={t("process.stepsLabel")} className="mt-12 md:mt-16">
            <Step step="01" id="choose" title={t("process.choose.title")}>
              <p className="mt-5 max-w-[760px] text-body text-white/75">
                {t("process.choose.intro")}
              </p>

              <ol role="list" className="mt-6 max-w-[760px]">
                {projectRoutes.map((route, i) => (
                  <li key={route} className="flex gap-3 border-t border-white/10 py-3.5">
                    <span
                      aria-hidden="true"
                      className="w-[22px] shrink-0 pt-1 font-sans text-footnote text-orange"
                    >
                      {i + 1}
                    </span>
                    <p className="min-w-0 text-body text-white/75">
                      {t.rich(`process.choose.routes.${route}`, {
                        lead: (chunks) => (
                          <span className="font-serif text-title-sm text-white">{chunks}</span>
                        ),
                      })}
                    </p>
                  </li>
                ))}
              </ol>

              <p className="mt-7 max-w-[760px] text-body text-white/75">
                {t("process.choose.criteria")}
              </p>

              <div className="mt-6">
                <InverseLink href="/research/handbook">{t("actions.readProjectHubHandbook")}</InverseLink>
              </div>
            </Step>

            <Step step="02" id="support" title={t("process.support.title")}>
              <div className="mt-5 flex max-w-[760px] flex-col gap-4">
                <p className="text-body text-white/75">
                  {t("process.support.apply")}
                </p>
                <p className="text-body text-white/75">
                  {t("process.support.relationship")}
                </p>
                <p className="text-body text-white/75">
                  {t("process.support.supervisors")}
                </p>
              </div>

              <div className="mt-6">
                <InverseLink href="#supervisors">{t("process.support.meetSupervisors")}</InverseLink>
              </div>
            </Step>

            <Step step="03" id="publish" title={t("process.publish.title")}>
              <div className="mt-5 flex max-w-[760px] flex-col gap-4">
                <p className="text-body text-white/75">
                  {t("process.publish.complete")}
                </p>
                <p className="text-body text-white/75">
                  {t("process.publish.proof")}
                </p>
              </div>

              <FeaturedPublications />

              {/* The full record. The landing and the handbook both deep-link
                  to #publications, so the id belongs on the list itself.
                  Venues and titles are the papers' own, in English. */}
              <ul
                role="list"
                id="publications"
                aria-label={t("process.publish.allPublications")}
                className="research-publications mt-10 grid scroll-mt-36 gap-3 sm:grid-cols-2 xl:grid-cols-3"
              >
                {publications.map((paper) => {
                  /* Hosted papers open in the reader on this site; any
                     paper without a PDF here still goes to its source. */
                  const chip = (
                    <>
                      <span lang="en" className="w-[118px] shrink-0 font-sans text-footnote font-medium text-orange md:w-[136px]">
                        {paper.venueShort}
                      </span>
                      <span className="min-w-0 font-serif text-kicker-sm text-white">
                        <span lang="en">{paper.chipTitle}</span>
                        {paper.reader ? (
                          <ArrowRight
                            size={14}
                            weight="regular"
                            aria-hidden="true"
                            className="ml-1 inline-block shrink-0 align-[-2px] text-white/70"
                          />
                        ) : (
                          <>
                            <ArrowUpRight
                              size={14}
                              weight="regular"
                              aria-hidden="true"
                              className="ml-1 inline-block shrink-0 align-[-2px] text-white/70"
                            />
                            <span className="sr-only"> {tA11y("opensInNewTab")}</span>
                          </>
                        )}
                      </span>
                    </>
                  );
                  return (
                    <li key={paper.link} className="flex">
                      {paper.reader ? (
                        <Link href={paperHref(paper)} className="pub-chip w-full">
                          {chip}
                        </Link>
                      ) : (
                        <a
                          href={paper.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pub-chip w-full"
                        >
                          {chip}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Step>
          </ol>
          </Reveal>
        </div>
      </section>

      {/* The people. White ground, one orbit, portraits you can click through
          to the agenda each person actually wrote. */}
      <section
        id="supervisors"
        aria-labelledby="supervisors-heading"
        className="relative isolate scroll-mt-36 overflow-hidden bg-white"
      >
        <SectionOrbits className="-left-20 top-10 h-[400px] w-[300px] md:-left-12" />
        <div className="shell band-section">
          <Reveal className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <h2 id="supervisors-heading" className="max-w-[620px] font-serif text-heading-sm text-navy">
                {t("supervisors.heading")}
              </h2>
              <p className="max-w-[720px] font-sans text-body text-navy/74">
                {t("supervisors.intro")}
              </p>
            </div>

            <SupervisorRow />

            {/* The page's one supervisor moment, placed where the reader has
                just finished checking the other supervisors. One column under a
                hairline: heading, paragraph, and the button directly under the
                sentence that argues for it. The eligibility band already runs
                the heading-left, copy-right split, and the page uses it once. */}
            <div className="flex max-w-[720px] flex-col items-start gap-5 border-t border-navy/14 pt-8">
              <h3 className="font-serif text-title text-navy">{t("supervisors.supervise.heading")}</h3>
              <p className="font-sans text-body text-navy/74">
                {t("supervisors.supervise.body")}
              </p>
              <a
                href={SUPERVISOR_INTEREST_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-ink mt-1 gap-2"
              >
                {t("actions.becomeSupervisor")}
                <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
                <span className="sr-only"> {tA11y("opensInNewTab")}</span>
              </a>
              <FormLanguageNote />
            </div>
          </Reveal>
        </div>
      </section>

      {/* The close. The claim on the left, the two ways to act on the right,
          and the handbook as a quiet footnote rather than a third button. */}
      <section id="apply" aria-labelledby="apply-heading" className="scroll-mt-36 bg-navy">
        <div className="shell band-close grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
          <div className="min-w-0">
            <h2 id="apply-heading" className="max-w-[620px] font-serif text-closing text-white">
              {t("close.heading")}
            </h2>
            <p className="mt-4 max-w-[560px] font-sans text-body text-white/78">
              {t("close.body")}
            </p>
          </div>

          <div className="flex flex-col gap-5 lg:shrink-0">
            <div className="flex flex-wrap gap-3">
              <Link href={APPLY_PATH} className="btn-accent gap-2">
                {t("actions.applyForProject")}
                <ArrowRight size={16} weight="regular" aria-hidden="true" />
              </Link>
              <a href={PROJECTS_MAILTO} className="btn-ghost-inverse">
                {t("actions.emailProjectsTeam")}
              </a>
            </div>
            <p className="max-w-[420px] font-sans text-footnote leading-[19px] text-white/60">
              {t.rich("close.handbookNote", {
                link: (chunks) => (
                  <Link
                    href="/research/handbook"
                    className="text-white/80 underline decoration-white/35 underline-offset-4 hover:text-white focus-visible:text-white"
                  >
                    {chunks}
                  </Link>
                ),
              })}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
