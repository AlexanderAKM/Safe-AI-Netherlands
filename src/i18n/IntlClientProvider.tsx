"use client";

import { NextIntlClientProvider, type AbstractIntlMessages } from "next-intl";
import type { ReactNode } from "react";

import { messageFallback, reportIntlError } from "./errors";

/* The client-side provider, with the same error handling as the server
   (errors.ts). Functions cannot cross from a Server Component to a Client
   Component, so they are attached here rather than passed in. Rendered by
   <ClientMessages>; nothing else needs to use it. */
export default function IntlClientProvider({
  locale,
  timeZone,
  messages,
  children,
}: {
  locale: string;
  timeZone: string;
  messages: AbstractIntlMessages;
  children: ReactNode;
}) {
  return (
    <NextIntlClientProvider
      locale={locale}
      timeZone={timeZone}
      messages={messages}
      onError={reportIntlError}
      getMessageFallback={messageFallback}
    >
      {children}
    </NextIntlClientProvider>
  );
}
