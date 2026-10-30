#!/usr/bin/env node
/**
 * Fetch the Project Team's tracker from Airtable and write its public fields
 * to a JSON file: by default src/data/airtableProjects.json (the copy the site
 * is built with), or the path given as the first argument. The hourly
 * workflow .github/workflows/refresh-project-tracker.yml uses the argument to
 * write to the `tracker-data` branch, which the page loads in the browser.
 *
 * Source: the "Open Projects (Website)" view of the Project Hub table in the
 * SAIN Pipeline base. Only the fields in FIELDS are requested, so Notes, the
 * attachments and the Supervisor link (it shows the supervisor's email) never
 * leave Airtable. Fields are asked for by ID, so renaming one in Airtable does
 * not break this.
 *
 * The file is only rewritten when a project changed, so its `updatedAt` is
 * the time of the last change and an unchanged tracker makes no commit.
 *
 * Needs AIRTABLE_TOKEN: a personal access token with only the scope
 * data.records:read, on only the SAIN Pipeline base. It is a GitHub Actions
 * secret, or locally a line in .env.local, which git ignores. Without it this
 * does nothing; when Airtable fails it exits with an error and writes nothing.
 *
 * Usage: npm run fetch-airtable-projects [-- <output path>]
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const BASE_ID = "appQC7SP1Qy95K03h"; // SAIN Pipeline
const TABLE_ID = "tblMKfy4QWixrEoZs"; // Project Hub
const VIEW_ID = "viw61X6DDJD7siV85"; // Open Projects (Website)
const FIELDS = {
  name: "fld40T2OwwaadBkMM", // Name, as "Supervisor: Project title"
  status: "fldEPACfemiZa5se1", // Status
  description: "fldlQMuhfKLPTbJzN", // Research + Work
  tags: "fld4FTLOCZBzvLyvU", // Project Tags
  website: "fld6heod6zUDn6mND", // LinkedIn or personal website (from Supervisor)
};

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_PATH = process.argv[2] ? resolve(process.argv[2]) : join(ROOT, "src", "data", "airtableProjects.json");

try {
  process.loadEnvFile(join(ROOT, ".env.local"));
} catch {
  // No .env.local: the token comes from the environment, or not at all.
}

const token = process.env.AIRTABLE_TOKEN;
if (!token) {
  console.log("AIRTABLE_TOKEN not set; nothing fetched.");
  process.exit(0);
}

async function fetchRecords() {
  const records = [];
  let offset;
  do {
    const params = new URLSearchParams({ view: VIEW_ID, returnFieldsByFieldId: "true", pageSize: "100" });
    for (const id of Object.values(FIELDS)) params.append("fields[]", id);
    if (offset) params.set("offset", offset);
    const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(20_000),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      const reason = typeof body.error === "string" ? body.error : body.error?.type;
      throw new Error(`Airtable returned ${res.status} ${reason ?? res.statusText}`);
    }
    const page = await res.json();
    records.push(...page.records);
    offset = page.offset;
  } while (offset);
  return records;
}

const text = (value) => (typeof value === "string" ? value.trim() : "");

try {
  const records = (await fetchRecords())
    .map(({ id, fields }) => ({
      id,
      name: text(fields[FIELDS.name]),
      status: text(fields[FIELDS.status]),
      description: text(fields[FIELDS.description]),
      tags: (fields[FIELDS.tags] ?? []).map(text).filter(Boolean),
      website: text((fields[FIELDS.website] ?? [])[0]) || undefined,
    }))
    .filter((record) => record.name);

  // An empty view is far likelier a hiccup than every project gone at once.
  if (records.length === 0) throw new Error("the view came back empty");

  let previous;
  try {
    previous = JSON.parse(readFileSync(OUT_PATH, "utf8")).records;
  } catch {
    // No copy yet, or not one we can read: write a fresh one.
  }
  if (JSON.stringify(previous) === JSON.stringify(records)) {
    console.log(`No change in the ${records.length} projects; ${OUT_PATH} left as it is.`);
  } else {
    writeFileSync(OUT_PATH, JSON.stringify({ updatedAt: new Date().toISOString(), records }, null, 2) + "\n");
    console.log(`Wrote ${records.length} projects from Airtable to ${OUT_PATH}`);
  }
} catch (error) {
  console.error(`Could not fetch the project tracker from Airtable: ${error.message}`);
  process.exit(1);
}
