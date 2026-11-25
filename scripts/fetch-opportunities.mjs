#!/usr/bin/env node
/**
 * Fetch the external listings for /research/opportunities and write them to
 * a JSON file: by default src/data/opportunities.json (the copy in the
 * repository), or the path given as the first argument. The scheduled
 * workflow .github/workflows/refresh-opportunities.yml uses the argument to
 * write to the `opportunities-data` branch, which the site reads when it is
 * built (src/data/opportunities.ts). Nothing is fetched in a reader's browser.
 *
 * The SAIN projects on that page are not in this file: they come from the
 * Project Team's tracker, as on the Project Hub (src/data/tracker.ts).
 *
 * What is kept of a posting, and nothing else: its title, the organisation,
 * the locations, the kind of role, the deadline and the link to the original
 * posting. Only postings someone in the Netherlands can take are kept: based
 * here, remote from the EU, or based elsewhere in the EU or EEA
 * (scripts/lib/opportunities.mjs). Duplicates are folded together and passed
 * deadlines dropped. When a source fails, the listings it gave last time are
 * kept, and the script exits with 2 so the run shows as failed.
 *
 * SOURCE: THE 80,000 HOURS JOB BOARD (jobs.80000hours.org)
 *
 * The board has no public feed or documented API. Its own pages load their
 * listings from a hosted search index (Algolia), which is what this reads: a
 * few search requests a day, no HTML scraping. Its robots.txt allows all
 * crawling, but the 80,000 Hours terms of use grant no right to republish
 * the board, so this source is OFF until they have agreed and the
 * credentials are set, as repository secrets:
 *
 *   EIGHTYK_ALGOLIA_APP_ID    the search application's id
 *   EIGHTYK_ALGOLIA_API_KEY   a search-only key, as given or agreed by them
 *   EIGHTYK_ALGOLIA_INDEX     optional; "jobs_prod" unless they say otherwise
 *   EIGHTYK_AREA              optional; the board's problem-area tag to
 *                             take, "AI safety & policy" by default
 *
 * Without them this fetches nothing and leaves the file as it is. The field
 * names in FIELDS are read off the board's public page and have NOT been run
 * against the live index: do a `--dry-run` first and correct them if the
 * report says a field is missing.
 *
 * Usage:
 *   npm run fetch-opportunities [-- <output path>] [-- --dry-run]
 *   --dry-run   fetch and report, write nothing
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildFile, readListings, toListing } from "./lib/opportunities.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const outArg = args.find((arg) => !arg.startsWith("--"));
const OUT_PATH = outArg ? resolve(outArg) : join(ROOT, "src", "data", "opportunities.json");

try {
  process.loadEnvFile(join(ROOT, ".env.local"));
} catch {
  // No .env.local: the settings come from the environment, or not at all.
}

/* The name the page credits ("via 80,000 Hours") is keyed on this. */
const EIGHTYK = "80000hours";

/* Where each part of a listing sits in a record of the board's index. */
const FIELDS = {
  id: "objectID",
  title: "title",
  org: "company_name",
  url: "url_external",
  locations: "tags_location_80k",
  types: "tags_role_type",
  deadline: "closes_at",
  area: "tags_area",
};

const list = (value) => (Array.isArray(value) ? value : value === undefined || value === null ? [] : [value]);

async function fetchEightyK() {
  const appId = process.env.EIGHTYK_ALGOLIA_APP_ID;
  const apiKey = process.env.EIGHTYK_ALGOLIA_API_KEY;
  if (!appId || !apiKey) return { skipped: "EIGHTYK_ALGOLIA_APP_ID and EIGHTYK_ALGOLIA_API_KEY are not set" };
  const index = process.env.EIGHTYK_ALGOLIA_INDEX || "jobs_prod";
  const area = process.env.EIGHTYK_AREA || "AI safety & policy";

  const hits = [];
  let page = 0;
  let pages = 1;
  do {
    const res = await fetch(`https://${appId}-dsn.algolia.net/1/indexes/${encodeURIComponent(index)}/query`, {
      method: "POST",
      headers: {
        "X-Algolia-Application-Id": appId,
        "X-Algolia-API-Key": apiKey,
        "Content-Type": "application/json",
        "User-Agent": "SAIN-opportunities/1.0 (+https://safeainetherlands.org/research/opportunities)",
      },
      body: JSON.stringify({
        query: "",
        page,
        hitsPerPage: 200,
        facetFilters: [`${FIELDS.area}:${area}`],
        // Only what a listing keeps ever leaves the index.
        attributesToRetrieve: Object.values(FIELDS).filter((field) => field !== FIELDS.area),
        attributesToHighlight: [],
        attributesToSnippet: [],
      }),
      signal: AbortSignal.timeout(20_000),
    });
    if (!res.ok) throw new Error(`the search index returned ${res.status} ${res.statusText}`);
    const body = await res.json();
    hits.push(...(body.hits ?? []));
    pages = Math.min(body.nbPages ?? 1, 10);
    page += 1;
  } while (page < pages);

  const listings = hits.flatMap((hit) => {
    const listing = toListing(EIGHTYK, {
      id: hit[FIELDS.id],
      title: hit[FIELDS.title],
      org: hit[FIELDS.org],
      url: hit[FIELDS.url],
      locations: list(hit[FIELDS.locations]),
      types: list(hit[FIELDS.types]),
      deadline: hit[FIELDS.deadline],
    });
    return listing ? [listing] : [];
  });

  // Postings came back but none could be read: the field names are wrong,
  // not the board empty. Say which, rather than quietly keep nothing.
  if (hits.length > 0 && listings.length === 0) {
    const missing = Object.entries(FIELDS)
      .filter(([part, field]) => part !== "area" && hits.every((hit) => hit[field] === undefined))
      .map(([part, field]) => `${part} ("${field}")`);
    throw new Error(
      missing.length
        ? `no record has the field for ${missing.join(", ")}; a record's fields are: ${Object.keys(hits[0]).join(", ")}`
        : `none of the ${hits.length} postings is open to someone in the Netherlands, which is not believable`,
    );
  }
  return { listings, seen: hits.length };
}

let previous;
try {
  previous = readListings(JSON.parse(readFileSync(OUT_PATH, "utf8")));
} catch {
  // No copy yet, or not one we can read: start from nothing.
}

const results = {};
try {
  results[EIGHTYK] = await fetchEightyK();
} catch (error) {
  results[EIGHTYK] = { error: error.message };
}

const now = new Date();
const { file, changed, failed } = buildFile({
  previous,
  results,
  // The day in the Netherlands: a deadline of today is open until midnight here.
  today: new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Amsterdam" }).format(now),
  now: now.toISOString(),
});

for (const [source, result] of Object.entries(results)) {
  if (result.skipped) console.log(`${source}: not set up (${result.skipped}); nothing fetched.`);
  else if (result.listings) {
    console.log(`${source}: ${result.listings.length} of ${result.seen} postings are open to someone in the Netherlands.`);
  }
}
for (const { source, reason } of failed) {
  console.error(`::warning::${source} could not be fetched (${reason}); its last listings were kept.`);
}

if (DRY_RUN) {
  console.log(`Dry run: ${file.listings.length} listings, nothing written.`);
  for (const item of file.listings.slice(0, 15)) {
    console.log(`  ${item.deadline ?? "no deadline"}  ${item.type.padEnd(10)}  ${item.org}: ${item.title}  [${item.locations.join("; ")}]`);
  }
} else if (!changed) {
  console.log(`No change in the ${file.listings.length} listings; ${OUT_PATH} left as it is.`);
} else {
  writeFileSync(OUT_PATH, JSON.stringify(file, null, 2) + "\n");
  console.log(`Wrote ${file.listings.length} listings to ${OUT_PATH}`);
}

// 2, not 1: the file is good (last listings kept, expired ones dropped) and
// may be published, but the run should still show that a source failed.
if (failed.length > 0) process.exit(2);
