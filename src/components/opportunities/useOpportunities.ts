"use client";

import { useEffect, useMemo, useState } from "react";
import { useLiveTracker } from "@/components/research/useLiveTracker";
import {
  fromListing,
  fromTracker,
  todayInAmsterdam,
  type Listing,
  type Opportunity,
} from "@/data/opportunities";

/* What the board and the hero's numbers both show, so the two always agree:
   SAIN's open projects from the Project Team's tracker (the copy the page
   was built with, then the latest one, as on the Project Hub), and the
   external listings the page was built with.

   `today` is unknown while the prerendered page is being read back in, so
   the first render is the built one; once it is known, a listing whose
   deadline has passed since the last build is no longer shown. */
export function useOpportunities(listings: Listing[], sainOrg = "") {
  const { tracker } = useLiveTracker();
  const [today, setToday] = useState<string | null>(null);
  useEffect(() => setToday(todayInAmsterdam()), []);

  const sain = useMemo<Opportunity[]>(
    () => tracker.projects.filter((project) => project.status === "open").map((project) => fromTracker(project, sainOrg)),
    [tracker, sainOrg],
  );
  const external = useMemo<Opportunity[]>(
    () => listings.filter((listing) => !today || !listing.deadline || listing.deadline >= today).map(fromListing),
    [listings, today],
  );

  return { sain, external, today };
}
