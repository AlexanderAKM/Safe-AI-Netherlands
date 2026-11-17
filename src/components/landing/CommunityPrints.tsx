import ClientMessages from "@/i18n/ClientMessages";

import CommunityPrintsClient from "./CommunityPrintsClient";

/* The strip of event photographs (CommunityPrintsClient), with the words it
   reads: its label, its two buttons and the photographs' alt text. The
   landing and /new-chapters both render it, so it brings its own messages
   rather than asking each page to know which ones it needs. */
export default function CommunityPrints() {
  return (
    <ClientMessages namespaces={["home.communityPrints"]}>
      <CommunityPrintsClient />
    </ClientMessages>
  );
}
