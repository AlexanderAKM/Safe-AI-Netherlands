"use client";

import { useEffect, useState } from "react";
import { TRACKER_DATA_URL, readTracker, trackerSnapshot, type Tracker } from "@/data/tracker";

/* The latest copy of the Project Team's tracker, as the hero's numbers and
   the project list both read it. One request for the whole page, so the two
   can never disagree.

   `source` says where the projects came from: "built" until the latest copy
   arrives (the copy in src/data the page was built with), "live" once it has,
   and "unavailable" when it could not be loaded or was not the tracker. The
   page uses "unavailable" to fall back to the hand-kept project list. */

export type LiveTracker = { tracker: Tracker; source: "built" | "live" | "unavailable" };

let request: Promise<Tracker | undefined> | undefined;

function loadLatest() {
  request ??= fetch(TRACKER_DATA_URL)
    .then((res) => (res.ok ? res.json() : undefined))
    .then(readTracker)
    .catch(() => undefined);
  return request;
}

export function useLiveTracker(): LiveTracker {
  const [state, setState] = useState<LiveTracker>({ tracker: trackerSnapshot, source: "built" });
  useEffect(() => {
    let current = true;
    loadLatest().then((latest) => {
      if (!current) return;
      setState(latest ? { tracker: latest, source: "live" } : { tracker: trackerSnapshot, source: "unavailable" });
    });
    return () => {
      current = false;
    };
  }, []);
  return state;
}
