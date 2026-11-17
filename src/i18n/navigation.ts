import { createNavigation } from "next-intl/navigation";

import { routing } from "./routing";

/* Locale-aware drop-ins for next/link and next/navigation. Use this Link for
   every internal link: href="/courses" renders /courses on an English page
   and /nl/courses on a Dutch one. External links, mailto: and "#anchor" links
   pass through unchanged.

   Do not use its `locale` prop to switch languages: next-intl then links to
   /en/..., which this static site does not have. The header's
   LanguageSwitcher does the switching. */
export const { Link, getPathname, usePathname, useRouter } =
  createNavigation(routing);
