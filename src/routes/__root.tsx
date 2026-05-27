import { createRootRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { PublicLayout } from "@/components/layout/public-layout";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Toaster } from "@/components/ui/sonner";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const isAdminRoute = pathname.startsWith("/admin");

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
