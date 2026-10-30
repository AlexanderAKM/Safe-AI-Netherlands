"use client";

import { useLiveTracker } from "@/components/research/useLiveTracker";
import { publications } from "@/data/research";
import { projectHubStats } from "@/data/projects";

/* Counted rather than typed. The old hero carried "6+ Active Projects  ·  20+
   Researchers  ·  12+ Publications", and two of the three traced to nothing
   while the third contradicted the exact twelve papers this page lists. A
   number on this page has to be checkable by the reader, because the reader
   is the sort who checks.

   So the numbers come from the same list the projects section shows: the
   Project Team's tracker (its open projects, and the supervisors behind
   them), or the hand-kept list when the tracker cannot be loaded. Each
   counted fact links down to the section it counts.

   The quiet version of a stat row: checkable facts on a hairline. The
   separators are drawn rather than typed, so a screen reader reads the facts
   and not the middots. */
export default function HeroFacts() {
  const { tracker, source } = useLiveTracker();
  const open = tracker.projects.filter((project) => project.status === "open");
  const stats =
    source === "unavailable"
      ? projectHubStats()
      : {
          openProjects: open.length,
          supervisors: new Set(open.flatMap((project) => (project.supervisor ? [project.supervisor] : []))).size,
          publications: publications.length,
        };
  const facts = [
    { text: `${stats.openProjects} open projects`, href: "#projects" },
    { text: `${stats.supervisors} supervisors`, href: "#supervisors" },
    { text: `${stats.publications} publications`, href: "#publications" },
    { text: "rolling applications" },
  ];

  return (
    <ul role="list" className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-navy/14 pt-4">
      {facts.map((fact, i) => (
        <li key={fact.href ?? fact.text} className="flex items-center gap-3">
          {i > 0 ? <span aria-hidden="true" className="text-navy/25">·</span> : null}
          {fact.href ? (
            <a
              href={fact.href}
              className="font-sans text-footnote text-navy/65 underline decoration-navy/15 underline-offset-4 hover:text-navy hover:decoration-navy focus-visible:decoration-navy"
            >
              {fact.text}
            </a>
          ) : (
            <span className="font-sans text-footnote text-navy/65">{fact.text}</span>
          )}
        </li>
      ))}
    </ul>
  );
}
