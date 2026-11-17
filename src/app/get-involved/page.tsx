import type { Metadata } from "next";
import Link from "next/link";

import Reveal from "@/components/landing/Reveal";
import SectionOrbits from "@/components/landing/SectionOrbits";
import {
  ArrowRight,
  CalendarBlank,
  Flask,
  GraduationCap,
  HandWaving,
  Megaphone,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import { getDictionary, type Dictionary } from "@/i18n";

const t = getDictionary("en");

export const metadata: Metadata = {
  title: t.getInvolved.meta.title,
  description: t.getInvolved.meta.description,
};

/* The six teams every chapter runs (getInvolved.work.teams), with the hours
   that make the ask evaluable in one scan. Hour ranges and mission lines are
   condensed from the role catalogue in src/data/openPositions.ts; if a role's
   hours change there, change the range in en.json in the same commit.

   Icons are 26px Phosphor at light weight, orange stroke on a light ground,
   with no tile behind them: design.md's career row. */
const TEAMS: { key: keyof Dictionary["getInvolved"]["work"]["teams"]; icon: typeof Flask }[] = [
  { key: "education", icon: GraduationCap },
  { key: "events", icon: CalendarBlank },
  { key: "communications", icon: Megaphone },
  { key: "community", icon: UsersThree },
  { key: "outreach", icon: HandWaving },
  { key: "research", icon: Flask },
];

/* The way in (getInvolved.apply.steps), in the order it happens. Four steps
   on a light ground, so the numerals are orange-ink outline rows rather than
   the inverse serif device. */

const PRINT_WIDTHS = [320, 640, 900];
const printSrcSet = (src: string) =>
  PRINT_WIDTHS.map((w) => `${src.replace(/\.jpg$/, `-${w}.jpg`)} ${w}w`).join(", ");

export default function VolunteerPage() {
  return (
    <>
      {/* Hero. The claim on the left and, beside it, the evidence that these
          are rooms that happened: one print on its white mat, the same object
          the landing puts five of on a table. */}
      <section
        aria-labelledby="volunteer-heading"
        className="relative isolate overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(in oklab 180deg, white 0%, white 95%, #f7f5f2 100%)",
        }}
      >
        <SectionOrbits className="-left-24 top-0 h-[420px] w-[320px] md:-left-14" />
        <div className="shell band-hero grid items-center gap-10 lg:grid-cols-[minmax(0,640px)_minmax(0,1fr)] lg:gap-16">
          <Reveal hero className="flex min-w-0 flex-col gap-6">
            <h1 id="volunteer-heading" className="font-serif text-display text-navy">
              {t.getInvolved.hero.heading}
            </h1>
            <p className="max-w-[620px] font-sans text-body text-navy/72">
              {t.getInvolved.hero.body}
            </p>
            <div className="pt-1">
              <Link href="/open-positions" className="btn-accent self-start">
                {t.getInvolved.seeOpenPositions}
              </Link>
            </div>
          </Reveal>

          <Reveal hero delay={0.08} className="flex min-w-0 justify-center lg:justify-end">
            <figure className="w-full max-w-[420px] bg-white p-2 shadow-[0_7px_22px_#021C4D1F]">
              <img
                src="/landing/print-hackathon-640.jpg"
                srcSet={printSrcSet("/landing/print-hackathon.jpg")}
                sizes="(min-width: 1024px) 420px, (min-width: 640px) 60vw, 84vw"
                alt={t.getInvolved.hero.photoAlt}
                width={640}
                height={480}
                className="aspect-[4/3] w-full object-cover object-[48%_80%]"
              />
            </figure>
          </Reveal>
        </div>
      </section>

      {/* The work. Six rows on hairlines, each with its hours, because the
          question this band answers is whether there is something here the
          reader could actually do on a Tuesday evening. */}
      <section
        id="work"
        aria-labelledby="work-heading"
        className="relative isolate scroll-mt-36 overflow-hidden border-t border-navy/10 bg-white"
      >
        <SectionOrbits className="-bottom-24 -left-20 h-[460px] w-[340px] md:-left-12" />
        <div className="shell band-section">
          <div className="flex max-w-[720px] flex-col gap-4">
            <p className="kicker text-kicker text-navy/65">{t.getInvolved.work.kicker}</p>
            <h2 id="work-heading" className="font-serif text-heading text-navy">
              {t.getInvolved.work.heading}
            </h2>
            <p className="max-w-[680px] font-sans text-body text-navy/74">
              {t.getInvolved.work.body}
            </p>
          </div>

          <Reveal className="mt-10">
            <ul role="list">
              {TEAMS.map(({ key, icon: Icon }) => {
                const { name, description, hours } = t.getInvolved.work.teams[key];
                return (
                  <li
                    key={key}
                    className="flex flex-col gap-4 border-t border-navy/10 py-[18px] sm:flex-row sm:items-start sm:gap-6 md:gap-8"
                  >
                    <Icon
                      size={26}
                      weight="light"
                      aria-hidden="true"
                      className="shrink-0 text-orange sm:mt-1"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-serif text-title text-navy">{name}</h3>
                      <p className="mt-1 max-w-[640px] font-sans text-body leading-[25px] text-navy/74">
                        {description}
                      </p>
                    </div>
                    <p className="shrink-0 font-sans text-caption text-navy/65 sm:w-[164px] sm:pt-1.5 sm:text-right">
                      {hours}
                    </p>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          {/* The exception, as a footnote rather than a seventh row: it is one
              paid post on a page about volunteering, and a row would give it
              the weight of a team. */}
          <p className="mt-6 max-w-[680px] border-t border-navy/10 pt-5 font-sans text-footnote leading-[19px] text-navy/65">
            {t.getInvolved.work.paidNote}
          </p>

          <div className="mt-8">
            <Link href="/open-positions" className="btn-outline-ink">
              {t.getInvolved.seeOpenPositions}
            </Link>
          </div>
        </div>
      </section>

      {/* What a volunteer gets. Paper, and the quote alongside: the one piece
          of real evidence we have that these hours pay back. */}
      <section
        id="what-you-get"
        aria-labelledby="what-you-get-heading"
        className="scroll-mt-36 border-t border-navy/10 bg-cream"
      >
        <div className="shell band-index grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_minmax(280px,420px)]">
          <div className="flex min-w-0 flex-col gap-[22px]">
            <h2
              id="what-you-get-heading"
              className="max-w-[620px] font-serif text-heading-sm text-navy"
            >
              {t.getInvolved.returns.heading}
            </h2>
            <p className="max-w-[680px] font-sans text-body text-navy/74">
              {t.getInvolved.returns.body}
            </p>
            <ul className="flex flex-col gap-2.5 border-t border-navy/14 pt-4 font-sans text-kicker-sm leading-[22px] text-navy">
              {t.getInvolved.returns.items.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  {/* Navy, not orange: the orange on this page belongs to the
                      buttons and the six icons. */}
                  <span className="h-px w-4 shrink-0 bg-navy/30" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <blockquote className="flex min-w-0 flex-col gap-[18px]">
            <p className="kicker text-base leading-[22px] text-navy/65">
              {t.testimonial.context}
            </p>
            <p className="font-serif text-title font-light leading-[31px] text-navy">
              &ldquo;{t.testimonial.quote}&rdquo;
            </p>
            <footer className="border-t border-navy/14 pt-3">
              <cite className="block font-sans text-sm font-medium not-italic leading-5 text-navy">
                Stefano Zuffi
              </cite>
              <p className="kicker mt-1 text-kicker-sm text-navy/65">
                {t.testimonial.project}
              </p>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* The path in. Four numbered rows, so the reader leaves knowing the next
          step and roughly when she hears back. */}
      <section
        id="how-to-apply"
        aria-labelledby="how-to-apply-heading"
        className="scroll-mt-36 border-t border-navy/10 bg-white"
      >
        {/* One column, not a split: the two bands either side of this one are
            splits, and the four steps read better as a sequence running the
            width of the page than as a column beside a claim. */}
        <div className="shell band-section">
          <div className="flex max-w-[720px] flex-col gap-4">
            <h2
              id="how-to-apply-heading"
              className="font-serif text-heading-sm text-navy"
            >
              {t.getInvolved.apply.heading}
            </h2>
            <p className="max-w-[680px] font-sans text-body text-navy/74">
              {t.getInvolved.apply.body}
            </p>
          </div>

          <ol className="mt-9 font-sans text-body text-navy">
            {t.getInvolved.apply.steps.map((step, i) => (
              <li
                key={step.title}
                className="flex items-baseline gap-3 border-t border-navy/10 py-3"
              >
                <span className="w-[22px] shrink-0 font-sans text-xs text-orange-ink">
                  {i + 1}
                </span>
                <span className="max-w-[760px] leading-[25px] text-navy/74">
                  <span className="text-navy">{step.title}</span> {step.body}
                </span>
              </li>
            ))}
          </ol>

          <p className="mt-6 max-w-[680px] font-sans text-body text-navy/74">
            {t.getInvolved.apply.noRoleFits}
          </p>

          {/* No accent button here. The close is the page's last ask, and a
              second orange "See open positions" two bands above it turns that
              ask into a repeat. This band ends on the quieter door. */}
          <div className="mt-6">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 font-sans text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
            >
              {t.getInvolved.apply.getInTouch}
              <ArrowRight size={16} weight="regular" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Founders, pointed onward. A thin index band and one link: founding a
          chapter is its own path, and it is argued on /community. */}
      <section
        id="found-a-chapter"
        aria-labelledby="found-a-chapter-heading"
        className="scroll-mt-36 border-t border-navy/10 bg-cream"
      >
        <div className="shell band-index flex flex-col gap-4 lg:flex-row lg:items-baseline lg:gap-16">
          <h2
            id="found-a-chapter-heading"
            className="font-serif text-title text-navy lg:w-[300px] lg:shrink-0"
          >
            {t.getInvolved.foundChapter.heading}
          </h2>
          <div className="flex min-w-0 flex-col items-start gap-3">
            <p className="max-w-[640px] font-sans text-body text-navy/74">
              {t.getInvolved.foundChapter.body}
            </p>
            <Link
              href="/community#start-chapter"
              className="inline-flex items-center gap-1.5 font-sans text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
            >
              {/* /about sends readers to this same anchor as "Start a chapter";
                  one label per destination. */}
              {t.getInvolved.foundChapter.link}
              <ArrowRight size={16} weight="regular" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* The close. The claim on the left, the two ways to act on the right. */}
      <section id="join" aria-labelledby="join-heading" className="scroll-mt-36 bg-navy">
        <div className="shell band-close grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
          <div className="min-w-0">
            <h2 id="join-heading" className="max-w-[620px] font-serif text-closing text-white">
              {t.getInvolved.close.heading}
            </h2>
            <p className="mt-4 max-w-[560px] font-sans text-body text-white/78">
              {t.getInvolved.close.body}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 lg:shrink-0">
            <Link href="/open-positions" className="btn-accent">
              {t.getInvolved.seeOpenPositions}
            </Link>
            <Link href="/contact" className="btn-ghost-inverse">
              {t.getInvolved.apply.getInTouch}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
