import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

import Reveal from "@/components/landing/Reveal";
import SectionOrbits from "@/components/landing/SectionOrbits";
import {
  chapterRoleEmails,
  leadershipContacts,
  nationalContacts,
} from "@/data/siteContact";
import { format, getDictionary } from "@/i18n";

const t = getDictionary("en");

export const metadata: Metadata = {
  title: t.contact.meta.title,
  description: t.contact.meta.description,
};

/* The two places SAIN publishes, both linked from the site's structured data
   already. Nothing else belongs on a contact page. */
const online = [
  {
    name: "Substack",
    href: "https://safeainetherlands.substack.com/",
    detail: t.contact.elsewhere.substack,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/safe-ai-netherlands/",
    detail: t.contact.elsewhere.linkedin,
  },
];

const emailLinkClass =
  "font-sans text-label text-navy underline decoration-navy/20 underline-offset-4 transition-[text-decoration-color] hover:decoration-navy focus-visible:decoration-navy [overflow-wrap:anywhere]";

export default function ContactPage() {
  return (
    <>
      {/* A directory, not a pitch: the hero says which question this page
          answers and then gets out of the way. No CTA, because the action the
          reader came for is on every row below. */}
      <section
        aria-labelledby="contact-heading"
        className="relative isolate overflow-hidden bg-white"
      >
        <SectionOrbits className="-left-24 top-0 h-[420px] w-[320px] md:-left-14" />
        <div className="shell band-hero flex flex-col gap-6">
          <h1
            id="contact-heading"
            className="max-w-[760px] font-serif text-display text-navy"
          >
            {t.contact.hero.heading}
          </h1>
          <p className="max-w-[var(--container-copy)] font-sans text-body text-navy/72">
            {t.contact.hero.body}
          </p>
        </div>
      </section>

      {/* National role addresses. Five rows on hairlines, because five cards
          would give a list of inboxes the weight of a section. */}
      <section aria-labelledby="national-heading" className="bg-white">
        <div className="shell">
          <div className="border-t border-navy/14" />
        </div>
        <Reveal className="shell band-section flex flex-col gap-8">
          <div className="flex flex-col gap-2.5">
            <h2
              id="national-heading"
              className="font-serif text-heading text-navy"
            >
              {t.contact.national.heading}
            </h2>
            <p className="max-w-[var(--container-copy)] font-sans text-body text-navy/74">
              {t.contact.national.body}
            </p>
          </div>

          <ul className="flex flex-col">
            {nationalContacts.map((contact) => (
              <li
                key={contact.email}
                className="grid items-baseline gap-x-8 gap-y-1.5 border-t border-navy/10 py-5 md:grid-cols-[minmax(0,210px)_minmax(0,1fr)_minmax(0,auto)]"
              >
                <h3 className="font-serif text-title-sm text-navy">
                  {t.contact.national.addresses[contact.key].label}
                </h3>
                <p className="font-sans text-body text-navy/72">
                  {t.contact.national.addresses[contact.key].detail}
                </p>
                <a href={`mailto:${contact.email}`} className={emailLinkClass}>
                  {contact.email}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* The cities. Same rows, three times, because the chapters are peers. */}
      <section
        aria-labelledby="chapters-heading"
        className="border-t border-navy/10 bg-cream"
      >
        <Reveal className="shell band-section flex flex-col gap-8">
          <div className="flex flex-col gap-2.5">
            <h2
              id="chapters-heading"
              className="font-serif text-heading-sm text-navy"
            >
              {t.contact.chapters.heading}
            </h2>
            <p className="max-w-[var(--container-copy)] font-sans text-body text-navy/74">
              {t.contact.chapters.body}
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-3 lg:gap-8">
            {chapterRoleEmails.map((chapter) => (
              <article key={chapter.chapter} className="flex flex-col gap-4">
                <h3 className="font-serif text-title text-navy">
                  {chapter.chapter}
                </h3>
                <ul className="flex flex-col">
                  {chapter.roles.map((role) => (
                    <li
                      key={`${chapter.chapter}-${role.label}`}
                      className="flex flex-col gap-1 border-t border-navy/10 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                    >
                      <span className="font-sans text-caption text-navy/65">
                        {t.contact.chapters.roles[role.label]}
                      </span>
                      <a
                        href={`mailto:${role.email}`}
                        className={`${emailLinkClass} sm:text-right`}
                      >
                        {role.email}
                      </a>
                    </li>
                  ))}
                </ul>
                <Link
                  href={chapter.href}
                  className="inline-flex w-fit items-center gap-1.5 font-sans text-label text-navy underline decoration-navy/20 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
                >
                  {t.contact.chapters.viewChapter}
                  <ArrowRight size={16} weight="regular" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>

          {/* The one ask a directory can earn, and the page's only orange:
              writing to a chapter and joining one are different doors, and
              this is the second. */}
          <div className="flex flex-col gap-4 border-t border-navy/14 pt-7">
            <p className="max-w-[var(--container-copy)] font-sans text-body text-navy/74">
              {t.contact.chapters.joinInstead}
            </p>
            {/* "Join the community" is reserved site-wide for the onboarding
                form; this is the community page, so it says so. */}
            <Link href="/community" className="btn-accent w-fit">
              {t.contact.chapters.visitTheCommunity}
            </Link>
          </div>
        </Reveal>
      </section>

      {/* The named leads. The shared inboxes were printed two bands ago, so
          this one prints only what is new: the person, and the address only
          they read. Cells on a left hairline rather than a fourth stack of
          label-and-email rows. */}
      <section
        aria-labelledby="leads-heading"
        className="border-t border-navy/10 bg-white"
      >
        <Reveal className="shell band-section flex flex-col gap-8">
          <div className="flex flex-col gap-2.5">
            <h2 id="leads-heading" className="font-serif text-heading-sm text-navy">
              {t.contact.leads.heading}
            </h2>
            <p className="max-w-[var(--container-copy)] font-sans text-body text-navy/74">
              {t.contact.leads.body}
            </p>
          </div>

          <ul className="grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {leadershipContacts.map((person) => (
              <li
                key={person.names}
                className="flex flex-col gap-3 border-l border-navy/14 py-1 pl-[18px]"
              >
                <div>
                  <h3 className="font-serif text-title-sm text-navy">
                    {person.names}
                  </h3>
                  <p className="mt-0.5 font-sans text-footnote text-navy/65">
                    {person.role}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <a
                    href={`mailto:${person.email}`}
                    className={emailLinkClass}
                  >
                    {person.email}
                  </a>
                  {person.alsoAnswers ? (
                    <p className="font-sans text-footnote text-navy/60">
                      {person.alsoAnswers === "formal"
                        ? t.contact.leads.alsoAnswersFormal
                        : format(t.contact.leads.alsoAnswersChapter, person.alsoAnswers)}
                    </p>
                  ) : null}
                </div>
                {person.linkedin ? (
                  <a
                    href={person.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-fit items-center gap-1.5 font-sans text-label text-navy/72 underline decoration-navy/20 underline-offset-4 hover:text-navy hover:decoration-navy focus-visible:text-navy"
                  >
                    {t.contact.leads.profile}
                    <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
                    <span className="sr-only"> {t.common.opensInNewTab}</span>
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* What is left of a contact page once the inboxes are done: where the
          foundation is registered, and where it publishes. */}
      <section
        aria-labelledby="elsewhere-heading"
        className="border-t border-navy/10 bg-cream"
      >
        <Reveal className="shell band-index flex flex-col gap-8">
          <h2
            id="elsewhere-heading"
            className="font-serif text-heading-sm text-navy"
          >
            Where else to find SAIN.
          </h2>
          <div className="grid gap-8 border-t border-navy/14 pt-6 md:grid-cols-2 md:gap-16">
            <div className="flex flex-col gap-2">
              {/* Column labels, not section names: the kicker is reserved for
                  the latter, and this band already has its heading. */}
              <p className="font-sans text-caption text-navy/65">
                {t.contact.elsewhere.registeredAddress}
              </p>
              <address className="font-sans text-body not-italic text-navy/74">
                Stichting Safe AI Netherlands
                <br />
                Hereplein 4
                <br />
                9711 GA Groningen
                <br />
                {t.contact.elsewhere.country}
              </address>
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-sans text-caption text-navy/65">{t.contact.elsewhere.online}</p>
              <ul className="flex flex-col gap-2">
                {online.map((channel) => (
                  <li key={channel.name} className="flex flex-wrap items-baseline gap-x-3">
                    <a
                      href={channel.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-sans text-body text-navy underline decoration-navy/20 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
                    >
                      {channel.name}
                      <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
                      <span className="sr-only"> {t.common.opensInNewTab}</span>
                    </a>
                    <span className="font-sans text-caption text-navy/65">
                      {channel.detail}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
