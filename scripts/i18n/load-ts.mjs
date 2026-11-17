/* Imports a TypeScript module from src/ in plain Node, so the translation
   scripts can read the data files (src/data/*.ts) without a build.

   Each file, and every file it imports, is transpiled with the project's own
   TypeScript into node_modules/.cache/i18n-ts/, with `@/` and relative imports
   rewritten to point at the transpiled copies. Types are dropped, nothing is
   type-checked: `npm run build` does that. */

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import ts from "typescript";

const root = process.cwd();
const src = path.join(root, "src");
const cache = path.join(root, "node_modules", ".cache", "i18n-ts");

function resolveSource(specifier, fromFile) {
  const base = specifier.startsWith("@/")
    ? path.join(src, specifier.slice(2))
    : path.resolve(path.dirname(fromFile), specifier);
  for (const candidate of [base, `${base}.ts`, `${base}.tsx`, path.join(base, "index.ts")]) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return candidate;
  }
  throw new Error(`Cannot resolve "${specifier}" from ${path.relative(root, fromFile)}`);
}

function outputPath(file) {
  if (file.endsWith(".json")) return path.join(cache, path.relative(root, file));
  return path.join(cache, path.relative(root, file)).replace(/\.tsx?$/, ".mjs");
}

function compile(file, done) {
  const out = outputPath(file);
  if (done.has(file)) return out;
  done.add(file);
  fs.mkdirSync(path.dirname(out), { recursive: true });

  if (file.endsWith(".json")) {
    fs.copyFileSync(file, out);
    return out;
  }

  const { outputText } = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    fileName: file,
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
      verbatimModuleSyntax: false,
    },
  });

  const code = outputText.replace(
    /(\bfrom\s*|\bimport\s*\(\s*|\bimport\s+)(["'])((?:@\/|\.{1,2}\/)[^"']+)\2/g,
    (_whole, lead, quote, specifier) => {
      const target = compile(resolveSource(specifier, file), done);
      let relative = path.relative(path.dirname(out), target).split(path.sep).join("/");
      if (!relative.startsWith(".")) relative = `./${relative}`;
      const attributes = target.endsWith(".json") ? ` with { type: "json" }` : "";
      return `${lead}${quote}${relative}${quote}${attributes}`;
    },
  );
  fs.writeFileSync(out, code);
  return out;
}

/** Imports src/<relativePath> (e.g. "data/openPositions.ts") and returns its exports. */
export async function importSource(relativePath) {
  const out = compile(path.join(src, relativePath), new Set());
  return import(`${pathToFileURL(out).href}?t=${Date.now()}`);
}
