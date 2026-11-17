/* Everything the translator works from, read from the repository: the
   dictionary, the data-file text, the About documents, and the lists of names
   that stay in English. Shared by `i18n:package` and `i18n:changes`. */

import fs from "node:fs";
import path from "node:path";

import { buildContent } from "./content.mjs";
import { importSource } from "./load-ts.mjs";

export const root = process.cwd();
export const outDir = path.join(root, "translation");
/* What was last sent to the translator, committed so `i18n:changes` can say
   what has changed since. */
export const sentFile = path.join(root, "src", "i18n", "sent.json");

export async function readSource() {
  const messages = JSON.parse(fs.readFileSync(path.join(root, "src", "i18n", "en.json"), "utf8"));
  const content = await buildContent();

  const { sainDocuments } = await importSource("data/sainDocuments.ts");
  const documents = Object.fromEntries(
    sainDocuments.map(({ fileName }) => [fileName, fs.readFileSync(path.join(root, "docs", fileName), "utf8")]),
  );

  return { messages, content, documents };
}

/** Role titles and course and track names: they stay English, and the
    translator's guide lists them so the list cannot fall behind the site. */
export async function readKeptNames() {
  const { ROLES, chapterPositions, nationalPosting } = await importSource("data/openPositions.ts");
  const { FOUNDING_ROLES } = await importSource("data/newChapters.ts");
  const { TRACKS } = await importSource("data/courseTracks.ts");

  const postedRoles = [
    ...chapterPositions.flatMap((chapter) => chapter.postings ?? []),
    ...(nationalPosting.postings ?? []),
  ]
    .map((posting) => ROLES[posting.roleId])
    .filter(Boolean);
  const roleTitles = new Set([
    ...postedRoles.flatMap((role) => [role.title, role.specialisationOf]),
    /* A role reports to a title, except where the field explains a split
       ("Lead responsible for …"); that phrase is translated, with the titles
       in it kept. A title is capitalised throughout. */
    ...postedRoles.map((role) => role.reportsTo).filter((title) => /^[A-Z][\w&]*( [A-Z][\w&]*)*$/.test(title)),
    ...FOUNDING_ROLES.map((role) => role.title),
    "Chapter Director",
  ]);
  roleTitles.delete(undefined);

  return {
    roleTitles: [...roleTitles].sort(),
    courseNames: [
      ...TRACKS.map((track) => track.title),
      "Technical AI Safety",
      "Frontier AI Governance",
      "AI Safety, Ethics and Society",
    ],
  };
}

/** Flattens nested objects to [path, value] pairs. Lists count as one value:
    a changed item sends the whole list back for translation. */
export function flatten(value, prefix = []) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return [[prefix, value]];
  return Object.entries(value).flatMap(([key, child]) => flatten(child, [...prefix, key]));
}

export function unflatten(pairs) {
  const result = {};
  for (const [keys, value] of pairs) {
    let node = result;
    keys.slice(0, -1).forEach((key) => {
      node = node[key] ??= {};
    });
    node[keys[keys.length - 1]] = value;
  }
  return result;
}

export function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

export function saveSent(source) {
  writeJson(sentFile, { sentOn: new Date().toISOString().slice(0, 10), ...source });
}
