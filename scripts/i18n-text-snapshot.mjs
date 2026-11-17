/**
 * Write the text a reader (or a crawler) gets from every page of the static
 * export, one file per page, so moving copy into src/i18n/*.json can be
 * checked: build before, snapshot, build after, snapshot, diff the two folders.
 * Any difference is wording that changed or went missing on the way.
 *
 *   node scripts/i18n-text-snapshot.mjs <out-dir> <snapshot-dir>
 *
 * It takes the visible text, the alt, aria-label, title and placeholder
 * attributes, the <title> and the description and Open Graph meta tags.
 * Scripts and styles are dropped, which also drops the RSC payload Next
 * inlines into every page.
 */
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";

const [outDir, snapshotDir] = process.argv.slice(2);
if (!outDir || !snapshotDir) {
  console.error("Usage: node scripts/i18n-text-snapshot.mjs <out-dir> <snapshot-dir>");
  process.exit(1);
}

const entities = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
function decode(text) {
  return text.replace(/&(#x[0-9a-f]+|#\d+|\w+);/gi, (match, code) => {
    if (code[0] === "#") {
      const n = code[1].toLowerCase() === "x" ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      return String.fromCodePoint(n);
    }
    return entities[code] ?? match;
  });
}

function extract(html) {
  const lines = [];
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (title) lines.push(`[title] ${decode(title[1]).trim()}`);
  for (const meta of html.matchAll(/<meta\s[^>]*>/gi)) {
    const name = meta[0].match(/(?:name|property)="([^"]+)"/i)?.[1];
    const content = meta[0].match(/content="([^"]*)"/i)?.[1];
    if (name && content && /description|og:|twitter:/i.test(name)) lines.push(`[meta ${name}] ${decode(content)}`);
  }

  const body = html
    .replace(/<head[\s\S]*?<\/head>/i, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    /* React separates adjacent text nodes with empty comments; how a sentence
       is split into nodes is not part of what the reader gets. */
    .replace(/<!--[\s\S]*?-->/g, "");
  for (const tag of body.matchAll(/<[a-z][^>]*>/gi)) {
    for (const attr of tag[0].matchAll(/\s(alt|aria-label|title|placeholder)="([^"]*)"/gi)) {
      if (attr[2].trim()) lines.push(`[${attr[1]}] ${decode(attr[2]).trim()}`);
    }
  }
  const text = decode(body.replace(/<[^>]+>/g, "\n"))
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  return [...lines, ...text].join("\n") + "\n";
}

function* htmlFiles(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(path);
    else if (entry.name.endsWith(".html")) yield path;
  }
}

let count = 0;
for (const file of htmlFiles(outDir)) {
  const target = join(snapshotDir, relative(outDir, file).replace(/\.html$/, ".txt"));
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, extract(readFileSync(file, "utf8")));
  count++;
}
console.log(`Wrote ${count} page snapshots to ${snapshotDir}`);
