import committed from "./opportunities.json";
import { readListings } from "../../scripts/lib/opportunities.mjs";
import type { ListingsFile } from "./opportunities";

/* The external listings the opportunities board is built with. Server only:
   it runs while the site is being built, never in a reader's browser.

   A scheduled workflow (.github/workflows/refresh-opportunities.yml) fetches
   the listings once a day with scripts/fetch-opportunities.mjs and commits
   the result to the `opportunities-data` branch, then asks for a new deploy.
   The build reads that file here. The copy in this folder is what the build
   falls back on when GitHub cannot be reached or the file there is not a
   listings file, so a failed fetch never empties the page or breaks a build.
   Whichever of the two is newer is used.

   The branch's file is never taken on trust: readListings leaves out any
   listing that is not whole, and anything that is not a web link.

   OPPORTUNITIES_DATA_URL points a build at another copy (a local test file
   over http, say); "off" keeps to the copy in this folder. */

const DATA_URL =
  process.env.OPPORTUNITIES_DATA_URL ||
  "https://raw.githubusercontent.com/AlexanderAKM/Safe-AI-Netherlands/opportunities-data/opportunities.json";

const read = (data: unknown) => readListings(data) as ListingsFile | undefined;

const built: ListingsFile = read(committed) ?? { updatedAt: new Date(0).toISOString(), listings: [] };

let latest: Promise<ListingsFile> | undefined;

export function loadListings(): Promise<ListingsFile> {
  latest ??= (async () => {
    if (DATA_URL === "off") return built;
    try {
      /* The time in the address makes each build ask afresh: Next keeps
         fetched data between builds, and yesterday's listings are exactly
         what this must not serve. */
      const res = await fetch(`${DATA_URL}?build=${Date.now()}`, { signal: AbortSignal.timeout(8_000) });
      if (!res.ok) return built;
      const fetched = read(await res.json());
      return fetched && fetched.updatedAt > built.updatedAt ? fetched : built;
    } catch {
      return built;
    }
  })();
  return latest;
}
