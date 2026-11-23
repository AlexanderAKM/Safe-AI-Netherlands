"use client";

import { useTranslations } from "next-intl";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { useOpportunities } from "@/components/opportunities/useOpportunities";
import { regions, type Listing, type Region } from "@/data/opportunities";

/* The hero's right-hand side: the page's premise as a thin index. A role is
   open to a reader in the Netherlands in one of three ways, and each row
   says how many there are of that kind and takes the reader to the board
   with that answer already chosen.

   The row and the board are separate components on the same page, so the row
   asks by event (REGION_REQUEST) and OpportunityBoard listens.

   With no listings from other organisations the three counts would only
   repeat the number of SAIN projects, so the index waits until there are.

   Its words are opportunities.index; the page wraps it in <ClientMessages>. */

export const REGION_REQUEST = "sain:opportunity-region";

export function requestRegion(region: Region) {
  window.dispatchEvent(new CustomEvent<Region>(REGION_REQUEST, { detail: region }));
}

export default function OpportunityIndex({ listings }: { listings: Listing[] }) {
  const t = useTranslations("opportunities.index");
  const { sain, external } = useOpportunities(listings);
  if (external.length === 0) return null;
  const all = [...sain, ...external];

  return (
    <div className="w-full lg:max-w-[420px]">
      <p className="kicker text-kicker text-navy/65">{t("kicker")}</p>
      <ul role="list" className="mt-4 border-b border-navy/14">
        {regions.map((region) => {
          const count = all.filter((item) => item.regions.includes(region)).length;
          return (
            <li key={region} className="border-t border-navy/14">
              <button
                type="button"
                onClick={() => requestRegion(region)}
                className="group flex w-full items-center justify-between gap-6 py-4 text-left"
              >
                <span className="font-serif text-title text-navy">{t(region)}</span>
                <span className="flex shrink-0 items-center gap-3 font-sans text-label tabular-nums text-navy/60 transition-colors duration-200 group-hover:text-navy group-focus-visible:text-navy">
                  {count}
                  <span className="sr-only"> {t("unit", { count })}</span>
                  <ArrowRightIcon
                    size={16}
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1"
                  />
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
