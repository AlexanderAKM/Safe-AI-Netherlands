/* npm run i18n:package
   Builds translation/, the folder to send the translator: en.json,
   content.en.json (the text that lives in src/data/), the About documents and
   TRANSLATOR.md. Then records what was sent in src/i18n/sent.json, so
   `npm run i18n:changes` can list what changes afterwards. Commit sent.json
   once the folder has gone out. */

import fs from "node:fs";
import path from "node:path";

import { outDir, readKeptNames, readSource, root, saveSent, writeJson } from "./source.mjs";

const source = await readSource();
const { roleTitles, courseNames } = await readKeptNames();

fs.rmSync(outDir, { recursive: true, force: true });
writeJson(path.join(outDir, "en.json"), source.messages);
writeJson(path.join(outDir, "content.en.json"), source.content);
for (const [fileName, text] of Object.entries(source.documents)) {
  fs.mkdirSync(path.join(outDir, "documents"), { recursive: true });
  fs.writeFileSync(path.join(outDir, "documents", fileName), text);
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
fs.writeFileSync(path.join(outDir, "TRANSLATOR.md"), guide.trimEnd() + "\n" + lists);

saveSent(source);

const size = (file) => `${Math.round(fs.statSync(path.join(outDir, file)).size / 1024)} KB`;
console.log(`Wrote ${path.relative(root, outDir)}/:`);
console.log(`  en.json            ${size("en.json")}`);
console.log(`  content.en.json    ${size("content.en.json")}`);
for (const fileName of Object.keys(source.documents)) {
  console.log(`  documents/${fileName.padEnd(22)}${size(path.join("documents", fileName))}`);
}
console.log(`  TRANSLATOR.md`);
console.log(`Recorded what was sent in src/i18n/sent.json. Commit it once the folder has gone out.`);
