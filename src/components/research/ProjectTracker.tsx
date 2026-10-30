"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRightIcon,
  CaretDownIcon,
  FunnelSimpleIcon,
  MagnifyingGlassIcon,
  XIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Count, Segmented, chipClass } from "@/components/research/ProjectBrowser";
import { PROJECTS_EMAIL } from "@/data/research";
import {
  trackerStatuses,
  universityOrder,
  type Tracker,
  type TrackerProject,
  type TrackerStatus,
} from "@/data/tracker";

/* The Project Team's tracker, in the site's own language: a search, the
   status as a joined control whose counts are the tracker's numbers at a
   glance, and the projects as a ruled list.

   The tags in Airtable become filters behind a Filters button: who can apply
   (a "VU Only" tag and the like), thesis level, and topic. A filter shows only
   once some project carries a tag for it, so an untagged tracker shows a plain
   search rather than filters that all say 0. As in the hand-kept browser,
   every answer shows how many projects it would leave, and what is chosen
   stays in sight as pills under the search.

   It opens on its first six, with a button for the rest. */

const PREVIEW_COUNT = 6;

/* Fixed to Amsterdam time and an en-GB date, so the build and the browser
   write the same words. */
const dateFormat = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "long",
  timeStyle: "short",
  timeZone: "Europe/Amsterdam",
});

const statusLabel = (status: TrackerStatus) => trackerStatuses.find((item) => item.value === status)?.label ?? "";

/* A project with no "... Only" tag is open to everyone; one with no thesis
   tag is not a thesis. */
const EVERYONE = "everyone";
const NOT_A_THESIS = "not a thesis";
const whoOf = (project: TrackerProject) => (project.universities.length ? project.universities : [EVERYONE]);
const thesesOf = (project: TrackerProject) => (project.theses.length ? project.theses : [NOT_A_THESIS]);

const whoLabel = (who: string) => (who === EVERYONE ? "Open to everyone" : `${who} students only`);
const thesisLabel = (thesis: string) => (thesis === NOT_A_THESIS ? "Not a thesis" : thesis);

function joinOr(items: string[]) {
  return items.length <= 1 ? items.join("") : `${items.slice(0, -1).join(", ")} or ${items[items.length - 1]}`;
}

/* Universities by every name people search for: "UvA" finds a project whose
   description says "University of Amsterdam", and the other way round. */
const UNIVERSITY_NAMES: [RegExp, string][] = [
  [/vrije universiteit|\bvu\b/i, "VU Vrije Universiteit"],
  [/university of amsterdam|\buva\b/i, "UvA University of Amsterdam"],
  [/university of groningen|\brug\b/i, "RUG University of Groningen"],
  [/utrecht university|\buu\b/i, "UU Utrecht University"],
];

function matches(project: TrackerProject, query: string) {
  if (!query) return true;
  const text = [
    project.title,
    project.supervisor ?? "",
    project.summary,
    statusLabel(project.status),
    project.universities.map(whoLabel).join(" "),
    ...project.theses,
    ...project.topics,
  ].join(" ");
  const haystack = [text, ...UNIVERSITY_NAMES.filter(([pattern]) => pattern.test(text)).map(([, names]) => names)]
    .join(" ")
    .toLowerCase();
  const words = haystack.split(/[^a-z0-9]+/);
  /* Short terms ("VU", "RL", "LLM") match whole words, plural allowed, so
     "VU" finds the VU and not "vulnerability". Longer terms match anywhere,
     so "interp" still finds "interpretability". */
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) =>
      term.length <= 3 ? words.some((word) => word === term || word === `${term}s`) : haystack.includes(term),
    );
}

type Filters = {
  query: string;
  statuses: TrackerStatus[];
  who: string[];
  theses: string[];
  topics: string[];
};

const NO_FILTERS: Filters = { query: "", statuses: [], who: [], theses: [], topics: [] };

/* Within a filter one answer is enough ("VU or UvA"); across filters a
   project must match each. `skip` leaves one filter out, so that filter's own
   counts say what choosing an answer would leave. */
function passes(project: TrackerProject, filters: Filters, skip?: keyof Filters) {
  const any = (values: string[], chosen: string[]) => chosen.length === 0 || values.some((v) => chosen.includes(v));
  return (
    (skip === "query" || matches(project, filters.query)) &&
    (skip === "statuses" || any([project.status], filters.statuses)) &&
    (skip === "who" || any(whoOf(project), filters.who)) &&
    (skip === "theses" || any(thesesOf(project), filters.theses)) &&
    (skip === "topics" || any(project.topics, filters.topics))
  );
}

const toggle = (list: string[], value: string) =>
  list.includes(value) ? list.filter((item) => item !== value) : [...list, value];

/* A filter's answers as chips that wrap, so a long list of universities or
   topics never runs off a phone. The first chip is the filter's "all", which
   clears the rest. A chip that would leave nothing is faded, not hidden. */
type Option = { value: string; label: string; n: number; on: boolean; onClick: () => void };

function ChipGroup({ label, options }: { label: string; options: Option[] }) {
  return (
    <div>
      <p className="mb-1.5 font-sans text-footnote text-navy/60">{label}</p>
      <div role="group" aria-label={label} className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={option.on}
            onClick={option.onClick}
            className={`${chipClass(option.on)} ${option.n === 0 && !option.on ? "opacity-45" : ""}`}
          >
            {option.label}
            <Count n={option.n} active={option.on} />
          </button>
        ))}
      </div>
    </div>
  );
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
        <h3 className="font-serif text-title-sm text-navy">{project.title}</h3>
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
      {/* Whose students may apply, in orange as on the hand-kept cards: it
          is the line that decides whether a project is for the reader. */}
      {project.universities.length > 0 && (
        <p className="mt-2 text-caption font-medium leading-[18px] text-orange-ink">
          {joinOr(project.universities)} students only
        </p>
      )}
      {project.summary && <p className="mt-3 max-w-[820px] text-[15px] leading-6 text-navy/78">{project.summary}</p>}
      {project.theses.length + project.topics.length > 0 && (
        <ul role="list" className="mt-3 flex flex-wrap gap-1.5">
          {project.theses.map((thesis) => (
            <li key={thesis} className="border border-orange/50 px-2 py-[3px] text-[12px] leading-4 text-orange-ink">
              {thesis}
            </li>
          ))}
          {project.topics.map((topic) => (
            <li key={topic} className="bg-navy/[0.05] px-2 py-1 text-[12px] leading-4 text-navy/70">
              {topic}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default function ProjectTracker({ tracker }: { tracker: Tracker }) {
  const [filters, setFilters] = useState<Filters>(NO_FILTERS);
  const set = (patch: Partial<Filters>) => setFilters((current) => ({ ...current, ...patch }));
  const [expanded, setExpanded] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const projects = tracker.projects;
  const shown = useMemo(() => projects.filter((project) => passes(project, filters)), [projects, filters]);
  const visible = expanded ? shown : shown.slice(0, PREVIEW_COUNT);
  const countWithout = (skip: keyof Filters, test: (project: TrackerProject) => boolean) =>
    projects.filter((project) => passes(project, filters, skip) && test(project)).length;

  /* The answers each filter offers: only what some project is tagged with. */
  const universities = useMemo(() => {
    const present = new Set(projects.flatMap((project) => project.universities));
    return [
      ...universityOrder.filter((name) => present.has(name)),
      ...Array.from(present).filter((name) => !universityOrder.includes(name)),
    ];
  }, [projects]);
  const theses = useMemo(
    () => Array.from(new Set(projects.flatMap((project) => project.theses))).sort((a, b) => a.localeCompare(b)),
    [projects],
  );
  const topics = useMemo(
    () => Array.from(new Set(projects.flatMap((project) => project.topics))).sort((a, b) => a.localeCompare(b)),
    [projects],
  );
  const hasFilters = universities.length + theses.length + topics.length > 0;

  const chosen: { label: string; clear: Partial<Filters> }[] = [
    ...filters.who.map((who) => ({ label: whoLabel(who), clear: { who: filters.who.filter((item) => item !== who) } })),
    ...filters.theses.map((thesis) => ({
      label: thesisLabel(thesis),
      clear: { theses: filters.theses.filter((item) => item !== thesis) },
    })),
    ...filters.topics.map((topic) => ({
      label: topic,
      clear: { topics: filters.topics.filter((item) => item !== topic) },
    })),
  ];
  const active = filters.query !== "" || filters.statuses.length > 0 || chosen.length > 0;

  /* Escape folds the filters away again, back onto their button. */
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!filtersOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setFiltersOpen(false);
      filterButtonRef.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [filtersOpen]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 border border-navy/12 bg-white px-4 py-4 md:px-6 md:py-5">
        <div className="flex gap-2">
          <label className="relative block min-w-0 flex-1">
            <span className="sr-only">Search projects</span>
            <MagnifyingGlassIcon
              size={18}
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-navy/50"
            />
            <input
              type="search"
              value={filters.query}
              onChange={(event) => set({ query: event.target.value })}
              placeholder="Topic, person or university"
              className="h-12 w-full appearance-none border border-navy/18 bg-white pl-10 pr-11 text-[15px] text-navy placeholder:text-navy/45 focus:border-navy focus-visible:outline-none [&::-webkit-search-cancel-button]:appearance-none"
            />
            {filters.query && (
              <button
                type="button"
                onClick={() => set({ query: "" })}
                aria-label="Clear search"
                className="absolute right-1 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center text-navy/45 hover:text-navy focus-visible:outline-offset-0"
              >
                <XIcon size={16} aria-hidden="true" />
              </button>
            )}
          </label>
          {hasFilters && (
            <button
              ref={filterButtonRef}
              type="button"
              aria-expanded={filtersOpen}
              aria-controls="project-filters"
              onClick={() => setFiltersOpen(!filtersOpen)}
              className={`inline-flex h-12 shrink-0 items-center gap-2 border px-4 text-[15px] transition-colors duration-150 ${
                filtersOpen ? "border-navy bg-navy text-white" : "border-navy/18 bg-white text-navy hover:border-navy/45"
              }`}
            >
              <FunnelSimpleIcon size={18} aria-hidden="true" />
              <span className="max-sm:sr-only">Filters</span>
              {chosen.length > 0 && (
                <span
                  className={`inline-flex size-5 items-center justify-center text-[12px] tabular-nums ${
                    filtersOpen ? "bg-white text-navy" : "bg-navy text-white"
                  }`}
                >
                  {chosen.length}
                  <span className="sr-only"> chosen</span>
                </span>
              )}
            </button>
          )}
        </div>

        <Segmented
          label="Status"
          groupLabel="Project status"
          options={[
            {
              value: "all",
              label: "All",
              n: countWithout("statuses", () => true),
              on: filters.statuses.length === 0,
              onClick: () => set({ statuses: [] }),
            },
            ...trackerStatuses.map(({ value, label }) => ({
              value,
              label,
              n: countWithout("statuses", (project) => project.status === value),
              on: filters.statuses.includes(value),
              onClick: () => set({ statuses: toggle(filters.statuses, value) as TrackerStatus[] }),
            })),
          ]}
        />

        {hasFilters && filtersOpen && (
          <div id="project-filters" className="flex flex-col gap-5 border-t border-navy/10 pt-4">
            {universities.length > 0 && (
              <ChipGroup
                label="Who can apply"
                options={[
                  {
                    value: "all",
                    label: "All projects",
                    n: countWithout("who", () => true),
                    on: filters.who.length === 0,
                    onClick: () => set({ who: [] }),
                  },
                  ...[EVERYONE, ...universities].map((who) => ({
                    value: who,
                    label: whoLabel(who),
                    n: countWithout("who", (project) => whoOf(project).includes(who)),
                    on: filters.who.includes(who),
                    onClick: () => set({ who: toggle(filters.who, who) }),
                  })),
                ]}
              />
            )}
            {theses.length > 0 && (
              <ChipGroup
                label="Thesis"
                options={[
                  {
                    value: "all",
                    label: "Any",
                    n: countWithout("theses", () => true),
                    on: filters.theses.length === 0,
                    onClick: () => set({ theses: [] }),
                  },
                  ...[...theses, NOT_A_THESIS].map((thesis) => ({
                    value: thesis,
                    label: thesisLabel(thesis),
                    n: countWithout("theses", (project) => thesesOf(project).includes(thesis)),
                    on: filters.theses.includes(thesis),
                    onClick: () => set({ theses: toggle(filters.theses, thesis) }),
                  })),
                ]}
              />
            )}
            {topics.length > 0 && (
              <ChipGroup
                label="Topic"
                options={[
                  {
                    value: "all",
                    label: "All topics",
                    n: countWithout("topics", () => true),
                    on: filters.topics.length === 0,
                    onClick: () => set({ topics: [] }),
                  },
                  ...topics.map((topic) => ({
                    value: topic,
                    label: topic,
                    n: countWithout("topics", (project) => project.topics.includes(topic)),
                    on: filters.topics.includes(topic),
                    onClick: () => set({ topics: toggle(filters.topics, topic) }),
                  })),
                ]}
              />
            )}
          </div>
        )}

        {/* What is chosen stays in sight, each one a click away from being
            undone. */}
        {chosen.length > 0 && (
          <ul role="list" className="flex flex-wrap gap-2">
            {chosen.map((item) => (
              <li key={item.label}>
                <button
                  type="button"
                  onClick={() => set(item.clear)}
                  aria-label={`Remove filter: ${item.label}`}
                  className="inline-flex min-h-[32px] items-center gap-1.5 border border-navy bg-navy pl-3 pr-2 text-[13px] text-white hover:bg-navy/85"
                >
                  {item.label}
                  <XIcon size={12} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <p className="text-caption text-navy/65" aria-live="polite">
          {shown.length} {shown.length === 1 ? "project" : "projects"}
          {filters.query ? ` matching "${filters.query}"` : ""}
          <span className="text-navy/45"> · </span>
          Updated {dateFormat.format(new Date(tracker.updatedAt))}
        </p>
        {active && (
          <button
            type="button"
            onClick={() => setFilters(NO_FILTERS)}
            className="inline-flex items-center gap-1.5 text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy"
          >
            <XIcon size={14} aria-hidden="true" />
            Clear filters
          </button>
        )}
      </div>

      {shown.length > 0 ? (
        <div className="flex flex-col items-center gap-6">
          <ul id="project-list" role="list" className="w-full divide-y divide-navy/10 border border-navy/12 bg-white">
            {visible.map((project) => (
              <TrackerRow key={project.id} project={project} />
            ))}
          </ul>
          {shown.length > PREVIEW_COUNT && (
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls="project-list"
              onClick={() => setExpanded(!expanded)}
              className="btn-outline-ink gap-2"
            >
              {expanded ? "Show fewer projects" : `Show all ${shown.length} projects`}
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
          <p className="text-body text-navy/74">No project matches these filters.</p>
          <button
            type="button"
            onClick={() => setFilters(NO_FILTERS)}
            className="text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy"
          >
            Clear filters
          </button>
          <p className="text-caption text-navy/60">
            Have your own idea? Email{" "}
            <a
              href={`mailto:${PROJECTS_EMAIL}?subject=${encodeURIComponent("Project Hub: my own project idea")}`}
              className="underline decoration-navy/25 underline-offset-4 hover:decoration-navy"
            >
              {PROJECTS_EMAIL}
            </a>
            .
          </p>
        </div>
      )}
    </div>
  );
}
