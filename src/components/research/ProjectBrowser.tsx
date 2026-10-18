"use client";

import Image from "next/image";
import { useMemo, useState, type ReactNode } from "react";
import {
  ArrowUpRightIcon,
  CaretDownIcon,
  MagnifyingGlassIcon,
  XIcon,
} from "@phosphor-icons/react/dist/ssr";
import { PROJECTS_EMAIL, RESEARCH_INTEREST_FORM_URL } from "@/data/research";
import {
  projectBases,
  projectCategories,
  projects,
  type Project,
  type ProjectBase,
  type ProjectCategory,
} from "@/data/projects";

/* The open projects, findable four ways at once: a search across everything,
   where the supervisor is based, the topic, and the supervisor themselves.
   Every filter shows how many projects it would leave, so a reader never
   clicks into an empty grid.

   The last step stays human. "I'm interested" opens the interest form, where
   the applicant names up to three projects, and the projects team makes the
   introduction. No accounts, no application system.

   The site's own language throughout: square corners, navy hairlines, the
   serif for titles, orange only for the one action on a card, and the same
   square portraits the supervisor row uses. */

type Filters = {
  query: string;
  base: ProjectBase | "Anywhere";
  category: ProjectCategory | "All";
  supervisor: string | null;
};

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
      (skip === "category" ||
        filters.category === "All" ||
        project.categories.includes(filters.category)) &&
      (skip === "supervisor" || !filters.supervisor || project.supervisor.name === filters.supervisor),
  );
}

/* The supervisors who have projects, in the order the site lists them. */
const projectSupervisors = projects
  .map((project) => project.supervisor)
  .filter((person, i, all) => all.findIndex((other) => other.name === person.name) === i);

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
    <div className="border-t border-navy/10 px-4 py-4 md:px-6">
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

function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const person = project.supervisor;
  const detailsId = `project-${project.id}-details`;
  const links = [{ label: "Agenda", href: person.agenda }, ...person.links];

  return (
    <li className="flex min-w-0">
      <article
        aria-labelledby={`project-${project.id}-title`}
        className="flex w-full flex-col border border-navy/12 bg-white transition-colors duration-200 hover:border-navy/30"
      >
        <div className="flex flex-1 flex-col p-5 md:p-6">
          <div className="flex flex-wrap gap-1.5">
            {project.categories.map((category) => (
              <span key={category} className="bg-navy/[0.05] px-2 py-1 text-[12px] leading-4 text-navy/70">
                {category}
              </span>
            ))}
            {project.format && (
              <span className="border border-orange/50 px-2 py-[3px] text-[12px] leading-4 text-orange-ink">
                {project.format}
              </span>
            )}
          </div>

          <h3 id={`project-${project.id}-title`} className="mt-4 font-serif text-title-sm text-navy">
            {project.title}
          </h3>

          <div className="mt-3.5 flex items-center gap-3">
            <Image
              src={person.imageSmall}
              alt=""
              width={312}
              height={312}
              className="size-10 shrink-0 border border-navy/15 object-cover"
            />
            <p className="min-w-0 text-caption leading-[18px]">
              <span className="block font-medium text-navy">{person.name}</span>
              <span className="block text-navy/60">{person.positionShort}</span>
            </p>
          </div>

          <p className="mt-4 text-[15px] leading-6 text-navy/78">{project.summary}</p>

          {open && (
            <div id={detailsId} className="mt-4 flex flex-col gap-3 border-t border-navy/10 pt-4">
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
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-navy/10 px-5 py-3.5 md:px-6">
          {project.open ? (
            <a
              href={RESEARCH_INTEREST_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent gap-2 !px-4 !py-2.5 !text-[14px]"
            >
              I&rsquo;m interested
              <ArrowUpRightIcon size={16} aria-hidden="true" />
              <span className="sr-only"> (opens the interest form in a new tab)</span>
            </a>
          ) : (
            <span className="text-caption text-navy/60">Closed for now</span>
          )}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls={detailsId}
            className="inline-flex min-h-[40px] items-center gap-1.5 text-label text-navy/75 hover:text-navy"
          >
            {open ? "Less" : "Details"}
            <CaretDownIcon
              size={14}
              weight="bold"
              aria-hidden="true"
              className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </article>
    </li>
  );
}

export default function ProjectBrowser() {
  const [filters, setFilters] = useState<Filters>(NO_FILTERS);
  const set = (patch: Partial<Filters>) => setFilters((current) => ({ ...current, ...patch }));

  const shown = useMemo(() => filterExcept(filters, null), [filters]);
  const forCategories = useMemo(() => filterExcept(filters, "category"), [filters]);
  const forSupervisors = useMemo(() => filterExcept(filters, "supervisor"), [filters]);
  const forBases = useMemo(() => filterExcept(filters, "base"), [filters]);

  const active =
    filters.query !== "" || filters.base !== "Anywhere" || filters.category !== "All" || filters.supervisor !== null;
  const supervisorCount = new Set(shown.map((project) => project.supervisor.name)).size;

  return (
    <div className="flex flex-col gap-6">
      <div className="border border-navy/12 bg-white">
        <div className="flex flex-col gap-4 px-4 py-4 md:px-6 md:py-5 xl:flex-row xl:items-center xl:justify-between">
          <label className="relative block w-full xl:max-w-[440px]">
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
              className="h-12 w-full border border-navy/18 bg-white pl-10 pr-4 text-[15px] text-navy placeholder:text-navy/45 focus:border-navy/60"
            />
          </label>
          {/* One joined control rather than four chips: the four places are
              one question with one answer. The hairlines between the cells are
              the navy ground showing through a 1px gap, so they hold whether
              the cells sit in a row or, on a phone, a two-by-two grid. */}
          <div
            role="group"
            aria-label="Where the supervisor is based"
            className="grid w-full grid-cols-2 gap-px border border-navy/18 bg-navy/18 sm:flex xl:w-auto xl:shrink-0"
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
                  className={`inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 whitespace-nowrap px-3.5 text-[14px] transition-colors duration-150 xl:flex-none ${
                    on ? "bg-navy text-white" : "bg-white text-navy/80 hover:bg-[#f2f3f6] hover:text-navy"
                  }`}
                >
                  {value}
                  <Count n={n} active={on} />
                </button>
              );
            })}
          </div>
        </div>

        <ChipRow label="Topic">
          {(["All", ...projectCategories] as const).map((value) => {
            const on = filters.category === value;
            const n =
              value === "All"
                ? forCategories.length
                : forCategories.filter((project) => project.categories.includes(value)).length;
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
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <p className="text-caption text-navy/65" aria-live="polite">
          {shown.length} {shown.length === 1 ? "project" : "projects"} from {supervisorCount}{" "}
          {supervisorCount === 1 ? "supervisor" : "supervisors"}
          {filters.category !== "All" ? ` in ${filters.category}` : ""}
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
        <ul role="list" className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {shown.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </ul>
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
