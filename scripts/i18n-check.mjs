#!/usr/bin/env node
/**
 * npm run i18n:check
 *
 * Checks every language against English (messages/en, the source):
 *
 *   1. the same namespace files exist;
 *   2. the same keys exist, with the same shape (text, list, or group), and
 *      lists have the same length;
 *   3. no translation is empty;
 *   4. every message parses as ICU, and a translation keeps the English
 *      message's {placeholders}, its plural/select options and its <tags>,
 *      so a translator cannot drop "{date}" or break a link;
 *   5. every literal key the code reads (t("hero.title")) exists in English;
 *   6. src/app/(en) matches src/app/[locale] (scripts/i18n-english-routes.mjs).
 *
 * A text that is not translated yet (a key missing from the translation, or
 * left empty) is a warning, not a failure: the page shows the English for it
 * (src/i18n/messages.ts), so new English copy can ship before its Dutch. The
 * warnings list what is left to translate, and on GitHub they show on the
 * pull request. Inside a list that fallback does not apply (a list is
 * translated as a whole), so a gap there still fails, as does everything
 * else above: those break a page or a link rather than leaving it in English.
 *
 * --strict turns the warnings into failures too.
 */
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { parse, TYPE } from "@formatjs/icu-messageformat-parser";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const messagesDir = join(root, "messages");
const SOURCE = "en";

const strict = process.argv.includes("--strict");

const problems = [];
const report = (file, key, message) => problems.push(`${file}${key ? ` ${key}` : ""}: ${message}`);

/* Not translated yet: English shows in its place. Only outside lists, where
   the key-by-key fallback in src/i18n/messages.ts reaches. */
const untranslated = [];
const reportUntranslated = (file, key, message) => {
  if (key.includes("[")) report(file, key, `${message} (inside a list, so there is no English fallback)`);
  else untranslated.push({ file, key, message });
};

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
  if (other === undefined || other === null) {
    reportUntranslated(file, path, "not translated yet");
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
      reportUntranslated(file, path, "is empty");
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

// Keys used in the code must exist in English. The build already fails on a
// missing key in anything it renders; this also covers text that only
// appears after a click or in the browser (a closed tab, an error state),
// which would otherwise render empty. It reads each translator's namespace
// from its declaration (`const t = useTranslations("ns")`, or
// getTranslations with a namespace) and checks the literal keys it is called
// with: t("key"), t.rich("key"), t.raw("key"), t.markup("key"). Keys built at
// runtime (t(`items.${id}`)) are not checked here.
const englishMessages = {};
for (const file of sourceFiles) {
  englishMessages[file.replace(/\.json$/, "")] = readJson(join(messagesDir, SOURCE, file));
}

function lookup(path) {
  let node = englishMessages;
  for (const part of path.split(".")) {
    if (node === null || typeof node !== "object" || !(part in node)) return undefined;
    node = node[part];
  }
  return node;
}

function sourceFilesUnder(dir) {
  const found = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) found.push(...sourceFilesUnder(path));
    else if (/\.(tsx?|jsx?)$/.test(entry.name)) found.push(path);
  }
  return found;
}

let usedKeys = 0;
for (const file of sourceFilesUnder(join(root, "src"))) {
  const code = readFileSync(file, "utf8");
  const declarations = [];
  const declaration =
    /(?:const|let)\s+(\w+)\s*=\s*(?:await\s+)?(useTranslations|getTranslations)\(\s*(?:"([^"]*)"|'([^']*)'|\{[^}]*?namespace:\s*(?:"([^"]*)"|'([^']*)')[^}]*\}|\{[^}]*\}|)\s*\)/g;
  for (const match of code.matchAll(declaration)) {
    declarations.push({
      name: match[1],
      namespace: match[3] ?? match[4] ?? match[5] ?? match[6] ?? "",
      index: match.index,
    });
  }
  // A function that takes a translator as a parameter (`t: Translator`)
  // starts a scope whose namespace is unknown here: calls in it are skipped.
  const signatures = [
    ...code.matchAll(/function\s*\w*\s*(?:<[^>]*>)?\s*\(([^)]*)/g),
    ...code.matchAll(/\(([^()]*)\)\s*(?::[^=>{;]*)?=>/g),
  ];
  for (const name of new Set(declarations.map((d) => d.name))) {
    const parameter = new RegExp(`(?:^|[\\s,(])${name}\\s*(?:[:,?)]|$)`);
    for (const signature of signatures) {
      if (parameter.test(signature[1])) {
        declarations.push({ name, namespace: null, index: signature.index });
      }
    }
  }
  for (const name of new Set(declarations.map((d) => d.name))) {
    const call = new RegExp(`\\b${name}(?:\\.(?:rich|raw|markup))?\\(\\s*(?:"([^"]+)"|'([^']+)')`, "g");
    for (const match of code.matchAll(call)) {
      const key = match[1] ?? match[2];
      // The nearest declaration of this name above the call is its scope.
      const scope = declarations
        .filter((d) => d.name === name && d.index < match.index)
        .sort((a, b) => b.index - a.index)[0];
      if (!scope || scope.namespace === null) continue;
      usedKeys += 1;
      const full = scope.namespace ? `${scope.namespace}.${key}` : key;
      if (lookup(full) === undefined) {
        const line = code.slice(0, match.index).split("\n").length;
        report(`${file.replace(`${root}/`, "")}:${line}`, "", `uses "${full}", which messages/${SOURCE} does not have`);
      }
    }
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

if (untranslated.length) {
  const count = untranslated.length;
  console.warn(
    `i18n:check: ${count} text${count === 1 ? "" : "s"} not translated yet; the site shows the English for ${
      count === 1 ? "it" : "them"
    }:\n`,
  );
  for (const { file, key, message } of untranslated) {
    console.warn(`  ${file} ${key}: ${message}`);
    // On GitHub Actions, also a warning annotation on the pull request.
    if (process.env.GITHUB_ACTIONS) {
      console.log(`::warning file=messages/${file},title=Not translated yet::${key}: ${message}`);
    }
  }
  console.warn("");
}

const failures = strict
  ? [...problems, ...untranslated.map(({ file, key, message }) => `${file} ${key}: ${message}`)]
  : problems;

if (failures.length) {
  console.error(`i18n:check found ${failures.length} problem${failures.length === 1 ? "" : "s"}:\n`);
  for (const p of failures) console.error(`  ${p}`);
  console.error(
    "\nEnglish (messages/en) is the source. Remove the left-over keys, keep lists the same length," +
      "\nor keep the {placeholders} and <tags> the English message has. See README.md, \"Languages\".",
  );
  process.exit(1);
}

const others = locales.filter((l) => l !== SOURCE).join(", ");
console.log(
  `i18n:check: ${sourceFiles.length} namespaces, ${keyCount} English messages, ${
    untranslated.length ? `${untranslated.length} not yet translated in ${others}` : `all present in ${others}`
  }; ${usedKeys} keys used in the code, all defined${routesOk ? "; English routes in step" : ""}.`,
);
