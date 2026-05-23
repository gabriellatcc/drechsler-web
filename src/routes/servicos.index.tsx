import { createFileRoute } from "@tanstack/react-router";

import { ServicesPage } from "@/components/site/services-page";
import { SITE } from "@/lib/site-content";

export const Route = createFileRoute("/servicos/")({
  component: ServicesPage,
  head: () => ({
    meta: [{ title: `Serviços — ${SITE.shortName}` }],
  }),
});
