import type { AbstractIntlMessages } from "next-intl";
import { getLocale, getMessages, getTimeZone } from "next-intl/server";
import type { ReactNode } from "react";

import IntlClientProvider from "./IntlClientProvider";
import type { Locale } from "./routing";

/* Hands a Client Component the dictionaries it reads, and only those.

   Server Components read every namespace directly. A Client Component's text
   has to travel to the browser, so each one is wrapped where it is used:

     <ClientMessages namespaces={["projectHub.browser"]}>
       <ProjectBrowser />
     </ClientMessages>

   A namespace can be a whole file ("courses") or one branch of it
   ("projectHub.browser"). A nested provider replaces the one above it rather
   than adding to it, so list everything the wrapped components read,
   including any branch of `common` (the root layout's provider carries only
   what the header, the footer and the course popup need).

   A Client Component with text that more than one page renders should wrap
   itself: export a small Server Component that renders
   <ClientMessages namespaces={[...]}><TheClientComponent /></ClientMessages>,
   so no page has to know which dictionaries it reads. */
export default async function ClientMessages({
  namespaces,
  locale: explicitLocale,
  children,
}: {
  namespaces: string[];
  /** Pages leave this out and get the page's language. The site shell
   *  passes its own, because the 404 element it also renders sits inside
   *  every page. */
  locale?: Locale;
  children: ReactNode;
}) {
  const [locale, messages, timeZone] = await Promise.all([
    explicitLocale ?? getLocale(),
    getMessages(explicitLocale ? { locale: explicitLocale } : undefined),
    getTimeZone(explicitLocale ? { locale: explicitLocale } : undefined),
  ]);

  return (
    <IntlClientProvider
      locale={locale}
      timeZone={timeZone}
      messages={pickMessages(messages, namespaces)}
    >
      {children}
    </IntlClientProvider>
  );
}

function pickMessages(
  messages: AbstractIntlMessages,
  paths: string[],
): AbstractIntlMessages {
  const picked: Record<string, unknown> = {};
  for (const path of paths) {
    const keys = path.split(".");
    let source: unknown = messages;
    for (const key of keys) {
      source =
        source && typeof source === "object"
          ? (source as Record<string, unknown>)[key]
          : undefined;
    }
    if (source === undefined) {
      throw new Error(`<ClientMessages>: no messages at "${path}"`);
    }
    // Copy on the way down, so picking "common" and "common.nav" together
    // never writes into the loaded dictionaries themselves.
    let target = picked;
    keys.slice(0, -1).forEach((key) => {
      target[key] = { ...((target[key] as Record<string, unknown>) ?? {}) };
      target = target[key] as Record<string, unknown>;
    });
    target[keys[keys.length - 1]] = source;
  }
  return picked as AbstractIntlMessages;
}
