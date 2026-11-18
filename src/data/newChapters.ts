/**
 * Content for /new-chapters: the starting-team call for Eindhoven, Delft and
 * The Hague (winter 2026-27).
 *
 * Source of truth for the copy: the team's rewritten expansion text (16
 * October 2026). The Airtable form carries only a short description per role;
 * the full postings live in the messages, one file per language
 * (messages/<locale>/newChapters.json, under `foundingRoles`), so a change to
 * a role starts there. This file keeps what is the same in every language:
 * ids, order, form values, dates and switches.
 */

// -----------------------------------------------------------------------------
// Application form (Airtable)
// -----------------------------------------------------------------------------

/**
 * The starting-team application form: an Airtable interface form, writing to
 * the "Starting Team Applications" table.
 *
 * Interface forms take `prefill_<Field name>` parameters, matched on the
 * table's field names rather than the questions the form shows (checked 14
 * October 2026: `prefill_City=Delft&prefill_Role=Chapter Director` fills both).
 * Keep the two field names below in step with the table.
 */
export const FOUNDING_FORM_URL: string =
  "https://airtable.com/appBt9aud43DOhyE7/pagfucm2gVY91sjPg/form";

export const FOUNDING_FORM_FIELDS = {
  city: "City",
  role: "Role",
};

export function buildFoundingApplicationUrl(opts?: {
  city?: string;
  role?: string;
}): string {
  if (!FOUNDING_FORM_URL) return "/contact";
  const url = new URL(FOUNDING_FORM_URL);
  if (opts?.city) url.searchParams.set(`prefill_${FOUNDING_FORM_FIELDS.city}`, opts.city);
  if (opts?.role) url.searchParams.set(`prefill_${FOUNDING_FORM_FIELDS.role}`, opts.role);
  return url.toString();
}


// -----------------------------------------------------------------------------
// Dates
// -----------------------------------------------------------------------------

/* Soft deadline, confirmed 14 October 2026, as an ISO date. It is a Monday;
   copy names the date only, never the weekday. Print it with formatDate from
   @/i18n/format: "long" gives "16 November 2026" (Dutch: "16 november 2026"),
   "dayMonth" gives "16 November". */
export const SOFT_DEADLINE = "2026-11-16";

/* The switch for the site-wide call-outs: the announcement bar, the nav item
   and the two lines on the landing. Set it to false when the starting teams
   are chosen; /new-chapters itself stays up. */
export const STARTING_TEAMS_RECRUITING = true;

// -----------------------------------------------------------------------------
// Cities
// -----------------------------------------------------------------------------

export type FoundingCity = {
  /** The cell's anchor (#the-hague) and its key in the messages: the city's
   *  name under newChapters.cityNames.<id>; the institutions it grows from
   *  (set as the cell's kicker), why it, and one line on the chapter's likely
   *  profile under newChapters.cities.items.<id>. */
  id: string;
  /** The city as the form's City field takes it: English, in every language. */
  name: string;
};

export const FOUNDING_CITIES: FoundingCity[] = [
  { id: "eindhoven", name: "Eindhoven" },
  { id: "delft", name: "Delft" },
  { id: "the-hague", name: "The Hague" },
];

/** The chapters that already run, for the map and the hero line. */
export const EXISTING_CHAPTERS = ["Groningen", "Amsterdam", "Utrecht"];

// -----------------------------------------------------------------------------
// Incubation
// -----------------------------------------------------------------------------

/* The aims, in order; each one's words are newChapters.incubation.milestones.<id>,
   with its measure of ambition marked <hl>…</hl>. Directional on purpose: the
   exact numbers are set with each starting team in its first weeks, and the
   internal graduation bar lives in the Expansion Plan, not here. */
export const INCUBATION_MILESTONES = [
  "team",
  "courses",
  "events",
  "community",
  "partners",
  "projects",
] as const;

/* The stops on the incubation trail, in order; each one's when, title and
   detail are newChapters.incubation.stops.<id>. */
export const INCUBATION_STOPS = [
  "teamsBegin",
  "workKicksOff",
  "coursesAndEvents",
  "sainChapter",
] as const;

// -----------------------------------------------------------------------------
// What you get
// -----------------------------------------------------------------------------

export type OfferIcon =
  | "flag"
  | "compass"
  | "book"
  | "stack"
  | "wallet"
  | "handshake"
  | "growth"
  | "seal";

/* Each item's title and detail are newChapters.offer.items.<id>. */
export const FOUNDING_OFFER: Array<{ id: string; icon: OfferIcon }> = [
  { id: "role", icon: "flag" },
  { id: "mentor", icon: "compass" },
  { id: "wiki", icon: "book" },
  { id: "infrastructure", icon: "stack" },
  { id: "budget", icon: "wallet" },
  { id: "introductions", icon: "handshake" },
  { id: "development", icon: "growth" },
  { id: "chapter", icon: "seal" },
];

// -----------------------------------------------------------------------------
// Roles
// -----------------------------------------------------------------------------

export type FoundingRoleTeam = "directors" | "education" | "events" | "communications";

/*
 * Each posting's words are in the messages, under newChapters.foundingRoles.<id>:
 * title, summary, hours, about (paragraphs), firstMonths, responsibilities,
 * goodFitIf, alsoStrong, and its own logistics rows (time, compensation,
 * reportsTo). What the four postings share (the term, the holiday allowance,
 * the location, the start, and the "flexible" clause) is said once, under
 * newChapters.roleCard.
 */
export type FoundingRole = {
  /** Anchor on the page (#director), and the posting's key in the messages. */
  id: string;
  /** The value the form's role field takes: English, in every language. */
  formValue: string;
  team: FoundingRoleTeam;
};

export const FOUNDING_ROLES: FoundingRole[] = [
  { id: "director", formValue: "Chapter Director", team: "directors" },
  { id: "education-lead", formValue: "Education Lead", team: "education" },
  { id: "events-lead", formValue: "Events Lead", team: "events" },
  { id: "communications-lead", formValue: "Communications Lead", team: "communications" },
];

/* The logistics rows of every posting, in order. A shared row reads the same
   for all four roles (newChapters.roleCard.logistics.<id>); the others are
   the role's own (newChapters.foundingRoles.<role>.logistics.<id>). */
export const FOUNDING_LOGISTICS: Array<{ id: string; shared: boolean }> = [
  { id: "time", shared: false },
  { id: "compensation", shared: false },
  { id: "holiday", shared: true },
  { id: "location", shared: true },
  { id: "reportsTo", shared: false },
  { id: "start", shared: true },
];

// -----------------------------------------------------------------------------
// Application process
// -----------------------------------------------------------------------------

/* The steps, in order; each one's label and detail are
   newChapters.apply.steps.<id>. */
export const FOUNDING_APPLICATION_STEPS = [
  "form",
  "workSample",
  "interview",
  "decision",
  "start",
] as const;
