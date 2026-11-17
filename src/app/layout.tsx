import type { ReactNode } from "react";

import { siteMetadata } from "@/components/SiteShell";

/* The site's real root layouts are one level down: app/(en)/layout.tsx for
   English at the root and app/[locale]/layout.tsx for the prefixed
   languages, each of which renders <html lang> through SiteShell. Next.js
   still wants a layout at the very top for the 404 page (app/not-found.tsx),
   so this one passes its children straight through and adds nothing.

   Its metadata is the English site metadata, for the 404 page, which has no
   other layout. Every page has one of the two layouts below this one, and
   each sets every one of these fields again in its own language. */
export async function generateMetadata() {
  // No title: the 404 page prints its own ("404: This page could not be
  // found."), and a title template here would also apply to the layouts
  // below, turning the landing's title into "Safe AI Netherlands | SAIN".
  return { ...(await siteMetadata("en")), title: null };
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
