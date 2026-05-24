import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { ServicesPage } from "@/components/site/services-page";
import { SERVICE_CATEGORY_KEYS, SITE } from "@/lib/site-content";

const servicesSearchSchema = z.object({
  categoria: z.enum(SERVICE_CATEGORY_KEYS).optional(),
});

export const Route = createFileRoute("/servicos/")({
  validateSearch: servicesSearchSchema,
  component: ServicesPage,
  head: () => ({
    meta: [{ title: `Serviços — ${SITE.shortName}` }],
  }),
});
