import { createFileRoute, redirect } from "@tanstack/react-router";

import { AdminDashboardPage } from "@/components/admin/admin-dashboard-page";
import { getAuthAccessToken } from "@/lib/api-client";
import { validateAdminDashboardSearch } from "@/lib/pagination/admin-dashboard-search";
import { SITE } from "@/lib/site-content";

export const Route = createFileRoute("/admin/dashboard")({
  validateSearch: validateAdminDashboardSearch,
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    if (!getAuthAccessToken()) {
      throw redirect({ to: "/admin" });
    }
  },
  component: AdminDashboardPage,
  head: () => ({
    meta: [{ title: `Dashboard — ${SITE.shortName}` }],
  }),
});
