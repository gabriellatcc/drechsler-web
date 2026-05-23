import { createFileRoute } from "@tanstack/react-router";

import { HomePage } from "@/components/site/home-page";
import { SITE } from "@/lib/site-content";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [{ title: `${SITE.shortName} — ${SITE.tagline}` }],
  }),
});
