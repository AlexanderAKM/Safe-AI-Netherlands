import NextNotFound from "next/dist/client/components/not-found-error";

import SiteShell from "@/components/SiteShell";

/* The one 404 page of the static export: out/404.html, which the host serves
   for every missing URL in every language. The site has two root layouts
   (app/(en) and app/[locale]) and no layout above them, so this page brings
   its own: the English shell, around Next's standard 404 message, exactly as
   the site showed before it had languages.

   It must not call setRequestLocale: Next also renders this element inside
   every page, where "en" would overwrite a Dutch page's language. SiteShell
   takes its language from the prop instead, so it needs none. */
export default function NotFound() {
  return (
    <SiteShell locale="en" rememberLanguage={false}>
      <NextNotFound />
    </SiteShell>
  );
}
