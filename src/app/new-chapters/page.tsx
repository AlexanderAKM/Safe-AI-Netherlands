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
  NOT_THERE_YET,
  SOFT_DEADLINE,
  buildFoundingApplicationUrl,
  type OfferIcon,
} from "@/data/newChapters";

export const metadata: Metadata = {
  title: "Start a chapter in Eindhoven, Delft or The Hague",
  description:
    "SAIN is starting chapters in Eindhoven, Delft and The Hague. Each city gets a paid, part-time starting team of four: a Chapter Director and leads for education, events and communications.",
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

function ApplyButton({ label = "Apply to a starting team" }: { label?: string }) {
  return (
    <a
      href={buildFoundingApplicationUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-accent gap-2"
    >
      {label}
      <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
      <span className="sr-only"> (opens in a new tab)</span>
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
            <p className="kicker flex items-center gap-3 text-kicker text-navy/65">
              <span className="size-[7px] bg-orange" aria-hidden="true" />
              Starting teams wanted
            </p>
            <h1 id="new-chapters-heading" className="font-serif text-display text-navy">
              Start SAIN in Eindhoven, Delft or The Hague.
            </h1>
            <p className="max-w-[620px] font-sans text-body text-navy/72">
              SAIN has chapters in Groningen, Amsterdam and Utrecht. This winter we
              are starting three more: Eindhoven, Delft and The Hague. Each city gets
              a starting team of four people: a Chapter Director, an Education Lead,
              an Events Lead and a Communications Lead. All four roles are paid and
              part-time.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <ApplyButton />
              <a href="#roles" className="btn-outline-ink gap-2">
                Read the four roles
                <ArrowDown size={16} weight="regular" aria-hidden="true" />
              </a>
            </div>
            <p className="font-sans text-caption text-navy/65">
              Soft deadline {SOFT_DEADLINE}. Applications are reviewed on a rolling
              basis, with priority to early applicants.
            </p>
          </Reveal>
          <Reveal hero delay={0.08} className="flex min-w-0 justify-center lg:justify-end">
            <ChapterMap className="w-full max-w-[520px]" />
          </Reveal>
        </div>
      </section>

      {/* The honest position: what does not exist yet, set against what is
          already behind the starting team. Two ledgers on one rule, the missing side
          drawn with a dashed marker because it is still to be built. */}
      <section
        aria-labelledby="building-heading"
        className="relative isolate overflow-hidden border-t border-navy/10 bg-white"
      >
        <SectionOrbits className="-left-20 -bottom-24 h-[440px] w-[330px] rotate-[-18deg] md:-left-12" />
        <div className="shell band-section">
          <Reveal>
            <h2 id="building-heading" className="max-w-[720px] font-serif text-heading text-navy">
              You would be building a chapter, not joining one.
            </h2>
            <p className="mt-4 max-w-[760px] font-sans text-body text-navy/74">
              You would be the person building a SAIN chapter in your city, and you
              will be in charge of setting up everything. However, you&rsquo;ll have
              support: a funded national organisation behind you, and a network of
              advisors, researchers and partner organisations who want nothing more
              than your chapter to succeed.
            </p>

            <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-0">
              <div className="md:border-r md:border-navy/10 md:pr-12">
                <p className="kicker text-kicker-sm text-navy/60">Not there yet</p>
                <ul role="list" className="mt-4 border-b border-navy/10">
                  {NOT_THERE_YET.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-4 border-t border-navy/10 py-3.5"
                    >
                      <span
                        className="h-0 w-5 shrink-0 border-t border-dashed border-navy/40"
                        aria-hidden="true"
                      />
                      <span className="font-serif text-title-sm text-navy/50">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:pl-12">
                <p className="kicker text-kicker-sm text-navy/60">Already behind you</p>
                <ul role="list" className="mt-4 border-b border-navy/10">
                  {ALREADY_THERE.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-4 border-t border-navy/10 py-3.5"
                    >
                      <span className="h-px w-5 shrink-0 bg-navy" aria-hidden="true" />
                      <span className="font-serif text-title-sm text-navy">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
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
              Three cities with the most potential.
            </h2>
            <p className="mt-4 max-w-[760px] font-sans text-body text-navy/74">
              We have identified these three cities as the highest-potential ones for
              us to expand to. Here is, very briefly, why we think so.
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
                    Apply in {city.name}
                    <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </article>
              ))}
            </div>
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
              Six months from starting team to SAIN chapter.
            </h2>
            <div className="mt-5 flex max-w-[760px] flex-col gap-4 font-sans text-body text-white/75">
              <p>
                New chapters start as incubating chapters. From mid-December 2026 to
                June 2027, the starting team will develop the chapter towards a few
                concrete milestones. Importantly, although this phase is part of the
                incubation, internally we&rsquo;ll treat you as a SAIN chapter from
                the start.
              </p>
              <p>
                We&rsquo;ll agree on where we want to be in June 2027; how you get
                there is up to you. We&rsquo;ll work together to make sure you reach
                your fullest potential. In June 2027 we will do a final review of how
                things have gone. Chapters that get there become official SAIN
                chapters, and the director and lead roles stay paid part-time
                positions.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <ol
              role="list"
              className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-8 before:absolute before:bottom-2 before:left-[5px] before:top-2 before:w-px before:bg-white/20 md:before:bottom-auto md:before:left-0 md:before:right-0 md:before:top-[5px] md:before:h-px md:before:w-auto"
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

          <Reveal delay={0.1}>
            <div className="mt-14 border-t border-white/15 pt-8">
              <p className="kicker text-kicker-sm text-white/55">
                The milestones we agree on together
              </p>
              <ul
                role="list"
                className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-5"
              >
                {INCUBATION_MILESTONES.map((milestone, i) => (
                  <li key={milestone} className="flex gap-3 lg:flex-col lg:gap-1.5">
                    <span
                      aria-hidden="true"
                      className="font-serif text-title tabular-nums text-white/40"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-serif text-title-sm text-white">{milestone}</span>
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
                This is what you would be starting.
              </h2>
              <p className="font-sans text-body text-navy/74 [&_strong]:font-semibold [&_strong]:text-navy">
                <strong>Discussion groups</strong>, <strong>hackathons</strong>,{" "}
                <strong>talks</strong>, and the evenings after. In Groningen,
                Amsterdam and Utrecht, people meet{" "}
                <strong>friends and collaborators</strong> at SAIN, and often find
                their <strong>next step in AI safety</strong>. Apply now, and a
                year from now your city has a community like this, built by you.
              </p>
              <ApplyButton />
            </Reveal>
            <Reveal delay={0.06} className="min-w-0">
              <ChapterPrints />
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <CommunityPrints />
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
              You start from zero, but not alone.
            </h2>
            <p className="mt-4 max-w-[760px] font-sans text-body text-navy/74">
              Everything the three existing chapters learned the hard way is written
              down, set up, and yours from day one.
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
              Four roles in every city.
            </h2>
            <p className="mt-4 max-w-[760px] font-sans text-body text-navy/74">
              Every starting team has the same four roles. Open one for the full
              description. You can apply for more than one, and the form asks which
              city you are based in.
            </p>
            <div className="mt-10 border-b border-navy/10">
              {FOUNDING_ROLES.map((role) => (
                <FoundingRoleDisclosure key={role.id} role={role} />
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
              One form, and a decision by mid-December.
            </h2>
            <p className="mt-4 max-w-[760px] font-sans text-body text-navy/74">
              Applications are reviewed on a rolling basis, with priority to early
              applicants. The soft deadline is {SOFT_DEADLINE}.
            </p>

            <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
              <ApplicationSteps steps={FOUNDING_APPLICATION_STEPS} />

              <div className="flex flex-col gap-8">
                <div className="border-t border-navy/14 pt-6">
                  <h3 className="font-serif text-title-sm text-navy">
                    Everyone who applies hears back from us.
                  </h3>
                  <p className="mt-2 font-sans text-body text-navy/74">
                    If you are not in the starting team, you are still the start of the
                    chapter&rsquo;s community! We will send you what you need to join
                    SAIN&rsquo;s online community, so you are among the first to hear
                    about new activities and opportunities in your city.
                  </p>
                </div>
                <div className="border-t border-navy/14 pt-6">
                  <h3 className="font-serif text-title-sm text-navy">
                    We only start a chapter when the team is strong enough.
                  </h3>
                  <p className="mt-2 font-sans text-body text-navy/74">
                    If we do not have strong enough applications to start the
                    incubation in a particular city, we will open a second round later
                    on.
                  </p>
                </div>
                <div className="border-t border-navy/14 pt-6">
                  <h3 className="font-serif text-title-sm text-navy">About SAIN</h3>
                  <p className="mt-2 font-sans text-body text-navy/74">
                    Safe AI Netherlands (SAIN) is a Dutch non-profit developing the
                    talent the Netherlands needs to address the risks of transformative
                    AI. We build the national AI safety talent pipeline to get people
                    from first contact to first real contribution. Then we connect them
                    to the institutions and organisations that need them.
                  </p>
                  <p className="mt-3 font-sans text-caption text-navy/65">
                    We do not sponsor visas. If you are in the Netherlands on a student
                    residence permit, you can still apply.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  <ApplyButton />
                  <Link href="/contact" className="btn-outline-ink">
                    Or get in touch first
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
              Three new chapters. Twelve people to start them.
            </h2>
            <p className="mt-4 max-w-[560px] font-sans text-body text-white/78">
              Apply by {SOFT_DEADLINE}. We read applications every week, so applying
              early means hearing back early.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:shrink-0">
            <ApplyButton />
            <Link href="/contact" className="btn-ghost-inverse">
              Or get in touch first
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
