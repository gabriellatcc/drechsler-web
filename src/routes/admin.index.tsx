import { createFileRoute, redirect } from "@tanstack/react-router";

import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { getAuthAccessToken } from "@/lib/api-client";
import { SITE } from "@/lib/site-content";

export const Route = createFileRoute("/admin/")({
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    if (getAuthAccessToken()) {
      throw redirect({ to: "/admin/dashboard" });
    }
  },
  component: AdminLoginForm,
  head: () => ({
    meta: [{ title: `Admin — ${SITE.shortName}` }],
  }),
});
