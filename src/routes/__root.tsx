import { createRootRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { useSiteAccessGate } from "@/components/providers/site-access-gate-provider";
import { PublicLayout } from "@/components/layout/public-layout";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { RootNotFoundPage } from "@/components/site/not-found-page";
import { SiteAccessGateScreen } from "@/components/site/site-access-gate-screen";
import { Toaster } from "@/components/ui/sonner";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: RootNotFoundPage,
});

function RootComponent() {
  const { active: gateActive, unlocked: gateUnlocked } = useSiteAccessGate();
  const { pathname, isNotFound } = useRouterState({
    select: (state) => ({
      pathname: state.location.pathname,
      isNotFound: state.matches.some((match) => match.status === "notFound"),
    }),
  });
  const isAdminRoute = pathname.startsWith("/admin") && !isNotFound;
  const showSiteAccessGate = gateActive && !gateUnlocked && !isAdminRoute;

  if (showSiteAccessGate) {
    return (
      <>
        <SiteAccessGateScreen />
        <ThemeToggle />
        <Toaster richColors position="top-right" />
      </>
    );
  }

  return (
    <>
      {isAdminRoute ? (
        <Outlet />
      ) : (
        <PublicLayout>
          <Outlet />
        </PublicLayout>
      )}
      <ThemeToggle />
      <Toaster richColors position="top-right" />
      {import.meta.env.DEV ? <TanStackRouterDevtools position="bottom-right" /> : null}
    </>
  );
}
