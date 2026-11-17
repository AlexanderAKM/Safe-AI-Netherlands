/* npm run i18n:package
   Builds translation/, the folder to send the Dutch reviewer: the English
   (en.json, content.en.json with the text that lives in src/data/, and the
   About documents), the Dutch draft beside it (src/i18n/nl.json,
   src/i18n/content.nl.json, docs/nl/), the draft's open questions
   (src/i18n/nl.notes.md), review.csv with every text side by side, and
   TRANSLATOR.md. Then records what was sent in src/i18n/sent.json, so
   `npm run i18n:changes` can list what changes afterwards. Commit sent.json
   once the folder has gone out. */

import fs from "node:fs";
import path from "node:path";

import { flatten, outDir, readKeptNames, readSource, root, saveSent, writeJson } from "./source.mjs";

const source = await readSource();
const { roleTitles, courseNames } = await readKeptNames();

const i18n = path.join(root, "src", "i18n");
const readDutch = (file) => (fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : undefined);
const nlMessages = readDutch(path.join(i18n, "nl.json"));
const nlContent = readDutch(path.join(i18n, "content.nl.json"));

fs.rmSync(outDir, { recursive: true, force: true });
const write = (file, text) => {
  fs.mkdirSync(path.dirname(path.join(outDir, file)), { recursive: true });
  fs.writeFileSync(path.join(outDir, file), text);
};

writeJson(path.join(outDir, "en.json"), source.messages);
writeJson(path.join(outDir, "content.en.json"), source.content);
if (nlMessages) writeJson(path.join(outDir, "nl.json"), nlMessages);
if (nlContent) writeJson(path.join(outDir, "content.nl.json"), nlContent);

for (const [fileName, text] of Object.entries(source.documents)) {
  write(path.join("documents", "en", fileName), text);
  const dutch = path.join(root, "docs", "nl", fileName);
  if (fs.existsSync(dutch)) write(path.join("documents", "nl", fileName), fs.readFileSync(dutch, "utf8"));
}

const notes = path.join(i18n, "nl.notes.md");
if (fs.existsSync(notes)) write("NOTES.md", fs.readFileSync(notes, "utf8"));

/* Every text side by side, for reading through in a spreadsheet. Lists are
   split into one row per item. The byte-order mark makes Excel read UTF-8. */
function rows(file, english, dutch) {
  const dutchByKey = new Map(flatten(dutch ?? {}).map(([keys, value]) => [keys.join("."), value]));
  const out = [];
  const add = (key, en, nl) => {
    if (Array.isArray(en)) en.forEach((item, i) => add(`${key}[${i}]`, item, Array.isArray(nl) ? nl[i] : undefined));
    else if (en !== null && typeof en === "object") {
      for (const [child, value] of Object.entries(en)) add(`${key}.${child}`, value, nl?.[child]);
    } else out.push([file, key, en, nl ?? ""]);
  };
  for (const [keys, value] of flatten(english)) add(keys.join("."), value, dutchByKey.get(keys.join(".")));
  return out;
}
if (nlMessages || nlContent) {
  const cell = (value) => `"${String(value).replace(/"/g, '""')}"`;
  const table = [
    ["file", "key", "English", "Dutch draft"],
    ...rows("nl.json", source.messages, nlMessages),
    ...rows("content.nl.json", source.content, nlContent),
  ];
  write("review.csv", "﻿" + table.map((row) => row.map(cell).join(",")).join("\r\n") + "\r\n");
}

const guide = fs.readFileSync(path.join(root, "scripts", "i18n", "TRANSLATOR.md"), "utf8");
const lists = [
  "",
  "## Role titles (keep in English)",
  "",
  ...roleTitles.map((title) => `- ${title}`),
  "",
  "## Course and track names (keep in English)",
  "",
  ...courseNames.map((name) => `- ${name}`),
  "",
].join("\n");
write("TRANSLATOR.md", guide.trimEnd() + "\n" + lists);

saveSent(source);

const listing = (dir, prefix = "") =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? listing(path.join(dir, entry.name), `${prefix}${entry.name}/`)
      : [`  ${(prefix + entry.name).padEnd(36)}${Math.max(1, Math.round(fs.statSync(path.join(dir, entry.name)).size / 1024))} KB`],
  );
console.log(`Wrote ${path.relative(root, outDir)}/:`);
console.log(listing(outDir).join("\n"));
console.log(`Recorded what was sent in src/i18n/sent.json. Commit it once the folder has gone out.`);
