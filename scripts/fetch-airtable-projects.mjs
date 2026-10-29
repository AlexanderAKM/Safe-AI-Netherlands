#!/usr/bin/env node
/**
 * Fetch the Project Team's tracker from Airtable and write its public fields
 * to src/data/airtableProjects.json. Runs at the start of every build (npm run
 * build), so each deploy carries the tracker as it stands; the hourly workflow
 * .github/workflows/refresh-project-tracker.yml redeploys, so the site is
 * never more than an hour behind Airtable.
 *
 * Source: the "Open Projects (Website)" view of the Project Hub table in the
 * SAIN Pipeline base. Only the fields in FIELDS are requested, so Notes, the
 * attachments and the Supervisor link (it shows the supervisor's email) never
 * leave Airtable. Fields are asked for by ID, so renaming one in Airtable does
 * not break this.
 *
 * Needs AIRTABLE_TOKEN: a personal access token with only the scope
 * data.records:read, on only the SAIN Pipeline base. It is set in Vercel
 * (Project Settings -> Environment Variables), or locally in .env.local, which
 * git ignores. Without it, or when Airtable fails, the committed copy stays
 * and the build goes on.
 *
 * Usage: npm run fetch-airtable-projects
 */
import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
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
const OUT_PATH = join(ROOT, "src", "data", "airtableProjects.json");

try {
  process.loadEnvFile(join(ROOT, ".env.local"));
} catch {
  // No .env.local: the token comes from the environment, or not at all.
}

const token = process.env.AIRTABLE_TOKEN;
if (!token) {
  console.log("AIRTABLE_TOKEN not set; the project tracker keeps its committed copy.");
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

  writeFileSync(OUT_PATH, JSON.stringify({ fetchedAt: new Date().toISOString(), records }, null, 2) + "\n");
  console.log(`Wrote ${records.length} projects from Airtable to ${OUT_PATH}`);
} catch (error) {
  console.warn(`Warning: could not refresh the project tracker from Airtable (${error.message}); keeping the committed copy.`);
}
