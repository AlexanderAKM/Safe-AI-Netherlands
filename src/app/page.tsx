import type { Metadata } from "next";
import Link from "next/link";

import Affiliations from "@/components/landing/Affiliations";
import ChapterPrints from "@/components/landing/ChapterPrints";
import CommunityPrints from "@/components/landing/CommunityPrints";
import CourseTracks from "@/components/landing/CourseTracks";
import FoldPin from "@/components/landing/FoldPin";
import MissionStatement from "@/components/landing/MissionStatement";
import Reveal from "@/components/landing/Reveal";
import ResearchSteps from "@/components/landing/ResearchSteps";
import ResearchIllustration from "@/components/landing/ResearchIllustration";
import ResearchOffer from "@/components/landing/ResearchOffer";
import HeroChart from "@/components/landing/HeroChart";
import SectionOrbits from "@/components/landing/SectionOrbits";
import { COMMUNITY_JOIN_URL } from "@/data/siteContact";
import {
  SOFT_DEADLINE_SHORT,
  STARTING_TEAMS_RECRUITING,
} from "@/data/newChapters";
import {
  formatCityList,
  openCourseApplications,
} from "@/data/courseApplications";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

/* No `title` here on purpose: the landing falls through to the root layout's
   `title.default`, so the tab reads "Safe AI Netherlands" and nothing more.
   The claim still reaches search and link previews via the description. */
export const metadata: Metadata = {
  description:
    "SAIN provides the community, courses and resources to help students and professionals join the AI Safety field in the Netherlands. Every programme is free.",
};


/* The four kinds of work SAIN opens doors into, named once under the claim
   they belong to. They were four cells with an icon apiece, which gave a
   passing mention the footprint of a section. */
const careerTracks = [
  "Technical research",
  "Governance and policy",
  "Field building",
  "Security and compute",
];


function Arrow() {
  return (
    <ArrowRight size={16} weight="regular" aria-hidden="true" />
  );
}

export default function Home() {
  return (
    <>
      {/* Hero. The claim on the left, the evidence on the right. The white
          ground fades into paper in the last 5% — a seam, not a sky. */}
      <section
        aria-labelledby="hero-heading"
        className="relative isolate overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(in oklab 180deg, white 0%, white 100%)",
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
            viewBox="0 0 230 230" fill="none"
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
            <h1 id="hero-heading" className="font-serif text-display text-navy">
              Your AI Safety career starts here.
            </h1>
            <p className="max-w-[620px] font-sans text-body text-navy/72">
              AI Safety expertise has never been more important than today. SAIN provides the
              community, courses and resources to help students and professionals join the AI
              Safety field. We provide a clear path through education, community and practical
              projects, then connect strong contributors to the organisations, programmes and roles
              where they can take the next step.
            </p>
            <div className="pt-1">
              <a
                href={COMMUNITY_JOIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent gap-2"
              >
                Join the community
                <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
            {/* The hire of the season, said once above the fold. It reads the
                same switch as the announcement bar and the nav item. */}
            {STARTING_TEAMS_RECRUITING && (
              <Link
                href="/new-chapters"
                className="group inline-flex max-w-[620px] items-start gap-3 border-t border-navy/12 pt-5 font-sans text-caption text-navy/74"
              >
                <span className="mt-[7px] size-[7px] shrink-0 bg-orange" aria-hidden="true" />
                <span>
                  <span className="font-semibold text-navy">We are hiring paid starting teams</span>{" "}
                  for new chapters in Eindhoven, Delft and The Hague. Apply by{" "}
                  {SOFT_DEADLINE_SHORT}.{" "}
                  <span className="inline-flex items-center gap-1 whitespace-nowrap text-navy underline decoration-navy/30 underline-offset-4 transition-colors group-hover:decoration-navy group-focus-visible:decoration-navy">
                    See the roles
                    <Arrow />
                  </span>
                </span>
              </Link>
            )}
          </Reveal>
          <Reveal hero delay={0.08} className="flex min-w-0 items-center justify-center lg:justify-end">
            <HeroChart />
          </Reveal>
        </div>
      </section>

      {/* Who SAIN works with, straight under the claim: a quiet strip of
          logos between the hero and the navy mission band. */}
      <Affiliations />

      {/* What SAIN is for, before the page offers any door. Inverse, as a
          deliberate pause between the hero and the first programme: the
          statement gets a ground of its own, and the community band starts on
          paper after it. It ranks none of the ways in. */}
      <section
        id="mission"
        aria-labelledby="mission-heading"
        className="scroll-mt-36 bg-navy"
      >
        <div className="shell band-section flex flex-col items-center">
          <h2 id="mission-heading" className="sr-only">
            Why SAIN exists
          </h2>
          <Reveal>
            <MissionStatement />
          </Reveal>
          <Reveal delay={0.05} className="mt-7 flex flex-col items-center gap-3 text-center">
            <p className="max-w-[560px] font-sans text-body text-white/72">
              A free, volunteer-run path from curiosity to contribution, through
              courses, events, research and local chapters.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 font-sans text-label text-white underline decoration-white/40 underline-offset-4 hover:decoration-white focus-visible:decoration-white"
            >
              Why SAIN exists
              <Arrow />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Community, made of its chapters, straight after the mission: the
          people first, then the first programme they can join. Paper, its own
          ground between the navy mission and the white courses band. The claim
          on the left, and on the right the three chapters as prints (see
          ChapterPrints). Under them, a strip of event photographs. */}
      <section id="community" aria-labelledby="community-heading" className="relative isolate scroll-mt-36 overflow-hidden bg-cream">
        <div className="shell band-section flex flex-col gap-10 lg:gap-14">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[minmax(0,380px)_minmax(0,1fr)] xl:gap-24">
          <Reveal className="flex flex-col items-start gap-5">
            <h2 id="community-heading" className="font-serif text-heading text-navy">
              Participate in the community
            </h2>
            <p className="font-sans text-body text-navy/74 [&_strong]:font-semibold [&_strong]:text-navy">
              <strong>Discussion groups</strong>, <strong>hackathons</strong>,{" "}
              <strong>talks</strong>, and the evenings after. People meet{" "}
              <strong>friends and collaborators</strong> here, and often find their{" "}
              <strong>next step in AI Safety</strong>.
            </p>
            {/* Same words as the hero's button on purpose: one label per
                destination, so the second ask reads as the same door. */}
            <a href={COMMUNITY_JOIN_URL} target="_blank" rel="noopener noreferrer" className="btn-accent mt-2 gap-2">
              Join the community
              <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <p className="font-sans text-footnote text-navy/65">
              Our Discord community currently focuses on our SAIN Amsterdam,
              Utrecht and Groningen chapters.{" "}
              {STARTING_TEAMS_RECRUITING ? (
                <>
                  Eindhoven, Delft and The Hague are next:{" "}
                  <Link
                    href="/new-chapters"
                    className="text-navy underline decoration-navy/30 underline-offset-4 transition-colors hover:decoration-navy focus-visible:decoration-navy"
                  >
                    we are hiring their starting teams
                  </Link>
                  .
                </>
              ) : (
                "More cities to come."
              )}
            </p>
          </Reveal>

          <Reveal delay={0.06} className="min-w-0">
            <ChapterPrints id="chapters" />
          </Reveal>
        </div>

        {/* Under the chapters, what happens in them: a strip of event
            photographs across the full width of the band. */}
        <Reveal delay={0.1}>
          <CommunityPrints />
        </Reveal>
        </div>
      </section>

      {/* The fold. Courses pin under the header and the navy research band
          slides up over them, as a sheet laid on the paper. CSS only (sticky,
          no scroll listener). The wrapper bounds the pin, so it lets go when
          research ends; FoldPin picks the offset so the whole band has been on
          screen before research covers it, at any window height. */}
      <div>
        <FoldPin>
      {/* Courses. The mission copy and the funnel it was built around moved
          to /about, where the argument and the diagram sit together; what is
          left on this ground is the first step itself. */}
      <section
        id="courses"
        aria-labelledby="courses-heading"
        className="relative isolate scroll-mt-36 overflow-hidden bg-white"
      >
        <SectionOrbits className="-left-20 top-6 h-[400px] w-[300px] md:-left-12" />
        <div className="shell band-section-top relative isolate pb-14">
          <div className="mb-10 max-w-[680px]">
            <h2 id="courses-heading" className="font-serif text-heading text-navy">
              Start with a free course
            </h2>
            <p className="mt-3 font-sans text-body leading-[26px] text-navy/74">
              Pick a track. Every programme is free and taught in person. What you join, and how it
              runs, depends on the chapter.
            </p>
            {/* Which chapters are taking applications, read from the same file
                the chapter pages read. A cohort can never be advertised as open
                here and closed there, and when the last one closes this line
                removes itself rather than going stale. */}
            {openCourseApplications.length > 0 && (
              <p className="mt-3 font-sans text-caption text-navy/65">
                You can apply now in {formatCityList(openCourseApplications)}.
              </p>
            )}
          </div>
          <Reveal><CourseTracks /></Reveal>
        </div>
      </section>
        </FoldPin>

      {/* One research story: the invitation, the people, and the work they publish. */}
      <section id="research" aria-labelledby="research-heading" className="relative z-10 scroll-mt-36 bg-navy text-white shadow-[0_-18px_40px_-10px_#021C4D38]">
        {/* band-research rather than a hand-set pt/pb. Every other band on the
            page carries its own clamp from globals.css, and this one was
            running about 30px tighter at 1440 than the bands either side of
            it while the utility written for it sat unused. */}
        <div className="shell band-research">
          <Reveal className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,300px)] lg:gap-12 xl:grid-cols-[minmax(0,650px)_minmax(0,1fr)] xl:gap-24">
            <div className="flex flex-col items-start gap-6">
              <h2 id="research-heading" className="max-w-[560px] font-serif text-heading">The SAIN Project Hub</h2>
              <p className="max-w-[590px] text-body text-white/75">Bring your academic expertise to AI Safety. Connect with researchers, develop a focused project, and take your work further with support from SAIN.</p>
              <Link href="/research" className="inline-flex items-center gap-3 text-label leading-6 text-white/80 underline decoration-white/35 underline-offset-4 hover:text-white focus-visible:text-white">
                Visit the Project hub <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <ResearchIllustration />
          </Reveal>

          {/* The offer, then the journey. No kicker above either: the landing
              already runs three of them across eight sections, which is the
              ceiling, and the h2 says what this band is without help. */}
          <Reveal delay={0.05}><ResearchOffer /></Reveal>
          <Reveal delay={0.05}><ResearchSteps /></Reveal>

          {/* The ask, closing the band rather than trailing the last step. It
              used to sit inside step three beside "View all publications",
              where the page's one orange button in this band read as a
              footnote to publishing. It sends readers to the hub rather than
              straight into the interest form: the terms of applying are the
              line beside it, and the page that explains them is one click on.
              The form itself is on /research, twice. */}
          <Reveal delay={0.05} className="mt-12 flex flex-col gap-6 border-t border-white/15 pt-8 md:mt-16 md:flex-row md:items-center md:justify-between md:gap-12">
            <p className="max-w-[520px] font-serif text-title leading-[30px] text-white">
              Apply any time. Determine your commitment per project. Remote participation is welcome.
            </p>
            {/* One label per destination: the three chapter pages and the band
                opener above all call /research "Visit the Project hub", so the
                closing ask is the same door, not a second one. */}
            <Link href="/research" className="btn-accent shrink-0 self-start md:self-auto">
              Visit the Project hub
            </Link>
          </Reveal>
        </div>
      </section>
      </div>

      {/* Careers. The claim, the paragraph that argues it, and the four kinds
          of work named on a closing rule, with the quote alongside.

          The four tracks were cells of their own, which is more room than a
          list of names needs; on one line they read as the range of the thing
          rather than as four items competing with the paragraph above them.

          The quote starts level with the heading. There is no kicker over it
          any more, which is what the quote used to collide with and what the
          hand-set offset here was correcting for. */}
      <section id="careers" aria-labelledby="careers-heading" className="scroll-mt-36 border-t border-navy/10 bg-cream">
        <div className="shell band-index grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_minmax(280px,420px)]">
          <div className="flex min-w-0 flex-col gap-[22px]">
            <h2 id="careers-heading" className="max-w-[620px] font-serif text-heading-sm text-navy">
              Build an AI Safety career
            </h2>
            <p className="max-w-[680px] font-sans text-body text-navy/74">
              Most people who end up working on AI Safety did not plan for it. We shorten that
              path with mentorship, funding advice, and introductions to the labs, institutes and
              ministries hiring in Europe right now.
            </p>
            {/* The separators are drawn rather than typed, so a screen reader
                reads four names and not four middots. */}
            <ul role="list" className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-navy/14 pt-4">
              {careerTracks.map((track, i) => (
                <li key={track} className="flex items-center gap-3">
                  {i > 0 ? <span aria-hidden="true" className="text-navy/25">·</span> : null}
                  <span className="kicker text-caption text-navy/65">{track}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* The quote is the band's evidence, so it is set apart from the
              argument beside it without leaving its column: a left hairline
              (the chapter cells' device), the words a size up in the light
              serif, and an oversized opening mark as the one typographic
              flourish. The mark sits in the flow, on its own line between the
              context and the words: positioned absolutely it landed under the
              text once the column narrowed. Navy only; orange stays with the
              actions. */}
          <blockquote className="flex min-w-0 flex-col gap-4 border-l border-navy/14 py-1 pl-6 lg:pl-7">
            <p className="kicker text-base leading-[22px] text-navy/65">
              Internship · Existential Risk Observatory
            </p>
            <p className="font-serif text-heading-sm font-light text-navy">
              <span
                aria-hidden="true"
                className="block h-[34px] select-none font-serif text-[72px] leading-[0.9] text-navy/[0.14]"
              >
                &ldquo;
              </span>
              Without this community I almost certainly wouldn&rsquo;t be where I am.
            </p>
            <footer className="border-t border-navy/14 pt-3">
              <cite className="block font-sans text-sm font-medium not-italic leading-5 text-navy">
                Stefano Zuffi
              </cite>
              <p className="kicker mt-1 text-kicker-sm text-navy/65">
                Mapping research on AI alignment techniques and government interventions
              </p>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Get involved. Inverse, because this band asks for a decision, and a
          banner rather than a column beside a drawing.

          The funnel stood here and was the reason the band was 400px tall
          with nothing in most of it: the claim, one sentence and two buttons
          come to about 235px, so the diagram left eighty pixels of empty navy
          above and below the words. It also spent the last screen restating
          the five sections the reader had just scrolled through. design.md
          asks a diagram to encode a claim; the funnel has one, that the path
          narrows, and /about is where it is argued.

          What is left is what a close needs. The claim on the left, the two
          ways to act on the right, centred against it. No kicker over the
          heading: a label, a heading and a button row is three things where
          the band is really saying two.

          The line under the heading answers the reason people give for not
          starting. docs/vision.md puts the funnel's first level at "has not
          encountered AI safety" and says plainly that the people who stop
          early are worth having; the heading carries the stakes, so this
          carries the invitation. */}
      <section id="involved" aria-labelledby="involved-heading" className="scroll-mt-36 bg-navy">
        <div className="shell band-close grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
          <div className="min-w-0">
            <h2 id="involved-heading" className="max-w-[620px] font-serif text-closing text-white">
              The next decade is being decided now
            </h2>
            <p className="mt-4 max-w-[560px] font-sans text-body text-white/78">
              You do not need a background in AI to be useful here. Every SAIN programme is
              free, run by volunteers, and takes you from curious to contributing, so pick
              one and begin.
            </p>
          </div>

          {/* The first band of the funnel on /about and this button have to
              mean the same thing: the course section on this page. */}
          <div className="flex flex-wrap gap-3 lg:shrink-0">
            <Link href="#courses" className="btn-accent">
              Start with a free course
            </Link>
            <Link href="/get-involved" className="btn-ghost-inverse">
              Volunteer
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
