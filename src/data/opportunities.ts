import { APPLY_PATH } from "@/data/research";
import type { TrackerProject } from "@/data/tracker";

/* The opportunities board (/research/opportunities): AI Safety work a reader
   in the Netherlands can take. Two lists, shown as one:

   - SAIN's own projects that are still looking for people: the open ones in
     the Project Team's tracker, the same Airtable source as the Project Hub
     (src/data/tracker.ts). They are pinned first.
   - Listings from other organisations, collected once a day into a JSON file
     (scripts/fetch-opportunities.mjs) that the site reads when it is built
     (src/data/opportunitiesFile.ts). Each one links to its original posting
     and credits where it was found.

   This file is the board's own vocabulary, safe to load in the browser. */

/** Why a listing is open to someone in the Netherlands: based here, remote
    from the EU, or based elsewhere in the EU or EEA (or in Switzerland). */
export const regions = ["nl", "remote", "eu"] as const;
export type Region = (typeof regions)[number];

/** What kind of opening it is. `key` names its labels in
    messages/<locale>/opportunities.json, under board.type and board.typeTag. */
export const opportunityTypes = [
  "project",
  "job",
  "fellowship",
  "internship",
  "course",
  "funding",
  "other",
] as const;
export type OpportunityType = (typeof opportunityTypes)[number];

/** A listing as the daily fetch writes it: what the page shows of a posting
    and nothing else. `locations` are the source's own words. */
export type Listing = {
  id: string;
  source: string;
  title: string;
  org: string;
  locations: string[];
  regions: Region[];
  type: OpportunityType;
  /** The last day to apply, as a calendar day ("2026-12-01"). */
  deadline?: string;
  url: string;
};

export type ListingsFile = {
  /* When a listing last changed, as an ISO date. */
  updatedAt: string;
  listings: Listing[];
};

/** Where external listings come from, by the `source` the fetch gives them:
    the name each card credits ("via 80,000 Hours") and the board itself. */
export const listingSources: Record<string, { name: string; url: string }> = {
  "80000hours": { name: "80,000 Hours", url: "https://jobs.80000hours.org/" },
};

export const SAIN_SOURCE = "sain";

/** One card on the board, whichever list it came from. */
export type Opportunity = {
  id: string;
  source: string;
  title: string;
  org: string;
  /** A SAIN project's supervisor. */
  person?: string;
  type: OpportunityType;
  locations: string[];
  regions: Region[];
  deadline?: string;
  /** The original posting; for a SAIN project, the application form with
      the project chosen, as a path on this site. */
  url: string;
  /** A SAIN project's topics, as Airtable writes them. */
  topics: string[];
  /** Whose students may apply to a SAIN project ("VU"); empty means everyone. */
  universities: string[];
};

/* A Project Hub project has no office: the hub is remote-friendly and its
   supervisors are at Dutch universities, so a project counts as both in the
   Netherlands and remote. It has no deadline either: the hub takes
   applications at any time. */
export function fromTracker(project: TrackerProject, org: string): Opportunity {
  return {
    id: `${SAIN_SOURCE}:${project.id}`,
    source: SAIN_SOURCE,
    title: project.title,
    org,
    person: project.supervisor,
    type: "project",
    locations: [],
    regions: ["nl", "remote"],
    url: `${APPLY_PATH}?project=${encodeURIComponent(project.id)}`,
    topics: project.topics,
    universities: project.universities,
  };
}

export function fromListing(listing: Listing): Opportunity {
  return { ...listing, topics: [], universities: [] };
}

/** Whole days from one calendar day to another ("2026-11-23" to
    "2026-12-01" is 8). */
export function daysBetween(from: string, to: string) {
  return Math.round((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / 86_400_000);
}

/** Today as a calendar day in the Netherlands, where the deadlines are read. */
export function todayInAmsterdam(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Amsterdam" }).format(now);
}
