import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localeAlternates } from "@/i18n/metadata";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";

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

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "getInvolved.metadata" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: localeAlternates({ locale, path: "/get-involved" }),
  };
}

/* The six teams every chapter runs, with the hours that make the ask
   evaluable in one scan. Hour ranges and mission lines are condensed from the
   role catalogue in src/data/openPositions.ts; if a role's hours change there,
   change the range in the same commit. They are text, so each team's name,
   description and hours are under work.teams.<id> in
   messages/<locale>/getInvolved.json, in every language.

   Icons are 26px Phosphor at light weight, orange stroke on a light ground,
   with no tile behind them: design.md's career row. */
const TEAMS = [
  { id: "education", icon: GraduationCap },
  { id: "events", icon: CalendarBlank },
  { id: "communications", icon: Megaphone },
  { id: "community", icon: UsersThree },
  { id: "outreach", icon: HandWaving },
  { id: "researchOperations", icon: Flask },
];

/* The way in, in the order it happens. Four steps on a light ground, so the
   numerals are orange-ink outline rows rather than the inverse serif device.
   Each step's title and body are under howToApply.steps.<id>. */
const STEPS = ["apply", "hearBack", "talk", "start"];

const PRINT_WIDTHS = [320, 640, 900];
const printSrcSet = (src: string) =>
  PRINT_WIDTHS.map((w) => `${src.replace(/\.jpg$/, `-${w}.jpg`)} ${w}w`).join(", ");

export default function VolunteerPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = useTranslations("getInvolved");
  /* What a volunteer leaves with: three short lines. */
  const returns = t.raw("whatYouGet.returns") as string[];
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
              {t("hero.heading")}
            </h1>
            <p className="max-w-[620px] font-sans text-body text-navy/72">
              {t("hero.intro")}
            </p>
            <div className="pt-1">
              <Link href="/open-positions" className="btn-accent self-start">
                {t("actions.seeOpenPositions")}
              </Link>
            </div>
          </Reveal>

          <Reveal hero delay={0.08} className="flex min-w-0 justify-center lg:justify-end">
            <figure className="w-full max-w-[420px] bg-white p-2 shadow-[0_7px_22px_#021C4D1F]">
              <img
                src="/landing/print-hackathon-640.jpg"
                srcSet={printSrcSet("/landing/print-hackathon.jpg")}
                sizes="(min-width: 1024px) 420px, (min-width: 640px) 60vw, 84vw"
                alt={t("hero.photoAlt")}
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
            <p className="kicker text-kicker text-navy/65">{t("work.kicker")}</p>
            <h2 id="work-heading" className="font-serif text-heading text-navy">
              {t("work.heading")}
            </h2>
            <p className="max-w-[680px] font-sans text-body text-navy/74">
              {t("work.intro")}
            </p>
          </div>

          <Reveal className="mt-10">
            <ul role="list">
              {TEAMS.map(({ id, icon: Icon }) => (
                <li
                  key={id}
                  className="flex flex-col gap-4 border-t border-navy/10 py-[18px] sm:flex-row sm:items-start sm:gap-6 md:gap-8"
                >
                  <Icon
                    size={26}
                    weight="light"
                    aria-hidden="true"
                    className="shrink-0 text-orange sm:mt-1"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-serif text-title text-navy">{t(`work.teams.${id}.name`)}</h3>
                    <p className="mt-1 max-w-[640px] font-sans text-body leading-[25px] text-navy/74">
                      {t(`work.teams.${id}.description`)}
                    </p>
                  </div>
                  <p className="shrink-0 font-sans text-caption text-navy/65 sm:w-[164px] sm:pt-1.5 sm:text-right">
                    {t(`work.teams.${id}.hours`)}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* The exception, as a footnote rather than a seventh row: it is one
              paid post on a page about volunteering, and a row would give it
              the weight of a team. */}
          <p className="mt-6 max-w-[680px] border-t border-navy/10 pt-5 font-sans text-footnote leading-[19px] text-navy/65">
            {t("work.paidStaff")}
          </p>

          <div className="mt-8">
            <Link href="/open-positions" className="btn-outline-ink">
              {t("actions.seeOpenPositions")}
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
              {t("whatYouGet.heading")}
            </h2>
            <p className="max-w-[680px] font-sans text-body text-navy/74">
              {t("whatYouGet.intro")}
            </p>
            <ul className="flex flex-col gap-2.5 border-t border-navy/14 pt-4 font-sans text-kicker-sm leading-[22px] text-navy">
              {returns.map((item) => (
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
              {t("whatYouGet.quote.context")}
            </p>
            <p className="font-serif text-title font-light leading-[31px] text-navy">
              {t("whatYouGet.quote.text")}
            </p>
            <footer className="border-t border-navy/14 pt-3">
              {/* eslint-disable-next-line i18next/no-literal-string -- a person's name, the same in every language */}
              <cite className="block font-sans text-sm font-medium not-italic leading-5 text-navy">
                Stefano Zuffi
              </cite>
              <p className="kicker mt-1 text-kicker-sm text-navy/65">
                {t("whatYouGet.quote.project")}
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
              {t("howToApply.heading")}
            </h2>
            <p className="max-w-[680px] font-sans text-body text-navy/74">
              {t("howToApply.intro")}
            </p>
          </div>

          <ol className="mt-9 font-sans text-body text-navy">
            {STEPS.map((step, i) => (
              <li
                key={step}
                className="flex items-baseline gap-3 border-t border-navy/10 py-3"
              >
                <span className="w-[22px] shrink-0 font-sans text-xs text-orange-ink">
                  {i + 1}
                </span>
                <span className="max-w-[760px] leading-[25px] text-navy/74">
                  <span className="text-navy">{t(`howToApply.steps.${step}.title`)}</span>{" "}
                  {t(`howToApply.steps.${step}.body`)}
                </span>
              </li>
            ))}
          </ol>

          <p className="mt-6 max-w-[680px] font-sans text-body text-navy/74">
            {t("howToApply.noFit")}
          </p>

          {/* No accent button here. The close is the page's last ask, and a
              second orange "See open positions" two bands above it turns that
              ask into a repeat. This band ends on the quieter door. */}
          <div className="mt-6">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 font-sans text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
            >
              {t("actions.getInTouch")}
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
            {t("foundChapter.heading")}
          </h2>
          <div className="flex min-w-0 flex-col items-start gap-3">
            <p className="max-w-[640px] font-sans text-body text-navy/74">
              {t("foundChapter.intro")}
            </p>
            <Link
              href="/community#start-chapter"
              className="inline-flex items-center gap-1.5 font-sans text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
            >
              {/* /about sends readers to this same anchor as "Start a chapter";
                  one label per destination. */}
              {t("foundChapter.link")}
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
              {t("close.heading")}
            </h2>
            <p className="mt-4 max-w-[560px] font-sans text-body text-white/78">
              {t("close.body")}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 lg:shrink-0">
            <Link href="/open-positions" className="btn-accent">
              {t("actions.seeOpenPositions")}
            </Link>
            <Link href="/contact" className="btn-ghost-inverse">
              {t("actions.getInTouch")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
