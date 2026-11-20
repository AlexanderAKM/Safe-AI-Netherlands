import { formatDate, formatList } from "@/i18n/format";
import type { Locale } from "@/i18n/routing";

/**
 * Course application status, per chapter.
 *
 * Single source of truth for the chapter course pages, the courses page and the
 * landing course tabs, so a cohort is never advertised as open in one place and
 * closed in another.
 *
 * To open or close a cohort: flip `open` for that chapter and edit its
 * deadlines. The notes shown with each state are text, so they live in
 * messages/<locale>/courses.json under `applications.<chapter id>`; the flags
 * below say which of them a chapter has.
 *
 * An open entry also carries `closesAfter`, the later deadline as an ISO date.
 * Every read of this file goes through `resolve` below, which reports the entry
 * as closed once that date has passed. A file nobody remembered to edit can
 * therefore go quiet, but it can never print an expired deadline beside a live
 * apply button. The site is a static export, so "now" is the build date: a
 * rebuild is what retires a lapsed cohort.
 *
 * A chapter that takes applications all year, placing each applicant in its
 * next cohort, is open with `rolling: true` and a `rollingNote` message instead
 * of deadlines. It has no date to lapse on, so it stays open until someone
 * closes it here. It may also carry a `chapterNote` message, a cohort-specific
 * line (a nominal deadline, a start date) shown only on its own chapter page,
 * in place of the rolling note. That note is dated by `chapterNoteUntil` and
 * drops out once the date passes, leaving the rolling note, so a stale
 * deadline never lingers.
 */

/** Shared intake form for participants and facilitators, all chapters. */
export const COURSE_APPLICATION_URL =
  "https://sainonboard.fillout.com/new";

export type ChapterName = "Amsterdam" | "Groningen" | "Utrecht";

/** The chapter's key in the messages: courses.applications.<id>. */
export type ChapterId = "amsterdam" | "groningen" | "utrecht";

export type CourseApplication = {
  chapter: ChapterName;
  id: ChapterId;
  /** Anchor into the chapter page's Programs section. */
  href: string;
} & (
  | {
      open: true;
      rolling?: false;
      /** ISO `YYYY-MM-DD`. Printed with the year, e.g. "18 September 2026"
       *  ("18 september 2026" in Dutch): a date without one reads as
       *  ambiguous rather than expired once it has passed. */
      deadlines: { participants: string; facilitators: string };
      /** The later of the two deadlines, ISO `YYYY-MM-DD`, for the guard. */
      closesAfter: string;
      /** Has an `applications.<id>.lapsedNote` message, which stands in for
       *  the closed note once the deadlines above have passed. */
      hasLapsedNote?: boolean;
    }
  | {
      open: true;
      /** Applications are always open; each one joins the next cohort. Its
       *  `applications.<id>.rollingNote` message stands in for deadlines. */
      rolling: true;
      /** Has an `applications.<id>.chapterNote` message, which replaces the
       *  rolling note on the chapter's own page only. */
      hasChapterNote?: boolean;
      /** ISO `YYYY-MM-DD`; the chapter note is dropped after this date. */
      chapterNoteUntil?: string;
    }
  | {
      open: false;
      /** The message shown in place of the sign-up CTA while applications are
       *  closed, under `applications.`: "<id>.closedNote", "<id>.lapsedNote"
       *  or "defaultLapsedNote". */
      closedNoteKey: string;
    }
);

/** True once the whole of an ISO date has passed; false if missing or malformed. */
function hasPassed(isoDate: string | undefined): boolean {
  const end = new Date(`${isoDate}T23:59:59`);
  return !Number.isNaN(end.getTime()) && end.getTime() < Date.now();
}

/**
 * An entry whose deadlines have passed reports closed, whatever the file says.
 * This is the one place the guard lives, so no page has to remember it.
 */
function resolve(entry: CourseApplication): CourseApplication {
  if (!entry.open) return entry;
  if (entry.rolling) {
    if (!entry.hasChapterNote || !hasPassed(entry.chapterNoteUntil)) return entry;
    const { hasChapterNote: _note, chapterNoteUntil: _until, ...rest } = entry;
    return rest;
  }
  if (!hasPassed(entry.closesAfter)) return entry;
  return {
    chapter: entry.chapter,
    id: entry.id,
    href: entry.href,
    open: false,
    closedNoteKey: entry.hasLapsedNote ? `${entry.id}.lapsedNote` : "defaultLapsedNote",
  };
}

const cohorts: CourseApplication[] = [
  {
    chapter: "Amsterdam",
    id: "amsterdam",
    href: "/chapters/amsterdam#programs",
    open: true,
    rolling: true,
    // chapterNote: apply by 23 October 2026, courses from early November.
    hasChapterNote: true,
    chapterNoteUntil: "2026-10-23",
  },
  {
    chapter: "Groningen",
    id: "groningen",
    href: "/chapters/groningen#programs",
    /* Registration stays open for every future cohort: an applicant is
       placed in the next one that starts. */
    open: true,
    rolling: true,
    /* Undated: the chapter page names both of its tracks. */
    hasChapterNote: true,
  },
  {
    chapter: "Utrecht",
    id: "utrecht",
    href: "/chapters/utrecht#programs",
    /* AI Governance and Technical AI Safety, autumn 2026, on one set of
       deadlines. The courses run from 18 and 19 November; see the session
       dates on the Utrecht page. */
    open: true,
    deadlines: {
      participants: "2026-11-15",
      facilitators: "2026-11-01",
    },
    closesAfter: "2026-11-15",
    // lapsedNote: sign ups for the next cohort open next semester.
    hasLapsedNote: true,
  },
];

export const courseApplications: CourseApplication[] = cohorts.map(resolve);

export function courseApplicationFor(chapter: ChapterName): CourseApplication {
  const entry = courseApplications.find((c) => c.chapter === chapter);
  if (!entry) throw new Error(`No course application entry for ${chapter}`);
  return entry;
}

/** A translator for the `courses.applications` messages. */
type ApplicationsTranslator = (key: string) => string;

export type ApplicationText = {
  /** A rolling chapter's standing note. */
  rollingNote?: string;
  /** A rolling chapter's cohort note, for its own chapter page. */
  chapterNote?: string;
  /** What a closed chapter says in place of the sign-up button. */
  closedNote?: string;
  /** The deadlines as printed: "15 November 2026" / "15 november 2026". */
  deadlines?: { participants: string; facilitators: string };
};

/**
 * The words that go with an entry, in the reader's language. `t` reads
 * `courses.applications`: useTranslations("courses.applications") in a
 * component, getTranslations({ locale, namespace: "courses.applications" })
 * on the server.
 */
export function applicationText(
  entry: CourseApplication,
  t: ApplicationsTranslator,
  locale: Locale,
): ApplicationText {
  if (!entry.open) return { closedNote: t(entry.closedNoteKey) };
  if (entry.rolling) {
    return {
      rollingNote: t(`${entry.id}.rollingNote`),
      chapterNote: entry.hasChapterNote ? t(`${entry.id}.chapterNote`) : undefined,
    };
  }
  return {
    deadlines: {
      participants: formatDate(entry.deadlines.participants, locale),
      facilitators: formatDate(entry.deadlines.facilitators, locale),
    },
  };
}

/* The chapter course tab each national track lands on, where the chapter has
   one, falling back to the chapter's programmes band. Keys are the track ids
   on the landing and /courses; values are the `id`s of the chapter page's
   CourseDisclosure. */
const CHAPTER_COURSE_TAB: Partial<Record<ChapterName, Record<string, string>>> = {
  Utrecht: {
    fundamentals: "fundamentals",
    technical: "technical",
    policy: "governance",
  },
  Amsterdam: { technical: "technical", policy: "governance" },
  Groningen: { technical: "technical", policy: "governance" },
};

/** A track's page in one chapter: its course tab there, or its programmes. */
export function chapterCourseHref(chapter: ChapterName, trackId: string): string {
  const tab = CHAPTER_COURSE_TAB[chapter]?.[trackId];
  return tab
    ? `/chapters/${chapter.toLowerCase()}#course-${tab}`
    : courseApplicationFor(chapter).href;
}

/** The track's own tab on /courses. CourseTabs there opens it from the hash. */
export function courseTrackHref(trackId: string): string {
  return `/courses#track-${trackId}`;
}

export type OpenCourseApplication = Extract<CourseApplication, { open: true }>;

/** Chapters currently taking applications, for the popup and shared CTAs. */
export const openCourseApplications = courseApplications.filter(
  (c): c is OpenCourseApplication => c.open,
);

/** "Utrecht", "Utrecht or Groningen", "A, B or C" for prose; in Dutch
 *  "Utrecht of Groningen", "A, B of C". */
export function formatCityList(
  chapters: readonly { chapter: string }[],
  locale: Locale,
): string {
  return formatList(
    chapters.map((c) => c.chapter),
    locale,
    "disjunction",
  );
}
