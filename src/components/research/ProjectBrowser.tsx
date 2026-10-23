"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from "react";
import {
  ArrowUpRightIcon,
  CaretDownIcon,
  MagnifyingGlassIcon,
  XIcon,
} from "@phosphor-icons/react/dist/ssr";
import { PROJECTS_EMAIL, supervisors, type Supervisor } from "@/data/research";
import {
  projectBases,
  projectCategories,
  projects,
  thesisLabel,
  type Project,
  type ProjectBase,
  type ProjectCategory,
} from "@/data/projects";

/* The open projects, findable four ways at once: a search across everything,
   where the supervisor is based, the topic, and the supervisor themselves.
   Every filter shows how many projects it would leave, so a reader never
   clicks into an empty grid.

   Every project leads to the same application form, so its one "Apply for a
   project" button sits in the section header (src/app/research/page.tsx), not
   on each card. No accounts, no application system.

   The site's own language throughout: square corners, navy hairlines, and the
   serif for titles. Faces live in the supervisor filter; a card names its
   supervisor in text, so two projects from one person do not read as the
   same card twice.

   The grid opens on its first six projects, with a button under it for the
   rest, so the section does not push everything after it far down the page.
   The list is dealt out one supervisor at a time, so those first six come
   from six different people rather than from whoever has the most entries. */

/* "Thesis" sits with the topics but reads each project's `thesis` field, so it
   picks every project offered as a thesis, at whatever level, and nothing
   else. */
type Topic = ProjectCategory | "Thesis";

type Filters = {
  query: string;
  base: ProjectBase | "Anywhere";
  category: Topic | "All";
  supervisor: string | null;
};

function matchesTopic(project: Project, topic: Topic) {
  return topic === "Thesis" ? Boolean(project.thesis) : project.categories.includes(topic);
}

const NO_FILTERS: Filters = { query: "", base: "Anywhere", category: "All", supervisor: null };

function matchesQuery(project: Project, query: string) {
  if (!query) return true;
  const haystack = [
    project.title,
    project.summary,
    ...project.details,
    project.supervisor.name,
    project.supervisor.position,
    project.categories.join(" "),
    project.format ?? "",
    thesisLabel(project) ?? "",
    project.lookingFor ?? "",
  ]
    .join(" ")
    .toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word));
}

/* Every filter but one, so a filter's own count says what choosing it would
   leave rather than what it already shows. */
function filterExcept(filters: Filters, skip: keyof Filters | null) {
  return projects.filter(
    (project) =>
      (skip === "query" || matchesQuery(project, filters.query)) &&
      (skip === "base" || filters.base === "Anywhere" || project.supervisor.base === filters.base) &&
      (skip === "category" || filters.category === "All" || matchesTopic(project, filters.category)) &&
      (skip === "supervisor" || !filters.supervisor || project.supervisor.name === filters.supervisor),
  );
}

/* One project per supervisor in turn: each supervisor's first project, then
   each one's second, and so on, keeping the data's order within a person. */
function interleaveBySupervisor(list: Project[]) {
  const queues = new Map<string, Project[]>();
  for (const project of list) {
    const name = project.supervisor.name;
    queues.set(name, [...(queues.get(name) ?? []), project]);
  }
  const dealt: Project[] = [];
  for (let round = 0; dealt.length < list.length; round++) {
    for (const queue of Array.from(queues.values())) {
      if (queue[round]) dealt.push(queue[round]);
    }
  }
  return dealt;
}

/* How many projects the grid shows before "Show all": two rows at full width. */
const PREVIEW_COUNT = 6;

/* Every supervisor on the site: those with projects in the order the projects
   list them, then anyone without one yet, who still shows with a 0. */
const projectSupervisors: Supervisor[] = [
  ...projects.map((project) => project.supervisor),
  ...supervisors,
].filter((person, i, all) => all.findIndex((other) => other.name === person.name) === i);

function chipClass(active: boolean) {
  return `inline-flex min-h-[38px] shrink-0 items-center gap-2 border px-3 text-[14px] leading-5 transition-colors duration-150 ${
    active
      ? "border-navy bg-navy text-white"
      : "border-navy/18 bg-white text-navy/80 hover:border-navy/45 hover:text-navy"
  }`;
}

function Count({ n, active }: { n: number; active: boolean }) {
  return (
    <span className={`text-[12px] tabular-nums ${active ? "text-white/70" : "text-navy/45"}`}>{n}</span>
  );
}

/* A row of chips: wrapping from md, a sideways scroll on a phone so ten
   supervisors do not push the projects off the first screen. The scrollbar is
   hidden there and the row fades at its right edge instead, which says "more
   this way" without a grey bar under every row. */
function ChipRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="px-4 py-4 md:px-6">
      <p className="mb-3 font-sans text-footnote text-navy/60">{label}</p>
      <div
        role="group"
        aria-label={label}
        className="-mx-4 flex gap-2 overflow-x-auto px-4 [mask-image:linear-gradient(to_right,black_82%,transparent)] [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:[mask-image:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
    </div>
  );
}

/* While any card is open, give each card the height its row would have with
   every card closed: the tallest closed height in that row. A card's closed
   height is its height minus its open details. Re-measured whenever the grid
   or any card resizes, which covers opening, closing, filtering and the
   window width. */
function useRestRowHeights(gridRef: RefObject<HTMLUListElement>, shown: Project[]) {
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const measure = () => {
      const items = Array.from(grid.children) as HTMLElement[];
      items.forEach((item) => (item.style.minHeight = ""));
      if (!grid.querySelector("[data-showing]")) return;
      const rows = new Map<number, number>();
      const rest = items.map((item) => {
        const details = item.querySelector<HTMLElement>("[data-details]");
        const height = item.offsetHeight - (details?.offsetHeight ?? 0);
        rows.set(item.offsetTop, Math.max(rows.get(item.offsetTop) ?? 0, height));
        return item.offsetTop;
      });
      items.forEach((item, i) => (item.style.minHeight = `${rows.get(rest[i])}px`));
    };
    const observer = new ResizeObserver(measure);
    observer.observe(grid);
    Array.from(grid.children).forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [gridRef, shown]);
}

/* A card opens the way the open-positions rows do: the title is the toggle
   and a caret sits opposite it. The toggle's hit area is stretched over the
   whole top of the card (title, topics, supervisor, summary), but not over
   the details, so selecting text or following a link there never closes it.

   The details slide open by animating the row of a one-row grid from 0fr to
   1fr, which reaches the content's real height without measuring it. They
   stay mounted while closed, hidden (visibility) once folded so nothing
   inside can be tabbed to or read out. `showing` outlives `open` until the closing slide ends, so the
   grid keeps its rows still while a card folds back up. */
function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const [showing, setShowing] = useState(false);
  const person = project.supervisor;
  const titleId = `project-${project.id}-title`;
  const detailsId = `project-${project.id}-details`;
  const links = [{ label: "Agenda", href: person.agenda }, ...person.links];

  const toggle = () => {
    if (!open) setShowing(true);
    setOpen(!open);
  };

  return (
    <li className="flex min-w-0">
      <article
        aria-labelledby={titleId}
        className={`flex w-full flex-col border transition-colors duration-200 hover:border-navy/30 ${
          project.open ? "border-navy/12 bg-white" : "border-dashed border-navy/22 bg-white/55"
        }`}
      >
        <div className="relative flex flex-1 flex-col p-5 md:p-6">
          {/* A closed card reads as set aside rather than switched off: a
              dashed edge, the cream showing through, and its text eased back
              to 80%. The small grey lines (tags, position) start a step darker
              so they still clear 4.5:1 once eased back. It still opens. */}
          <div className={project.open ? "contents" : "contents [&>*]:opacity-80"}>
          <div className="flex items-start justify-between gap-4">
            <h3 id={titleId} className="font-serif text-title-sm text-navy">
              <button
                type="button"
                onClick={toggle}
                aria-expanded={open}
                aria-controls={detailsId}
                className="cursor-pointer text-left after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:-outline-offset-2 focus-visible:after:outline-navy focus-visible:after:[outline-style:solid]"
              >
                {project.title}
              </button>
            </h3>
            <CaretDownIcon
              size={14}
              weight="bold"
              aria-hidden="true"
              className={`mt-1.5 shrink-0 text-navy/50 transition-transform duration-[250ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${
                open ? "rotate-180" : ""
              }`}
            />
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.categories.map((category) => (
              <span
                key={category}
                className={`bg-navy/[0.05] px-2 py-1 text-[12px] leading-4 ${project.open ? "text-navy/70" : "text-navy/85"}`}
              >
                {category}
              </span>
            ))}
            {[thesisLabel(project), project.format].filter(Boolean).map((label) => (
              <span key={label} className="border border-orange/50 px-2 py-[3px] text-[12px] leading-4 text-orange-ink">
                {label}
              </span>
            ))}
          </div>

          <p className="mt-4 text-caption leading-[18px]">
            <span className="block font-medium text-navy">{person.name}</span>
            <span className={`block ${project.open ? "text-navy/60" : "text-navy/75"}`}>{person.positionShort}</span>
          </p>

          <p className="mt-4 text-[15px] leading-6 text-navy/78">{project.summary}</p>
          </div>

          {/* Pinned to the card's foot (mt-auto) so closed notes line up
              across a row, and set apart by a hairline rather than colour:
              closed is a state to read, not an alarm. Kept at full strength,
              since it is the one line on the card that explains the rest. */}
          {!project.open && (
            <div className="mt-auto pt-5">
              <p className="border-t border-navy/12 pt-3.5 text-caption leading-[18px] text-navy/70">
                <span className="font-medium text-navy">Closed for now.</span> This project is not
                taking new students at the moment.
              </p>
            </div>
          )}
        </div>

        <div
          id={detailsId}
          data-details
          onTransitionEnd={(event) => {
            if (event.target === event.currentTarget && !open) setShowing(false);
          }}
          data-showing={showing || undefined}
          className={`grid transition-[grid-template-rows,opacity] duration-[250ms] ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-opacity ${
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          } ${showing ? "" : "invisible"}`}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="mx-5 flex flex-col gap-3 border-t border-navy/10 pb-5 pt-4 md:mx-6 md:pb-6">
              {project.details.map((line) => (
                <p key={line} className="text-[14.5px] leading-[23px] text-navy/74">
                  {line}
                </p>
              ))}
              {(project.lookingFor || project.commitment) && (
                <dl className="grid gap-2">
                  {project.lookingFor && (
                    <div>
                      <dt className="text-footnote text-navy/60">Looking for</dt>
                      <dd className="text-[14.5px] leading-[22px] text-navy">{project.lookingFor}</dd>
                    </div>
                  )}
                  {project.commitment && (
                    <div>
                      <dt className="text-footnote text-navy/60">Supervision</dt>
                      <dd className="text-[14.5px] leading-[22px] text-navy">{project.commitment}</dd>
                    </div>
                  )}
                </dl>
              )}
              <ul role="list" className="flex flex-wrap gap-x-4 gap-y-1.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
                    >
                      {link.label}
                      <ArrowUpRightIcon size={14} aria-hidden="true" />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </article>
    </li>
  );
}

export default function ProjectBrowser() {
  const [filters, setFilters] = useState<Filters>(NO_FILTERS);
  const set = (patch: Partial<Filters>) => setFilters((current) => ({ ...current, ...patch }));

  const shown = useMemo(() => interleaveBySupervisor(filterExcept(filters, null)), [filters]);
  /* Once opened, the grid stays open across filters until it is closed. */
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? shown : shown.slice(0, PREVIEW_COUNT);
  const gridRef = useRef<HTMLUListElement>(null);
  useRestRowHeights(gridRef, visible);
  const forCategories = useMemo(() => filterExcept(filters, "category"), [filters]);
  const forSupervisors = useMemo(() => filterExcept(filters, "supervisor"), [filters]);
  const forBases = useMemo(() => filterExcept(filters, "base"), [filters]);

  const active =
    filters.query !== "" || filters.base !== "Anywhere" || filters.category !== "All" || filters.supervisor !== null;
  const supervisorCount = new Set(shown.map((project) => project.supervisor.name)).size;

  return (
    <div className="flex flex-col gap-6">
      {/* Supervisors first, then topic and location, with the search under
          them: the faces are what most readers come looking for. */}
      <div className="divide-y divide-navy/10 border border-navy/12 bg-white">
        <ChipRow label="Supervisor">
          {projectSupervisors.map((person) => {
            const on = filters.supervisor === person.name;
            const n = forSupervisors.filter((project) => project.supervisor.name === person.name).length;
            return (
              <button
                key={person.name}
                type="button"
                aria-pressed={on}
                onClick={() => set({ supervisor: on ? null : person.name })}
                className={`${chipClass(on)} !pl-1 ${n === 0 && !on ? "opacity-45" : ""}`}
              >
                <Image
                  src={person.imageSmall}
                  alt=""
                  width={312}
                  height={312}
                  className="size-[28px] shrink-0 object-cover"
                />
                {person.name}
                <Count n={n} active={on} />
              </button>
            );
          })}
        </ChipRow>

        <ChipRow label="Topic">
          {(["All", ...projectCategories, "Thesis"] as const).map((value) => {
            const on = filters.category === value;
            const n =
              value === "All"
                ? forCategories.length
                : forCategories.filter((project) => matchesTopic(project, value)).length;
            return (
              <button
                key={value}
                type="button"
                aria-pressed={on}
                onClick={() => set({ category: value })}
                className={chipClass(on)}
              >
                {value === "All" ? "All topics" : value}
                <Count n={n} active={on} />
              </button>
            );
          })}
        </ChipRow>

        <div className="px-4 py-4 md:px-6">
          <p className="mb-3 font-sans text-footnote text-navy/60">Location</p>
          {/* One joined control rather than four chips: the four places are
              one question with one answer. The hairlines between the cells are
              the navy ground showing through a 1px gap, so they hold whether
              the cells sit in a row or, on a phone, a two-by-two grid. */}
          <div
            role="group"
            aria-label="Where the supervisor is based"
            className="grid w-full grid-cols-2 gap-px border border-navy/18 bg-navy/18 sm:inline-flex sm:w-auto"
          >
            {(["Anywhere", ...projectBases] as const).map((value) => {
              const on = filters.base === value;
              const n =
                value === "Anywhere"
                  ? forBases.length
                  : forBases.filter((project) => project.supervisor.base === value).length;
              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={on}
                  onClick={() => set({ base: value })}
                  className={`inline-flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap px-3.5 text-[14px] transition-colors duration-150 ${
                    on
                      ? /* The ring paints over the light frame, so the chosen
                           cell fills the control's full height instead of
                           sitting 1px inside it like a shorter button. */
                        "relative bg-navy text-white ring-1 ring-navy"
                      : "bg-white text-navy/80 hover:bg-[#f2f3f6] hover:text-navy"
                  }`}
                >
                  {value}
                  <Count n={n} active={on} />
                </button>
              );
            })}
          </div>
        </div>

        <div className="px-4 py-4 md:px-6 md:py-5">
          <label className="relative block w-full">
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
              placeholder="Topic, method or supervisor"
              className="h-12 w-full appearance-none border border-navy/18 bg-white pl-10 pr-11 text-[15px] text-navy placeholder:text-navy/45 focus:border-navy focus-visible:outline-none [&::-webkit-search-cancel-button]:appearance-none"
            />
            {/* Our own clear button in place of the browser's blue one; the
                border turning navy is the focus state, so no second ring. */}
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
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <p className="text-caption text-navy/65" aria-live="polite">
          {shown.length} {shown.length === 1 ? "project" : "projects"} from {supervisorCount}{" "}
          {supervisorCount === 1 ? "supervisor" : "supervisors"}
          {filters.category === "Thesis"
            ? ", offered as a thesis"
            : filters.category !== "All"
              ? ` in ${filters.category}`
              : ""}
          {filters.base !== "Anywhere"
            ? filters.base === "Remote"
              ? ", supervised remotely"
              : `, based in ${filters.base}`
            : ""}
          {filters.query ? ` matching "${filters.query}"` : ""}
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
        /* Cards stretch to a common height per row. While one is open the
           grid stops stretching (so the open card grows alone) and
           useRestRowHeights holds every row at its closed height. */
        <div className="flex flex-col items-center gap-6">
          <ul
            ref={gridRef}
            id="project-grid"
            role="list"
            className="grid w-full scroll-mt-28 gap-4 has-[[data-showing]]:items-start md:grid-cols-2 xl:grid-cols-3"
          >
            {visible.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </ul>
          {shown.length > PREVIEW_COUNT && (
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls="project-grid"
              onClick={() => {
                /* Closing a long list would leave the reader far below it,
                   so bring the top of the grid back into view. */
                if (expanded) gridRef.current?.scrollIntoView({ block: "start" });
                setExpanded(!expanded);
              }}
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
