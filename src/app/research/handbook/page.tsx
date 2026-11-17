import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";

import HandbookToc, { type TocItem } from "@/components/handbook/HandbookToc";
import Reveal from "@/components/landing/Reveal";
import {
  Bullets,
  Callout,
  InLink,
  NumberedSteps,
  OutLink,
  OutlineList,
  P,
  Rail,
  SubTitle,
  Turn,
} from "@/components/handbook/prose";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import {
  APPLY_PATH,
  PROJECTS_EMAIL,
  SUPERVISOR_INTEREST_FORM_URL,
} from "@/data/research";
import { getDictionary, rich } from "@/i18n";

const locale = "en";
const dictionary = getDictionary(locale);
const t = dictionary.handbook;

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: { canonical: "/research/handbook" },
};

/* The handbook is a document, not a marketing page.

   One reading column at --container-copy, white ground, hairlines for
   structure, no photo bands and no orbit ornament competing with the text. The
   only two grounds that are not white are the cream imprint band at the top,
   which is where a printed programme carries its version and its authors, and
   the one inverse close, which the page has earned because it ends in a real
   action.

   The source is the Project Hub Handbook v3 (Google Doc, 14 October 2026),
   which replaces v1.0 (docs/research_hub_handbook.md). This page is the same
   policy reordered into the reader's journey: every rule, number, form and
   deadline appears here once, which is why the cross-references below are
   links rather than repetitions. Where v3 was still under discussion (the
   societal topics, how often matching rounds run, the two-week project plan,
   the new single form), the page keeps what v1.0 said or leaves it out.

   The words are in en.json under handbook. Inside them, <s1>, <s3> and <s4>
   are the links to sections 1, 3 and 4, the other tags are the outside links
   named in TAGS below, and {email} is the projects inbox. */

const ONBOARDING_FORM_URL = "https://sainonboard.fillout.com/new";
const DISCORD_URL = "https://discord.gg/MYQcfWfgzB";
/* Responder paths, not editor paths. The source document recorded these two
   forms by their document ids, which Google resolves to the editor: a
   participant without edit rights lands on "You need permission", and the
   page's headline weekly obligation stops working. /viewform is the path a
   respondent gets. Both still need one signed-out check by the team, and if
   either form is not shared with responders the callout should route through
   projects@safeainetherlands.org instead of linking a form that 403s. */
const WEEKLY_CHECKIN_URL =
  "https://docs.google.com/forms/d/1Uu4JrMh9j6iNa4seeIyqPnkCtikFXPgT8-pUPnwzVVE/viewform";
const BIWEEKLY_CHECKIN_URL =
  "https://docs.google.com/forms/d/1bBQ8jstIOWAFzOuskhLMv9lnGvcU87ZTtSSKo8mni9o/viewform";
const SUBSTACK_URL = "https://safeainetherlands.substack.com/";
/* The archive is the publications list on /research, so this stays on the
   site: an internal route and a real element id, not a text fragment that no
   longer matches and sends a reader off a preview build to production. */
const PROJECT_ARCHIVE_URL = "/research#publications";

/* The handbook follows the life of a project, so the contents does too. These
   ids are the page's stable deep links; the sticky rail at xl reads the same
   list. */
const contents: TocItem[] = (Object.keys(t.contents) as (keyof typeof t.contents)[]).map(
  (id) => ({ id, title: t.contents[id] }),
);

/** The projects inbox, set the way every inline address on this page is. */
function ProjectsMail() {
  return (
    <a
      href={`mailto:${PROJECTS_EMAIL}`}
      className="text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
    >
      {PROJECTS_EMAIL}
    </a>
  );
}

function Out({ href, children }: { href: string; children: ReactNode }) {
  return (
    <OutLink href={href} newTab={dictionary.common.opensInNewTab}>
      {children}
    </OutLink>
  );
}

/* What each tag in the handbook's words links to. */
const TAGS = {
  s1: (chunk: ReactNode) => <InLink href="#purpose">{chunk}</InLink>,
  s3: (chunk: ReactNode) => <InLink href="#getting-started">{chunk}</InLink>,
  s4: (chunk: ReactNode) => <InLink href="#during-the-project">{chunk}</InLink>,
  discord: (chunk: ReactNode) => <Out href={DISCORD_URL}>{chunk}</Out>,
  weekly: (chunk: ReactNode) => <Out href={WEEKLY_CHECKIN_URL}>{chunk}</Out>,
  biweekly: (chunk: ReactNode) => <Out href={BIWEEKLY_CHECKIN_URL}>{chunk}</Out>,
  substack: (chunk: ReactNode) => <Out href={SUBSTACK_URL}>{chunk}</Out>,
  archive: (chunk: ReactNode) => <InLink href={PROJECT_ARCHIVE_URL}>{chunk}</InLink>,
};

/** One passage of the handbook, with its links and the inbox in place. */
const h = (text: string) => rich(text, TAGS, { email: <ProjectsMail /> });
const all = (items: string[]) => items.map(h);

/* A chapter of the document: an h2 turn under the rule that separates it.

   The numeral above the heading is the index role doing wayfinding, the same
   two digits the contents list and the rail carry. It exists because the
   document cross-references itself by number, and a reader who has scrolled
   past a heading needs a visible referent to know they are in section 4. It is
   not a kicker: Poppins at the index role, never serif, never a sentence. */
function Chapter({
  id,
  index,
  children,
}: {
  id: keyof typeof t.contents;
  index: number;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-32 border-t border-navy/10 pt-10"
    >
      <p
        aria-hidden="true"
        className="font-sans text-index tabular-nums text-navy/50"
      >
        {String(index).padStart(2, "0")}
      </p>
      <h2
        id={`${id}-heading`}
        className="mt-2 font-serif text-heading text-navy"
      >
        {t.contents[id]}
      </h2>
      <div className="mt-6 flex flex-col gap-6">{children}</div>
    </section>
  );
}

/** One of the scope buckets: a title-sm heading over its own hairline. */
function TopicList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="border-t border-navy/10 pt-4">
      <SubTitle>{title}</SubTitle>
      <div className="mt-3">
        <Bullets items={items} />
      </div>
    </div>
  );
}

/** One of the two ways to take part: a serif numeral and name over its copy. */
function Mode({ n, name, children }: { n: number; name: string; children: ReactNode }) {
  return (
    <div>
      <p className="flex items-baseline gap-3">
        <span
          aria-hidden="true"
          className="font-serif text-title-sm tabular-nums text-navy/40"
        >
          {n}
        </span>
        <span className="font-serif text-title-sm text-navy">{name}</span>
      </p>
      <p className="mt-2 font-sans text-body text-navy/74">{children}</p>
    </div>
  );
}

/** A role, a rule block or a check: a subtitle, an optional lead-in, bullets. */
function Block({ title, intro, items }: { title: string; intro?: string; items: string[] }) {
  return (
    <div>
      <SubTitle>{title}</SubTitle>
      {intro ? <p className="mt-3 font-sans text-body text-navy/74">{intro}</p> : null}
      <div className="mt-3">
        <Bullets items={all(items)} />
      </div>
    </div>
  );
}

export default function ProjectHubHandbookPage() {
  const { purpose, beforeYouApply, gettingStarted, during, publishing, escalation, supervise } = t;
  return (
    <>
      {/* The imprint band. Cream, thin, and no illustration: this is the
          printed programme's title page, and what a reader needs from it is
          the claim, the premise, and who wrote it when. */}
      <section
        aria-labelledby="handbook-heading"
        className="border-b border-navy/10 bg-cream"
      >
        <div className="shell band-index">
          <div className="max-w-copy-wide">
            <nav aria-label={dictionary.research.apply.breadcrumbLabel} className="font-sans text-label text-navy/65">
              <Link
                href="/research"
                className="text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
              >
                {dictionary.research.apply.projectHub}
              </Link>
              <span aria-hidden="true" className="px-2 text-navy/35">
                /
              </span>
              <span aria-current="page">{t.breadcrumb}</span>
            </nav>

            <p className="kicker mt-6 text-kicker text-navy/60">{t.kicker}</p>
            <h1
              id="handbook-heading"
              className="mt-3 font-serif text-display text-navy"
            >
              {t.heading}
            </h1>
            <p className="mt-5 max-w-copy font-sans text-body text-navy/72">
              {t.intro}
            </p>

            <div className="mt-7 flex flex-col gap-1 border-t border-navy/10 pt-4 font-sans text-footnote text-navy/60">
              <p>
                {rich(t.version, {}, {
                  email: (
                    <a
                      href={`mailto:${PROJECTS_EMAIL}`}
                      className="text-navy/60 underline decoration-navy/25 underline-offset-4 hover:text-navy hover:decoration-navy focus-visible:text-navy"
                    >
                      {PROJECTS_EMAIL}
                    </a>
                  ),
                })}
              </p>
              <p>{t.buildsOn}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white">
        <div className="shell band-section">
          {/* Below xl this is one centred reading column and nothing else. At
              xl the copy column stays exactly where it was and the quiet rail
              appears in the margin beside it, which is why the side columns
              are equal fractions rather than the copy being pushed across. */}
          <div className="mx-auto grid max-w-copy xl:max-w-none xl:grid-cols-[minmax(0,1fr)_minmax(0,720px)_minmax(0,1fr)] xl:gap-10 2xl:gap-16">
            <HandbookToc items={contents} label={t.tocLabel} />

            <div className="flex min-w-0 flex-col gap-14">
              {/* What the reader needs if they read nothing else, then where
                  their own section is. Both are the answer to "do I have to
                  read all of this?", which is the first judgement this page
                  gets. */}
              <Reveal className="flex flex-col gap-10">
                <Callout label={t.shortVersion.label}>
                  <Bullets items={all(t.shortVersion.items)} />
                </Callout>

                <nav aria-labelledby="contents-heading">
                  <h2
                    id="contents-heading"
                    className="font-serif text-heading-sm text-navy"
                  >
                    {t.contentsHeading}
                  </h2>
                  <p className="mt-2.5 font-sans text-body text-navy/74">
                    {t.contentsBody}
                  </p>
                  <ol className="mt-6 flex flex-col">
                    {contents.map((item, i) => (
                      <li key={item.id} className="border-t border-navy/10 last:border-b">
                        <a
                          href={`#${item.id}`}
                          className="group flex items-baseline gap-4 py-[11px] font-sans text-ui text-navy underline decoration-transparent underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
                        >
                          <span
                            aria-hidden="true"
                            className="w-[22px] shrink-0 font-sans text-index tabular-nums text-navy/50 transition-colors group-hover:text-orange-ink group-focus-visible:text-orange-ink"
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </Reveal>

              {/* 1 */}
              <Chapter id="purpose" index={1}>
                {purpose.intro.map((paragraph) => (
                  <P key={paragraph}>{paragraph}</P>
                ))}
                <Callout label={purpose.nameLabel}>
                  <P>{purpose.name}</P>
                </Callout>

                <Turn>{purpose.criteriaTurn}</Turn>
                <P>{purpose.criteriaIntro}</P>
                <OutlineList items={purpose.criteria} />

                <Turn>{purpose.topicsTurn}</Turn>
                <P>{purpose.topicsIntro}</P>
                <div className="flex flex-col gap-7">
                  {purpose.topics.map((topic) => (
                    <TopicList key={topic.title} title={topic.title} items={topic.items} />
                  ))}
                </div>

                <Turn>{purpose.principlesTurn}</Turn>
                <OutlineList items={all(purpose.principles)} />
                <P>{purpose.principlesNote}</P>
              </Chapter>

              {/* 2 */}
              <Chapter id="before-you-apply" index={2}>
                <Turn>{beforeYouApply.modesTurn}</Turn>
                <P>{beforeYouApply.modesIntro}</P>
                <Rail>
                  {beforeYouApply.modes.map((mode, i) => (
                    <Mode key={mode.name} n={i + 1} name={mode.name}>
                      {h(mode.body)}
                    </Mode>
                  ))}
                </Rail>
                {beforeYouApply.after.map((paragraph) => (
                  <P key={paragraph}>{h(paragraph)}</P>
                ))}

                <Turn>{beforeYouApply.eligibilityTurn}</Turn>
                <Bullets items={beforeYouApply.eligibility} />

                <Turn>{beforeYouApply.signUpTurn}</Turn>
                <Bullets items={all(beforeYouApply.signUp)} />

                {/* Right where the reader is doing the maths. */}
                <Callout label={beforeYouApply.timeLabel}>
                  {beforeYouApply.time.map((paragraph) => (
                    <P key={paragraph}>{paragraph}</P>
                  ))}
                </Callout>
              </Chapter>

              {/* 3 */}
              <Chapter id="getting-started" index={3}>
                <Turn>{gettingStarted.roundsTurn}</Turn>
                <P>{gettingStarted.roundsIntro}</P>
                <NumberedSteps steps={all(gettingStarted.rounds)} />
                <Bullets items={gettingStarted.roundsNotes} />

                <Turn>{gettingStarted.applicationTurn}</Turn>
                <P>{h(gettingStarted.application)}</P>
                <p>
                  {/* The form lives on this site now, so this is OutLink's
                      look with an arrow that stays on the page. */}
                  <Link
                    href={APPLY_PATH}
                    className="inline-flex items-baseline gap-1.5 font-sans text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
                  >
                    {dictionary.research.applyForProject}
                    <ArrowRight size={16} weight="regular" aria-hidden="true" className="translate-y-[2px]" />
                  </Link>
                </p>

                <Turn>{gettingStarted.proposalTurn}</Turn>
                <P>{gettingStarted.proposalIntro}</P>
                <OutlineList items={gettingStarted.proposal} />
                <P>{gettingStarted.proposalReview}</P>

                <Turn>{gettingStarted.onboardingTurn}</Turn>
                <P>{gettingStarted.onboarding}</P>
                <p>
                  <Out href={ONBOARDING_FORM_URL}>{gettingStarted.onboardingLink}</Out>
                </p>

                <Turn>{gettingStarted.matchedTurn}</Turn>
                <Bullets items={gettingStarted.matched} />
              </Chapter>

              {/* 4 */}
              <Chapter id="during-the-project" index={4}>
                <Turn>{during.rolesTurn}</Turn>
                <P>{during.rolesIntro}</P>
                <Rail>
                  {during.roles.map((role) => (
                    <Block key={role.title} title={role.title} items={role.items} />
                  ))}
                </Rail>

                <Turn>{during.rhythmTurn}</Turn>
                <P>{during.rhythmIntro}</P>
                <Bullets items={all(during.rhythm)} />

                {/* The most-searched fact block on the page, flush after the
                    rhythm it belongs to so a skim-reader lands on it. */}
                <Callout label={during.deadlinesLabel}>
                  {/* The form is the phrase the sentence already uses, so the
                      sentence carries the link rather than trailing a label
                      that repeats it. */}
                  <div className="flex flex-col gap-3">
                    {during.deadlines.map((line) => (
                      <p key={line} className="font-sans text-body text-navy/74">
                        {h(line)}
                      </p>
                    ))}
                  </div>
                </Callout>

                <Turn>{during.communicateTurn}</Turn>
                <Bullets items={all(during.communicate)} />

                <Turn>{during.milestonesTurn}</Turn>
                <P>{during.milestonesIntro}</P>
                <Bullets items={during.milestones} />

                <Turn>{during.supportTurn}</Turn>
                <P>{during.supportIntro}</P>
                <Bullets items={during.support} />

                <Turn>{during.integrityTurn}</Turn>
                <Rail>
                  <Block title={during.integrity.title} items={during.integrity.items} />
                  {/* The lead-ins are positions, not rules, so they read as a
                      paragraph above the rules. */}
                  <Block title={during.aiTools.title} intro={during.aiTools.intro} items={during.aiTools.items} />
                  <Block
                    title={during.confidentiality.title}
                    intro={during.confidentiality.intro}
                    items={during.confidentiality.items}
                  />
                  <Block title={during.dualUse.title} intro={during.dualUse.intro} items={during.dualUse.items} />
                </Rail>

                <Turn>{during.wellbeingTurn}</Turn>
                <P>{during.wellbeingIntro}</P>
                <Bullets items={during.wellbeing} />
              </Chapter>

              {/* 5 */}
              <Chapter id="publishing" index={5}>
                <Turn>{publishing.completeTurn}</Turn>
                <Bullets items={publishing.complete} />

                <Turn>{publishing.deliverablesTurn}</Turn>
                <P>{publishing.deliverablesIntro}</P>
                <Bullets items={all(publishing.deliverables)} />

                <Turn>{publishing.authorshipTurn}</Turn>
                <Bullets items={publishing.authorship} />

                <Turn>{publishing.afterTurn}</Turn>
                <Bullets items={all(publishing.after)} />
              </Chapter>

              {/* 6 */}
              <Chapter id="escalation" index={6}>
                <P>{escalation.intro}</P>

                <Turn>{escalation.whenTurn}</Turn>
                <Bullets items={escalation.when} />

                <Turn>{escalation.pathTurn}</Turn>
                <NumberedSteps steps={escalation.path} />

                {/* Full column width, directly after the path: the clause that
                    lets a reader ignore the path is not a footnote to it. */}
                <Callout label={escalation.skipLabel}>
                  <P>{escalation.skip}</P>
                </Callout>

                <Turn>{escalation.remediesTurn}</Turn>
                <P>{escalation.remediesIntro}</P>
                <Bullets items={escalation.remedies} />

                <Callout label={escalation.contactLabel}>
                  <P>{h(escalation.contact)}</P>
                </Callout>
              </Chapter>

              {/* 7 */}
              <Chapter id="supervisors" index={7}>
                <P>{h(supervise.intro)}</P>
                <OutlineList items={all(supervise.procedure)} />
                <P>{supervise.interested}</P>
                <div>
                  <a
                    href={SUPERVISOR_INTEREST_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-ink gap-2"
                  >
                    {dictionary.research.supervisors.become}
                    <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
                    <span className="sr-only"> {dictionary.common.opensInNewTab}</span>
                  </a>
                </div>
              </Chapter>
            </div>
          </div>
        </div>
      </div>

      {/* The one inverse band on the page, because the document ends in a real
          action. Claim left, the two ways to act right. Nothing else: the
          handbook has already made the argument. */}
      <section aria-labelledby="handbook-close-heading" className="bg-navy">
        <div className="shell band-close grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
          <div className="min-w-0">
            <h2
              id="handbook-close-heading"
              className="max-w-[620px] font-serif text-closing text-white"
            >
              {t.close.heading}
            </h2>
            <p className="mt-4 max-w-[560px] font-sans text-body text-white/75">
              {t.close.body}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:shrink-0">
            <Link href={APPLY_PATH} className="btn-accent gap-2">
              {dictionary.research.applyForProject}
              <ArrowRight size={16} weight="regular" aria-hidden="true" />
            </Link>
            <a
              href={SUPERVISOR_INTEREST_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost-inverse gap-2"
            >
              {dictionary.research.supervisors.become}
              <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
              <span className="sr-only"> {dictionary.common.opensInNewTab}</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
