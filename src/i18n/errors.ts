import { IntlErrorCode, type IntlError } from "next-intl";

/* What happens when a key is missing or a message does not parse.

   - At build time (no window), it throws, so `next build` fails and a page
     with a raw key can never be exported. The Dutch dictionary falls back to
     English key by key (messages.ts), so only a key missing in English, or a
     broken message, gets this far.
   - In the browser it logs, and the text renders empty rather than as
     "namespace.key": a reader never sees a raw key.

   The time-zone notice is only a notice, so it never throws. */
export function reportIntlError(error: IntlError) {
  if (error.code === IntlErrorCode.ENVIRONMENT_FALLBACK) {
    if (process.env.NODE_ENV !== "production") console.warn(error.message);
    return;
  }
  if (typeof window === "undefined" && process.env.NODE_ENV === "production") {
    throw error;
  }
  console.error(error);
}

export function messageFallback({
  namespace,
  key,
}: {
  namespace?: string;
  key: string;
  error: IntlError;
}) {
  // In development the key helps find the gap; in production it never shows.
  if (process.env.NODE_ENV !== "production") {
    return [namespace, key].filter(Boolean).join(".");
  }
  return "";
}
