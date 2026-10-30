import snapshot from "./airtableProjects.json";

/* The Project Team's tracker, from Airtable: the "Open Projects (Website)"
   view of the Project Hub table in the SAIN Pipeline base.

   An hourly workflow (.github/workflows/refresh-project-tracker.yml) reads it
   with scripts/fetch-airtable-projects.mjs and, when a project changed,
   commits the result to the `tracker-data` branch. The page loads that file
   in the reader's browser (TRACKER_DATA_URL), so a change shows without a
   rebuild. The copy in this folder is what the page is built with: what a
   reader sees first, and all they see if GitHub cannot be reached. Both hold
   only public fields: never a supervisor's email, never Notes.

   The view's Name reads "Supervisor: Project title", so the supervisor's name
   comes from there. Status is the team's own: an accepted project is one open
   to students, and a full one is still offered but not taking anyone new for
   now. A record with any other status, or none, is left out rather than
   guessed at.

   A local test build can point the page at another copy with
   NEXT_PUBLIC_TRACKER_DATA_URL; the live site leaves it unset. */

export const TRACKER_DATA_URL =
  process.env.NEXT_PUBLIC_TRACKER_DATA_URL ||
  "https://raw.githubusercontent.com/AlexanderAKM/Safe-AI-Netherlands/tracker-data/airtableProjects.json";

export type TrackerStatus = "open" | "in-progress" | "completed" | "full";

export type TrackerProject = {
  id: string;
  title: string;
  supervisor?: string;
  website?: string;
  status: TrackerStatus;
  summary: string;
  /* Whose students may apply ("VU", "UvA"); empty means everyone. */
  universities: string[];
  /* The thesis levels it can count as ("Master's thesis"); empty means none. */
  theses: string[];
  /* Every other tag: topics, and kinds of project such as a team project. */
  topics: string[];
};

export type Tracker = {
  /* When a project last changed, as an ISO date. */
  updatedAt: string;
  projects: TrackerProject[];
};

const STATUSES: Record<string, TrackerStatus> = {
  "Project Accepted": "open",
  "Project In-Progress": "in-progress",
  "Project Completed": "completed",
  "Project Full": "full",
};

/* In the order the tracker lists them: what a student can still join first,
   and full projects last, as on the hand-kept cards. */
export const trackerStatuses: { value: TrackerStatus; label: string }[] = [
  { value: "open", label: "Open" },
  { value: "in-progress", label: "In progress" },
  { value: "completed", label: "Completed" },
  { value: "full", label: "Full" },
];

const statusRank = (status: TrackerStatus) => trackerStatuses.findIndex((item) => item.value === status);

const text = (value: unknown) => (typeof value === "string" ? value.trim() : "");

/* Airtable's tags are in title case ("Formal Methods"); the site writes
   sentence case ("Formal methods") and keeps acronyms ("Alignment and RL"). */
const sentenceCase = (tag: string) =>
  tag
    .split(" ")
    .map((word, i) => (i === 0 || /^[A-Z]{2,}$/.test(word) ? word : word.toLowerCase()))
    .join(" ");

/* The university abbreviations as students write them. */
const UNIVERSITIES: Record<string, string> = { VU: "VU", UVA: "UvA", RUG: "RUG", UU: "UU" };
export const universityOrder = Object.values(UNIVERSITIES);

/* Project Tags mixes three kinds of tag: "VU Only" and the like say whose
   students may apply, a tag with "thesis" in it says the project can be a
   thesis at that level, and the rest are topics and kinds of project. Sorted
   by pattern rather than by a fixed list, so a tag added in Airtable lands in
   the right filter on its own. */
function sortTags(tags: string[]) {
  const universities: string[] = [];
  const theses: string[] = [];
  const topics: string[] = [];
  for (const tag of tags) {
    const only = tag.match(/^(.+?)\s+only$/i);
    if (only) universities.push(UNIVERSITIES[only[1].toUpperCase()] ?? only[1]);
    else if (/thesis/i.test(tag)) theses.push(sentenceCase(tag));
    else topics.push(sentenceCase(tag));
  }
  return { universities, theses, topics };
}

/* Web addresses only, given the https:// the field often leaves off; anything
   else (a mailto:, a javascript: link) is dropped. */
function webHref(value: string) {
  if (!value) return undefined;
  try {
    const url = new URL(/^[a-z][a-z0-9+.-]*:/i.test(value) ? value : `https://${value}`);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : undefined;
  } catch {
    return undefined;
  }
}

/* Reads the file the fetch script writes. It also reads the copy loaded from
   GitHub, so nothing in it is taken on trust: a file that is not the tracker
   gives undefined, and the page keeps what it has. Sorted by status and
   otherwise kept in the view's own order, so the team can arrange it in
   Airtable. */
export function readTracker(data: unknown): Tracker | undefined {
  if (!data || typeof data !== "object") return undefined;
  const { updatedAt, records } = data as { updatedAt?: unknown; records?: unknown };
  if (typeof updatedAt !== "string" || Number.isNaN(Date.parse(updatedAt)) || !Array.isArray(records)) {
    return undefined;
  }
  const projects = records
    .flatMap((record): TrackerProject[] => {
      if (!record || typeof record !== "object") return [];
      const name = text(record.name);
      const status = STATUSES[text(record.status)];
      if (!name || !status) return [];
      const named = name.match(/^([^:]{2,60}):\s+(.+)$/);
      return [
        {
          id: text(record.id) || name,
          title: named ? named[2] : name,
          supervisor: named?.[1],
          website: webHref(text(record.website)),
          status,
          summary: text(record.description),
          ...sortTags(Array.isArray(record.tags) ? record.tags.map(text).filter(Boolean) : []),
        },
      ];
    })
    .sort((a, b) => statusRank(a.status) - statusRank(b.status));
  return projects.length > 0 ? { updatedAt, projects } : undefined;
}

const built = readTracker(snapshot);
if (!built) throw new Error("src/data/airtableProjects.json holds no projects the tracker can show");

/* The copy the page is built with. */
export const trackerSnapshot: Tracker = built;
