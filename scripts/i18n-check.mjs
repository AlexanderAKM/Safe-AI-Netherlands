#!/usr/bin/env node
/**
 * npm run i18n:check
 *
 * Fails (exit 1) when the dictionaries drift apart, so CI catches a new
 * English string that nobody translated, or a translation left behind after
 * its English was removed. It checks, for every language against English
 * (messages/en, the source):
 *
 *   1. the same namespace files exist;
 *   2. the same keys exist, with the same shape (text, list, or group), and
 *      lists have the same length;
 *   3. no translation is empty;
 *   4. every message parses as ICU, and a translation keeps the English
 *      message's {placeholders}, its plural/select options and its <tags>,
 *      so a translator cannot drop "{date}" or break a link;
 *   5. src/app/(en) matches src/app/[locale] (scripts/i18n-english-routes.mjs).
 *
 * At runtime a missing translation falls back to English (src/i18n/messages.ts),
 * so this check is about keeping the Dutch complete, not about keeping the
 * site up.
 */
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { parse, TYPE } from "@formatjs/icu-messageformat-parser";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const messagesDir = join(root, "messages");
const SOURCE = "en";

const problems = [];
const report = (file, key, message) => problems.push(`${file}${key ? ` ${key}` : ""}: ${message}`);

function shapeOf(value) {
  if (Array.isArray(value)) return "list";
  if (value !== null && typeof value === "object") return "group";
  if (typeof value === "string") return "text";
  return typeof value;
}

/** The parts of a message a translation must keep: argument names (with
 *  their type), plural/select option keys, and tag names. */
function skeleton(message) {
  const parts = new Set();
  const walk = (elements) => {
    for (const el of elements) {
      switch (el.type) {
        case TYPE.argument:
          parts.add(`{${el.value}}`);
          break;
        case TYPE.number:
        case TYPE.date:
        case TYPE.time:
          parts.add(`{${el.value}, ${TYPE[el.type]}}`);
          break;
        case TYPE.plural:
        case TYPE.select:
          parts.add(`{${el.value}, ${el.type === TYPE.plural ? "plural" : "select"}}`);
          for (const [option, { value }] of Object.entries(el.options)) {
            // Plural categories differ per language ("few" exists in Polish,
            // not in Dutch), but "other" and exact matches like "=0" must stay.
            if (el.type === TYPE.select || option === "other" || option.startsWith("=")) {
              parts.add(`{${el.value} ${option}}`);
            }
            walk(value);
          }
          break;
        case TYPE.tag:
          parts.add(`<${el.value}>`);
          walk(el.children);
          break;
        default:
          break;
      }
    }
  };
  walk(parse(message));
  return parts;
}

function compare(file, en, other, path = "") {
  const enShape = shapeOf(en);
  const otherShape = shapeOf(other);
  if (other === undefined) {
    report(file, path, "missing (in English, not translated)");
    return;
  }
  if (enShape !== otherShape) {
    report(file, path, `is a ${otherShape}, but a ${enShape} in English`);
    return;
  }
  if (enShape === "group") {
    for (const key of Object.keys(en)) compare(file, en[key], other[key], path ? `${path}.${key}` : key);
    for (const key of Object.keys(other)) {
      if (!(key in en)) report(file, path ? `${path}.${key}` : key, "not in English (left over, or a typo)");
    }
    return;
  }
  if (enShape === "list") {
    if (en.length !== other.length) {
      report(file, path, `has ${other.length} items, English has ${en.length}`);
    }
    en.forEach((item, i) => {
      if (i < other.length) compare(file, item, other[i], `${path}[${i}]`);
    });
    return;
  }
  if (enShape === "text") {
    if (other.trim() === "" && en.trim() !== "") {
      report(file, path, "is empty");
      return;
    }
    let enParts;
    let otherParts;
    try {
      enParts = skeleton(en);
    } catch (error) {
      report(`${SOURCE}/${file.split("/").pop()}`, path, `English does not parse as ICU: ${error.message}`);
      return;
    }
    try {
      otherParts = skeleton(other);
    } catch (error) {
      report(file, path, `does not parse as ICU: ${error.message}`);
      return;
    }
    const lost = [...enParts].filter((p) => !otherParts.has(p));
    const added = [...otherParts].filter((p) => !enParts.has(p));
    if (lost.length) report(file, path, `drops ${lost.join(" ")} from the English`);
    if (added.length) report(file, path, `adds ${added.join(" ")}, which English does not have`);
  }
}

function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (error) {
    report(path.replace(`${root}/`, ""), "", `is not valid JSON: ${error.message}`);
    return undefined;
  }
}

const locales = readdirSync(messagesDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

if (!locales.includes(SOURCE)) {
  console.error(`messages/${SOURCE} is missing.`);
  process.exit(1);
}

const sourceFiles = readdirSync(join(messagesDir, SOURCE)).filter((f) => f.endsWith(".json")).sort();
let keyCount = 0;

// English on its own: every message must parse.
for (const file of sourceFiles) {
  const en = readJson(join(messagesDir, SOURCE, file));
  const walk = (value, path) => {
    if (typeof value === "string") {
      keyCount += 1;
      try {
        parse(value);
      } catch (error) {
        report(`${SOURCE}/${file}`, path, `does not parse as ICU: ${error.message}`);
      }
    } else if (value && typeof value === "object") {
      for (const [k, v] of Object.entries(value)) walk(v, Array.isArray(value) ? `${path}[${k}]` : path ? `${path}.${k}` : k);
    }
  };
  walk(en, "");
}

for (const locale of locales.filter((l) => l !== SOURCE)) {
  const files = readdirSync(join(messagesDir, locale)).filter((f) => f.endsWith(".json")).sort();
  for (const file of sourceFiles) {
    if (!files.includes(file)) {
      report(`${locale}/${file}`, "", "file is missing");
      continue;
    }
    const en = readJson(join(messagesDir, SOURCE, file));
    const other = readJson(join(messagesDir, locale, file));
    if (en !== undefined && other !== undefined) compare(`${locale}/${file}`, en, other);
  }
  for (const file of files) {
    if (!sourceFiles.includes(file)) report(`${locale}/${file}`, "", "file has no English counterpart");
  }
}

// The English route tree.
let routesOk = true;
try {
  execFileSync(process.execPath, [join(root, "scripts", "i18n-english-routes.mjs"), "--check"], {
    stdio: ["ignore", "pipe", "pipe"],
  });
} catch (error) {
  routesOk = false;
  problems.push(`src/app/(en): ${String(error.stderr || error.message).trim()}`);
}

if (problems.length) {
  console.error(`i18n:check found ${problems.length} problem${problems.length === 1 ? "" : "s"}:\n`);
  for (const p of problems) console.error(`  ${p}`);
  console.error(
    "\nEnglish (messages/en) is the source. Add the missing translations, remove the left-over keys," +
      "\nor keep the {placeholders} and <tags> the English message has. See README.md, \"Languages\".",
  );
  process.exit(1);
}

console.log(
  `i18n:check: ${sourceFiles.length} namespaces, ${keyCount} English messages, all present in ${locales
    .filter((l) => l !== SOURCE)
    .join(", ")}${routesOk ? "; English routes in step" : ""}.`,
);
