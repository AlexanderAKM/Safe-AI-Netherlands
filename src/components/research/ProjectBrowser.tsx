"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowUpRightIcon,
  CaretDownIcon,
  FunnelSimpleIcon,
  MagnifyingGlassIcon,
  XIcon,
} from "@phosphor-icons/react/dist/ssr";
import {
  PROJECTS_EMAIL,
  availabilityLine,
  availabilityRank,
  byAvailability,
  isGreyedOut,
  supervisors,
  type Supervisor,
} from "@/data/research";
import {
  eligibilityLabel,
  eligibilityOf,
  projectAvailability,
  projectAvailabilityNote,
  projectBases,
  projectCategories,
  projects,
  thesisLabel,
  type Eligibility,
  type Project,
  type ProjectBase,
  type ProjectCategory,
} from "@/data/projects";
import { formatList } from "@/i18n/format";
import type { Locale } from "@/i18n/routing";

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
   from six different people rather than from whoever has the most entries.
   Projects whose availability is to be confirmed come after the others, and
   full ones last, greyed out but still there to read.

   Its words are projectHub.finder, projectHub.browser and
   projectHub.availability, which the page hands it through <ClientMessages>.
   The projects themselves (src/data/projects.ts) stay in English. */

/* "Thesis" sits with the topics but reads each project's `thesis` field, so it
   picks every project offered as a thesis, at whatever level, and nothing
   else. */
type Topic = ProjectCategory | "Thesis";

/* The first answer of the topic and "who can apply" filters, and of the
   location filter, which covers everything else. */
const ALL = "All";
const ANYWHERE = "Anywhere";

/* The topic filter's answers, and the "who can apply" filter's after "All". */
const TOPICS = [ALL, ...projectCategories, "Thesis"] as const;
const WHO = ["everyone", "VU", "UvA"] as const;

/* Every filter takes any number of answers, and a project needs to match only
   one of them ("Amsterdam or Remote"); across filters it must match each. An
   empty list is the filter's first option ("Anywhere", "All topics"), which
   covers everything else, so choosing it clears the rest. */
type Filters = {
  query: string;
  bases: ProjectBase[];
  topics: Topic[];
  /* Who can apply: open to everyone, or a VU or UvA thesis. */
  who: Eligibility[];
  supervisors: string[];
};

function matchesTopic(project: Project, topic: Topic) {
  return topic === "Thesis" ? Boolean(project.thesis) : project.categories.includes(topic);
}

const NO_FILTERS: Filters = { query: "", bases: [], topics: [], who: [], supervisors: [] };

function toggle<T>(list: T[], value: T) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

/* One filter's part of the results line: ", in Evaluations or offered as a
   thesis", or nothing when the filter is on its first option. */
function summaryClause(parts: string[], locale: Locale) {
  const said = parts.filter(Boolean);
  return said.length > 0 ? `, ${formatList(said, locale, "disjunction")}` : "";
}

/* The empty state's mail link. The subject stays English in every language:
   it is what the projects team's inbox sees, not page text. */
export const OWN_IDEA_MAILTO = `mailto:${PROJECTS_EMAIL}?subject=${encodeURIComponent(
  "Project Hub: my own project idea",
)}`;

/* Universities by the names people search for. A position spells out
   "Vrije Universiteit Amsterdam"; a student types "VU". */
const UNIVERSITY_NAMES: [RegExp, string][] = [
  [/vrije universiteit|\bvu\b/i, "VU"],
  [/university of amsterdam|\buva\b/i, "UvA"],
  [/university of groningen|\brug\b/i, "RUG"],
];

/* What a card says about a project in the reader's language, which the
   search reads as well: its thesis label, who can apply, its availability. */
type ProjectLabels = (project: Project) => { thesis: string; eligibility: string; availability: string };

function matchesQuery(project: Project, query: string, labelsOf: ProjectLabels) {
  if (!query) return true;
  const position = project.supervisor.position;
  const labels = labelsOf(project);
  const haystack = [
    project.title,
    project.summary,
    ...project.details,
    project.supervisor.name,
    position,
    ...UNIVERSITY_NAMES.filter(([pattern]) => pattern.test(position)).map(([, name]) => name),
    project.categories.join(" "),
    project.format ?? "",
    labels.thesis,
    labels.eligibility,
    labels.availability,
    project.lookingFor ?? "",
  ]
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

/* Every filter but one, so a filter's own count says what choosing it would
   leave rather than what it already shows. */
function filterExcept(filters: Filters, skip: keyof Filters | null, labelsOf: ProjectLabels) {
  return projects.filter(
    (project) =>
      (skip === "query" || matchesQuery(project, filters.query, labelsOf)) &&
      (skip === "bases" || filters.bases.length === 0 || filters.bases.includes(project.supervisor.base)) &&
      (skip === "topics" ||
        filters.topics.length === 0 ||
        filters.topics.some((topic) => matchesTopic(project, topic))) &&
      (skip === "who" || filters.who.length === 0 || filters.who.includes(eligibilityOf(project))) &&
      (skip === "supervisors" ||
        filters.supervisors.length === 0 ||
        filters.supervisors.includes(project.supervisor.name)),
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

/* The grid's order: open and limited projects dealt out first, then those to
   be confirmed, then the full ones, each group dealt the same way, so the
   opening cards are ones a student can count on. */
function gridOrder(list: Project[]) {
  return [0, 1, 2].flatMap((rank) =>
    interleaveBySupervisor(list.filter((project) => availabilityRank(projectAvailability(project)) === rank)),
  );
}

/* How many projects the grid shows before "Show all": two rows at full width. */
const PREVIEW_COUNT = 6;

/* Every supervisor on the site: those with projects in the order the projects
   list them, then anyone without one yet, who still shows with a 0. Anyone to
   be confirmed goes after them, and anyone full last. */
const projectSupervisors: Supervisor[] = byAvailability(
  [...projects.map((project) => project.supervisor), ...supervisors].filter(
    (person, i, all) => all.findIndex((other) => other.name === person.name) === i,
  ),
);

/* The line under the supervisor chips, naming whichever greyed-out states
   are present (browser.greyedNote); none once nobody is greyed out. */
const anyFull = projectSupervisors.some((person) => person.availability === "full");
const anyUnconfirmed = projectSupervisors.some((person) => person.availability === "unconfirmed");
const greyedNoteKey =
  anyFull && anyUnconfirmed
    ? "fullOrUnconfirmed"
    : anyFull
      ? "full"
      : anyUnconfirmed
        ? "unconfirmed"
        : undefined;

export function chipClass(active: boolean) {
  return `inline-flex min-h-[38px] shrink-0 items-center gap-2 border px-3 text-[14px] leading-5 transition-colors duration-150 ${
    active
      ? "border-navy bg-navy text-white"
      : "border-navy/18 bg-white text-navy/80 hover:border-navy/45 hover:text-navy"
  }`;
}

/* A joined control: one question, its answers side by side, any number of
   them on. The hairlines between the cells are the navy ground showing
   through a 1px gap, so they hold whether the cells sit in a row or, on a
   phone, a two-by-two grid. */
export function Segmented({
  label,
  groupLabel,
  options,
}: {
  label: string;
  groupLabel: string;
  options: { value: string; label: string; n: number; on: boolean; onClick: () => void }[];
}) {
  return (
    <div className="min-w-0">
      <p className="mb-1.5 font-sans text-footnote text-navy/60">{label}</p>
      <div
        role="group"
        aria-label={groupLabel}
        className="grid w-full grid-cols-2 gap-px border border-navy/18 bg-navy/18 sm:inline-flex sm:w-auto"
      >
        {options.map((option) => {
          const on = option.on;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={on}
              onClick={option.onClick}
              className={`inline-flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap px-3.5 text-[14px] transition-colors duration-150 ${
                on
                  ? /* The ring paints over the light frame, so the chosen
                       cell fills the control's full height instead of
                       sitting 1px inside it like a shorter button. */
                    "relative bg-navy text-white ring-1 ring-navy"
                  : "bg-white text-navy/80 hover:bg-[#f2f3f6] hover:text-navy"
              }`}
            >
              {option.label}
              <Count n={option.n} active={on} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function Count({ n, active }: { n: number; active: boolean }) {
  return (
    <span className={`text-[12px] tabular-nums ${active ? "text-white/70" : "text-navy/45"}`}>{n}</span>
  );
}

/* A row of chips: wrapping from md, a sideways scroll on a phone so ten
   supervisors do not push the projects off the first screen. The scrollbar is
   hidden there and the row fades at its right edge instead, which says "more
   this way" without a grey bar under every row.

   A `note` sits under the chips for a line that explains something about
   them: italic and a step smaller than the label, so it reads as an aside
   rather than a second heading, and matching the italic note in the
   supervisor row. */
function ChipRow({ label, note, children }: { label: string; note?: ReactNode; children: ReactNode }) {
  return (
    <div className="px-4 md:px-6">
      <p className="mb-1.5 font-sans text-footnote text-navy/60">{label}</p>
      <div
        role="group"
        aria-label={label}
        className="-mx-4 flex gap-2 overflow-x-auto px-4 [mask-image:linear-gradient(to_right,black_82%,transparent)] [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:[mask-image:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
      {note && <p className="mt-2 font-sans text-[12px] italic leading-[17px] text-navy/60">{note}</p>}
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
   grid keeps its rows still while a card folds back up.

   The project's own words (title, topics, summary, details) are English in
   every language, and say so with lang="en"; the labels around them are the
   reader's. */
function ProjectCard({ project }: { project: Project }) {
  const t = useTranslations("projectHub.browser");
  const tEligibility = useTranslations("projectHub.browser.eligibility");
  const tAvailability = useTranslations("projectHub.availability");
  const tA11y = useTranslations("common.a11y");
  const [open, setOpen] = useState(false);
  const [showing, setShowing] = useState(false);
  const person = project.supervisor;
  const titleId = `project-${project.id}-title`;
  const detailsId = `project-${project.id}-details`;
  /* `key` names a label under browser.links; a named site carries its name. */
  const links: { key?: string; name?: string; href: string }[] = [
    ...(person.agenda ? [{ key: "agenda", href: person.agenda }] : []),
    ...person.links,
  ];
  const availability = projectAvailability(project);
  const full = availability === "full";
  const statusLine = availabilityLine(tAvailability, availability, projectAvailabilityNote(project));

  const toggle = () => {
    if (!open) setShowing(true);
    setOpen(!open);
  };

  return (
    <li className="flex min-w-0">
      <article
        aria-labelledby={titleId}
        className={`flex w-full flex-col border transition-colors duration-200 hover:border-navy/30 ${
          full ? "border-dashed border-navy/22 bg-white/55" : "border-navy/12 bg-white"
        }`}
      >
        <div className="relative flex flex-1 flex-col p-5 md:p-6">
          {/* A full card reads as set aside rather than switched off: a
              dashed edge, the cream showing through, and its text eased back
              to 80%. The small grey lines (tags, position) start a step darker
              so they still clear 4.5:1 once eased back. It still opens. */}
          <div className={full ? "contents [&>*]:opacity-80" : "contents"}>
          <div className="flex items-start justify-between gap-4">
            <h3 id={titleId} lang="en" className="font-serif text-title-sm text-navy">
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

          {/* Straight under the title, where a student decides whether a
              project is for them. A thesis counts towards a degree at that
              university, so it is for that university's students and says so
              in orange; everything else is open to everyone. */}
          <p
            className={`mt-2 text-caption leading-[18px] ${
              project.thesis ? "font-medium text-orange-ink" : full ? "text-navy/75" : "text-navy/60"
            }`}
          >
            {eligibilityLabel(project, tEligibility)}
          </p>

          <div lang="en" className="mt-3 flex flex-wrap gap-1.5">
            {project.categories.map((category) => (
              <span
                key={category}
                className={`bg-navy/[0.05] px-2 py-1 text-[12px] leading-4 ${full ? "text-navy/85" : "text-navy/70"}`}
              >
                {category}
              </span>
            ))}
            {project.format && (
              <span className="border border-orange/50 px-2 py-[3px] text-[12px] leading-4 text-orange-ink">
                {project.format}
              </span>
            )}
          </div>

          <p className="mt-4 text-caption leading-[18px]">
            <span className="block font-medium text-navy">{person.name}</span>
            <span lang="en" className={`block ${full ? "text-navy/75" : "text-navy/60"}`}>{person.positionShort}</span>
            {/* Words, not a fade: fading is how a full card reads. Same italic
                line as the supervisor row and the filter's note; a limited
                one in orange, since it is the one a student should act on. A
                full card says so at its foot instead. */}
            {statusLine && !full && (
              <span
                className={`mt-1 block italic ${availability === "limited" ? "text-orange-ink" : "text-navy/60"}`}
              >
                {statusLine}
              </span>
            )}
          </p>

          <p lang="en" className="mt-4 text-[15px] leading-6 text-navy/78">{project.summary}</p>
          </div>

          {/* Pinned to the card's foot (mt-auto) so closed notes line up
              across a row, and set apart by a hairline rather than colour:
              closed is a state to read, not an alarm. Kept at full strength,
              since it is the one line on the card that explains the rest. */}
          {full && (
            <div className="mt-auto pt-5">
              <p className="border-t border-navy/12 pt-3.5 text-caption leading-[18px] text-navy/70">
                {t.rich("card.fullNote", {
                  status: (chunks) => <span className="font-medium text-navy">{chunks}</span>,
                })}
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
                <p key={line} lang="en" className="text-[14.5px] leading-[23px] text-navy/74">
                  {line}
                </p>
              ))}
              {(project.lookingFor || project.commitment) && (
                <dl className="grid gap-2">
                  {project.lookingFor && (
                    <div>
                      <dt className="text-footnote text-navy/60">{t("card.lookingFor")}</dt>
                      <dd lang="en" className="text-[14.5px] leading-[22px] text-navy">{project.lookingFor}</dd>
                    </div>
                  )}
                  {project.commitment && (
                    <div>
                      <dt className="text-footnote text-navy/60">{t("card.supervision")}</dt>
                      <dd lang="en" className="text-[14.5px] leading-[22px] text-navy">{project.commitment}</dd>
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
                      {link.key ? t(`links.${link.key}`) : link.name}
                      <ArrowUpRightIcon size={14} aria-hidden="true" />
                      <span className="sr-only"> {tA11y("opensInNewTab")}</span>
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
  const t = useTranslations("projectHub.browser");
  const tFinder = useTranslations("projectHub.finder");
  const tEligibility = useTranslations("projectHub.browser.eligibility");
  const tAvailability = useTranslations("projectHub.availability");
  const locale = useLocale() as Locale;
  const [filters, setFilters] = useState<Filters>(NO_FILTERS);
  const set = (patch: Partial<Filters>) => setFilters((current) => ({ ...current, ...patch }));

  const labelsOf = useCallback<ProjectLabels>(
    (project) => ({
      thesis: thesisLabel(project, tEligibility) ?? "",
      eligibility: eligibilityLabel(project, tEligibility),
      availability:
        availabilityLine(tAvailability, projectAvailability(project), projectAvailabilityNote(project)) ?? "",
    }),
    [tEligibility, tAvailability],
  );

  const shown = useMemo(() => gridOrder(filterExcept(filters, null, labelsOf)), [filters, labelsOf]);
  /* Once opened, the grid stays open across filters until it is closed. */
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? shown : shown.slice(0, PREVIEW_COUNT);
  const gridRef = useRef<HTMLUListElement>(null);
  useRestRowHeights(gridRef, visible);
  const forTopics = useMemo(() => filterExcept(filters, "topics", labelsOf), [filters, labelsOf]);
  const forSupervisors = useMemo(() => filterExcept(filters, "supervisors", labelsOf), [filters, labelsOf]);
  const forBases = useMemo(() => filterExcept(filters, "bases", labelsOf), [filters, labelsOf]);
  const forWho = useMemo(() => filterExcept(filters, "who", labelsOf), [filters, labelsOf]);

  const active =
    filters.query !== "" ||
    filters.bases.length > 0 ||
    filters.topics.length > 0 ||
    filters.who.length > 0 ||
    filters.supervisors.length > 0;
  const supervisorCount = new Set(shown.map((project) => project.supervisor.name)).size;

  /* What the chips and pills call each answer. The categories stay English,
     as on the cards; city names are names; "Remote" is a word. */
  const topicName = (topic: Topic | typeof ALL) =>
    topic === ALL ? tFinder("allTopics") : topic === "Thesis" ? tFinder("thesis") : topic;
  const baseName = (base: ProjectBase) => (base === "Remote" ? t("location.remote") : base);
  const whoName = (who: Eligibility | typeof ALL) =>
    who === ALL
      ? tFinder("who.all")
      : who === "everyone"
        ? tFinder("who.everyone")
        : tFinder("who.studentsOnly", { universities: who });

  /* The filters open as a popover over the projects; a click anywhere outside
     it, or Escape, puts it away again. The pills under the search say what is
     chosen in the meantime. */
  const [filtersOpen, setFiltersOpen] = useState(false);
  const filterBoxRef = useRef<HTMLDivElement>(null);
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!filtersOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!filterBoxRef.current?.contains(event.target as Node)) setFiltersOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setFiltersOpen(false);
      filterButtonRef.current?.focus();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [filtersOpen]);

  /* The search and filters stay pinned under the site header while the
     reader moves through the projects, so the header's height is measured
     (it can wrap) and kept current. */
  const [stickyTop, setStickyTop] = useState(71);
  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;
    const measure = () => setStickyTop(header.offsetHeight);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  /* Scrolls to the first project, clear of both the site header and the
     pinned filters above it. */
  const scrollToGrid = (behavior: ScrollBehavior) => {
    const grid = gridRef.current;
    if (!grid) return;
    const offset = stickyTop + (filterBoxRef.current?.offsetHeight ?? 0) + 16;
    window.scrollTo({ top: grid.getBoundingClientRect().top + window.scrollY - offset, behavior });
  };

  /* The popover opens below the button when it fits there, above it when only
     that fits (the sticky header counts as taken), and otherwise below with
     the page scrolled up just enough to show it, never so far that the
     button goes under the header. Measured before paint, so it never flashes
     in the wrong place. */
  const popoverRef = useRef<HTMLDivElement>(null);
  const [opensAbove, setOpensAbove] = useState(false);
  useLayoutEffect(() => {
    const button = filterButtonRef.current;
    const popover = popoverRef.current;
    if (!filtersOpen || !button || !popover) return;
    const gap = 12;
    const headerBottom = Math.max(0, document.querySelector("header")?.getBoundingClientRect().bottom ?? 0);
    const anchor = button.getBoundingClientRect();
    const height = popover.offsetHeight;
    const roomBelow = window.innerHeight - anchor.bottom - gap;
    const roomAbove = anchor.top - headerBottom - gap;
    if (height <= roomBelow) {
      setOpensAbove(false);
    } else if (height <= roomAbove) {
      setOpensAbove(true);
    } else {
      setOpensAbove(false);
      window.scrollBy({
        top: Math.min(height - roomBelow, roomAbove),
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      });
    }
  }, [filtersOpen]);
  const chosen: { label: string; clear: Partial<Filters> }[] = [
    ...filters.supervisors.map((name) => ({
      label: name,
      clear: { supervisors: filters.supervisors.filter((item) => item !== name) },
    })),
    ...filters.topics.map((topic) => ({
      label: topicName(topic),
      clear: { topics: filters.topics.filter((item) => item !== topic) },
    })),
    ...filters.bases.map((base) => ({
      label: baseName(base),
      clear: { bases: filters.bases.filter((item) => item !== base) },
    })),
    ...filters.who.map((who) => ({
      label: whoName(who),
      clear: { who: filters.who.filter((item) => item !== who) },
    })),
  ];

  /* The results line: the count, then a clause for each filter that is not
     on its first answer, then the search. */
  const areas = filters.topics.filter((topic) => topic !== "Thesis");
  const cities = filters.bases.filter((base) => base !== "Remote");
  const universities = filters.who.filter((who) => who !== "everyone");
  const anyOf = (items: string[]) => formatList(items, locale, "disjunction");
  const summary = [
    t("summary.projects", { projects: shown.length, supervisors: supervisorCount }),
    summaryClause(
      [
        areas.length > 0 ? t("summary.inTopics", { topics: anyOf(areas) }) : "",
        filters.topics.includes("Thesis") ? t("summary.thesis") : "",
      ],
      locale,
    ),
    summaryClause(
      [
        cities.length > 0 ? t("summary.basedIn", { cities: anyOf(cities) }) : "",
        filters.bases.includes("Remote") ? t("summary.remote") : "",
      ],
      locale,
    ),
    summaryClause(
      [
        filters.who.includes("everyone") ? t("summary.everyone") : "",
        universities.length > 0 ? t("summary.studentsOnly", { universities: anyOf(universities) }) : "",
      ],
      locale,
    ),
    filters.query ? ` ${tFinder("matching", { query: filters.query })}` : "",
  ].join("");

  return (
    <div className="flex flex-col gap-6">
      {/* The search and a Filters button, with whatever is chosen shown as
          pills under them; the full filters float over the projects on
          request, so they never push the grid down. */}
      <div
        ref={filterBoxRef}
        style={{ top: stickyTop }}
        className="sticky z-30 border border-navy/12 bg-white py-4 md:py-5"
      >
        <div className="flex flex-col gap-3 px-4 md:px-6">
          <div className="relative flex gap-2">
            <label className="relative block min-w-0 flex-1">
              <span className="sr-only">{tFinder("searchLabel")}</span>
              <MagnifyingGlassIcon
                size={18}
                aria-hidden="true"
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-navy/50"
              />
              <input
                type="search"
                value={filters.query}
                onChange={(event) => set({ query: event.target.value })}
                placeholder={tFinder("searchPlaceholder")}
                className="h-12 w-full appearance-none border border-navy/18 bg-white pl-10 pr-11 text-[15px] text-navy placeholder:text-navy/45 focus:border-navy focus-visible:outline-none [&::-webkit-search-cancel-button]:appearance-none"
              />
              {/* Our own clear button in place of the browser's blue one; the
                  border turning navy is the focus state, so no second ring. */}
              {filters.query && (
                <button
                  type="button"
                  onClick={() => set({ query: "" })}
                  aria-label={tFinder("clearSearch")}
                  className="absolute right-1 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center text-navy/45 hover:text-navy focus-visible:outline-offset-0"
                >
                  <XIcon size={16} aria-hidden="true" />
                </button>
              )}
            </label>
            <button
              ref={filterButtonRef}
              type="button"
              aria-expanded={filtersOpen}
              aria-controls="project-filters"
              onClick={() => setFiltersOpen(!filtersOpen)}
              className={`inline-flex h-12 shrink-0 items-center gap-2 border px-4 text-[15px] transition-colors duration-150 ${
                filtersOpen
                  ? "border-navy bg-navy text-white"
                  : "border-navy/18 bg-white text-navy hover:border-navy/45"
              }`}
            >
              <FunnelSimpleIcon size={18} aria-hidden="true" />
              <span className="max-sm:sr-only">{t("filters")}</span>
              {chosen.length > 0 && (
                <span
                  className={`inline-flex size-5 items-center justify-center text-[12px] tabular-nums ${
                    filtersOpen ? "bg-white text-navy" : "bg-navy text-white"
                  }`}
                >
                  {chosen.length}
                  <span className="sr-only"> {t("chosen")}</span>
                </span>
              )}
            </button>
            {filtersOpen && (
              <div
                ref={popoverRef}
                id="project-filters"
                className={`absolute inset-x-0 ${opensAbove ? "bottom-full mb-1.5" : "top-full mt-1.5"} z-40 flex max-h-[min(70vh,640px)] flex-col border border-navy/15 bg-white shadow-[0_2px_8px_#021C4D14,0_24px_56px_-8px_#021C4D47] md:left-auto md:w-[min(680px,100%)]`}
              >
                <div className="flex flex-col gap-6 overflow-y-auto py-5 md:py-6">
                  {/* The fade alone would leave a reader guessing, so a line under
                      the chips says what it means. It goes once nobody is greyed out. */}
                  <ChipRow
                    label={t("supervisor")}
                    note={greyedNoteKey ? t(`greyedNote.${greyedNoteKey}`) : undefined}
                  >
                    {projectSupervisors.map((person) => {
                      const on = filters.supervisors.includes(person.name);
                      const n = forSupervisors.filter((project) => project.supervisor.name === person.name).length;
                      const status = availabilityLine(tAvailability, person.availability, person.availabilityNote);
                      return (
                        <button
                          key={person.name}
                          type="button"
                          aria-pressed={on}
                          onClick={() => set({ supervisors: toggle(filters.supervisors, person.name) })}
                          className={`${chipClass(on)} !pl-1 ${n === 0 && !on ? "opacity-45" : ""}`}
                        >
                          <Image
                            src={person.imageSmall}
                            alt=""
                            width={312}
                            height={312}
                            className={`size-[28px] shrink-0 object-cover ${isGreyedOut(person.availability) ? "opacity-50 grayscale" : ""}`}
                          />
                          {person.name}
                          {status && <span className="sr-only"> ({status})</span>}
                          <Count n={n} active={on} />
                        </button>
                      );
                    })}
                  </ChipRow>

                  <ChipRow label={tFinder("topic")}>
                    {TOPICS.map((value) => {
                      const on = value === ALL ? filters.topics.length === 0 : filters.topics.includes(value);
                      const n =
                        value === ALL
                          ? forTopics.length
                          : forTopics.filter((project) => matchesTopic(project, value)).length;
                      return (
                        <button
                          key={value}
                          type="button"
                          aria-pressed={on}
                          onClick={() => set({ topics: value === ALL ? [] : toggle(filters.topics, value) })}
                          className={chipClass(on)}
                        >
                          {topicName(value)}
                          <Count n={n} active={on} />
                        </button>
                      );
                    })}
                  </ChipRow>

                  <div className="flex flex-col gap-6 px-4 md:px-6">
                    <Segmented
                      label={t("location.label")}
                      groupLabel={t("location.groupLabel")}
                      options={[
                        {
                          value: ANYWHERE,
                          label: t("location.anywhere"),
                          n: forBases.length,
                          on: filters.bases.length === 0,
                          onClick: () => set({ bases: [] }),
                        },
                        ...projectBases.map((value) => ({
                          value,
                          label: baseName(value),
                          n: forBases.filter((project) => project.supervisor.base === value).length,
                          on: filters.bases.includes(value),
                          onClick: () => set({ bases: toggle(filters.bases, value) }),
                        })),
                      ]}
                    />
                    <Segmented
                      label={tFinder("who.label")}
                      groupLabel={tFinder("who.label")}
                      options={[
                        {
                          value: ALL,
                          label: whoName(ALL),
                          n: forWho.length,
                          on: filters.who.length === 0,
                          onClick: () => set({ who: [] }),
                        },
                        ...WHO.map((value) => ({
                          value,
                          label: whoName(value),
                          n: forWho.filter((project) => eligibilityOf(project) === value).length,
                          on: filters.who.includes(value),
                          onClick: () => set({ who: toggle(filters.who, value) }),
                        })),
                      ]}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 border-t border-navy/10 px-4 py-3 md:px-6">
                  {chosen.length > 0 ? (
                    <button
                      type="button"
                      onClick={() => setFilters({ ...NO_FILTERS, query: filters.query })}
                      className="text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy"
                    >
                      {t("resetFilters")}
                    </button>
                  ) : (
                    <span />
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      /* Take the reader to the first project. When nothing
                         matches, the empty state already sits right under
                         the filters, so there is nowhere to go. */
                      setFiltersOpen(false);
                      filterButtonRef.current?.focus({ preventScroll: true });
                      scrollToGrid(
                        window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
                      );
                    }}
                    className="btn-ink"
                  >
                    {t("showProjects", { count: shown.length })}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* What is chosen stays in sight, each one a click away from being
              undone. */}
          {chosen.length > 0 && (
            <ul role="list" className="flex flex-wrap gap-2">
              {chosen.map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => set(item.clear)}
                    aria-label={t("removeFilter", { label: item.label })}
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
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <p className="text-caption text-navy/65" aria-live="polite">
          {summary}
        </p>
        {active && (
          <button
            type="button"
            onClick={() => setFilters(NO_FILTERS)}
            className="inline-flex items-center gap-1.5 text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy"
          >
            <XIcon size={14} aria-hidden="true" />
            {tFinder("clearFilters")}
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
                if (expanded) scrollToGrid("auto");
                setExpanded(!expanded);
              }}
              className="btn-outline-ink gap-2"
            >
              {expanded ? tFinder("showFewer") : tFinder("showAll", { count: shown.length })}
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
          <p className="text-body text-navy/74">{tFinder("noMatch")}</p>
          <button
            type="button"
            onClick={() => setFilters(NO_FILTERS)}
            className="text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy"
          >
            {tFinder("clearFilters")}
          </button>
          <p className="text-caption text-navy/60">
            {tFinder.rich("ownIdea", {
              address: PROJECTS_EMAIL,
              email: (chunks) => (
                <a href={OWN_IDEA_MAILTO} className="underline decoration-navy/25 underline-offset-4 hover:decoration-navy">
                  {chunks}
                </a>
              ),
            })}
          </p>
        </div>
      )}
    </div>
  );
}
