/* The foundation documents under /about. Each one's title, eyebrow and
   description are in en.json under documents.<key>; the text itself is the
   markdown file in docs/ (English) or docs/<locale>/ (a translation). */
export const sainDocuments = [
  { slug: "vision", key: "vision", fileName: "vision.md" },
  { slug: "theory-of-change", key: "theoryOfChange", fileName: "theory_of_change.md" },
  { slug: "code-of-conduct", key: "codeOfConduct", fileName: "code_of_conduct.md" },
] as const;

export type SainDocument = (typeof sainDocuments)[number];

export function getSainDocument(slug: string) {
  return sainDocuments.find((document) => document.slug === slug);
}
