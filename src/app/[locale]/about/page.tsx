import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localeAlternates } from "@/i18n/metadata";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

import Portrait from "@/components/about/Portrait";
import Reveal from "@/components/landing/Reveal";
import SectionOrbits from "@/components/landing/SectionOrbits";
import TalentFunnel from "@/components/TalentFunnel";
import { board, chapterDirectors, leadership } from "@/data/leadership";
import { sainDocuments } from "@/data/sainDocuments";

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "about.metadata" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: localeAlternates({ locale, path: "/about" }),
  };
}

/* The advisory board is not in src/data yet, so it stays here, where the page
   that prints it can be read alongside it. Affiliations are printed exactly as
   given: no gloss on what Resolution or CeSIA are, because nothing in the
   sources says. The group names and the affiliations are text, so they are in
   messages/<locale>/about.json, under team.advisory.groups.<id> and
   team.advisory.affiliations.<id>. */
const advisoryGroups = [
  {
    id: "technical",
    members: [
      {
        id: "teunVanDerWeij",
        name: "Teun van der Weij",
        link: "https://teunvanderweij.com/",
        image: "/photos/advisory_board/Teun.jpg",
      },
      {
        id: "jesseHoogland",
        name: "Jesse Hoogland",
        link: "https://www.jessehoogland.com/",
        image: "/photos/advisory_board/Jesse.jpg",
      },
      {
        id: "nandiSchoots",
        name: "Nandi Schoots",
        link: "https://nandischoots.com/",
        image: "/photos/advisory_board/nandi.jpg",
      },
    ],
  },
  {
    id: "governance",
    members: [
      {
        id: "jelleDonders",
        name: "Jelle Donders",
        link: "https://www.linkedin.com/in/jelle-donders/",
        image: "/photos/advisory_board/Jelle.jpeg",
      },
      {
        id: "lisaGotoh",
        name: "Lisa Gotoh",
        link: "https://www.linkedin.com/in/lisa-gotoh/",
        image: "/photos/advisory_board/lisa_gotoh_revised.jpeg",
      },
      {
        id: "robertPraas",
        name: "Robert Praas",
        link: "https://www.ceps.eu/ceps-staff/robert-praas/",
        image: "/photos/advisory_board/Robert_Praasjpeg.jpeg",
      },
      {
        id: "charbelSegerie",
        name: "Charbel-Raphaël Segerie",
        link: "https://crsegerie.com/",
        image: "/photos/advisory_board/charbel.png",
      },
    ],
  },
  {
    id: "strategy",
    members: [
      {
        id: "jesselitJimenez",
        name: "Jesselit Jimenez",
        link: "https://www.linkedin.com/in/jesselit-jimenez-65b0b891/",
        image: "/photos/advisory_board/Video_Jesselit_039_close-up.jpg",
      },
      {
        id: "stephenCorlett",
        name: "Stephen Corlett",
        link: "https://www.linkedin.com/in/stephen-corlett-8b361731/",
        image: "/photos/advisory_board/Stephen_Corlett.jpg",
      },
    ],
  },
];

/* The record, as claims rather than labels. "Rapid growth" and "National
   recognition" named the shape of a year without saying what happened in it.
   Each year's title and line are under record.entries.<id>. */
const record = [
  { year: "2023", id: "founded" },
  { year: "2024", id: "beyondStudents" },
  { year: "2025", id: "topVenues" },
  { year: "2026", id: "national" },
];

export default function AboutPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = useTranslations("about");
  const tCommon = useTranslations("common");
  return (
    <>
      {/* The mission moment. No photograph, no second heading, no CTA: the
          three clauses are the design, and the page has to earn the ask before
          it makes it. Ornament is the hero's orbital linework, the same
          vocabulary the landing opens with. */}
      <section aria-labelledby="mission-heading" className="relative isolate overflow-hidden bg-white">
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
          {/* The orbit bleeds off the right edge only. The landing hangs this
              off the bottom-right corner, where a cream band with a rule takes
              over and the cut reads as the band's edge; here the next band is
              white too, so a corner-hung orbit stopped mid-air at the seam.
              Centred on the right edge, the arcs close on the page. */}
          <svg
            className="absolute -right-10 top-1/2 h-[380px] w-[190px] -translate-y-1/2 text-navy opacity-[0.06] md:h-[460px] md:w-[230px] md:opacity-[0.09]"
            viewBox="0 0 230 460"
            fill="none"
          >
            <g stroke="currentColor" strokeWidth="1">
              <circle cx="230" cy="230" r="85" />
              <circle cx="230" cy="230" r="119" />
              <circle cx="230" cy="230" r="153" />
            </g>
            <path d="M63 80 Q64 87 70 88 Q64 89 63 96 Q62 89 56 88 Q62 87 63 80Z" fill="currentColor" />
          </svg>
        </div>

        <div className="shell band-hero">
          <Reveal hero className="flex flex-col">
            <p className="kicker flex items-center gap-3 text-kicker text-navy/65">
              <span className="size-[7px] shrink-0 bg-orange" aria-hidden="true" />
              Safe AI Netherlands
            </p>

            {/* One clause per line, because the mission is three commitments
                and not a paragraph. */}
            <h1 id="mission-heading" className="mt-5 max-w-[900px] font-serif text-display text-navy">
              <span className="block">{t("hero.mission.talent")}</span>
              <span className="block">{t("hero.mission.risks")}</span>
              <span className="block">{t("hero.mission.contribution")}</span>
            </h1>

            <span className="mt-9 block h-px w-full max-w-[900px] bg-navy/14" aria-hidden="true" />

            <p className="mt-6 max-w-[760px] font-sans text-body text-navy/72">
              {t("hero.intro")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Why the mission needs an organisation. A reading band: one copy
          column, the paragraphs are the object. The white sheet that started
          at the hero ends here, fading into the paper the funnel sits on. */}
      <section
        aria-labelledby="path-heading"
        className="relative isolate overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(in oklab 180deg, white 0%, white 93%, #f7f5f2 100%)",
        }}
      >
        <SectionOrbits className="-left-20 top-10 h-[400px] w-[300px] md:-left-12" />
        <div className="shell band-section">
          <Reveal className="flex flex-col">
            <h2 id="path-heading" className="max-w-[620px] font-serif text-heading text-navy">
              {t("path.heading")}
            </h2>
            <div className="mt-6 flex max-w-[720px] flex-col gap-5 font-sans text-body text-navy/72">
              <p>{t("path.trajectory")}</p>
              <p>{t("path.readiness")}</p>
              <p>{t("path.gap")}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* The Funnel Diagram. The argument on the left, the diagram that draws
          it on the right; the prose never recaps the five bands, because the
          drawing has already said them. */}
      <section
        id="pipeline"
        aria-labelledby="pipeline-heading"
        className="scroll-mt-36 border-t border-navy/10 bg-cream"
      >
        <div className="shell band-section grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,436px)] lg:gap-16">
          <Reveal className="flex min-w-0 flex-col">
            <h2 id="pipeline-heading" className="max-w-[620px] font-serif text-heading text-navy">
              {t("pipeline.heading")}
            </h2>
            <div className="mt-6 flex max-w-[640px] flex-col gap-5 font-sans text-body text-navy/72">
              <p>{t("pipeline.whole")}</p>
              <p>{t("pipeline.effort")}</p>
              <p>{t("pipeline.endings")}</p>
            </div>

            {/* The record of the pipeline, on its own rule: it is evidence for
                the three paragraphs above, not a fourth paragraph of them. */}
            <p className="mt-7 max-w-[640px] border-t border-navy/14 pt-6 font-sans text-body text-navy/74">
              {t("pipeline.soFar")}
            </p>

            <div className="pt-7">
              <Link href="/courses" className="btn-accent">
                {t("pipeline.cta")}
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="mx-auto w-full min-w-0 max-w-[436px]">
            <TalentFunnel />
          </Reveal>
        </div>
      </section>

      {/* The record. A thin index: the year does the wayfinding, the title
          makes the claim, one sentence says what happened. Four rules, no
          cards, no icons. */}
      <section
        aria-labelledby="record-heading"
        className="border-t border-navy/10 bg-white"
      >
        <div className="shell band-index flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-16">
          <Reveal className="lg:w-[320px] lg:shrink-0">
            <h2 id="record-heading" className="max-w-[420px] font-serif text-heading-sm text-navy">
              {t("record.heading")}
            </h2>
          </Reveal>
          <Reveal delay={0.05} className="min-w-0 flex-1">
            <ol role="list" className="flex flex-col">
              {record.map((entry) => (
                <li
                  key={entry.year}
                  className="grid grid-cols-[56px_minmax(0,1fr)] gap-x-5 border-t border-navy/12 py-5 sm:grid-cols-[72px_minmax(0,1fr)]"
                >
                  <span className="font-serif text-title tabular-nums text-navy/55">
                    {entry.year}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-serif text-title-sm text-navy">{t(`record.entries.${entry.id}.title`)}</h3>
                    <p className="mt-1.5 max-w-[620px] font-sans text-body text-navy/72">
                      {t(`record.entries.${entry.id}.line`)}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* The people. /team redirects to this anchor, so the id stays whatever
          else moves on this page. */}
      <section
        id="team"
        aria-labelledby="team-heading"
        className="relative isolate scroll-mt-36 overflow-hidden border-t border-navy/10 bg-white"
      >
        <SectionOrbits className="-bottom-24 -left-20 h-[500px] w-[375px] rotate-[-20deg] md:-left-12" />
        <div className="shell band-section">
          <Reveal className="flex flex-col">
            <p className="kicker text-kicker text-navy/65">{t("team.kicker")}</p>
            <h2 id="team-heading" className="mt-4 max-w-[620px] font-serif text-heading text-navy">
              {t("team.heading")}
            </h2>
            <p className="mt-5 max-w-[720px] font-sans text-body text-navy/72">
              {t("team.intro")}
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <ul role="list" className="mt-10 flex flex-wrap gap-x-7 gap-y-9">
              {leadership.map((person) => (
                <Portrait
                  key={person.name}
                  name={person.name}
                  meta={t(`team.roles.${person.roleKey}`)}
                  href={person.linkedin}
                  image={person.image}
                  width="w-[140px] sm:w-[158px]"
                  sizes="(min-width: 640px) 158px, 140px"
                />
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.05} className="mt-14 border-t border-navy/14 pt-10 md:mt-16">
            <h3 className="max-w-[560px] font-serif text-heading-sm text-navy">{t("team.directors.heading")}</h3>
            <p className="mt-4 max-w-[720px] font-sans text-body text-navy/72">
              {t("team.directors.intro")}
            </p>
            <ul role="list" className="mt-10 flex flex-wrap gap-x-7 gap-y-9">
              {chapterDirectors.map((person) => (
                <Portrait
                  key={person.name}
                  name={person.name}
                  meta={t(`team.roles.${person.roleKey}`)}
                  href={person.linkedin}
                  image={person.image}
                  width="w-[140px] sm:w-[158px]"
                  sizes="(min-width: 640px) 158px, 140px"
                />
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.05} className="mt-14 border-t border-navy/14 pt-10 md:mt-16">
            <h3 className="max-w-[560px] font-serif text-heading-sm text-navy">
              {t("team.advisory.heading")}
            </h3>
            <p className="mt-4 max-w-[720px] font-sans text-body text-navy/72">
              {t("team.advisory.intro")}
            </p>

            <div className="mt-10 flex flex-col gap-10">
              {advisoryGroups.map((group) => (
                <div key={group.id}>
                  <h4 className="kicker text-kicker-sm text-navy/60">{t(`team.advisory.groups.${group.id}`)}</h4>
                  <ul role="list" className="mt-5 flex flex-wrap gap-x-6 gap-y-8">
                    {group.members.map((member) => (
                      <Portrait
                        key={member.name}
                        name={member.name}
                        meta={t(`team.advisory.affiliations.${member.id}`)}
                        href={member.link}
                        image={member.image}
                        width="w-[132px] sm:w-[146px]"
                        sizes="(min-width: 640px) 146px, 132px"
                      />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.05} className="mt-14 border-t border-navy/14 pt-10 md:mt-16">
            <h3 className="max-w-[560px] font-serif text-heading-sm text-navy">{t("team.board.heading")}</h3>
            <p className="mt-4 max-w-[720px] font-sans text-body text-navy/72">
              {t("team.board.intro")}
            </p>
            <ul role="list" className="mt-10 flex flex-wrap gap-x-7 gap-y-9">
              {board.map((person) => (
                <Portrait
                  key={person.name}
                  name={person.name}
                  meta={t(`team.roles.${person.roleKey}`)}
                  href={person.linkedin}
                  image={person.image}
                  width="w-[140px] sm:w-[158px]"
                  sizes="(min-width: 640px) 158px, 140px"
                />
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* How we work, written down. The documents are the proof; the two lines
          under them are the doors people ask for after reading them. */}
      <section
        id="documents"
        aria-labelledby="documents-heading"
        className="scroll-mt-36 border-t border-navy/10 bg-white"
      >
        <div className="shell band-section">
          <Reveal className="flex flex-col">
            {/* No kicker: the heading already says what the band is, which is
                the case the Kicker Budget gives none. */}
            <h2
              id="documents-heading"
              className="max-w-[620px] font-serif text-heading text-navy"
            >
              {t("documents.heading")}
            </h2>
            <p className="mt-5 max-w-[760px] font-sans text-body text-navy/72">
              {t("documents.intro")}
            </p>
          </Reveal>

          {/* Rows, not cards. Three cream boxes on white repeated the geometry
              of the band above and borrowed the one boxed treatment the system
              has earned, which is publication cards on inverse. As hairline
              rows the documents read as one index with the two doors under
              them, in the same idiom. */}
          <Reveal delay={0.05}>
            <ul role="list" className="mt-10 flex flex-col">
              {sainDocuments.map((document) => (
                <li key={document.slug}>
                  <Link
                    href={`/about/${document.slug}`}
                    className="group flex flex-col gap-3 border-t border-navy/14 py-6 md:flex-row md:items-baseline md:justify-between md:gap-10"
                  >
                    <span className="block min-w-0">
                      <span className="kicker block text-kicker-sm text-navy/60">
                        {t(`documents.items.${document.key}.eyebrow`)}
                      </span>
                      <span className="mt-1.5 block font-serif text-title-sm text-navy underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-200 group-hover:decoration-navy group-focus-visible:decoration-navy">
                        {t(`documents.items.${document.key}.title`)}
                      </span>
                      <span className="mt-2 block max-w-[620px] font-sans text-kicker-sm text-navy/74">
                        {t(`documents.items.${document.key}.description`)}
                      </span>
                    </span>
                    <span className="inline-flex shrink-0 items-center gap-2 font-sans text-label text-navy underline decoration-navy/25 underline-offset-4 group-hover:decoration-navy group-focus-visible:decoration-navy">
                      {t("documents.read")}
                      <ArrowRight size={16} weight="regular" aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.05} className="flex flex-col">
            <div className="flex flex-col gap-3 border-t border-navy/14 py-6 md:flex-row md:items-baseline md:justify-between md:gap-10">
              <p className="max-w-[620px] font-sans text-body text-navy/72">
                {t("documents.contactNote")}
              </p>
              <Link
                href="/contact"
                className="inline-flex shrink-0 items-center gap-2 font-sans text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
              >
                {t("documents.contactLink")}
                <ArrowRight size={16} weight="regular" aria-hidden="true" />
              </Link>
            </div>
            <div className="flex flex-col gap-3 border-t border-navy/14 py-6 md:flex-row md:items-baseline md:justify-between md:gap-10">
              <p className="max-w-[620px] font-sans text-body text-navy/72">
                {t("documents.chapterNote")}
              </p>
              <Link
                href="/community#start-chapter"
                className="inline-flex shrink-0 items-center gap-2 font-sans text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
              >
                {t("documents.chapterLink")}
                <ArrowRight size={16} weight="regular" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* The close. Claim left, the two ways to act right. Nothing else. */}
      <section id="involved" aria-labelledby="involved-heading" className="scroll-mt-36 bg-navy">
        <div className="shell band-close grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
          <div className="min-w-0">
            <h2 id="involved-heading" className="max-w-[620px] font-serif text-closing text-white">
              {t("close.heading")}
            </h2>
            <p className="mt-4 max-w-[560px] font-sans text-body text-white/75">
              {t("close.body")}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:shrink-0">
            {/* "Join the community" is reserved site-wide for the onboarding
                form (COMMUNITY_JOIN_URL). This goes to the community page, so
                it carries the page label, the way the chapter pages say
                "Visit the Project hub". */}
            <Link href="/community" className="btn-accent">
              {t("close.community")}
            </Link>
            <Link href="/get-involved" className="btn-ghost-inverse">
              {tCommon("actions.volunteer")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
