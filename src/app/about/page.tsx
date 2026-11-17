import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

import Portrait from "@/components/about/Portrait";
import Reveal from "@/components/landing/Reveal";
import SectionOrbits from "@/components/landing/SectionOrbits";
import TalentFunnel from "@/components/TalentFunnel";
import { board, chapterDirectors, leadership } from "@/data/leadership";
import { sainDocuments } from "@/data/sainDocuments";
import { getDictionary, type Dictionary } from "@/i18n";

const locale = "en";
const t = getDictionary(locale);

export const metadata: Metadata = {
  title: t.about.meta.title,
  description: t.about.meta.description,
};

/* The advisory board is not in src/data yet, so it stays here, where the page
   that prints it can be read alongside it. Affiliations are printed exactly as
   given: no gloss on what Resolution or CeSIA are, because nothing in the
   sources says. They are job titles, so like SAIN's own roles they stay in
   English on every language's page; the group labels are translated. */
const advisoryGroups: {
  label: keyof Dictionary["about"]["team"]["advisoryGroups"];
  members: { name: string; affiliation: string; link: string; image: string }[];
}[] = [
  {
    label: "technical",
    members: [
      {
        name: "Teun van der Weij",
        affiliation: "Research Scientist, Apollo Research; Co-founder, ENAIS",
        link: "https://teunvanderweij.com/",
        image: "/photos/advisory_board/Teun.jpg",
      },
      {
        name: "Jesse Hoogland",
        affiliation: "Co-founder and Director, Resolution",
        link: "https://www.jessehoogland.com/",
        image: "/photos/advisory_board/Jesse.jpg",
      },
      {
        name: "Nandi Schoots",
        affiliation: "FLI Postdoctoral Fellow, University of Oxford",
        link: "https://nandischoots.com/",
        image: "/photos/advisory_board/nandi.jpg",
      },
    ],
  },
  {
    label: "governance",
    members: [
      {
        name: "Jelle Donders",
        affiliation: "Strategic Advisor AI, Dutch Government",
        link: "https://www.linkedin.com/in/jelle-donders/",
        image: "/photos/advisory_board/Jelle.jpeg",
      },
      {
        name: "Lisa Gotoh",
        affiliation: "Senior Policy Officer AI, Dutch Ministry of Foreign Affairs",
        link: "https://www.linkedin.com/in/lisa-gotoh/",
        image: "/photos/advisory_board/lisa_gotoh_revised.jpeg",
      },
      {
        name: "Robert Praas",
        affiliation: "Data Scientist, CEPS",
        link: "https://www.ceps.eu/ceps-staff/robert-praas/",
        image: "/photos/advisory_board/Robert_Praasjpeg.jpeg",
      },
      {
        name: "Charbel-Raphaël Segerie",
        affiliation: "Executive Director, CeSIA",
        link: "https://crsegerie.com/",
        image: "/photos/advisory_board/charbel.png",
      },
    ],
  },
  {
    label: "strategy",
    members: [
      {
        name: "Jesselit Jimenez",
        affiliation: "Global Director Strategy and Transformation",
        link: "https://www.linkedin.com/in/jesselit-jimenez-65b0b891/",
        image: "/photos/advisory_board/Video_Jesselit_039_close-up.jpg",
      },
      {
        name: "Stephen Corlett",
        affiliation: "Brand Marketing Leader and Consultant",
        link: "https://www.linkedin.com/in/stephen-corlett-8b361731/",
        image: "/photos/advisory_board/Stephen_Corlett.jpg",
      },
    ],
  },
];

/* The record (about.record.years), as claims rather than labels. "Rapid
   growth" and "National recognition" named the shape of a year without saying
   what happened in it. */
const record = Object.entries(t.about.record.years).map(([year, entry]) => ({ year, ...entry }));

export default function AboutPage() {
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
              {t.about.hero.mission.map((clause) => (
                <span key={clause} className="block">{clause}</span>
              ))}
            </h1>

            <span className="mt-9 block h-px w-full max-w-[900px] bg-navy/14" aria-hidden="true" />

            <p className="mt-6 max-w-[760px] font-sans text-body text-navy/72">
              {t.about.hero.body}
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
              {t.about.path.heading}
            </h2>
            <div className="mt-6 flex max-w-[720px] flex-col gap-5 font-sans text-body text-navy/72">
              {t.about.path.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
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
              {t.about.pipeline.heading}
            </h2>
            <div className="mt-6 flex max-w-[640px] flex-col gap-5 font-sans text-body text-navy/72">
              {t.about.pipeline.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {/* The record of the pipeline, on its own rule: it is evidence for
                the three paragraphs above, not a fourth paragraph of them. */}
            <p className="mt-7 max-w-[640px] border-t border-navy/14 pt-6 font-sans text-body text-navy/74">
              {t.about.pipeline.record}
            </p>

            <div className="pt-7">
              <Link href="/courses" className="btn-accent">
                {t.common.startWithAFreeCourse}
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="mx-auto w-full min-w-0 max-w-[436px]">
            <TalentFunnel locale={locale} />
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
              {t.about.record.heading}
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
                    <h3 className="font-serif text-title-sm text-navy">{entry.title}</h3>
                    <p className="mt-1.5 max-w-[620px] font-sans text-body text-navy/72">
                      {entry.line}
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
            <p className="kicker text-kicker text-navy/65">{t.about.team.kicker}</p>
            <h2 id="team-heading" className="mt-4 max-w-[620px] font-serif text-heading text-navy">
              {t.about.team.heading}
            </h2>
            <p className="mt-5 max-w-[720px] font-sans text-body text-navy/72">
              {t.about.team.body}
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <ul role="list" className="mt-10 flex flex-wrap gap-x-7 gap-y-9">
              {leadership.map((person) => (
                <Portrait
                  key={person.name}
                  name={person.name}
                  meta={person.role}
                  href={person.linkedin}
                  image={person.image}
                  width="w-[140px] sm:w-[158px]"
                  sizes="(min-width: 640px) 158px, 140px"
                  locale={locale}
                />
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.05} className="mt-14 border-t border-navy/14 pt-10 md:mt-16">
            <h3 className="max-w-[560px] font-serif text-heading-sm text-navy">{t.about.team.chapterDirectorsHeading}</h3>
            <p className="mt-4 max-w-[720px] font-sans text-body text-navy/72">
              {t.about.team.chapterDirectorsBody}
            </p>
            <ul role="list" className="mt-10 flex flex-wrap gap-x-7 gap-y-9">
              {chapterDirectors.map((person) => (
                <Portrait
                  key={person.name}
                  name={person.name}
                  meta={person.role}
                  href={person.linkedin}
                  image={person.image}
                  width="w-[140px] sm:w-[158px]"
                  sizes="(min-width: 640px) 158px, 140px"
                  locale={locale}
                />
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.05} className="mt-14 border-t border-navy/14 pt-10 md:mt-16">
            <h3 className="max-w-[560px] font-serif text-heading-sm text-navy">
              {t.about.team.advisoryHeading}
            </h3>
            <p className="mt-4 max-w-[720px] font-sans text-body text-navy/72">
              {t.about.team.advisoryBody}
            </p>

            <div className="mt-10 flex flex-col gap-10">
              {advisoryGroups.map((group) => (
                <div key={group.label}>
                  <h4 className="kicker text-kicker-sm text-navy/60">{t.about.team.advisoryGroups[group.label]}</h4>
                  <ul role="list" className="mt-5 flex flex-wrap gap-x-6 gap-y-8">
                    {group.members.map((member) => (
                      <Portrait
                        key={member.name}
                        name={member.name}
                        meta={member.affiliation}
                        href={member.link}
                        image={member.image}
                        width="w-[132px] sm:w-[146px]"
                        sizes="(min-width: 640px) 146px, 132px"
                        locale={locale}
                      />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.05} className="mt-14 border-t border-navy/14 pt-10 md:mt-16">
            <h3 className="max-w-[560px] font-serif text-heading-sm text-navy">{t.about.team.boardHeading}</h3>
            <p className="mt-4 max-w-[720px] font-sans text-body text-navy/72">
              {t.about.team.boardBody}
            </p>
            <ul role="list" className="mt-10 flex flex-wrap gap-x-7 gap-y-9">
              {board.map((person) => (
                <Portrait
                  key={person.name}
                  name={person.name}
                  meta={person.role}
                  href={person.linkedin}
                  image={person.image}
                  width="w-[140px] sm:w-[158px]"
                  sizes="(min-width: 640px) 158px, 140px"
                  locale={locale}
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
              {t.about.documents.heading}
            </h2>
            <p className="mt-5 max-w-[760px] font-sans text-body text-navy/72">
              {t.about.documents.body}
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
                        {t.documents[document.key].eyebrow}
                      </span>
                      <span className="mt-1.5 block font-serif text-title-sm text-navy underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-200 group-hover:decoration-navy group-focus-visible:decoration-navy">
                        {t.documents[document.key].title}
                      </span>
                      <span className="mt-2 block max-w-[620px] font-sans text-kicker-sm text-navy/74">
                        {t.documents[document.key].description}
                      </span>
                    </span>
                    <span className="inline-flex shrink-0 items-center gap-2 font-sans text-label text-navy underline decoration-navy/25 underline-offset-4 group-hover:decoration-navy group-focus-visible:decoration-navy">
                      {t.about.documents.readDocument}
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
                {t.about.documents.contactLine}
              </p>
              <Link
                href="/contact"
                className="inline-flex shrink-0 items-center gap-2 font-sans text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
              >
                {t.about.documents.contactLink}
                <ArrowRight size={16} weight="regular" aria-hidden="true" />
              </Link>
            </div>
            <div className="flex flex-col gap-3 border-t border-navy/14 py-6 md:flex-row md:items-baseline md:justify-between md:gap-10">
              <p className="max-w-[620px] font-sans text-body text-navy/72">
                {t.about.documents.chapterLine}
              </p>
              <Link
                href="/community#start-chapter"
                className="inline-flex shrink-0 items-center gap-2 font-sans text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
              >
                {t.about.documents.chapterLink}
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
              {t.about.close.heading}
            </h2>
            <p className="mt-4 max-w-[560px] font-sans text-body text-white/75">
              {t.about.close.body}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:shrink-0">
            {/* "Join the community" is reserved site-wide for the onboarding
                form (COMMUNITY_JOIN_URL). This goes to the community page, so
                it carries the page label, the way the chapter pages say
                "Visit the Project hub". */}
            <Link href="/community" className="btn-accent">
              {t.about.close.visitTheCommunity}
            </Link>
            <Link href="/get-involved" className="btn-ghost-inverse">
              {t.common.volunteer}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
