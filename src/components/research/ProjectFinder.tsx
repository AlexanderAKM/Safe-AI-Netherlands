"use client";

import ProjectBrowser from "@/components/research/ProjectBrowser";
import ProjectTracker from "@/components/research/ProjectTracker";
import { useLiveTracker } from "@/components/research/useLiveTracker";

/* The project list. Normally the Project Team's tracker, straight from
   Airtable (ProjectTracker). If its latest copy cannot be loaded, the
   hand-kept list in src/data/projects.ts (ProjectBrowser) takes its place, so
   a reader never meets an outdated record without knowing it. */
export default function ProjectFinder() {
  const { tracker, source } = useLiveTracker();
  return source === "unavailable" ? <ProjectBrowser /> : <ProjectTracker tracker={tracker} />;
}
