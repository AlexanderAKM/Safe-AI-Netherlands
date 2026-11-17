import { getRequestConfig } from "next-intl/server";

import { loadMessages } from "./messages";
import { reportIntlError, messageFallback } from "./errors";
import { defaultLocale, isLocale } from "./routing";

/* Every page is rendered once per language at build time. The page and its
   layout call setRequestLocale() first, which is where `requestLocale` comes
   from; there is no middleware and no request header to read it from. */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = isLocale(requested) ? requested : defaultLocale;

  return {
    locale,
    messages: loadMessages(locale),
    // Course dates and deadlines are Dutch dates, wherever the build runs.
    timeZone: "Europe/Amsterdam",
    onError: reportIntlError,
    getMessageFallback: messageFallback,
  };
});
