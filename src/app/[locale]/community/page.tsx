import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localeAlternates } from "@/i18n/metadata";
import type { Locale } from "@/i18n/routing";
import ClientMessages from "@/i18n/ClientMessages";
import { Link } from "@/i18n/navigation";

import Reveal from "@/components/landing/Reveal";
import SectionOrbits from "@/components/landing/SectionOrbits";
import ChapterAtlas from "@/components/community/ChapterAtlas";
import { ATLAS } from "@/data/chapterAtlas";
import EventPrints from "@/components/community/EventPrints";
import { COMMUNITY_JOIN_URL } from "@/data/siteContact";
import { ArrowDown, ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "community.metadata" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: localeAlternates({ locale, path: "/community" }),
  };
}

/* The hero's three prints, fanned. Each is the photograph its chapter page
   opens with, so the print is the chapter previewed, and each one is a link
   into the atlas below. Tilt, lift and overlap are per print so the fan reads
   as three objects laid on a table rather than a carousel. */
const heroPrints = [
  { tilt: "-rotate-[5deg]", lift: "translate-y-5", layer: "z-0" },
  { tilt: "rotate-[1.5deg]", lift: "-translate-y-2", layer: "z-10" },
  { tilt: "rotate-[6deg]", lift: "translate-y-7", layer: "z-0" },
];

export default function CommunityPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = useTranslations("community");
  const tCommon = useTranslations("common");
  /* What SAIN hands a new chapter, and what its founder does, in order. */
  const chapterProvides = t.raw("startChapter.provides") as string[];
  const founderSteps = t.raw("startChapter.steps") as string[];
  return (
    <>
      {/* Hero. The claim on the left; on the right the claim made visible,
          three chapters as three prints, each one a door into the atlas. */}
      <section
        aria-labelledby="community-hero-heading"
        className="relative isolate overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(in oklab 180deg, white 0%, white 88%, #f7f5f2 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          aria-hidden="true"
        >
          <div
            className="absolute -left-8 -top-20 h-[400px] w-[200px] opacity-[0.07] md:-left-4 md:-top-12 md:h-[440px] md:w-[260px] md:opacity-[0.12]"
            style={{
              backgroundImage: "url('/illustrations/hero-orbits.svg')",
              backgroundSize: "260px 440px",
              backgroundRepeat: "no-repeat",
              maskImage: "linear-gradient(to right, black 15%, transparent 100%)",
            }}
          />
        </div>

        <div className="shell band-hero grid items-center gap-14 lg:grid-cols-[minmax(0,560px)_minmax(0,1fr)] xl:grid-cols-[minmax(0,620px)_minmax(0,1fr)] xl:gap-20">
          <Reveal hero className="flex min-w-0 flex-col gap-6">
            <h1
              id="community-hero-heading"
              className="font-serif text-display text-navy"
            >
              {t("hero.heading")}
            </h1>
            <p className="max-w-[560px] font-sans text-body text-navy/72">
              {t("hero.intro")}
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4 pt-1">
              {/* Same words, same destination as the landing hero: one label
                  per door. */}
              <a
                href={COMMUNITY_JOIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent gap-2"
              >
                {tCommon("actions.joinCommunity")}
                <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
                <span className="sr-only"> {tCommon("a11y.opensInNewTab")}</span>
              </a>
              <a
                href="#chapters"
                className="inline-flex items-center gap-1.5 font-sans text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
              >
                {t("hero.findChapter")}
                <ArrowDown size={16} weight="regular" aria-hidden="true" />
              </a>
            </div>
            <p className="max-w-[560px] font-sans text-footnote text-navy/65">
              {t("hero.discordNote")}
            </p>
          </Reveal>

          <Reveal hero delay={0.08} className="min-w-0">
            <ul
              role="list"
              aria-label={t("hero.printsLabel")}
              className="mx-auto flex max-w-[560px] items-start justify-center pb-8 pt-2 lg:mr-0"
            >
              {ATLAS.map((chapter, i) => (
                <li
                  key={chapter.id}
                  className={`relative w-1/3 shrink-0 ${heroPrints[i].layer} ${i > 0 ? "-ml-[4%]" : ""}`}
                >
                  <a
                    href={`#chapter-${chapter.id}`}
                    className={`hero-print group block bg-white p-1.5 shadow-[0_7px_22px_#021C4D1F] sm:p-2 ${heroPrints[i].tilt} ${heroPrints[i].lift}`}
                  >
                    <span className="relative block aspect-[4/5] overflow-hidden bg-cream">
                      <img
                        src={`${chapter.photo}-640.webp`}
                        alt=""
                        width={640}
                        height={800}
                        className="hero-print-img absolute inset-0 size-full object-cover"
                      />
                    </span>
                    <span className="block px-1 pb-0.5 pt-2.5 font-serif text-sm leading-5 text-navy sm:px-1.5 sm:pt-3 sm:text-title-sm">
                      {chapter.city}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* The atlas. Paper, continuing the hero's fade, because the page's
          subject starts here: the three chapters, one open at a time, each
          with its record, its course and its live calendar. */}
      <section
        id="chapters"
        aria-labelledby="chapters-heading"
        className="scroll-mt-28 bg-cream"
      >
        <div className="shell band-section">
          <div className="mb-10 grid gap-4 md:mb-12 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:items-end lg:gap-14 xl:grid-cols-[minmax(0,380px)_minmax(0,1fr)] xl:gap-20">
            <h2 id="chapters-heading" className="font-serif text-heading text-navy">
              {t("chapters.heading")}
            </h2>
            <p className="max-w-[560px] font-sans text-body text-navy/72">
              {t("chapters.intro")}
              <br/>
              {t("chapters.choose")}
            </p>
          </div>
          <Reveal delay={0.05}>
            <ClientMessages
              namespaces={[
                "community.atlas",
                "courses.applications",
                "common.a11y",
                "common.actions",
              ]}
            >
              <ChapterAtlas />
            </ClientMessages>
          </Reveal>
        </div>
      </section>

      {/* The photographs. The cadence diagram that stood above them is gone;
          the prints carry the claim on their own, under a heading that names
          them. */}
      <section
        id="rhythm"
        aria-labelledby="rhythm-heading"
        className="relative isolate scroll-mt-36 overflow-hidden bg-white"
      >
        <SectionOrbits className="-left-20 top-10 h-[400px] w-[300px] md:-left-12" />
        <div className="shell band-section flex flex-col gap-10 md:gap-12">
          <h2 id="rhythm-heading" className="font-serif text-heading text-navy">
            {t("rhythm.heading")}
          </h2>

          <Reveal>
            <ClientMessages namespaces={["community.eventPrints"]}>
              <EventPrints />
            </ClientMessages>
          </Reveal>

          <p className="font-sans text-caption text-navy/65">
            {t.rich("rhythm.archive", {
              link: (chunks) => (
                <Link
                  href="/chapters/groningen/events"
                  className="text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
                >
                  {chunks}
                </Link>
              ),
            })}
          </p>
        </div>
      </section>

      {/* The next chapter. The three that exist as three small prints, and
          beside them an empty dashed mat: the slot is the ask. */}
      <section
        id="start-chapter"
        aria-labelledby="start-chapter-heading"
        className="scroll-mt-36 border-t border-navy/10 bg-cream"
      >
        <div className="shell band-section">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:items-center lg:gap-20">
            <Reveal className="order-last lg:order-none">
              <ul
                role="list"
                aria-label={t("startChapter.printsLabel")}
                className="grid max-w-[420px] grid-cols-2 gap-4 sm:gap-5"
              >
                {ATLAS.map((chapter, i) => (
                  <li
                    key={chapter.id}
                    className={`bg-white p-1.5 shadow-[0_5px_16px_#021C4D17] ${
                      ["-rotate-2", "rotate-1", "rotate-[1.5deg]"][i]
                    }`}
                  >
                    <span className="relative block aspect-[4/3] overflow-hidden">
                      <img
                        src={`${chapter.photo}-640.webp`}
                        alt=""
                        loading="lazy"
                        className="absolute inset-0 size-full object-cover"
                      />
                    </span>
                    <span className="block px-1 pt-2 font-serif text-base leading-5 text-navy">
                      {chapter.city}
                    </span>
                  </li>
                ))}
                <li className="flex -rotate-1 items-center justify-center border-[1.5px] border-dashed border-navy/35 p-1.5">
                  <span className="kicker text-kicker text-navy/55">{t("startChapter.yourCity")}</span>
                </li>
              </ul>
            </Reveal>

            <div className="flex flex-col gap-5">
              <h2
                id="start-chapter-heading"
                className="font-serif text-heading text-navy"
              >
                {t("startChapter.heading")}
              </h2>
              <p className="max-w-[600px] font-sans text-body text-navy/74">
                {t("startChapter.intro")}
              </p>
              <p className="max-w-[600px] font-sans text-body text-navy/74">
                {t.rich("startChapter.newCities", {
                  link: (chunks) => (
                    <Link
                      href="/new-chapters"
                      className="inline-flex items-center gap-1.5 font-sans text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
                    >
                      {chunks}
                      <ArrowRight size={16} weight="regular" aria-hidden="true" />
                    </Link>
                  ),
                })}
              </p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-1">
                <a
                  href="mailto:info@safeainetherlands.org?subject=Starting a SAIN chapter"
                  className="btn-outline-ink"
                >
                  {t("startChapter.propose")}
                </a>
                <p className="max-w-[300px] font-sans text-footnote text-navy/65">
                  {t("startChapter.proposeNote")}
                </p>
              </div>
            </div>
          </div>

          <Reveal
            delay={0.05}
            className="mt-14 grid gap-10 border-t border-navy/14 pt-10 lg:grid-cols-2 lg:gap-20"
          >
            <div>
              <h3 className="kicker text-kicker text-navy/65">{t("startChapter.providesHeading")}</h3>
              <ul role="list" className="mt-5 grid gap-x-8 gap-y-3 font-sans text-ui text-navy sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {chapterProvides.map((item) => (
                  <li key={item} className="flex items-baseline gap-3">
                    <span className="h-px w-4 shrink-0 translate-y-[-4px] bg-navy/30" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="kicker text-kicker text-navy/65">{t("startChapter.stepsHeading")}</h3>
              <ol role="list" className="mt-5 flex flex-col font-sans text-ui text-navy">
                {founderSteps.map((step, i) => (
                  <li
                    key={step}
                    className="flex items-baseline gap-4 border-t border-navy/10 py-2.5 first:border-t-0 first:pt-0"
                  >
                    <span className="w-5 shrink-0 font-sans text-index tracking-normal tabular-nums text-orange-ink">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </section>

      {/* The close. Inverse, because this band asks for a decision. Same labels
          as the landing's close, so both asks read as the same doors. */}
      <section
        id="join"
        aria-labelledby="community-close-heading"
        className="scroll-mt-36 bg-navy"
      >
        <div className="shell band-close grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
          <div className="min-w-0">
            <h2
              id="community-close-heading"
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
              href={COMMUNITY_JOIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent gap-2"
            >
              {tCommon("actions.joinCommunity")}
              <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
              <span className="sr-only"> {tCommon("a11y.opensInNewTab")}</span>
            </a>
            <Link href="/get-involved" className="btn-ghost-inverse gap-2">
              {tCommon("actions.volunteer")}
              <ArrowRight size={16} weight="regular" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
