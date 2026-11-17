/* npm run i18n:check
   Checks the Dutch files against the English ones, so a translation that
   would break a page is caught before it ships:
   - src/i18n/nl.json against en.json, and src/i18n/content.nl.json against
     the text the data files hold now: the same keys, lists of the same length,
     the same <tag>s and {placeholders} in every text, and no text left empty;
   - docs/nl/*.md against docs/*.md: the same number of headings and the same
     link targets.
   Keys the English has and the Dutch lacks are reported as missing, which is
   what a change to the English after the translation looks like. */

import fs from "node:fs";
import path from "node:path";

import { buildContent } from "./content.mjs";
import { flatten, root } from "./source.mjs";

const problems = [];

const markers = (text) => ({
  tags: [...text.matchAll(/<(\w+)>/g)].map((m) => m[1]).sort().join(","),
  placeholders: [...new Set([...text.matchAll(/\{(\w+)\}/g)].map((m) => m[1]))].sort().join(","),
});

function compareText(where, english, dutch) {
  if (typeof dutch !== "string") {
    problems.push(`${where}: should be text`);
    return;
  }
  if (english.trim() !== "" && dutch.trim() === "") problems.push(`${where}: empty`);
  const a = markers(english);
  const b = markers(dutch);
  if (a.tags !== b.tags) problems.push(`${where}: tags <${a.tags}> in English, <${b.tags}> in Dutch`);
  if (a.placeholders !== b.placeholders) {
    problems.push(`${where}: placeholders {${a.placeholders}} in English, {${b.placeholders}} in Dutch`);
  }
}

function compareValue(where, english, dutch) {
  if (Array.isArray(english)) {
    if (!Array.isArray(dutch) || dutch.length !== english.length) {
      problems.push(`${where}: a list of ${english.length} in English, ${Array.isArray(dutch) ? dutch.length : "no list"} in Dutch`);
      return;
    }
    english.forEach((item, i) => compareValue(`${where}[${i}]`, item, dutch[i]));
  } else if (english !== null && typeof english === "object") {
    compareTree(where, english, dutch);
  } else if (typeof english === "string") {
    compareText(where, english, dutch);
  }
}

function compareTree(label, english, dutch) {
  const dutchPairs = new Map(flatten(dutch ?? {}).map(([keys, value]) => [keys.join("."), value]));
  for (const [keys, value] of flatten(english)) {
    const key = keys.join(".");
    if (!dutchPairs.has(key)) problems.push(`${label}: ${key} is missing`);
    else compareValue(`${label}: ${key}`, value, dutchPairs.get(key));
    dutchPairs.delete(key);
  }
  for (const key of dutchPairs.keys()) problems.push(`${label}: ${key} is not in the English (remove it)`);
}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    problems.push(`${path.relative(root, file)}: ${error.message}`);
    return undefined;
  }
}

const i18n = path.join(root, "src", "i18n");
const checked = [];

if (fs.existsSync(path.join(i18n, "nl.json"))) {
  const nl = readJson(path.join(i18n, "nl.json"));
  if (nl) compareTree("nl.json", readJson(path.join(i18n, "en.json")), nl);
  checked.push("nl.json");
}
if (fs.existsSync(path.join(i18n, "content.nl.json"))) {
  const nl = readJson(path.join(i18n, "content.nl.json"));
  if (nl) compareTree("content.nl.json", await buildContent(), nl);
  checked.push("content.nl.json");
}

const docsNl = path.join(root, "docs", "nl");
if (fs.existsSync(docsNl)) {
  const headings = (text) => text.split("\n").filter((line) => /^#{1,6} /.test(line)).length;
  const links = (text) => [...text.matchAll(/\]\(([^)\s]+)/g)].map((m) => m[1]).sort().join(" ");
  for (const fileName of fs.readdirSync(docsNl).filter((name) => name.endsWith(".md"))) {
    const englishFile = path.join(root, "docs", fileName);
    if (!fs.existsSync(englishFile)) {
      problems.push(`docs/nl/${fileName}: no English docs/${fileName}`);
      continue;
    }
    const english = fs.readFileSync(englishFile, "utf8");
    const dutch = fs.readFileSync(path.join(docsNl, fileName), "utf8");
    if (headings(english) !== headings(dutch)) {
      problems.push(`docs/nl/${fileName}: ${headings(english)} headings in English, ${headings(dutch)} in Dutch`);
    }
    if (links(english) !== links(dutch)) problems.push(`docs/nl/${fileName}: the links differ from the English`);
    checked.push(`docs/nl/${fileName}`);
  }
}

if (checked.length === 0) {
  console.log("No Dutch files yet.");
} else if (problems.length > 0) {
  console.error(problems.join("\n"));
  console.error(`\n${problems.length} problem(s) in ${checked.join(", ")}.`);
  process.exit(1);
} else {
  console.log(`OK: ${checked.join(", ")}.`);
}
