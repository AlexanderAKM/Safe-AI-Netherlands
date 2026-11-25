"use client";

import { useTranslations } from "next-intl";
import { useOpportunities } from "@/components/opportunities/useOpportunities";
import type { Listing } from "@/data/opportunities";

/* The hero's numbers, counted off the same lists the board shows, the way
   the Project Hub's are (src/components/research/HeroFacts.tsx): checkable
   facts on a hairline, each linking down to what it counts. A list with
   nothing in it is left out rather than shown as a zero.

   Its words are opportunities.facts; the page wraps it in <ClientMessages>. */
export default function OpportunityFacts({ listings }: { listings: Listing[] }) {
  const t = useTranslations("opportunities.facts");
  const { sain, external } = useOpportunities(listings);
  const facts = [
    ...(sain.length > 0 ? [{ text: t("projects", { count: sain.length }), href: "#sain-projects" }] : []),
    ...(external.length > 0
      ? [{ text: t("listings", { count: external.length }), href: "#listings" }, { text: t("daily") }]
      : []),
  ];
  if (facts.length === 0) return null;

  return (
    <ul role="list" className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-navy/14 pt-4">
      {facts.map((fact, i) => (
        <li key={fact.text} className="flex items-center gap-3">
          {i > 0 ? <span aria-hidden="true" className="text-navy/25">·</span> : null}
          {"href" in fact && fact.href ? (
            <a
              href={fact.href}
              className="font-sans text-footnote text-navy/65 underline decoration-navy/15 underline-offset-4 hover:text-navy hover:decoration-navy focus-visible:decoration-navy"
            >
              {fact.text}
            </a>
          ) : (
            <span className="font-sans text-footnote text-navy/65">{fact.text}</span>
          )}
        </li>
      ))}
    </ul>
  );
}
