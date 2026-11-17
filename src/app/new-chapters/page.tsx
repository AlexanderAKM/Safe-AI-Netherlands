import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  ChatsCircle,
  Flag,
  Handshake,
  Plant,
  SealCheck,
  Stack,
  Wallet,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";

import Reveal from "@/components/landing/Reveal";
import SectionOrbits from "@/components/landing/SectionOrbits";
import ApplicationSteps from "@/components/careers/ApplicationSteps";
import ChapterPrints from "@/components/landing/ChapterPrints";
import CommunityPrints from "@/components/landing/CommunityPrints";
import ChapterMap from "@/components/expansion/ChapterMap";
import FoundingRoleDisclosure from "@/components/expansion/FoundingRoleDisclosure";
import OpenOnHash from "@/components/expansion/OpenOnHash";
import {
  ALREADY_THERE,
  FOUNDING_APPLICATION_STEPS,
  FOUNDING_CITIES,
  FOUNDING_OFFER,
  FOUNDING_ROLES,
  INCUBATION_MILESTONES,
  INCUBATION_STOPS,
  SOFT_DEADLINE,
  buildFoundingApplicationUrl,
  type OfferIcon,
} from "@/data/newChapters";
import { format, getDictionary, rich } from "@/i18n";

const locale = "en";
const t = getDictionary(locale);

/* The call itself (cities, roles, offer, incubation, steps) stays in
   src/data/newChapters.ts in English, like openPositions.ts; this page's own
   words are in en.json under newChapters. */
const n = t.newChapters;

export const metadata: Metadata = {
  title: n.meta.title,
  description: n.meta.description,
};

const OFFER_ICON: Record<OfferIcon, Icon> = {
  flag: Flag,
  compass: ChatsCircle,
  book: BookOpen,
  stack: Stack,
  wallet: Wallet,
  handshake: Handshake,
  growth: Plant,
  seal: SealCheck,
};

/* The word in each aim that carries its ambition, set in full white while
   the rest of the line steps back. Keyed by the aim's text so the emphasis
   follows the aim if INCUBATION_MILESTONES is reordered; an aim with no
   entry is simply printed whole. A translated aim needs its own entry here,
   or it prints whole. */
const MILESTONE_EMPHASIS: Record<string, string> = {
  "A strong team": "strong",
  "Courses with dozens of participants": "dozens",
  "Hundreds of new faces at events": "Hundreds",
  "A community of hundreds": "hundreds",
  "Local partners": "Local",
  "Projects running through the Project Hub": "Projects",
};

function Milestone({ text }: { text: string }) {
  const word = MILESTONE_EMPHASIS[text];
  const at = word ? text.indexOf(word) : -1;
  if (at < 0) return <span className="text-white">{text}</span>;
  return (
    <>
      {text.slice(0, at)}
      <span className="text-white">{word}</span>
      {text.slice(at + word.length)}
    </>
  );
}

function ApplyButton({ label = n.applyButton }: { label?: string }) {
  return (
    <a
      href={buildFoundingApplicationUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-accent gap-2"
    >
      {label}
      <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
      <span className="sr-only"> {t.common.opensInNewTab}</span>
    </a>
  );
}

export default function NewChaptersPage() {
  return (
    <>
      <OpenOnHash />

      {/* Hero. The claim and the ask on the left; the map on the right is the
          premise drawn: three chapters run, three are being started. */}
      <section
        aria-labelledby="new-chapters-heading"
        className="relative isolate overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(in oklab 180deg, white 0%, white 95%, #f7f5f2 100%)",
        }}
      >
        <SectionOrbits className="-left-24 top-0 h-[420px] w-[320px] md:-left-14" />
        <div className="shell band-hero grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] xl:grid-cols-[minmax(0,700px)_minmax(0,1fr)]">
          <Reveal hero className="flex min-w-0 flex-col gap-6">
            <h1 id="new-chapters-heading" className="font-serif text-display text-navy">
              {n.hero.heading}
            </h1>
            <p className="max-w-[620px] font-sans text-body text-navy/72">
              {n.hero.body}
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <ApplyButton />
              <a href="#roles" className="btn-outline-ink gap-2">
                {n.hero.readRoles}
                <ArrowDown size={16} weight="regular" aria-hidden="true" />
              </a>
            </div>
            <p className="font-sans text-caption text-navy/65">
              {format(n.hero.deadline, { deadline: SOFT_DEADLINE })}
            </p>
          </Reveal>
          <Reveal hero delay={0.08} className="flex min-w-0 justify-center lg:justify-end">
            <ChapterMap className="w-full max-w-[520px]" t={n.map} />
          </Reveal>
        </div>
      </section>

      {/* What is already behind the starting team, as one ledger on a rule. */}
      <section
        aria-labelledby="building-heading"
        className="relative isolate overflow-hidden border-t border-navy/10 bg-white"
      >
        <SectionOrbits className="-left-20 -bottom-24 h-[440px] w-[330px] rotate-[-18deg] md:-left-12" />
        <div className="shell band-section">
          <Reveal>
            <h2 id="building-heading" className="max-w-[720px] font-serif text-heading text-navy">
              {n.building.heading}
            </h2>
            <p className="mt-4 max-w-[760px] font-sans text-body text-navy/74">
              {n.building.body}
            </p>

            <div className="mt-10 max-w-[620px]">
              <p className="kicker text-kicker-sm text-navy/60">{n.building.alreadyBehind}</p>
              <ul role="list" className="mt-4">
                {ALREADY_THERE.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-4 py-3"
                  >
                    <span className="h-px w-5 shrink-0 bg-navy" aria-hidden="true" />
                    <span className="font-serif text-title-sm text-navy">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* The cities as peers: three cells on a left hairline, each with its
          own reason and its own door into the form. */}
      <section id="cities" aria-labelledby="cities-heading" className="scroll-mt-36 bg-cream">
        <div className="shell band-section">
          <Reveal>
            <h2 id="cities-heading" className="max-w-[720px] font-serif text-heading text-navy">
              {n.cities.heading}
            </h2>
            <p className="mt-4 max-w-[760px] font-sans text-body text-navy/74">
              {n.cities.body}
            </p>
            <div className="mt-10 grid gap-y-10 md:grid-cols-3">
              {FOUNDING_CITIES.map((city) => (
                <article
                  key={city.id}
                  id={city.id}
                  aria-labelledby={`${city.id}-heading`}
                  className="flex scroll-mt-36 flex-col border-l border-navy/14 pl-[18px] md:pr-8"
                >
                  <p className="kicker text-kicker-sm text-navy/60">{city.origin}</p>
                  <h3 id={`${city.id}-heading`} className="mt-2 font-serif text-heading-sm text-navy">
                    {city.name}
                  </h3>
                  <p className="mt-4 font-sans text-body text-navy/74">{city.why}</p>
                  <p className="mt-3 font-sans text-caption leading-[20px] text-navy/65">
                    {city.profile}
                  </p>
                  <a
                    href={buildFoundingApplicationUrl({ city: city.name })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 self-start font-sans text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy md:mt-auto md:pt-6"
                  >
                    {format(n.cities.applyIn, { city: city.name })}
                    <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
                    <span className="sr-only"> {t.common.opensInNewTab}</span>
                  </a>
                </article>
              ))}
            </div>
            <p className="mt-10 max-w-[1000px] font-sans text-caption leading-[20px] text-navy/74">
              <span>
                {rich(n.cities.inTouch, {
                  link: (chunk) => (
                    <Link
                      href="/contact"
                      className="text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
                    >
                      {chunk}
                    </Link>
                  ),
                })}
              </span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Incubation, on inverse: a trail of four stops whose last dot is the
          only orange on the band, because becoming a chapter is the point. */}
      <section aria-labelledby="incubation-heading" className="bg-navy">
        <div className="shell band-research">
          <Reveal>
            <h2
              id="incubation-heading"
              className="max-w-[720px] font-serif text-heading text-white"
            >
              {n.incubation.heading}
            </h2>
            <div className="mt-5 flex max-w-[760px] flex-col gap-4 font-sans text-body text-white/75">
              {n.incubation.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          {/* The trail ends in an arrowhead rather than at the last dot: June
              is a review, not a finish line, and the chapter carries on
              after it. Drawn on ::after at the line's far end, pointing
              right on the horizontal trail and down on the phone's vertical
              one. */}
          <Reveal delay={0.06}>
            <ol
              role="list"
              className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-8 before:absolute before:bottom-2 before:left-[5px] before:top-2 before:w-px before:bg-white/20 md:before:bottom-auto md:before:left-0 md:before:right-0 md:before:top-[5px] md:before:h-px md:before:w-auto after:absolute after:bottom-[7px] after:left-[2px] after:size-[7px] after:rotate-45 after:border-b after:border-r after:border-white/40 md:after:bottom-auto md:after:left-auto md:after:right-[1px] md:after:top-[2px] md:after:rotate-[-45deg]"
            >
              {INCUBATION_STOPS.map((stop, i) => {
                const last = i === INCUBATION_STOPS.length - 1;
                return (
                  <li key={stop.title} className="relative pl-8 md:pl-0 md:pt-9">
                    <span
                      aria-hidden="true"
                      className={`absolute left-0 top-1 size-[11px] rounded-full md:top-0 ${
                        last ? "bg-orange" : "border border-white/50 bg-navy"
                      }`}
                    />
                    <p className="kicker text-kicker-sm text-white/55">{stop.when}</p>
                    <h3
                      className={`mt-1.5 font-serif text-title ${last ? "text-orange" : "text-white"}`}
                    >
                      {stop.title}
                    </h3>
                    <p className="mt-2 font-sans text-caption leading-[20px] text-white/72">
                      {stop.detail}
                    </p>
                  </li>
                );
              })}
            </ol>
          </Reveal>

          {/* The aims as type, not as another icon list: "What you get"
              further down already pairs a glyph with each line, and the
              aims are not steps, so numbers would only imply an order. Two
              columns of large serif lines with hairlines between them (none
              above the first row, which the band's rule already tops), each
              with its measure of ambition in full white. No orange, so the trail's
              last dot stays the band's only orange. */}
          <Reveal delay={0.1}>
            <div className="mt-14 grid gap-6 border-t border-white/15 pt-10 lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)] lg:gap-12">
              <p className="kicker text-kicker-sm text-white/55">
                {n.incubation.aimingFor}
              </p>
              <ul role="list" className="grid gap-x-12 sm:grid-cols-2">
                {INCUBATION_MILESTONES.map((milestone) => (
                  <li
                    key={milestone}
                    className="border-t border-white/10 py-4 font-serif text-heading-sm text-white/50 first:border-t-0 first:pt-0 sm:[&:nth-child(2)]:border-t-0 sm:[&:nth-child(2)]:pt-0"
                  >
                    <Milestone text={milestone} />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What the incubation is for, shown rather than told: the landing's
          community band, with the running chapters as prints and the event
          strip under them, and the claim turned towards the reader's city. */}
      <section
        aria-labelledby="community-heading"
        className="relative isolate overflow-hidden bg-cream"
      >
        <div className="shell band-section flex flex-col gap-10 lg:gap-14">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[minmax(0,380px)_minmax(0,1fr)] xl:gap-24">
            <Reveal className="flex flex-col items-start gap-5">
              <h2 id="community-heading" className="font-serif text-heading text-navy">
                {n.community.heading}
              </h2>
              <p className="font-sans text-body text-navy/74 [&_strong]:font-semibold [&_strong]:text-navy">
                {rich(n.community.body, { strong: (chunk) => <strong>{chunk}</strong> })}
              </p>
              <ApplyButton />
            </Reveal>
            <Reveal delay={0.06} className="min-w-0">
              <ChapterPrints locale={locale} />
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <CommunityPrints t={t.landing.communityPrints} />
          </Reveal>
        </div>
      </section>

      {/* What the starting team gets, as career rows: orange stroke icon, serif
          title, one line of fact. Hairlines, no cards. */}
      <section
        aria-labelledby="offer-heading"
        className="relative isolate overflow-hidden bg-white"
      >
        <SectionOrbits className="-left-24 top-10 h-[420px] w-[320px] md:-left-14" />
        <div className="shell band-section">
          <Reveal>
            <h2 id="offer-heading" className="max-w-[720px] font-serif text-heading text-navy">
              {n.offer.heading}
            </h2>
            <p className="mt-4 max-w-[760px] font-sans text-body text-navy/74">
              {n.offer.body}
            </p>
            <ul
              role="list"
              className="mt-10 grid gap-x-10 sm:grid-cols-2 xl:grid-cols-4"
            >
              {FOUNDING_OFFER.map((offer) => {
                const OfferGlyph = OFFER_ICON[offer.icon];
                return (
                  <li key={offer.title} className="flex gap-4 border-t border-navy/10 py-6">
                    <OfferGlyph
                      size={26}
                      weight="light"
                      className="mt-0.5 shrink-0 text-orange"
                      aria-hidden="true"
                    />
                    <div className="min-w-0">
                      <h3 className="font-serif text-title-sm text-navy">{offer.title}</h3>
                      <p className="mt-1.5 font-sans text-caption leading-[20px] text-navy/72">
                        {offer.detail}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* The four postings, on paper like the rest of the careers material. */}
      <section
        id="roles"
        aria-labelledby="roles-heading"
        className="scroll-mt-36 border-t border-navy/10 bg-cream"
      >
        <div className="shell band-section">
          <Reveal>
            <h2 id="roles-heading" className="max-w-[720px] font-serif text-heading text-navy">
              {n.roles.heading}
            </h2>
            <p className="mt-4 max-w-[760px] font-sans text-body text-navy/74">
              {n.roles.body}
            </p>
            <div className="mt-10 border-b border-navy/10">
              {FOUNDING_ROLES.map((role) => (
                <FoundingRoleDisclosure key={role.id} role={role} locale={locale} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* How to apply: the steps on the left, the promises on the right. */}
      <section
        id="apply"
        aria-labelledby="apply-heading"
        className="scroll-mt-36 bg-white"
      >
        <div className="shell band-section">
          <Reveal>
            <h2 id="apply-heading" className="max-w-[720px] font-serif text-heading text-navy">
              {n.apply.heading}
            </h2>
            <p className="mt-4 max-w-[760px] font-sans text-body text-navy/74">
              {format(n.apply.body, { deadline: SOFT_DEADLINE })}
            </p>

            <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
              <ApplicationSteps steps={FOUNDING_APPLICATION_STEPS} />

              <div className="flex flex-col gap-8">
                <div className="border-t border-navy/14 pt-6">
                  <h3 className="font-serif text-title-sm text-navy">
                    {n.apply.hearBackHeading}
                  </h3>
                  <p className="mt-2 font-sans text-body text-navy/74">
                    {n.apply.hearBackBody}
                  </p>
                </div>
                <div className="border-t border-navy/14 pt-6">
                  <h3 className="font-serif text-title-sm text-navy">
                    {n.apply.strongTeamHeading}
                  </h3>
                  <p className="mt-2 font-sans text-body text-navy/74">
                    {n.apply.strongTeamBody}
                  </p>
                </div>
                <div className="border-t border-navy/14 pt-6">
                  <h3 className="font-serif text-title-sm text-navy">{n.apply.aboutHeading}</h3>
                  <p className="mt-2 font-sans text-body text-navy/74">
                    {n.apply.aboutBody}
                  </p>
                  <p className="mt-3 font-sans text-caption text-navy/65">
                    {n.apply.visas}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  <ApplyButton />
                  <Link href="/contact" className="btn-outline-ink">
                    {n.apply.getInTouch}
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* The close. */}
      <section aria-labelledby="new-chapters-close-heading" className="bg-navy">
        <div className="shell band-close grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
          <div className="min-w-0">
            <h2
              id="new-chapters-close-heading"
              className="max-w-[620px] font-serif text-closing text-white"
            >
              {n.close.heading}
            </h2>
            <p className="mt-4 max-w-[560px] font-sans text-body text-white/78">
              {format(n.close.body, { deadline: SOFT_DEADLINE })}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:shrink-0">
            <ApplyButton />
            <Link href="/contact" className="btn-ghost-inverse">
              {n.apply.getInTouch}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
