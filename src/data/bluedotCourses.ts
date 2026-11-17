import type { OutlineItem } from "@/components/chapters/CourseDisclosure";
import type { Dictionary } from "@/i18n";

/* The two BlueDot Impact courses Amsterdam and Groningen both facilitate. The
   week-by-week outlines are BlueDot's, each week linking to its unit, kept
   here once so the two chapter pages cannot drift apart. The week titles are
   in en.json under bluedot, in the same order as the links below. */

export const BLUEDOT_URL = "https://bluedot.org/";

export const TECHNICAL_AI_SAFETY_URL =
  "https://bluedot.org/courses/technical-ai-safety";

export const FRONTIER_AI_GOVERNANCE_URL =
  "https://bluedot.org/courses/ai-governance#curriculum";

const TECHNICAL_AI_SAFETY_UNITS = [
  "https://bluedot.org/courses/technical-ai-safety/1/1",
  "https://bluedot.org/courses/technical-ai-safety/2/1",
  "https://bluedot.org/courses/technical-ai-safety/3/1",
  "https://bluedot.org/courses/technical-ai-safety/4/1",
  "https://bluedot.org/courses/technical-ai-safety/5/1",
  "https://bluedot.org/courses/technical-ai-safety/6/1",
];

export function technicalAiSafetyWeeks(t: Dictionary["bluedot"]): OutlineItem[] {
  return TECHNICAL_AI_SAFETY_UNITS.map((href, i) => ({ title: t.technicalWeeks[i], href }));
}

const FRONTIER_AI_GOVERNANCE_UNITS = [
  "https://bluedot.org/courses/ai-governance/1/1",
  "https://bluedot.org/courses/ai-governance/2/1",
  "https://bluedot.org/courses/ai-governance/3/1",
  "https://bluedot.org/courses/ai-governance/4/1",
  "https://bluedot.org/courses/ai-governance/5/1",
  "https://bluedot.org/courses/ai-governance/6/1",
];

export function frontierAiGovernanceWeeks(t: Dictionary["bluedot"]): OutlineItem[] {
  return FRONTIER_AI_GOVERNANCE_UNITS.map((href, i) => ({ title: t.governanceWeeks[i], href }));
}
