import type { OutlineItem } from "@/components/chapters/CourseDisclosure";

/* The two BlueDot Impact courses Amsterdam and Groningen both facilitate. The
   week-by-week outlines are BlueDot's, each week linking to its unit, kept
   here once so the two chapter pages cannot drift apart. The week titles are
   text, so they live in messages/<locale>/chapters.json under
   `bluedot.<course>.<week id>`; the units they link to are BlueDot's own. */

export const BLUEDOT_URL = "https://bluedot.org/";

export const TECHNICAL_AI_SAFETY_URL =
  "https://bluedot.org/courses/technical-ai-safety";

export const FRONTIER_AI_GOVERNANCE_URL =
  "https://bluedot.org/courses/ai-governance#curriculum";

/** The course's key in the messages: chapters.bluedot.<course>. */
export type BlueDotCourse = "technicalAiSafety" | "frontierAiGovernance";

/** One week: its title's key under chapters.bluedot.<course>, and its unit. */
export type BlueDotWeek = { id: string; href: string };

export const TECHNICAL_AI_SAFETY_WEEKS: BlueDotWeek[] = [
  {
    id: "technicalChallenge",
    href: "https://bluedot.org/courses/technical-ai-safety/1/1",
  },
  {
    id: "saferModels",
    href: "https://bluedot.org/courses/technical-ai-safety/2/1",
  },
  {
    id: "detectingDanger",
    href: "https://bluedot.org/courses/technical-ai-safety/3/1",
  },
  {
    id: "understandingAi",
    href: "https://bluedot.org/courses/technical-ai-safety/4/1",
  },
  {
    id: "minimisingHarm",
    href: "https://bluedot.org/courses/technical-ai-safety/5/1",
  },
  {
    id: "career",
    href: "https://bluedot.org/courses/technical-ai-safety/6/1",
  },
];

export const FRONTIER_AI_GOVERNANCE_WEEKS: BlueDotWeek[] = [
  {
    id: "evidence",
    href: "https://bluedot.org/courses/ai-governance/1/1",
  },
  {
    id: "institutions",
    href: "https://bluedot.org/courses/ai-governance/2/1",
  },
  {
    id: "strategies",
    href: "https://bluedot.org/courses/ai-governance/3/1",
  },
  {
    id: "proposals",
    href: "https://bluedot.org/courses/ai-governance/4/1",
  },
  {
    id: "position",
    href: "https://bluedot.org/courses/ai-governance/5/1",
  },
  {
    id: "career",
    href: "https://bluedot.org/courses/ai-governance/6/1",
  },
];

const WEEKS: Record<BlueDotCourse, BlueDotWeek[]> = {
  technicalAiSafety: TECHNICAL_AI_SAFETY_WEEKS,
  frontierAiGovernance: FRONTIER_AI_GOVERNANCE_WEEKS,
};

/**
 * A course's weeks as a chapter page's outline, titled in the reader's
 * language. `t` reads `chapters.bluedot`: useTranslations("chapters.bluedot").
 */
export function blueDotOutline(
  course: BlueDotCourse,
  t: (key: string) => string,
): OutlineItem[] {
  return WEEKS[course].map(({ id, href }) => ({
    title: t(`${course}.${id}`),
    href,
  }));
}
