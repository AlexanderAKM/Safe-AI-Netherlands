"use client";

import { useEffect } from "react";

/* Outreach messages link straight to a role (/new-chapters#director). A
   closed <details> would land the reader on a one-line summary, so open the
   one the hash names, on arrival and whenever the hash changes. Renders
   nothing. */
export default function OpenOnHash() {
  useEffect(() => {
    const openFromHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const target = document.getElementById(id);
      if (target instanceof HTMLDetailsElement) {
        target.open = true;
        requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
      }
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  return null;
}
