import { intlLocale, type Locale } from "./routing";

/* Dates and lists, in the reader's language.

   Dates in src/data are ISO strings ("2026-11-16"). They print as
   "16 November 2026" in English (British order, as the site always has) and
   as "16 november 2026" in Dutch. A date with no time is a calendar day, so it
   is read and printed in UTC: the day never shifts with the build machine's
   time zone. */

export type DateStyle =
  /** 16 November 2026 */
  | "long"
  /** 16 November */
  | "dayMonth"
  /** Monday 16 November 2026 */
  | "weekdayLong"
  /** Mon 16 Nov */
  | "weekdayShort"
  /** 16 Nov 2026 */
  | "medium"
  /** Nov 2026 */
  | "monthYear"
  /** November 2026 */
  | "monthYearLong";

const dateOptions: Record<DateStyle, Intl.DateTimeFormatOptions> = {
  long: { day: "numeric", month: "long", year: "numeric" },
  dayMonth: { day: "numeric", month: "long" },
  weekdayLong: { weekday: "long", day: "numeric", month: "long", year: "numeric" },
  weekdayShort: { weekday: "short", day: "numeric", month: "short" },
  medium: { day: "numeric", month: "short", year: "numeric" },
  monthYear: { month: "short", year: "numeric" },
  monthYearLong: { month: "long", year: "numeric" },
};

function toDate(value: string | Date): Date {
  if (value instanceof Date) return value;
  // A bare calendar day: midnight UTC, so formatting in UTC keeps the day.
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return new Date(`${value}T00:00:00Z`);
  return new Date(value);
}

export function formatDate(
  value: string | Date,
  locale: Locale,
  style: DateStyle = "long",
  timeZone = "UTC",
): string {
  return new Intl.DateTimeFormat(intlLocale[locale], {
    ...dateOptions[style],
    timeZone,
  }).format(toDate(value));
}

/** "Utrecht or Groningen", "A, B or C" / "Utrecht of Groningen", "A, B of C". */
export function formatList(
  items: readonly string[],
  locale: Locale,
  type: "conjunction" | "disjunction" = "conjunction",
): string {
  return new Intl.ListFormat(intlLocale[locale], { style: "long", type }).format(items);
}
