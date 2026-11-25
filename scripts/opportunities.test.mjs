/**
 * npm run test:opportunities
 *
 * The rules of scripts/lib/opportunities.mjs, without a network: which
 * postings are for a reader in the Netherlands, what kind each one is,
 * duplicates, passed deadlines, and keeping the last good data.
 */
import assert from "node:assert/strict";
import { test } from "node:test";
import {
  buildFile,
  dedupe,
  isOpen,
  readListings,
  regionsOf,
  sortListings,
  toDay,
  toListing,
  typeOf,
  webUrl,
} from "./lib/opportunities.mjs";

const raw = (over = {}) => ({
  id: "1",
  title: "Research Engineer",
  org: "Example Lab",
  url: "https://example.org/jobs/1",
  locations: ["Amsterdam, Netherlands"],
  types: ["Full-time"],
  deadline: "2026-12-10",
  ...over,
});
const listing = (over = {}) => toListing("board", raw(over));

test("regions: the Netherlands, remote from the EU, elsewhere in the EU", () => {
  assert.deepEqual(regionsOf(["Amsterdam, Netherlands"]), ["nl"]);
  assert.deepEqual(regionsOf(["The Hague"]), ["nl"]);
  assert.deepEqual(regionsOf(["Berlin, Germany"]), ["eu"]);
  assert.deepEqual(regionsOf(["Zürich, Switzerland"]), ["eu"]);
  assert.deepEqual(regionsOf(["Remote"]), ["remote"]);
  assert.deepEqual(regionsOf(["Remote, Global"]), ["remote"]);
  assert.deepEqual(regionsOf(["Remote (Europe)"]), ["remote"]);
  assert.deepEqual(regionsOf(["Remote, Netherlands"]), ["remote"]);
  assert.deepEqual(regionsOf(["London, UK", "Remote, Global", "Utrecht"]), ["nl", "remote"]);
});

test("regions: nothing for places a reader here cannot work from", () => {
  assert.deepEqual(regionsOf(["London, UK"]), []);
  assert.deepEqual(regionsOf(["San Francisco Bay Area, USA"]), []);
  assert.deepEqual(regionsOf(["Remote, USA"]), []);
  assert.deepEqual(regionsOf(["Remote, UK"]), []);
  assert.deepEqual(regionsOf([]), []);
});

test("type: sorted from the source's own words", () => {
  assert.equal(typeOf(["Full-time"]), "job");
  assert.equal(typeOf(["Part-time", "Contract"]), "job");
  assert.equal(typeOf(["Fellowship"]), "fellowship");
  assert.equal(typeOf(["Full-time", "Research fellowship"]), "fellowship");
  assert.equal(typeOf(["Internship"]), "internship");
  assert.equal(typeOf(["Graduate program"]), "course");
  assert.equal(typeOf(["Funding"]), "funding");
  assert.equal(typeOf(["Volunteer"]), "project");
  assert.equal(typeOf(["Something new"]), "other");
  assert.equal(typeOf([]), "job");
});

test("deadline: a calendar day from ISO text or Unix time", () => {
  assert.equal(toDay("2026-12-01"), "2026-12-01");
  assert.equal(toDay("2026-12-01T22:59:00Z"), "2026-12-01");
  assert.equal(toDay(1796083200), "2026-12-01");
  assert.equal(toDay(1796083200000), "2026-12-01");
  assert.equal(toDay("1796083200"), "2026-12-01");
  assert.equal(toDay(null), undefined);
  assert.equal(toDay("soon"), undefined);
});

test("link: web addresses only, without tracking parameters", () => {
  assert.equal(webUrl("https://example.org/jobs/1?utm_source=80k&team=safety#apply"), "https://example.org/jobs/1?team=safety");
  assert.equal(webUrl("mailto:jobs@example.org"), undefined);
  assert.equal(webUrl("javascript:alert(1)"), undefined);
  assert.equal(webUrl(""), undefined);
});

test("a listing keeps only what the page shows", () => {
  assert.deepEqual(listing({ description: "long text", salary: "a lot" }), {
    id: "board:1",
    source: "board",
    title: "Research Engineer",
    org: "Example Lab",
    locations: ["Amsterdam, Netherlands"],
    regions: ["nl"],
    type: "job",
    deadline: "2026-12-10",
    url: "https://example.org/jobs/1",
  });
});

test("a listing without a title, organisation, link or reachable place is left out", () => {
  assert.equal(listing({ title: " " }), undefined);
  assert.equal(listing({ org: "" }), undefined);
  assert.equal(listing({ url: "not a link" }), undefined);
  assert.equal(listing({ locations: ["London, UK"] }), undefined);
  assert.equal("deadline" in listing({ deadline: null }), false);
});

test("open through its last day, gone the day after", () => {
  assert.equal(isOpen(listing(), "2026-12-10"), true);
  assert.equal(isOpen(listing(), "2026-12-11"), false);
  assert.equal(isOpen(listing({ deadline: null }), "2030-01-01"), true);
});

test("dedupe: the same link, or the same role at the same organisation", () => {
  const sameLink = dedupe([listing(), listing({ id: "2", title: "Research Engineer (m/f/x)", url: "https://example.org/jobs/1/" })]);
  assert.equal(sameLink.length, 1);

  const perCity = dedupe([
    listing(),
    listing({ id: "2", url: "https://example.org/jobs/2", locations: ["Remote, Europe"], deadline: "2026-12-20" }),
    listing({ id: "3", url: "https://example.org/jobs/3", title: "Policy Analyst" }),
  ]);
  assert.equal(perCity.length, 2);
  assert.deepEqual(perCity[0].locations, ["Amsterdam, Netherlands", "Remote, Europe"]);
  assert.deepEqual(perCity[0].regions, ["nl", "remote"]);
  assert.equal(perCity[0].deadline, "2026-12-20");
});

test("sorted by deadline, the ones without a deadline last", () => {
  const sorted = sortListings([
    listing({ id: "a", title: "A", deadline: null }),
    listing({ id: "b", title: "B", deadline: "2026-12-20" }),
    listing({ id: "c", title: "C", deadline: "2026-12-01" }),
  ]);
  assert.deepEqual(sorted.map((item) => item.title), ["C", "B", "A"]);
});

const build = (over) => buildFile({ today: "2026-11-23", now: "2026-11-23T05:00:00.000Z", ...over });
const yesterday = {
  updatedAt: "2026-11-22T05:00:00.000Z",
  listings: [
    listing({ id: "old", title: "Closing today", deadline: "2026-11-23" }),
    listing({ id: "gone", title: "Closed yesterday", url: "https://example.org/jobs/9", deadline: "2026-11-22" }),
  ],
};

test("a fetch that worked replaces the source's listings", () => {
  const { file, changed, failed } = build({
    previous: yesterday,
    results: { board: { listings: [listing({ id: "new", title: "New role", url: "https://example.org/jobs/5" })] } },
  });
  assert.deepEqual(file.listings.map((item) => item.title), ["New role"]);
  assert.equal(changed, true);
  assert.equal(file.updatedAt, "2026-11-23T05:00:00.000Z");
  assert.deepEqual(failed, []);
});

test("a fetch that failed keeps the last good listings, minus the expired", () => {
  const { file, changed, failed } = build({ previous: yesterday, results: { board: { error: "timeout" } } });
  assert.deepEqual(file.listings.map((item) => item.title), ["Closing today"]);
  assert.equal(changed, true);
  assert.deepEqual(failed, [{ source: "board", reason: "timeout" }]);
});

test("a source that suddenly comes back empty counts as failed", () => {
  const { file, failed } = build({ previous: yesterday, results: { board: { listings: [] } } });
  assert.equal(file.listings.length, 1);
  assert.equal(failed[0].reason, "it came back empty");
});

test("a source that is not set up leaves the file alone", () => {
  const previous = { updatedAt: yesterday.updatedAt, listings: [yesterday.listings[0]] };
  const { file, changed, failed } = build({ previous, results: { board: { skipped: "no key" } } });
  assert.equal(changed, false);
  assert.equal(file.updatedAt, previous.updatedAt);
  assert.deepEqual(failed, []);
});

test("an unchanged board makes no new file", () => {
  const previous = { updatedAt: yesterday.updatedAt, listings: [yesterday.listings[0]] };
  const { changed, file } = build({ previous, results: { board: { listings: [yesterday.listings[0]] } } });
  assert.equal(changed, false);
  assert.equal(file.updatedAt, previous.updatedAt);
});

test("reading a file: broken listings are left out, a wrong file is refused", () => {
  assert.equal(readListings({ listings: [] }), undefined);
  assert.equal(readListings("<html>"), undefined);
  const read = readListings({
    updatedAt: "2026-11-23T05:00:00.000Z",
    listings: [listing(), { ...listing(), url: "javascript:alert(1)" }, { ...listing(), type: "scam" }, null],
  });
  assert.equal(read.listings.length, 1);
});
