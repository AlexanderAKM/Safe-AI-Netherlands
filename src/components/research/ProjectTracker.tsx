"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpRightIcon, CaretDownIcon, MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import { Segmented } from "@/components/research/ProjectBrowser";
import {
  TRACKER_DATA_URL,
  readTracker,
  trackerSnapshot,
  trackerStatuses,
  type TrackerProject,
  type TrackerStatus,
} from "@/data/tracker";

/* The Project Team's tracker, in the site's own language instead of an
   Airtable frame: a search, the status as a joined control whose counts are
   the tracker's numbers at a glance, and the projects as a ruled list. A list
   rather than cards, so it reads as the record it is and not as a second copy
   of the project browser above it.

   The page is built with the copy in src/data, then swaps in the latest one
   from the tracker-data branch once the browser has it; the section sits far
   enough down the page that the swap is done before a reader gets there. If
   GitHub cannot be reached, the built copy simply stays.

   It opens on its first six, with a button for the rest, like the browser. */

const PREVIEW_COUNT = 6;

/* Fixed to Amsterdam time and an en-GB date, so the build and the browser
   write the same words. */
const dateFormat = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "long",
  timeStyle: "short",
  timeZone: "Europe/Amsterdam",
});

const statusLabel = (status: TrackerStatus) => trackerStatuses.find((item) => item.value === status)?.label ?? "";

/* Every word has to appear somewhere in the project, in any order. */
function matches(project: TrackerProject, query: string) {
  const haystack = [project.title, project.supervisor, project.summary, statusLabel(project.status), ...project.tags]
    .join(" ")
    .toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word));
}

/* Open is navy, in progress orange (taken, for now), completed eased back. */
function StatusLabel({ status }: { status: TrackerStatus }) {
  const tone =
    status === "open"
      ? "text-navy [&>span]:bg-navy"
      : status === "in-progress"
        ? "text-orange-ink [&>span]:bg-orange"
        : "text-navy/60 [&>span]:border [&>span]:border-navy/45";
  return (
    <p className={`inline-flex shrink-0 items-center gap-2 text-caption font-medium leading-[18px] ${tone}`}>
      <span aria-hidden="true" className="size-2" />
      {statusLabel(status)}
    </p>
  );
}

function TrackerRow({ project }: { project: TrackerProject }) {
  return (
    <li className="flex flex-col p-5 md:p-6">
      <div className="flex items-start justify-between gap-4">
        <h4 className="font-serif text-title-sm text-navy">{project.title}</h4>
        <div className="mt-1">
          <StatusLabel status={project.status} />
        </div>
      </div>
      {project.supervisor && (
        <p className="mt-2 text-caption leading-[18px] text-navy/65">
          {project.website ? (
            <a
              href={project.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
            >
              {project.supervisor}
              <ArrowUpRightIcon size={13} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : (
            <span className="font-medium text-navy">{project.supervisor}</span>
          )}
        </p>
      )}
      {project.summary && <p className="mt-3 max-w-[820px] text-[15px] leading-6 text-navy/78">{project.summary}</p>}
      {project.tags.length > 0 && (
        <ul role="list" className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <li key={tag} className="bg-navy/[0.05] px-2 py-1 text-[12px] leading-4 text-navy/70">
              {tag}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default function ProjectTracker() {
  const [tracker, setTracker] = useState(trackerSnapshot);
  useEffect(() => {
    const controller = new AbortController();
    fetch(TRACKER_DATA_URL, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : undefined))
      .then((data) => {
        const latest = readTracker(data);
        if (latest) setTracker(latest);
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  const [query, setQuery] = useState("");
  const [statuses, setStatuses] = useState<TrackerStatus[]>([]);
  const [expanded, setExpanded] = useState(false);

  const found = useMemo(() => tracker.projects.filter((project) => matches(project, query)), [tracker, query]);
  const shown = statuses.length === 0 ? found : found.filter((project) => statuses.includes(project.status));
  const visible = expanded ? shown : shown.slice(0, PREVIEW_COUNT);
  const clear = () => {
    setQuery("");
    setStatuses([]);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 border border-navy/12 bg-white px-4 py-4 md:px-6 md:py-5 lg:flex-row lg:items-end">
        <label className="relative block min-w-0 flex-1">
          <span className="sr-only">Search the tracker</span>
          <MagnifyingGlassIcon
            size={18}
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-navy/50"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Topic, person or university"
            className="h-12 w-full appearance-none border border-navy/18 bg-white pl-10 pr-11 text-[15px] text-navy placeholder:text-navy/45 focus:border-navy focus-visible:outline-none [&::-webkit-search-cancel-button]:appearance-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-1 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center text-navy/45 hover:text-navy focus-visible:outline-offset-0"
            >
              <XIcon size={16} aria-hidden="true" />
            </button>
          )}
        </label>
        <Segmented
          label="Status"
          groupLabel="Project status"
          options={[
            {
              value: "all",
              label: "All",
              n: found.length,
              on: statuses.length === 0,
              onClick: () => setStatuses([]),
            },
            ...trackerStatuses.map(({ value, label }) => ({
              value,
              label,
              n: found.filter((project) => project.status === value).length,
              on: statuses.includes(value),
              onClick: () =>
                setStatuses(statuses.includes(value) ? statuses.filter((item) => item !== value) : [...statuses, value]),
            })),
          ]}
        />
      </div>

      <p className="text-caption text-navy/65" aria-live="polite">
        {shown.length} {shown.length === 1 ? "project" : "projects"}
        {query ? ` matching "${query}"` : ""}
        <span className="text-navy/45"> · </span>
        Updated {dateFormat.format(new Date(tracker.updatedAt))}
      </p>

      {shown.length > 0 ? (
        <div className="flex flex-col items-center gap-6">
          <ul
            id="tracker-list"
            role="list"
            className="w-full divide-y divide-navy/10 border border-navy/12 bg-white"
          >
            {visible.map((project) => (
              <TrackerRow key={project.id} project={project} />
            ))}
          </ul>
          {shown.length > PREVIEW_COUNT && (
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls="tracker-list"
              onClick={() => setExpanded(!expanded)}
              className="btn-outline-ink gap-2"
            >
              {expanded ? "Show fewer" : `Show all ${shown.length} in the tracker`}
              <CaretDownIcon
                size={14}
                weight="bold"
                aria-hidden="true"
                className={`transition-transform duration-[250ms] ${expanded ? "rotate-180" : ""}`}
              />
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 border border-dashed border-navy/20 bg-white px-6 py-10 text-center">
          <p className="text-body text-navy/74">No project in the tracker matches.</p>
          <button
            type="button"
            onClick={clear}
            className="text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}
