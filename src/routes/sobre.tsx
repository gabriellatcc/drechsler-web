import { createFileRoute } from "@tanstack/react-router";

import { AboutPage } from "@/components/site/about-page";
import { SITE } from "@/lib/site-content";

export const Route = createFileRoute("/sobre")({
  component: AboutPage,
  head: () => ({
    meta: [{ title: `Sobre — ${SITE.shortName}` }],
  }),
});
