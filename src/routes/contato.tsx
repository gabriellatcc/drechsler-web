import { createFileRoute } from "@tanstack/react-router";

import { ContactPage } from "@/components/site/contact-page";
import { SITE } from "@/lib/site-content";

export const Route = createFileRoute("/contato")({
  component: ContactPage,
  head: () => ({
    meta: [{ title: `Contato — ${SITE.shortName}` }],
  }),
});
