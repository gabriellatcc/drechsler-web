import { createFileRoute } from "@tanstack/react-router";

import { PrivacyPolicyPage } from "@/components/site/privacy-policy-page";
import { SITE } from "@/lib/site-content";

export const Route = createFileRoute("/privacidade")({
  component: PrivacyPolicyPage,
  head: () => ({
    meta: [{ title: `Política de Privacidade — ${SITE.shortName}` }],
  }),
});
