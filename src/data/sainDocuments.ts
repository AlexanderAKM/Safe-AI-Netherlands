/* SAIN's governing documents, at /about/<slug>. The markdown is
   docs/<fileName>, and its translations docs/<locale>/<fileName>
   (src/i18n/documents.ts). Each one's eyebrow, title and description are
   text, so `key` names them under documents.items in
   messages/<locale>/about.json. */
export const sainDocuments = [
  {
    slug: "vision",
    key: "vision",
    fileName: "vision.md",
  },
  {
    slug: "theory-of-change",
    key: "theoryOfChange",
    fileName: "theory_of_change.md",
  },
  {
    slug: "code-of-conduct",
    key: "codeOfConduct",
    fileName: "code_of_conduct.md",
  },
] as const;

export type SainDocument = (typeof sainDocuments)[number];

export function getSainDocument(slug: string) {
  return sainDocuments.find((document) => document.slug === slug);
}
