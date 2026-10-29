import snapshot from "./airtableProjects.json";

/* The Project Team's tracker, from Airtable: the "Open Projects (Website)"
   view of the Project Hub table in the SAIN Pipeline base. Every build reads
   it into airtableProjects.json (scripts/fetch-airtable-projects.mjs), which
   holds only public fields: never a supervisor's email, never Notes. When the
   build has no Airtable token, the copy committed to the repo stands in, and
   `trackerUpdatedAt` says how old it is.

   The view's Name reads "Supervisor: Project title", so the supervisor's name
   comes from there. Status is the team's own: an accepted project is one open
   to students. A record with any other status, or none, is left out rather
   than guessed at. */

type AirtableRecord = {
  id: string;
  name: string;
  status: string;
  description: string;
  tags: string[];
  website?: string;
};

export type TrackerStatus = "open" | "in-progress" | "completed";

export type TrackerProject = {
  id: string;
  title: string;
  supervisor?: string;
  website?: string;
  status: TrackerStatus;
  summary: string;
  tags: string[];
};

const STATUSES: Record<string, TrackerStatus> = {
  "Project Accepted": "open",
  "Project In-Progress": "in-progress",
  "Project Completed": "completed",
};

/* In the order the tracker lists them: what a student can still join first. */
export const trackerStatuses: { value: TrackerStatus; label: string }[] = [
  { value: "open", label: "Open" },
  { value: "in-progress", label: "In progress" },
  { value: "completed", label: "Completed" },
];

const statusRank = (status: TrackerStatus) => trackerStatuses.findIndex((item) => item.value === status);

/* Web addresses only, given the https:// the field often leaves off; anything
   else (a mailto:, a javascript: link) is dropped. */
function webHref(value?: string) {
  if (!value) return undefined;
  try {
    const url = new URL(/^[a-z][a-z0-9+.-]*:/i.test(value) ? value : `https://${value}`);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : undefined;
  } catch {
    return undefined;
  }
}

const data = snapshot as { fetchedAt: string; records: AirtableRecord[] };

export const trackerUpdatedAt = data.fetchedAt;

/* Sorted by status and otherwise kept in the view's own order, so the team
   can arrange it in Airtable. */
export const trackerProjects: TrackerProject[] = data.records
  .flatMap((record) => {
    const status = STATUSES[record.status];
    if (!status) return [];
    const named = record.name.match(/^([^:]{2,60}):\s+(.+)$/);
    return [
      {
        id: record.id,
        title: named ? named[2] : record.name,
        supervisor: named?.[1],
        website: webHref(record.website),
        status,
        summary: record.description,
        tags: record.tags,
      },
    ];
  })
  .sort((a, b) => statusRank(a.status) - statusRank(b.status));
