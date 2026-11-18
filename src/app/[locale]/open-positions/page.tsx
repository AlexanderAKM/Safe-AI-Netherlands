import type { Metadata } from "next";
import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { formatList } from "@/i18n/format";
import { localeAlternates } from "@/i18n/metadata";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

import Reveal from "@/components/landing/Reveal";
import SectionOrbits from "@/components/landing/SectionOrbits";
import ApplicationSteps from "@/components/careers/ApplicationSteps";
import OutlineRows from "@/components/careers/OutlineRows";
import RoleDisclosure from "@/components/careers/RoleDisclosure";
import {
  APPLICATION_TIMELINE,
  ROLES,
  TEAM_ORDER,
  type ChapterPosting,
  type Role,
  type TimelineStep,
  buildApplicationUrl,
  chapterPositions,
  hasOpenPositions,
  isChapterRecruiting,
  isNationalRecruiting,
  nationalPosting,
  openChapterPostingCount,
  openNationalPostings,
  recruitingChapters,
} from "@/data/openPositions";

const INFO_EMAIL = "info@safeainetherlands.org";
const JOIN_MAILTO = `mailto:${INFO_EMAIL}?subject=Joining SAIN`;

/* Title and description both follow the page's state, because the two states
   are answering different questions: one is a live listing of open roles, the
   other is a standing invitation. */
export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({
    locale,
    namespace: "openPositions.metadata",
  });
  return {
    title: hasOpenPositions ? t("title") : t("standingTitle"),
    description: hasOpenPositions
      ? t("description")
      : t("standingDescription"),
    alternates: localeAlternates({ locale, path: "/open-positions" }),
  };
}

/** Roles for a chapter, in team order, flattened to one run of rows. */
function orderedRoles(chapter: ChapterPosting): Role[] {
  const roles: Role[] = [];
  for (const posting of chapter.postings ?? []) {
    const role = ROLES[posting.roleId];
    if (!role) continue;
    roles.push(role);
  }
  return roles.sort(
    (a, b) => TEAM_ORDER.indexOf(a.team) - TEAM_ORDER.indexOf(b.team),
  );
}

/* The chapter's key in the messages and its section's anchor. */
function chapterKey(chapter: ChapterPosting): string {
  return chapter.chapterSlug.toLowerCase();
}

/** The hero's first sentence, counted off the postings rather than typed.
    The counts read as words ("Six roles are open right now", never "6
    roles") up to twelve, and as digits past it: the messages spell them. */
function OpeningSentence({ locale }: { locale: Locale }) {
  const t = useTranslations("openPositions.hero.count");
  const nationalCount = openNationalPostings.length;
  const total = openChapterPostingCount + nationalCount;
  const cities = recruitingChapters.map((c) => c.chapterSlug);

  const clauses: string[] = [];
  if (openChapterPostingCount > 0 && cities.length > 0) {
    clauses.push(
      t("chapters", {
        count: openChapterPostingCount,
        cities: formatList(cities, locale),
        cityCount: cities.length,
      }),
    );
  }
  if (nationalCount > 0) {
    clauses.push(t("national", { count: nationalCount }));
  }

  const lead = t("lead", { count: total });
  const body =
    clauses.length === 2
      ? t("both", { chapters: clauses[0], national: clauses[1] })
      : clauses[0];

  return <>{body ? t("sentence", { lead, body }) : t("leadOnly", { lead })}</>;
}

/** One link per unit with a section on this page: national first, then the
    chapters in the order they are declared, recruiting or not. */
function sectionLinks(nationalName: string): Array<{ name: string; href: string }> {
  const links: Array<{ name: string; href: string }> = [];
  if (isNationalRecruiting) {
    links.push({ name: nationalName, href: `#${nationalPosting.slug}` });
  }
  for (const chapter of chapterPositions) {
    links.push({
      name: chapter.chapterName,
      href: `#chapter-${chapterKey(chapter)}`,
    });
  }
  return links;
}

function InlineMail({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="font-sans text-label text-navy underline decoration-navy/25 underline-offset-4 transition-colors hover:decoration-navy focus-visible:decoration-navy"
    >
      {children}
    </a>
  );
}

/* ---------------------------------------------------------------------------
   B4 / B5 / B6. One section per chapter, rendered from the same data. A
   chapter that is recruiting gets its roles on career rows; a chapter that is
   full gets one line and its inbox. Closed is a fact, not a section.
--------------------------------------------------------------------------- */
function ChapterSection({ chapter }: { chapter: ChapterPosting }) {
  const t = useTranslations("openPositions.chapterSection");
  const tChapter = useTranslations(`openPositions.chapters.${chapterKey(chapter)}`);
  const tA11y = useTranslations("common.a11y");
  const id = `chapter-${chapterKey(chapter)}`;
  const headingId = `${id}-heading`;
  const recruiting = isChapterRecruiting(chapter.chapterSlug);

  if (!recruiting) {
    return (
      <div id={id} aria-labelledby={headingId} className="scroll-mt-36">
        <div className="shell">
          <div className="border-t border-navy/14" />
        </div>
        <div className="shell band-index">
          <Reveal>
            <h2
              id={headingId}
              className="font-serif text-heading-sm text-navy"
            >
              {tChapter("heading")}
            </h2>
            {tChapter.has("closedNote") ? (
              <p className="mt-4 max-w-[720px] font-sans text-body text-navy/74">
                {tChapter.rich("closedNote", {
                  email: chapter.inboxEmail,
                  mail: (chunks) => (
                    <InlineMail
                      href={`mailto:${chapter.inboxEmail}?subject=Future openings at SAIN ${chapter.chapterSlug}`}
                    >
                      {chunks}
                    </InlineMail>
                  ),
                })}
              </p>
            ) : null}
          </Reveal>
        </div>
      </div>
    );
  }

  const roles = orderedRoles(chapter);

  return (
    <div id={id} aria-labelledby={headingId} className="scroll-mt-36">
      <div className="shell">
        <div className="border-t border-navy/14" />
      </div>
      <div className="shell band-section">
        <Reveal>
          <h2 id={headingId} className="font-serif text-heading text-navy">
            {tChapter("heading")}
          </h2>
          {tChapter.has("blurb") ? (
            <p className="mt-4 max-w-[720px] font-sans text-body text-navy/74">
              {tChapter("blurb")}
            </p>
          ) : null}

          <div className="mt-9 border-b border-navy/10">
            {roles.map((role) => (
              <RoleDisclosure
                key={role.id}
                role={role}
                note={
                  tChapter.has(`notes.${role.id}`)
                    ? tChapter(`notes.${role.id}`)
                    : undefined
                }
                chapterSlug={chapter.chapterSlug}
              />
            ))}
          </div>

          {/* The door for everyone the list did not describe, and the chapter's
              own inbox beside it. One label per destination: this button and
              the per-role buttons above open the same form. Outline ink here,
              so the accent fill stays with "apply for this specific role" and
              the three shared-form asks. */}
          <div className="mt-10">
            <h3 className="font-serif text-title-sm text-navy">
              {t("anywayHeading")}
            </h3>
            <p className="mt-3 max-w-[720px] font-sans text-body text-navy/74">
              {t("anywayBody", { chapter: chapter.chapterName })}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a
                href={buildApplicationUrl({ chapter: chapter.chapterSlug })}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-ink gap-2"
              >
                {t("applyFor", { city: chapter.chapterSlug })}
                <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
                <span className="sr-only"> {tA11y("opensInNewTab")}</span>
              </a>
              <p className="font-sans text-label text-navy/65">
                {t.rich("questionsFirst", {
                  email: chapter.inboxEmail,
                  mail: (chunks) => (
                    <InlineMail
                      href={`mailto:${chapter.inboxEmail}?subject=Open positions ${chapter.chapterSlug}`}
                    >
                      {chunks}
                    </InlineMail>
                  ),
                })}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Mode A. Nothing is listed, and the page is a door left open: three bands and
   the shell, nothing more.
--------------------------------------------------------------------------- */
function StandingApplication() {
  const t = useTranslations("openPositions");
  const tActions = useTranslations("common.actions");
  const email = t("actions.email", { email: INFO_EMAIL });
  return (
    <>
      <section
        aria-labelledby="careers-heading"
        className="relative isolate overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(in oklab 180deg, white 0%, white 95%, #f7f5f2 100%)",
        }}
      >
        <SectionOrbits className="-left-24 top-0 h-[420px] w-[320px] md:-left-14" />
        <div className="shell band-hero">
          <Reveal hero className="flex flex-col gap-6">
            <h1
              id="careers-heading"
              className="max-w-[760px] font-serif text-display text-navy"
            >
              {t("standing.heading")}
            </h1>
            <p className="max-w-[680px] font-sans text-body text-navy/72">
              {t("standing.intro")}
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <a href={JOIN_MAILTO} className="btn-accent">
                {email}
              </a>
              <Link href="/get-involved" className="btn-ghost">
                {tActions("volunteer")}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="standing-apply-heading"
        className="border-t border-navy/10 bg-cream"
      >
        <div className="shell band-index">
          <Reveal>
            <h2
              id="standing-apply-heading"
              className="font-serif text-heading-sm text-navy"
            >
              {t("standing.sendHeading")}
            </h2>
            <OutlineRows
              className="mt-6 max-w-[720px]"
              items={t.raw("standing.sendItems") as string[]}
            />
            <p className="mt-6 max-w-[720px] font-sans text-body text-navy/74">
              {t("standing.reply")}
            </p>
            <div className="mt-6">
              <a href={JOIN_MAILTO} className="btn-accent">
                {email}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="standing-close-heading" className="bg-navy">
        <div className="shell band-close grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
          <div className="min-w-0">
            <h2
              id="standing-close-heading"
              className="max-w-[620px] font-serif text-closing text-white"
            >
              {t("standing.closeHeading")}
            </h2>
            <p className="mt-4 max-w-[560px] font-sans text-body text-white/78">
              {t("standing.closeBody")}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:shrink-0">
            <a href={JOIN_MAILTO} className="btn-accent">
              {email}
            </a>
            <Link href="/get-involved" className="btn-ghost-inverse">
              {tActions("volunteer")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default function CareersPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = useTranslations("openPositions");
  const tA11y = useTranslations("common.a11y");
  if (!hasOpenPositions) {
    return <StandingApplication />;
  }

  const timeline: TimelineStep[] = APPLICATION_TIMELINE.map((step) => ({
    label: t(`howToApply.steps.${step}.label`),
    detail: t(`howToApply.steps.${step}.detail`),
  }));

  return (
    <>
      {/* B1. The click paid off: the claim, then the count, then the form. */}
      <section
        aria-labelledby="careers-heading"
        className="relative isolate overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(in oklab 180deg, white 0%, white 95%, #f7f5f2 100%)",
        }}
      >
        <SectionOrbits className="-left-24 top-0 h-[420px] w-[320px] md:-left-14" />
        <div className="shell band-hero">
          <Reveal hero className="flex flex-col gap-6">
            <h1
              id="careers-heading"
              className="font-serif text-display text-navy"
            >
              {t("hero.heading")}
            </h1>
            <p className="max-w-[680px] font-sans text-body text-navy/72">
              <OpeningSentence locale={locale} />{" "}
              {t("applicationReview.sentence")}
            </p>
            <div className="pt-1">
              <a
                href={buildApplicationUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent gap-2"
              >
                {t("actions.openForm")}
                <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
                <span className="sr-only"> {tA11y("opensInNewTab")}</span>
              </a>
            </div>
            {/* The starting-team call has its own page and its own form. */}
            <p className="font-sans text-label text-navy/72">
              {t.rich("hero.startingTeams", {
                link: (chunks) => (
                  <Link
                    href="/new-chapters"
                    className="inline-flex items-center gap-1.5 text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
                  >
                    {chunks}
                    <ArrowRight size={16} weight="regular" aria-hidden="true" />
                  </Link>
                ),
              })}
            </p>
          </Reveal>
        </div>
      </section>

      {/* B3. The page's honesty hinge: what the unpaid ask actually is, and
          what it is worth. Type carries it; no illustration, no box. */}
      <section
        aria-labelledby="volunteer-heading"
        className="relative isolate overflow-hidden border-t border-navy/10 bg-white"
      >
        <SectionOrbits className="-left-20 -bottom-24 h-[440px] w-[330px] rotate-[-18deg] md:-left-12" />
        <div className="shell band-community">
          <Reveal>
            <h2
              id="volunteer-heading"
              className="max-w-[620px] font-serif text-heading-sm text-navy"
            >
              {t("volunteer.heading")}
            </h2>
            <p className="mt-5 max-w-[760px] font-sans text-body text-navy/74">
              {t("volunteer.body")}
            </p>

            {/* The wayfinding that used to be a band of its own: one row of
                links to each unit's section, open units first. */}
            <nav aria-label={t("volunteer.jumpLabel")} className="mt-8">
              <ul role="list" className="flex flex-wrap gap-x-7 gap-y-3">
                {sectionLinks(t("national.name")).map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="inline-flex items-center gap-2 font-sans text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
                    >
                      {link.name}
                      <ArrowRight size={16} weight="regular" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>
        </div>
      </section>

      {/* B8. What you send, and what happens then. The checklist takes the
          course outline row; the stages take the stepped journey. */}
      <section
        id="how-to-apply"
        aria-labelledby="how-to-apply-heading"
        className="scroll-mt-36 bg-white"
      >
        <div className="shell">
          <div className="border-t border-navy/14" />
        </div>
        <div className="shell band-section">
          <Reveal>
            <h2
              id="how-to-apply-heading"
              className="max-w-[620px] font-serif text-heading text-navy"
            >
              {t("howToApply.heading")}
            </h2>
            <p className="mt-4 max-w-[760px] font-sans text-body text-navy/74">
              {t("howToApply.body")}
              {/* The sentence naming where an application lands is out until
                  the form's submission trigger is wired to info@ and the
                  chapter inbox. See the setup notes in openPositions.ts. */}
              {isNationalRecruiting ? ` ${t("howToApply.nationalForms")}` : ""}
            </p>

            <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <h3 className="font-serif text-title-sm text-navy">
                  {t("howToApply.formHeading")}
                </h3>
                {/* What the shared form asks for, in the order the form asks
                    it: the form's fields, not SAIN's roles, so they change
                    when the form does. */}
                <OutlineRows
                  className="mt-4"
                  items={t.raw("howToApply.formFields") as string[]}
                  rules={false}
                />
              </div>
              <div>
                <h3 className="mb-6 font-serif text-title-sm text-navy">
                  {t("howToApply.stepsHeading")}
                </h3>
                <ApplicationSteps steps={timeline} />
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={buildApplicationUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent gap-2"
              >
                {t("actions.openForm")}
                <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
                <span className="sr-only"> {tA11y("opensInNewTab")}</span>
              </a>
              {/* /courses and /get-involved offer /contact under this same
                  label as the softer second step; one label per destination. */}
              <Link href="/contact" className="btn-outline-ink">
                {t("actions.contactFirst")}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* B7. The paid role. One substantial row on white, not a band of peers:
          the badge and the salary are the honesty signals, and they get the
          same weight the volunteer hours get above. */}
      <section aria-label={t("listing.label")} className="border-t border-navy/10 bg-cream">
      {isNationalRecruiting ? (
        <div
          id={nationalPosting.slug}
          aria-labelledby="national-heading"
          className="scroll-mt-36"
        >
          <div className="shell band-section">
            <Reveal>
              <h2
                id="national-heading"
                className="max-w-[620px] font-serif text-heading text-navy"
              >
                {t("national.heading")}
              </h2>
              <p className="mt-4 max-w-[760px] font-sans text-body text-navy/74">
                {t("national.blurb")}
              </p>

              <div className="mt-9 border-b border-navy/10">
                {openNationalPostings.map(({ roleId, applyUrl }) => {
                  const role = ROLES[roleId];
                  if (!role) return null;
                  return (
                    <RoleDisclosure
                      key={role.id}
                      role={role}
                      note={
                        t.has(`national.notes.${role.id}`)
                          ? t(`national.notes.${role.id}`)
                          : undefined
                      }
                      applyUrl={applyUrl}
                    />
                  );
                })}
              </div>

              <p className="mt-6 font-sans text-label text-navy/65">
                {t.rich("national.questions", {
                  email: nationalPosting.inboxEmail,
                  mail: (chunks) => (
                    <InlineMail
                      href={`mailto:${nationalPosting.inboxEmail}?subject=National open positions at SAIN`}
                    >
                      {chunks}
                    </InlineMail>
                  ),
                })}
              </p>
            </Reveal>
          </div>
        </div>
      ) : null}
      {/* The chapters, in the order they are declared, each behind a
          shell-width hairline so the listing reads as one schedule. */}
      {chapterPositions.map((chapter) => (
        <ChapterSection key={chapter.chapterSlug} chapter={chapter} />
      ))}
      </section>

      {/* B9. The close: the claim on the left, the two ways to act on the
          right, and nothing else in the band. */}
      <section aria-labelledby="careers-close-heading" className="bg-navy">
        <div className="shell band-close grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
          <div className="min-w-0">
            <h2
              id="careers-close-heading"
              className="max-w-[620px] font-serif text-closing text-white"
            >
              {t("close.heading")}
            </h2>
            <p className="mt-4 max-w-[560px] font-sans text-body text-white/78">
              {t("close.body")}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:shrink-0">
            <a
              href={buildApplicationUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent gap-2"
            >
              {t("actions.openForm")}
              <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
              <span className="sr-only"> {tA11y("opensInNewTab")}</span>
            </a>
            <Link href="/contact" className="btn-ghost-inverse">
              {t("actions.contactFirst")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
