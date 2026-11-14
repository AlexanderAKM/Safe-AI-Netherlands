export const sainDocuments = [
  {
    slug: "vision",
    title: "Vision",
    eyebrow: "Where SAIN is going",
    description:
      "SAIN's mission, national role, strategic pillars, and long-term ambition for AI safety in the Netherlands.",
    fileName: "vision.md",
  },
  {
    slug: "theory-of-change",
    title: "Theory of Change",
    eyebrow: "How change happens",
    description:
      "Why we believe our work prepares the Netherlands for transformative AI: our causal argument, what we measure, and the assumptions we track.",
    fileName: "theory_of_change.md",
  },
  {
    slug: "code-of-conduct",
    title: "Code of Conduct",
    eyebrow: "How we work together",
    description:
      "Behavioral standards for everyone who takes part in SAIN activities, and how concerns are reported and handled.",
    fileName: "code_of_conduct.md",
  },
] as const;

export type SainDocument = (typeof sainDocuments)[number];

export function getSainDocument(slug: string) {
  return sainDocuments.find((document) => document.slug === slug);
}
