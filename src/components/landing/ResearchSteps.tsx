import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import ResearchPeople from "./ResearchPeople";
import FeaturedPublications from "./FeaturedPublications";
import { SUPERVISOR_INTEREST_FORM_URL } from "@/data/research";
import { getDictionary, type Locale } from "@/i18n";

// Copy follows docs/research_hub_handbook.md: scope, programme modes,
// applications, assignment, deliverables, and project-specific resources.
/* The numeral is set in the page's own serif at the heading's size, so its
   baseline lands on the title's without a nudge, and so the marker belongs to
   this page rather than to an icon set. A circled digit from Phosphor was a
   stock glyph doing brand work.

   All three carry the same weight. The numerals count the steps; they are not
   the place to say which one matters most. */
function ResearchStep({ step, title, id, children }: {
  step: string;
  title: string;
  id: string;
  children: ReactNode;
}) {
  return (
    <li id={id} className="relative scroll-mt-36 pb-12 before:absolute before:bottom-0 before:left-[19px] before:top-11 before:w-px before:bg-white/[0.08] last:pb-0 last:before:hidden md:pb-16">
      <div className="grid grid-cols-[40px_minmax(0,1fr)] gap-x-4">
        <span aria-hidden="true" className="font-serif text-heading-sm tabular-nums text-white/40">
          {step}
        </span>
        <div className="min-w-0">
          <h3 id={`${id}-heading`} className="font-serif text-heading-sm">{title}</h3>
          {children}
        </div>
      </div>
    </li>
  );
}

export default function ResearchSteps({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  const t = dictionary.landing.researchSteps;
  return (
    <ol role="list" aria-label={t.label} className="mt-12 md:mt-16">
      <ResearchStep step="01" id="research-project" title={t.project.title}>
        <p className="mt-5 max-w-[760px] text-body text-white/75">
          {t.project.body}
        </p>
        <Link href="/research/handbook" className="mt-6 inline-flex items-center gap-3 text-label leading-6 text-white/80 underline decoration-white/35 underline-offset-4 hover:text-white focus-visible:text-white">
          {t.project.link} <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </ResearchStep>

      <ResearchStep step="02" id="research-support" title={t.support.title}>
        <p className="mt-5 max-w-[760px] text-body text-white/75">
          {t.support.body}
        </p>
        <div className="mt-6">
          <p className="mb-5 text-label text-white/65">{t.support.agendas}</p>
          <ResearchPeople locale={locale} />
          {/* Same supervisor form /research and the handbook link to. */}
          <a href={SUPERVISOR_INTEREST_FORM_URL} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-3 text-label text-white/80 underline decoration-white/35 underline-offset-4 hover:text-white focus-visible:text-white">
            {t.support.becomeSupervisor} <ArrowUpRight size={16} aria-hidden="true" />
            <span className="sr-only"> {dictionary.common.opensInNewTab}</span>
          </a>
        </div>
      </ResearchStep>

      <ResearchStep step="03" id="output" title={t.publish.title}>
        <p className="mt-5 max-w-[760px] text-body text-white/75">
          {t.publish.body}
        </p>
        <FeaturedPublications locale={locale} />
        <Link href="/research#publications" className="mt-8 inline-flex items-center gap-3 text-label text-white/80 underline decoration-white/35 underline-offset-4 hover:text-white focus-visible:text-white">
          {t.publish.link} <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </ResearchStep>
    </ol>
  );
}
