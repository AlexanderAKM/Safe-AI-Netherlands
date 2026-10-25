import type { OutlineItem } from "@/components/chapters/CourseDisclosure";

/* The two BlueDot Impact courses Amsterdam and Groningen both facilitate. The
   week-by-week outlines are BlueDot's, each week linking to its unit, kept
   here once so the two chapter pages cannot drift apart. */

export const BLUEDOT_URL = "https://bluedot.org/";

export const TECHNICAL_AI_SAFETY_URL =
  "https://bluedot.org/courses/technical-ai-safety";

export const FRONTIER_AI_GOVERNANCE_URL =
  "https://bluedot.org/courses/ai-governance#curriculum";

export const TECHNICAL_AI_SAFETY_WEEKS: OutlineItem[] = [
  {
    title: "The technical challenge with AI",
    href: "https://bluedot.org/courses/technical-ai-safety/1/1",
  },
  {
    title: "Training safer models",
    href: "https://bluedot.org/courses/technical-ai-safety/2/1",
  },
  {
    title: "Detecting danger",
    href: "https://bluedot.org/courses/technical-ai-safety/3/1",
  },
  {
    title: "Understanding AI",
    href: "https://bluedot.org/courses/technical-ai-safety/4/1",
  },
  {
    title: "Minimising harm",
    href: "https://bluedot.org/courses/technical-ai-safety/5/1",
  },
  {
    title: "Plan your AI safety career",
    href: "https://bluedot.org/courses/technical-ai-safety/6/1",
  },
];

export const FRONTIER_AI_GOVERNANCE_WEEKS: OutlineItem[] = [
  {
    title: "Assess frontier AI evidence",
    href: "https://bluedot.org/courses/ai-governance/1/1",
  },
  {
    title: "Map institutions and power",
    href: "https://bluedot.org/courses/ai-governance/2/1",
  },
  {
    title: "Compare governance strategies",
    href: "https://bluedot.org/courses/ai-governance/3/1",
  },
  {
    title: "Test proposals under pressure",
    href: "https://bluedot.org/courses/ai-governance/4/1",
  },
  {
    title: "Defend a position",
    href: "https://bluedot.org/courses/ai-governance/5/1",
  },
  {
    title: "Plan your AI safety career",
    href: "https://bluedot.org/courses/ai-governance/6/1",
  },
];
