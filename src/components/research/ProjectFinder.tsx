"use client";

import ProjectBrowser from "@/components/research/ProjectBrowser";
import ProjectTracker from "@/components/research/ProjectTracker";
import { useLiveTracker } from "@/components/research/useLiveTracker";
import type { Dictionary } from "@/i18n";

/* The project list. Normally the Project Team's tracker, straight from
   Airtable (ProjectTracker). If its latest copy cannot be loaded, the
   hand-kept list in src/data/projects.ts (ProjectBrowser) takes its place, so
   a reader never meets an outdated record without knowing it. */
/* A client component: the research page hands it the words both lists need. */
export default function ProjectFinder({
  t,
  availability,
  opensInNewTab,
  or,
  dateLocale,
}: {
  t: Dictionary["projects"];
  availability: Dictionary["availability"];
  opensInNewTab: string;
  or: string;
  dateLocale: string;
}) {
  const { tracker, source } = useLiveTracker();
  return source === "unavailable" ? (
    <ProjectBrowser t={t} availability={availability} opensInNewTab={opensInNewTab} or={or} />
  ) : (
    <ProjectTracker tracker={tracker} t={t} opensInNewTab={opensInNewTab} or={or} dateLocale={dateLocale} />
  );
}
