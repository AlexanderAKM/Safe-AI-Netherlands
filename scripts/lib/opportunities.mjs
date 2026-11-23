/**
 * The rules behind /research/opportunities, kept apart from the fetching so
 * they can be tested without a network (scripts/opportunities.test.mjs).
 *
 * A listing is the little the page shows and nothing more: its title, the
 * organisation, where it is, what kind of opening it is, the deadline and
 * the link to the original posting. `id` and `source` are bookkeeping (to
 * recognise the same posting tomorrow, and to credit where it came from);
 * `regions` is worked out from the locations, not taken from the source.
 */

/** Why a listing is open to someone in the Netherlands. */
export const REGIONS = ["nl", "remote", "eu"];

/** What kind of opening a listing is. */
export const TYPES = ["job", "fellowship", "internship", "course", "funding", "project", "other"];

const text = (value) => (typeof value === "string" ? value.replace(/\s+/g, " ").trim() : "");

/* Dutch places, as job postings write them. */
const NL =
  /\b(netherlands|nederland|holland|amsterdam|utrecht|groningen|the hague|den haag|rotterdam|delft|eindhoven|leiden|nijmegen|tilburg|maastricht|wageningen|enschede|twente)\b/i;

/* The rest of the EU and the EEA, and Switzerland: countries, and the cities
   AI safety roles are usually posted in. "Europe" and "EU" on their own count
   too. The United Kingdom is deliberately not here. */
const EU =
  /\b(europe|european union|eu|eea|emea|austria|vienna|belgium|brussels|leuven|bulgaria|sofia|croatia|zagreb|cyprus|czechia|czech republic|prague|denmark|copenhagen|estonia|tallinn|finland|helsinki|france|paris|germany|berlin|munich|tubingen|tübingen|hamburg|greece|athens|hungary|budapest|iceland|reykjavik|ireland|dublin|italy|rome|milan|latvia|riga|liechtenstein|lithuania|vilnius|luxembourg|malta|norway|oslo|poland|warsaw|portugal|lisbon|romania|bucharest|slovakia|bratislava|slovenia|ljubljana|spain|madrid|barcelona|sweden|stockholm|switzerland|zurich|zürich|geneva|lausanne)\b/i;

/* A remote role says where its people may be. With no place, or with the
   world, Europe or an EU country, someone in the Netherlands can take it;
   "Remote, USA" they cannot. */
const REMOTE = /\b(remote|anywhere|work from home|distributed)\b/i;
const REMOTE_WORLDWIDE = /\b(global|globally|worldwide|anywhere|international)\b/i;

/**
 * The regions a set of locations puts a listing in: "nl" (based in the
 * Netherlands), "remote" (remote, and open to someone in the EU) and "eu"
 * (based elsewhere in the EU or EEA, or in Switzerland). Empty means the
 * listing is not for this page.
 */
export function regionsOf(locations) {
  const found = new Set();
  for (const location of locations) {
    if (REMOTE.test(location)) {
      const where = location.replace(REMOTE, "").replace(/[\s,()\-–:;/]+/g, " ").trim();
      if (!where || REMOTE_WORLDWIDE.test(where) || NL.test(where) || EU.test(where)) found.add("remote");
      continue;
    }
    if (NL.test(location)) found.add("nl");
    else if (EU.test(location)) found.add("eu");
  }
  return REGIONS.filter((region) => found.has(region));
}

/* The source's own words for a role's kind, sorted into the page's. The
   first rule that matches wins, so "Research fellowship" is a fellowship and
   "Internship" is not a job. */
const TYPE_RULES = [
  ["fellowship", /fellow|residenc|scholar/i],
  ["internship", /intern|placement|traineeship|working student/i],
  ["course", /course|bootcamp|program(me)?\b|school|training|workshop/i],
  ["funding", /fund|grant|prize|award/i],
  ["project", /project|volunteer|hackathon|sprint/i],
  ["job", /full[- ]?time|part[- ]?time|contract|permanent|temporary|freelance|employ|job|role|position/i],
];

export function typeOf(labels) {
  const said = labels.map(text).filter(Boolean);
  for (const [type, pattern] of TYPE_RULES) {
    if (said.some((label) => pattern.test(label))) return type;
  }
  return said.length ? "other" : "job";
}

/** A deadline as a calendar day ("2026-12-01"), from an ISO string, or a
 *  Unix time in seconds or milliseconds. Anything else: no deadline. */
export function toDay(value) {
  if (value === null || value === undefined || value === "") return undefined;
  let date;
  if (typeof value === "number" && Number.isFinite(value)) {
    date = new Date(value < 1e11 ? value * 1000 : value);
  } else if (typeof value === "string") {
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
    date = /^\d+$/.test(value) ? new Date(Number(value) < 1e11 ? Number(value) * 1000 : Number(value)) : new Date(value);
  } else {
    return undefined;
  }
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString().slice(0, 10);
}

/** Web addresses only: a posting that links anywhere else is dropped. The
 *  source's tracking parameters are taken off, so the same posting keeps the
 *  same address from one day to the next. */
export function webUrl(value) {
  try {
    const url = new URL(text(value));
    if (url.protocol !== "https:" && url.protocol !== "http:") return undefined;
    for (const key of Array.from(url.searchParams.keys())) {
      if (/^(utm_|ref$|source$|gh_src$|lever-source)/i.test(key)) url.searchParams.delete(key);
    }
    url.hash = "";
    return url.href;
  } catch {
    return undefined;
  }
}

/**
 * One raw posting, as a listing; or undefined when it is not for this page:
 * no title, organisation or link, or nowhere a reader in the Netherlands
 * could take it.
 */
export function toListing(source, raw) {
  const title = text(raw.title);
  const org = text(raw.org);
  const url = webUrl(raw.url);
  const locations = Array.from(new Set((raw.locations ?? []).map(text).filter(Boolean)));
  const regions = regionsOf(locations);
  if (!title || !org || !url || regions.length === 0) return undefined;
  const deadline = toDay(raw.deadline);
  return {
    id: `${source}:${text(String(raw.id ?? "")) || url}`,
    source,
    title,
    org,
    locations,
    regions,
    type: typeOf(raw.types ?? []),
    ...(deadline ? { deadline } : {}),
    url,
  };
}

/** Still open on `today` ("2026-11-23"): no deadline, or one not yet past.
 *  A posting stays up through its last day. */
export const isOpen = (listing, today) => !listing.deadline || listing.deadline >= today;

const loose = (value) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

/**
 * One posting once. Two listings are the same when they link to the same
 * page, or carry the same title at the same organisation (the same role
 * posted per city, or picked up twice). The first one stays, and takes on
 * the other's locations and regions; of two deadlines the later is kept, as
 * the one a reader can still make, and a known deadline beats none.
 */
export function dedupe(listings) {
  const kept = [];
  const byKey = new Map();
  for (const listing of listings) {
    const keys = [`url ${listing.url.replace(/\/+$/, "").toLowerCase()}`, `role ${loose(listing.org)} | ${loose(listing.title)}`];
    const twin = keys.map((key) => byKey.get(key)).find(Boolean);
    if (!twin) {
      const copy = { ...listing, locations: [...listing.locations], regions: [...listing.regions] };
      kept.push(copy);
      keys.forEach((key) => byKey.set(key, copy));
      continue;
    }
    twin.locations = Array.from(new Set([...twin.locations, ...listing.locations]));
    twin.regions = REGIONS.filter((region) => twin.regions.includes(region) || listing.regions.includes(region));
    if (listing.deadline && (!twin.deadline || listing.deadline > twin.deadline)) twin.deadline = listing.deadline;
    keys.forEach((key) => byKey.set(key, twin));
  }
  return kept;
}

/** Soonest deadline first, then the ones without a deadline; ties by
 *  organisation and title, so the file reads the same from run to run. */
export function sortListings(listings) {
  return [...listings].sort(
    (a, b) =>
      (a.deadline ?? "9999").localeCompare(b.deadline ?? "9999") ||
      a.org.localeCompare(b.org) ||
      a.title.localeCompare(b.title),
  );
}

/** Reads a listings file, taking nothing in it on trust: a listing that is
 *  not whole is left out, a file that is not a listings file gives undefined. */
export function readListings(data) {
  if (!data || typeof data !== "object" || !Array.isArray(data.listings)) return undefined;
  if (typeof data.updatedAt !== "string" || Number.isNaN(Date.parse(data.updatedAt))) return undefined;
  const listings = data.listings.filter(
    (item) =>
      item &&
      typeof item === "object" &&
      typeof item.id === "string" &&
      typeof item.source === "string" &&
      typeof item.title === "string" &&
      typeof item.org === "string" &&
      typeof item.url === "string" &&
      /^https?:\/\//.test(item.url) &&
      Array.isArray(item.locations) &&
      Array.isArray(item.regions) &&
      item.regions.length > 0 &&
      item.regions.every((region) => REGIONS.includes(region)) &&
      TYPES.includes(item.type) &&
      (item.deadline === undefined || /^\d{4}-\d{2}-\d{2}$/.test(item.deadline)),
  );
  return { updatedAt: data.updatedAt, listings };
}

/**
 * Today's file, from yesterday's and what each source returned.
 *
 * `results` maps a source's name to what its fetch gave: { listings } when
 * it worked, { error } when it failed, { skipped } when it is not set up. A
 * source that failed or was skipped keeps the listings it had (the last good
 * data); one that worked replaces them. A source that comes back empty after
 * having had listings counts as failed: every posting gone at once is far
 * likelier a hiccup than the truth.
 *
 * Whatever the outcome, deadlines that have passed are dropped and
 * duplicates folded together. `changed` says whether the listings differ
 * from the previous file's; `failed` names the sources whose last good data
 * was kept.
 */
export function buildFile({ previous, results, today, now }) {
  const before = previous?.listings ?? [];
  const failed = [];
  let listings = [];
  const sources = new Set([...before.map((item) => item.source), ...Object.keys(results)]);
  for (const source of sources) {
    const had = before.filter((item) => item.source === source);
    const result = results[source];
    if (!result || result.skipped) {
      listings.push(...had);
    } else if (result.error || (result.listings.length === 0 && had.length > 0)) {
      failed.push({ source, reason: result.error ?? "it came back empty" });
      listings.push(...had);
    } else {
      listings.push(...result.listings);
    }
  }
  listings = sortListings(dedupe(listings.filter((item) => isOpen(item, today))));
  const changed = JSON.stringify(listings) !== JSON.stringify(before);
  return {
    file: { updatedAt: changed || !previous ? now : previous.updatedAt, listings },
    changed: changed || !previous,
    failed,
  };
}
