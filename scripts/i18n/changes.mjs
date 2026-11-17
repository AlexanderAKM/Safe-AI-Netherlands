/* npm run i18n:changes
   Lists the text added, changed or removed since the translator last received
   it (src/i18n/sent.json), and writes translation/changes/ with only the new
   and changed texts, ready to send.

   npm run i18n:changes -- --sent
   Records the current text as sent, after the changes folder has gone out.
   Commit src/i18n/sent.json afterwards. */

import fs from "node:fs";
import path from "node:path";

import { flatten, outDir, readSource, root, saveSent, sentFile, unflatten, writeJson } from "./source.mjs";

if (!fs.existsSync(sentFile)) {
  console.error("Nothing has been sent yet: run `npm run i18n:package` for the first package.");
  process.exit(1);
}

const source = await readSource();

if (process.argv.includes("--sent")) {
  saveSent(source);
  console.log("Recorded the current text as sent in src/i18n/sent.json. Commit it.");
  process.exit(0);
}

const sent = JSON.parse(fs.readFileSync(sentFile, "utf8"));

function compare(before, after) {
  const old = new Map(flatten(before).map(([keys, value]) => [JSON.stringify(keys), value]));
  const added = [];
  const changed = [];
  for (const [keys, value] of flatten(after)) {
    const id = JSON.stringify(keys);
    if (!old.has(id)) added.push([keys, value]);
    else if (JSON.stringify(old.get(id)) !== JSON.stringify(value)) changed.push([keys, value]);
    old.delete(id);
  }
  const removed = [...old.keys()].map((id) => JSON.parse(id));
  return { added, changed, removed };
}

const files = [
  ["en.json", compare(sent.messages, source.messages)],
  ["content.en.json", compare(sent.content, source.content)],
];
const documents = Object.keys({ ...sent.documents, ...source.documents }).filter(
  (fileName) => sent.documents[fileName] !== source.documents[fileName],
);

const changesDir = path.join(outDir, "changes");
fs.rmSync(changesDir, { recursive: true, force: true });

const report = [`# Changes since the translation sent on ${sent.sentOn}`, ""];
let total = documents.length;
for (const [fileName, { added, changed, removed }] of files) {
  total += added.length + changed.length + removed.length;
  if (added.length + changed.length > 0) {
    writeJson(path.join(changesDir, fileName), unflatten([...changed, ...added]));
  }
  for (const [label, entries] of [
    ["New", added.map(([keys]) => keys)],
    ["Changed", changed.map(([keys]) => keys)],
    ["Removed (delete from the Dutch file too)", removed],
  ]) {
    if (entries.length === 0) continue;
    report.push(`## ${fileName}: ${label}`, "", ...entries.map((keys) => `- ${keys.join(".")}`), "");
  }
}
for (const fileName of documents) {
  if (source.documents[fileName] === undefined) {
    report.push(`## documents/${fileName}: removed`, "");
    continue;
  }
  fs.mkdirSync(path.join(changesDir, "documents"), { recursive: true });
  fs.writeFileSync(path.join(changesDir, "documents", fileName), source.documents[fileName]);
  report.push(`## documents/${fileName}: ${sent.documents[fileName] === undefined ? "new" : "changed"}`, "");
}

if (total === 0) {
  console.log(`No text has changed since ${sent.sentOn}.`);
  process.exit(0);
}

fs.mkdirSync(changesDir, { recursive: true });
fs.writeFileSync(path.join(changesDir, "CHANGES.md"), report.join("\n"));
console.log(report.join("\n"));
console.log(`Wrote ${path.relative(root, changesDir)}/ with the new and changed texts.`);
console.log("After sending it, run `npm run i18n:changes -- --sent` and commit src/i18n/sent.json.");
