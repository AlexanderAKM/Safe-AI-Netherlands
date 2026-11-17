import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

import Reveal from "@/components/landing/Reveal";
import SectionOrbits from "@/components/landing/SectionOrbits";
import ApplicationSteps from "@/components/careers/ApplicationSteps";
import OutlineRows from "@/components/careers/OutlineRows";
import RoleDisclosure from "@/components/careers/RoleDisclosure";
import {
  APPLICATION_REVIEW,
  APPLICATION_TIMELINE,
  ROLES,
  TEAM_ORDER,
  type ChapterPosting,
  type Role,
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
import { format, getDictionary } from "@/i18n";

const locale = "en";
const dictionary = getDictionary(locale);
const t = dictionary.openPositions;

/* The roles themselves (titles, missions, the chapter headings and the
   application timeline) stay in src/data/openPositions.ts in English; this
   page's own words are in en.json under openPositions. */

const INFO_EMAIL = "info@safeainetherlands.org";
const JOIN_MAILTO = `mailto:${INFO_EMAIL}?subject=${t.joinEmailSubject}`;
const EMAIL_US = format(t.emailUs, { email: INFO_EMAIL });

/* Title and description both follow the page's state, because the two states
   are answering different questions: one is a live listing of open roles, the
   other is a standing invitation. */
export const metadata: Metadata = {
  title: hasOpenPositions ? t.meta.titleOpen : t.meta.titleClosed,
  description: hasOpenPositions ? t.meta.descriptionOpen : t.meta.descriptionClosed,
};

/* What the shared form asks for (openPositions.howToApply.formFields), in the
   order the form asks it: these are the form's fields, not SAIN's roles, and
   they change when the form does. */

const count = t.count;

/* Counts in the hero are read off the data, and read as words: "Six roles are
   open right now", never "6 roles". Past twelve the digit is the honest
   fallback, and by then the sentence has other problems. */
function numberWord(n: number): string {
  return count.numbers[n] ?? String(n);
}

function plural(forms: { one: string; other: string }, n: number): string {
  return n === 1 ? forms.one : forms.other;
}

function capitalise(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function formatList(items: string[]): string {
  if (items.length < 2) return items[0] ?? "";
  return `${items.slice(0, -1).join(", ")} ${count.and} ${items[items.length - 1]}`;
}

/** Roles for a chapter, in team order, flattened to one run of rows. */
function orderedRoles(
  chapter: ChapterPosting,
): Array<{ role: Role; note?: string }> {
  const entries: Array<{ role: Role; note?: string }> = [];
  for (const posting of chapter.postings ?? []) {
    const role = ROLES[posting.roleId];
    if (!role) continue;
    entries.push({ role, note: posting.note });
  }
  return entries.sort(
    (a, b) => TEAM_ORDER.indexOf(a.role.team) - TEAM_ORDER.indexOf(b.role.team),
  );
}

/** The hero's first sentence, counted off the postings rather than typed. */
function openingSentence(): string {
  const nationalCount = openNationalPostings.length;
  const total = openChapterPostingCount + nationalCount;
  const cities = recruitingChapters.map((c) => c.chapterSlug);

  const clauses: string[] = [];
  if (openChapterPostingCount > 0 && cities.length > 0) {
    clauses.push(
      format(count.chapterClause, {
        count: numberWord(openChapterPostingCount),
        role: plural(count.role, openChapterPostingCount),
        cities: formatList(cities),
        chapter: plural(count.chapter, cities.length),
      }),
    );
  }
  if (nationalCount > 0) {
    clauses.push(
      format(count.nationalClause, {
        count: numberWord(nationalCount),
        role: plural(count.role, nationalCount),
      }),
    );
  }

  const lead = capitalise(format(plural(count.lead, total), { count: numberWord(total) }));
  const body =
    clauses.length === 2
      ? format(count.bothClauses, { chapters: clauses[0], national: clauses[1] })
      : clauses[0];

  return body ? format(count.withBody, { lead, body }) : format(count.withoutBody, { lead });
}

/** One link per unit with a section on this page: national first, then the
    chapters in the order they are declared, recruiting or not. */
function sectionLinks(): Array<{ name: string; href: string }> {
  const links: Array<{ name: string; href: string }> = [];
  if (isNationalRecruiting) {
    links.push({ name: nationalPosting.name, href: `#${nationalPosting.slug}` });
  }
  for (const chapter of chapterPositions) {
    links.push({
      name: chapter.chapterName,
      href: `#chapter-${chapter.chapterSlug.toLowerCase()}`,
    });
  }
  return links;
}

function InlineMail({ href, children }: { href: string; children: string }) {
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
  const id = `chapter-${chapter.chapterSlug.toLowerCase()}`;
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
              {chapter.heading}
            </h2>
            {chapter.closedNote ? (
              <p className="mt-4 max-w-[720px] font-sans text-body text-navy/74">
                {chapter.closedNote.beforeEmail}{" "}
                <InlineMail
                  href={`mailto:${chapter.inboxEmail}?subject=${format(t.chapter.futureEmailSubject, { chapter: chapter.chapterSlug })}`}
                >
                  {chapter.inboxEmail}
                </InlineMail>{" "}
                {chapter.closedNote.afterEmail}
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
            {chapter.heading}
          </h2>
          {chapter.blurb ? (
            <p className="mt-4 max-w-[720px] font-sans text-body text-navy/74">
              {chapter.blurb}
            </p>
          ) : null}

          <div className="mt-9 border-b border-navy/10">
            {roles.map(({ role, note }) => (
              <RoleDisclosure
                key={role.id}
                role={role}
                note={note}
                chapterSlug={chapter.chapterSlug}
                locale={locale}
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
              {t.chapter.noRoleFitsHeading}
            </h3>
            <p className="mt-3 max-w-[720px] font-sans text-body text-navy/74">
              {format(t.chapter.noRoleFitsBody, { chapter: chapter.chapterName })}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a
                href={buildApplicationUrl({ chapter: chapter.chapterSlug })}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-ink gap-2"
              >
                {format(t.chapter.applyFor, { chapter: chapter.chapterSlug })}
                <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
                <span className="sr-only"> {dictionary.common.opensInNewTab}</span>
              </a>
              <p className="font-sans text-label text-navy/65">
                {t.chapter.questionsFirst}{" "}
                <InlineMail
                  href={`mailto:${chapter.inboxEmail}?subject=${format(t.chapter.emailSubject, { chapter: chapter.chapterSlug })}`}
                >
                  {chapter.inboxEmail}
                </InlineMail>
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
              {t.standing.heading}
            </h1>
            <p className="max-w-[680px] font-sans text-body text-navy/72">
              {t.standing.body}
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <a href={JOIN_MAILTO} className="btn-accent">
                {EMAIL_US}
              </a>
              <Link href="/get-involved" className="btn-ghost">
                {dictionary.common.volunteer}
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
              {t.standing.sendHeading}
            </h2>
            <OutlineRows className="mt-6 max-w-[720px]" items={t.standing.sendItems} />
            <p className="mt-6 max-w-[720px] font-sans text-body text-navy/74">
              {t.standing.weRead}
            </p>
            <div className="mt-6">
              <a href={JOIN_MAILTO} className="btn-accent">
                {EMAIL_US}
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
              {t.standing.closeHeading}
            </h2>
            <p className="mt-4 max-w-[560px] font-sans text-body text-white/78">
              {t.standing.closeBody}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:shrink-0">
            <a href={JOIN_MAILTO} className="btn-accent">
              {EMAIL_US}
            </a>
            <Link href="/get-involved" className="btn-ghost-inverse">
              {dictionary.common.volunteer}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default function CareersPage() {
  if (!hasOpenPositions) {
    return <StandingApplication />;
  }

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
              {t.hero.heading}
            </h1>
            <p className="max-w-[680px] font-sans text-body text-navy/72">
              {openingSentence()} {APPLICATION_REVIEW.sentence}
            </p>
            <div className="pt-1">
              <a
                href={buildApplicationUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent gap-2"
              >
                {t.hero.openForm}
                <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
                <span className="sr-only"> {dictionary.common.opensInNewTab}</span>
              </a>
            </div>
            {/* The starting-team call has its own page and its own form. */}
            <p className="font-sans text-label text-navy/72">
              {t.hero.startingSomethingNew}{" "}
              <Link
                href="/new-chapters"
                className="inline-flex items-center gap-1.5 text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
              >
                {t.hero.startingTeams}
                <ArrowRight size={16} weight="regular" aria-hidden="true" />
              </Link>
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
              {t.volunteers.heading}
            </h2>
            <p className="mt-5 max-w-[760px] font-sans text-body text-navy/74">
              {t.volunteers.body}
            </p>

            {/* The wayfinding that used to be a band of its own: one row of
                links to each unit's section, open units first. */}
            <nav aria-label={t.volunteers.jumpLabel} className="mt-8">
              <ul role="list" className="flex flex-wrap gap-x-7 gap-y-3">
                {sectionLinks().map((link) => (
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
              {t.howToApply.heading}
            </h2>
            <p className="mt-4 max-w-[760px] font-sans text-body text-navy/74">
              {t.howToApply.body}
              {/* The sentence naming where an application lands is out until
                  the form's submission trigger is wired to info@ and the
                  chapter inbox. See the setup notes in openPositions.ts. */}
              {isNationalRecruiting ? ` ${t.howToApply.nationalForms}` : ""}
            </p>

            <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <h3 className="font-serif text-title-sm text-navy">
                  {t.howToApply.formAsksHeading}
                </h3>
                <OutlineRows className="mt-4" items={t.howToApply.formFields} rules={false} />
              </div>
              <div>
                <h3 className="mb-6 font-serif text-title-sm text-navy">
                  {t.howToApply.afterHeading}
                </h3>
                <ApplicationSteps steps={APPLICATION_TIMELINE} />
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={buildApplicationUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent gap-2"
              >
                {t.hero.openForm}
                <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
                <span className="sr-only"> {dictionary.common.opensInNewTab}</span>
              </a>
              {/* /courses and /get-involved offer /contact under this same
                  label as the softer second step; one label per destination. */}
              <Link href="/contact" className="btn-outline-ink">
                {t.howToApply.getInTouch}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* B7. The paid role. One substantial row on white, not a band of peers:
          the badge and the salary are the honesty signals, and they get the
          same weight the volunteer hours get above. */}
      <section aria-label={t.rolesLabel} className="border-t border-navy/10 bg-cream">
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
                {nationalPosting.heading}
              </h2>
              <p className="mt-4 max-w-[760px] font-sans text-body text-navy/74">
                {nationalPosting.blurb}
              </p>

              <div className="mt-9 border-b border-navy/10">
                {openNationalPostings.map(({ roleId, note, applyUrl }) => {
                  const role = ROLES[roleId];
                  if (!role) return null;
                  return (
                    <RoleDisclosure
                      key={role.id}
                      role={role}
                      note={note}
                      applyUrl={applyUrl}
                      locale={locale}
                    />
                  );
                })}
              </div>

              <p className="mt-6 font-sans text-label text-navy/65">
                {t.national.questions}{" "}
                <InlineMail
                  href={`mailto:${nationalPosting.inboxEmail}?subject=${t.national.emailSubject}`}
                >
                  {nationalPosting.inboxEmail}
                </InlineMail>
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
              {t.close.heading}
            </h2>
            <p className="mt-4 max-w-[560px] font-sans text-body text-white/78">
              {t.close.body}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:shrink-0">
            <a
              href={buildApplicationUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent gap-2"
            >
              {t.hero.openForm}
              <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
              <span className="sr-only"> {dictionary.common.opensInNewTab}</span>
            </a>
            <Link href="/contact" className="btn-ghost-inverse">
              {t.howToApply.getInTouch}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
