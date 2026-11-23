import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ClientMessages from "@/i18n/ClientMessages";
import { localeAlternates } from "@/i18n/metadata";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

import Reveal from "@/components/landing/Reveal";
import OpportunityBoard from "@/components/opportunities/OpportunityBoard";
import OpportunityFacts from "@/components/opportunities/OpportunityFacts";
import OpportunityIndex from "@/components/opportunities/OpportunityIndex";
import { loadListings } from "@/data/opportunitiesFile";

/* The opportunities board: AI Safety jobs, fellowships and projects a reader
   in the Netherlands can take. It sits under the Project Hub, in the nav and
   in the address, because it answers the same reader one step on: the
   Project Hub is the first real contribution, this is where to take it next.

   SAIN's own open projects are pinned first (the Project Team's tracker, as
   on /research); the rest are other organisations' listings, read at build
   time from the file the daily fetch writes (src/data/opportunitiesFile.ts).
   Nothing is fetched from another site in the reader's browser. */

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "opportunities.metadata" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: localeAlternates({ locale, path: "/research/opportunities" }),
  };
}

export default async function OpportunitiesPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = params;
  setRequestLocale(locale);
  /* The first read without an explicit locale fixes the locale of the whole
     render, so it happens here, before the listings are awaited (see
     about/[document]/page.tsx). */
  const t = await getTranslations("opportunities");
  const tActions = await getTranslations("common.actions");
  const { listings, updatedAt } = await loadListings();

  return (
    <>
      {/* Hero. A board is read for its listings, so the hero is short: the
          claim, the premise, and the numbers the board below will bear out.
          White fades into paper in the last 5%, as on the Project Hub. */}
      <section
        aria-labelledby="opportunities-heading"
        className="relative isolate overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(in oklab 180deg, white 0%, white 95%, #f7f5f2 100%)",
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

        <div className="shell band-hero grid items-end gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] xl:grid-cols-[minmax(0,700px)_minmax(0,1fr)]">
          <Reveal hero className="flex min-w-0 flex-col gap-6">
            <h1 id="opportunities-heading" className="font-serif text-display text-navy">
              {t("hero.heading")}
            </h1>
            <p className="max-w-[660px] font-sans text-body text-navy/72">{t("hero.intro")}</p>
            <ClientMessages namespaces={["opportunities.facts"]}>
              <OpportunityFacts listings={listings} />
            </ClientMessages>
          </Reveal>

          {/* The premise as a thin index: the three ways a role is open to a
              reader here, each a way into the board. */}
          <Reveal hero delay={0.08} className="flex min-w-0 lg:justify-end">
            <ClientMessages namespaces={["opportunities.index"]}>
              <OpportunityIndex listings={listings} />
            </ClientMessages>
          </Reveal>
        </div>
      </section>

      {/* The board, on paper: this is the schedule part of the page. */}
      <section id="board" aria-label={t("metadata.title")} className="scroll-mt-16 border-t border-navy/10 bg-cream">
        <div className="shell band-section">
          <ClientMessages namespaces={["opportunities.board", "projectHub.finder", "common.a11y"]}>
            <OpportunityBoard listings={listings} updatedAt={updatedAt} />
          </ClientMessages>
        </div>
      </section>

      {/* The close, for the reader these roles are still a step too far for:
          the two free ways SAIN has of getting there. */}
      <section aria-labelledby="opportunities-close-heading" className="bg-navy">
        <div className="shell band-close grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
          <div className="min-w-0">
            <h2 id="opportunities-close-heading" className="max-w-[620px] font-serif text-closing text-white">
              {t("close.heading")}
            </h2>
            <p className="mt-4 max-w-[560px] font-sans text-body text-white/78">{t("close.body")}</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:shrink-0">
            <Link href="/courses" className="btn-accent gap-2">
              {tActions("joinCourse")}
              <ArrowRight size={16} weight="regular" aria-hidden="true" />
            </Link>
            <Link href="/research" className="btn-ghost-inverse">
              {tActions("visitProjectHub")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
