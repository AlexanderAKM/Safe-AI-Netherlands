"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CaretDownIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  XIcon,
} from "@phosphor-icons/react/dist/ssr";
import { ChipGroup, type FilterOption } from "@/components/research/FilterControls";
import { REGION_REQUEST } from "@/components/opportunities/OpportunityIndex";
import { useOpportunities } from "@/components/opportunities/useOpportunities";
import {
  SAIN_SOURCE,
  daysBetween,
  listingSources,
  opportunityTypes,
  regions,
  type Listing,
  type Opportunity,
  type OpportunityType,
  type Region,
} from "@/data/opportunities";
import { formatDate, formatList } from "@/i18n/format";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

/* The opportunities board: one search and three filters over two lists.

   SAIN's own open projects are pinned first, tagged "SAIN project"; under
   them come the listings from other organisations, soonest deadline first,
   each crediting where it was found. Both are the same card, so the page
   reads as one board, and both answer to the same filters.

   The filters are all in sight, as in the Project Hub's tracker, and every
   answer shows how many opportunities it would leave. Each list opens on
   its first few cards with a button for the rest, so the pinned projects
   never push the other listings off the page.

   A card is one link: to the original posting in a new tab, or, for a SAIN
   project, to the application form with that project chosen.

   Its words are opportunities.board, projectHub.finder (who can apply) and
   common.a11y, which the page hands it through <ClientMessages>. What a
   posting says about itself (title, organisation, place) is its own, in
   English in every language. */

const SAIN_PREVIEW = 3;
const EXTERNAL_PREVIEW = 12;

type Filters = {
  query: string;
  types: OpportunityType[];
  regions: Region[];
  /* One organisation, or "" for all of them. */
  org: string;
};

const NO_FILTERS: Filters = { query: "", types: [], regions: [], org: "" };

/* The value of each filter's first answer, which clears the rest. */
const ALL = "all";

type Labels = { type: (type: OpportunityType) => string; region: (region: Region) => string; place: string };

function matches(item: Opportunity, query: string, labels: Labels) {
  if (!query) return true;
  const haystack = [
    item.title,
    item.org,
    item.person ?? "",
    ...item.locations,
    item.source === SAIN_SOURCE ? labels.place : "",
    labels.type(item.type),
    ...item.regions.map(labels.region),
    ...item.topics,
    ...item.universities,
  ]
    .join(" ")
    .toLowerCase();
  const words = haystack.split(/[^a-z0-9]+/);
  /* Short terms ("EU", "RL", "VU") match whole words, plural allowed, so
     "EU" finds the EU and not "neural". Longer terms match anywhere, so
     "interp" still finds "interpretability". */
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) =>
      term.length <= 3 ? words.some((word) => word === term || word === `${term}s`) : haystack.includes(term),
    );
}

/* Within a filter one answer is enough ("Netherlands or remote"); across
   filters an opportunity must match each. `skip` leaves one filter out, so
   that filter's own counts say what choosing an answer would leave. */
function passes(item: Opportunity, filters: Filters, labels: Labels, skip?: keyof Filters) {
  return (
    (skip === "query" || matches(item, filters.query, labels)) &&
    (skip === "types" || filters.types.length === 0 || filters.types.includes(item.type)) &&
    (skip === "regions" || filters.regions.length === 0 || item.regions.some((region) => filters.regions.includes(region))) &&
    (skip === "org" || filters.org === "" || item.org === filters.org)
  );
}

function toggle<T>(list: T[], value: T) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

/* The foot of a card: when to apply by. A deadline within a week reads as a
   countdown, in orange, since it is the line to act on; the countdown waits
   for `today`, which the prerendered page does not know. */
function Deadline({ item, today }: { item: Opportunity; today: string | null }) {
  const t = useTranslations("opportunities.board");
  const locale = useLocale() as Locale;
  if (!item.deadline) {
    return <p className="text-caption text-navy/60">{item.source === SAIN_SOURCE ? t("sain.rolling") : t("deadline.none")}</p>;
  }
  const days = today ? daysBetween(today, item.deadline) : undefined;
  const soon = days !== undefined && days <= 7;
  const text =
    days === 0
      ? t("deadline.closesToday")
      : days === 1
        ? t("deadline.closesTomorrow")
        : soon
          ? t("deadline.closesIn", { days: String(days), date: formatDate(item.deadline, locale, "dayMonth") })
          : t("deadline.applyBy", { date: formatDate(item.deadline, locale, "long") });
  return (
    <p className={`text-caption ${soon ? "font-medium text-orange-ink" : "text-navy/70"}`}>
      <time dateTime={item.deadline}>{text}</time>
    </p>
  );
}

/* One opportunity. The title is the link and its hit area is the whole card;
   the arrow in the corner says where it goes: up and out to another site, or
   on to SAIN's own application form. An orange rule draws across the top of
   the card under the pointer or the keyboard, the way one draws under a
   supervisor's name. */
function OpportunityCard({ item, today, className = "" }: { item: Opportunity; today: string | null; className?: string }) {
  const t = useTranslations("opportunities.board");
  const tFinder = useTranslations("projectHub.finder");
  const tA11y = useTranslations("common.a11y");
  const locale = useLocale() as Locale;
  const sain = item.source === SAIN_SOURCE;
  const source = listingSources[item.source];
  const titleId = `opportunity-${item.id.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
  const linkClass =
    "after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:-outline-offset-2 focus-visible:after:outline-navy focus-visible:after:[outline-style:solid]";
  const shownPlaces = item.locations.slice(0, 2).join(" · ");
  const place = sain
    ? t("sain.place")
    : item.locations.length > 2
      ? t("moreLocations", { places: shownPlaces, count: String(item.locations.length - 2) })
      : shownPlaces;
  const Arrow = sain ? ArrowRightIcon : ArrowUpRightIcon;

  return (
    <li className={`flex min-w-0 ${className}`}>
      <article
        aria-labelledby={titleId}
        className="group relative flex w-full flex-col border border-navy/12 bg-white p-5 transition-colors duration-200 hover:border-navy/30 focus-within:border-navy/30 md:p-6"
      >
        <div className="flex items-center justify-between gap-4">
          {sain ? (
            <p className="whitespace-nowrap border border-orange/50 px-2 py-[3px] text-[12px] leading-4 text-orange-ink">{t("sain.tag")}</p>
          ) : (
            <p className="whitespace-nowrap bg-navy/[0.05] px-2 py-1 text-[12px] leading-4 text-navy/70">{t(`typeTag.${item.type}`)}</p>
          )}
          {/* Where it was found, beside the arrow that takes the reader
              there: the credit and the way out read as one. */}
          <p className="flex shrink-0 items-center gap-2 text-footnote text-navy/55">
            {!sain && source && t("external.via", { source: source.name })}
            <Arrow
              size={16}
              aria-hidden="true"
              className={`shrink-0 text-navy/40 transition-[color,transform] duration-200 group-hover:text-navy group-focus-within:text-navy ${
                sain
                  ? "group-hover:translate-x-0.5 group-focus-within:translate-x-0.5"
                  : "group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-focus-within:-translate-y-0.5 group-focus-within:translate-x-0.5"
              }`}
            />
          </p>
        </div>

        <h3 id={titleId} lang="en" className="mt-3 font-serif text-title-sm text-navy">
          {sain ? (
            <Link href={item.url} className={linkClass}>
              {item.title}
            </Link>
          ) : (
            <a href={item.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
              {item.title}
              <span className="sr-only" lang={locale}> {tA11y("opensInNewTab")}</span>
            </a>
          )}
        </h3>

        <p className="mt-2 text-caption leading-[18px] text-navy/60">
          <span className="font-medium text-navy">{sain && item.person ? item.person : item.org}</span>
          {sain && item.person && (
            <>
              <span aria-hidden="true" className="text-navy/30"> · </span>
              {item.org}
            </>
          )}
        </p>

        {/* Whose students may apply, in orange as on the Project Hub: it is
            the line that decides whether a project is for the reader. */}
        {item.universities.length > 0 && (
          <p className="mt-2 text-caption font-medium leading-[18px] text-orange-ink">
            {tFinder("who.studentsOnly", { universities: formatList(item.universities, locale, "disjunction") })}
          </p>
        )}

        {item.topics.length > 0 && (
          <ul role="list" lang="en" className="mt-3 flex flex-wrap gap-1.5">
            {item.topics.map((topic) => (
              <li key={topic} className="bg-navy/[0.05] px-2 py-1 text-[12px] leading-4 text-navy/70">
                {topic}
              </li>
            ))}
          </ul>
        )}

        {place && (
          <p className="mt-3 flex items-start gap-1.5 text-caption leading-[18px] text-navy/70">
            <MapPinIcon size={15} aria-hidden="true" className="mt-px shrink-0 text-navy/45" />
            <span lang={sain ? undefined : "en"}>{place}</span>
          </p>
        )}

        {/* Pinned to the card's foot, so deadlines line up across a row. */}
        <div className="mt-auto pt-5">
          <div className="flex items-baseline justify-between gap-4 border-t border-navy/10 pt-3.5">
            <Deadline item={item} today={today} />
            {sain && (
              /* The line draws in from the left, as under a supervisor's name
                 on the Project Hub; without motion it simply appears. */
              <p className="relative shrink-0 text-caption font-medium text-navy">
                {t("sain.apply")}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-navy ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:transition-transform motion-safe:duration-300 group-hover:scale-x-100 group-focus-within:scale-x-100"
                />
              </p>
            )}
          </div>
        </div>
      </article>
    </li>
  );
}

function TextLink({ href, external = false, children }: { href: string; external?: boolean; children: ReactNode }) {
  const tA11y = useTranslations("common.a11y");
  const className =
    "inline-flex shrink-0 items-center gap-1.5 text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy";
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <ArrowUpRightIcon size={15} aria-hidden="true" />
      <span className="sr-only"> {tA11y("opensInNewTab")}</span>
    </a>
  ) : (
    <Link href={href} className={className}>
      {children}
      <ArrowRightIcon size={15} aria-hidden="true" />
    </Link>
  );
}

function ShowAll({
  expanded,
  controls,
  more,
  fewer,
  onClick,
}: {
  expanded: boolean;
  controls: string;
  more: string;
  fewer: string;
  onClick: () => void;
}) {
  return (
    <button type="button" aria-expanded={expanded} aria-controls={controls} onClick={onClick} className="btn-outline-ink gap-2 self-center">
      {expanded ? fewer : more}
      <CaretDownIcon
        size={14}
        weight="bold"
        aria-hidden="true"
        className={`transition-transform duration-[250ms] ${expanded ? "rotate-180" : ""}`}
      />
    </button>
  );
}

export default function OpportunityBoard({ listings, updatedAt }: { listings: Listing[]; updatedAt: string }) {
  const t = useTranslations("opportunities.board");
  const locale = useLocale() as Locale;
  const sainOrg = t("sain.org");
  const { sain, external, today } = useOpportunities(listings, sainOrg);
  const all = useMemo(() => [...sain, ...external], [sain, external]);

  const [filters, setFilters] = useState<Filters>(NO_FILTERS);
  const set = (patch: Partial<Filters>) => setFilters((current) => ({ ...current, ...patch }));
  const [sainExpanded, setSainExpanded] = useState(false);
  const [externalExpanded, setExternalExpanded] = useState(false);

  /* A row of the hero's index asks for one answer of "Where": choose it,
     alone, and bring the board up under the header. */
  useEffect(() => {
    const onRequest = (event: Event) => {
      const region = (event as CustomEvent<Region>).detail;
      if (!regions.includes(region)) return;
      setFilters({ ...NO_FILTERS, regions: [region] });
      document.getElementById("board")?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      });
    };
    window.addEventListener(REGION_REQUEST, onRequest);
    return () => window.removeEventListener(REGION_REQUEST, onRequest);
  }, []);

  const labels = useMemo<Labels>(
    () => ({
      type: (type) => t(`type.${type}`),
      region: (region) => t(`where.${region}`),
      place: t("sain.place"),
    }),
    [t],
  );

  const shown = useMemo(() => all.filter((item) => passes(item, filters, labels)), [all, filters, labels]);
  const shownSain = shown.filter((item) => item.source === SAIN_SOURCE);
  const shownExternal = shown.filter((item) => item.source !== SAIN_SOURCE);
  const countWithout = (skip: keyof Filters, test: (item: Opportunity) => boolean) =>
    all.filter((item) => passes(item, filters, labels, skip) && test(item)).length;
  const active = filters.query !== "" || filters.types.length > 0 || filters.regions.length > 0 || filters.org !== "";

  /* The answers each filter offers: only the kinds and the organisations
     some opportunity has, so no chip is there just to say 0. */
  const types = opportunityTypes.filter((type) => all.some((item) => item.type === type));
  const orgs = useMemo(
    () =>
      Array.from(new Set(all.map((item) => item.org))).sort((a, b) =>
        a === sainOrg ? -1 : b === sainOrg ? 1 : a.localeCompare(b),
      ),
    [all, sainOrg],
  );

  const typeOptions: FilterOption[] = [
    {
      value: ALL,
      label: t("type.all"),
      n: countWithout("types", () => true),
      on: filters.types.length === 0,
      onClick: () => set({ types: [] }),
    },
    ...types.map((type) => ({
      value: type,
      label: labels.type(type),
      n: countWithout("types", (item) => item.type === type),
      on: filters.types.includes(type),
      onClick: () => set({ types: toggle(filters.types, type) }),
    })),
  ];
  const whereOptions: FilterOption[] = [
    {
      value: ALL,
      label: t("where.anywhere"),
      n: countWithout("regions", () => true),
      on: filters.regions.length === 0,
      onClick: () => set({ regions: [] }),
    },
    ...regions.map((region) => ({
      value: region,
      label: labels.region(region),
      n: countWithout("regions", (item) => item.regions.includes(region)),
      on: filters.regions.includes(region),
      onClick: () => set({ regions: toggle(filters.regions, region) }),
    })),
  ];

  /* The external listings credit one source for now; the first one named is
     the one the section links to. */
  const source = listingSources[external[0]?.source ?? ""] ?? Object.values(listingSources)[0];
  const visibleSain = sainExpanded ? shownSain : shownSain.slice(0, SAIN_PREVIEW);
  const visibleExternal = externalExpanded ? shownExternal : shownExternal.slice(0, EXTERNAL_PREVIEW);
  const fieldClass =
    "h-12 w-full appearance-none border border-navy/18 bg-white text-[15px] text-navy focus:border-navy focus-visible:outline-none";

  return (
    <div className="flex flex-col gap-6">
      <div
        role="search"
        aria-label={t("filtersLabel")}
        className="flex flex-col gap-4 border border-navy/12 bg-white px-4 py-4 md:px-6 md:py-5"
      >
        <div className="flex flex-col gap-2 md:flex-row">
          <label className="relative block min-w-0 flex-1">
            <span className="sr-only">{t("searchLabel")}</span>
            <MagnifyingGlassIcon
              size={18}
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-navy/50"
            />
            <input
              type="search"
              value={filters.query}
              onChange={(event) => set({ query: event.target.value })}
              placeholder={t("searchPlaceholder")}
              className={`${fieldClass} pl-10 pr-11 placeholder:text-navy/45 [&::-webkit-search-cancel-button]:appearance-none`}
            />
            {filters.query && (
              <button
                type="button"
                onClick={() => set({ query: "" })}
                aria-label={t("clearSearch")}
                className="absolute right-1 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center text-navy/45 hover:text-navy focus-visible:outline-offset-0"
              >
                <XIcon size={16} aria-hidden="true" />
              </button>
            )}
          </label>
          {/* Too many organisations for chips, so this one filter is a list.
              Each line says how many opportunities it would leave. */}
          <label className="relative block md:w-[300px] md:shrink-0">
            <span className="sr-only">{t("org.label")}</span>
            <select
              value={filters.org}
              onChange={(event) => set({ org: event.target.value })}
              className={`${fieldClass} cursor-pointer truncate pl-3.5 pr-10 ${filters.org ? "" : "text-navy/70"}`}
            >
              <option value="">{t("org.all")}</option>
              {orgs.map((org) => (
                <option key={org} value={org}>
                  {t("org.option", { name: org, count: String(countWithout("org", (item) => item.org === org)) })}
                </option>
              ))}
            </select>
            <CaretDownIcon
              size={14}
              weight="bold"
              aria-hidden="true"
              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-navy/50"
            />
          </label>
        </div>

        {types.length > 1 && <ChipGroup label={t("type.label")} options={typeOptions} />}
        <ChipGroup label={t("where.label")} options={whereOptions} />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <p className="text-caption text-navy/65" aria-live="polite">
          {t("count", { count: shown.length })}
          {filters.query ? ` ${t("matching", { query: filters.query })}` : ""}
        </p>
        {active && (
          <button
            type="button"
            onClick={() => setFilters(NO_FILTERS)}
            className="inline-flex items-center gap-1.5 text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy"
          >
            <XIcon size={14} aria-hidden="true" />
            {t("clearFilters")}
          </button>
        )}
      </div>

      {shown.length === 0 && (
        <div className="flex flex-col items-center gap-3 border border-dashed border-navy/20 bg-white px-6 py-10 text-center">
          <p className="text-body text-navy/74">{t("noMatch")}</p>
          <button
            type="button"
            onClick={() => setFilters(NO_FILTERS)}
            className="text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy"
          >
            {t("clearFilters")}
          </button>
        </div>
      )}

      {/* SAIN's own projects, pinned above everything else. */}
      {shownSain.length > 0 && (
        <section id="sain-projects" aria-labelledby="sain-projects-heading" className="flex scroll-mt-28 flex-col gap-5 pt-2">
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-3">
            <div className="flex max-w-[720px] flex-col gap-2">
              <h2 id="sain-projects-heading" className="font-serif text-heading-sm text-navy">
                {t("sain.heading")}
              </h2>
              <p className="font-sans text-kicker-sm leading-[23px] text-navy/72">{t("sain.intro")}</p>
            </div>
            <TextLink href="/research">{t("sain.aboutHub")}</TextLink>
          </div>
          <ul id="sain-project-list" role="list" className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visibleSain.map((item, i) => (
              <OpportunityCard
                key={item.id}
                item={item}
                today={today}
                /* Three cards are one row at full width, and two rows with a
                   hole in them on a tablet: there the preview is two. */
                className={!sainExpanded && i === SAIN_PREVIEW - 1 ? "md:max-xl:hidden" : ""}
              />
            ))}
          </ul>
          {shownSain.length > SAIN_PREVIEW && (
            <ShowAll
              expanded={sainExpanded}
              controls="sain-project-list"
              more={t("sain.showAll", { count: String(shownSain.length) })}
              fewer={t("sain.showFewer")}
              onClick={() => setSainExpanded(!sainExpanded)}
            />
          )}
        </section>
      )}

      {/* Everyone else's listings. With none at all (not just none that match
          the filters), the section still says where to look. */}
      {(shownExternal.length > 0 || (external.length === 0 && !active)) && (
        <section id="listings" aria-labelledby="listings-heading" className="flex scroll-mt-28 flex-col gap-5 pt-4">
          {shownSain.length > 0 && <span aria-hidden="true" className="block h-px bg-navy/10" />}
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-3">
            <div className="flex max-w-[720px] flex-col gap-2">
              <h2 id="listings-heading" className="font-serif text-heading-sm text-navy">
                {t("external.heading")}
              </h2>
              {external.length > 0 && (
                <p className="font-sans text-kicker-sm leading-[23px] text-navy/72">
                  {t.rich("external.intro", {
                    source: source.name,
                    link: (chunks) => (
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
                      >
                        {chunks}
                      </a>
                    ),
                  })}
                </p>
              )}
            </div>
            {external.length > 0 && (
              <p className="text-caption text-navy/60">
                {t("external.updated", { date: formatDate(updatedAt, locale, "long", "Europe/Amsterdam") })}
              </p>
            )}
          </div>

          {external.length === 0 ? (
            <div className="flex flex-col items-center gap-3 border border-dashed border-navy/20 bg-white px-6 py-10 text-center">
              <p className="text-body text-navy/74">{t("external.empty")}</p>
              <TextLink href={source.url} external>
                {t("external.browse", { source: source.name })}
              </TextLink>
            </div>
          ) : (
            <>
              <ul id="listing-list" role="list" className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {visibleExternal.map((item) => (
                  <OpportunityCard key={item.id} item={item} today={today} />
                ))}
              </ul>
              {shownExternal.length > EXTERNAL_PREVIEW && (
                <ShowAll
                  expanded={externalExpanded}
                  controls="listing-list"
                  more={t("external.showAll", { count: String(shownExternal.length) })}
                  fewer={t("external.showFewer")}
                  onClick={() => setExternalExpanded(!externalExpanded)}
                />
              )}
              <p className="max-w-[760px] text-footnote leading-[19px] text-navy/60">{t("external.note")}</p>
            </>
          )}
        </section>
      )}
    </div>
  );
}
