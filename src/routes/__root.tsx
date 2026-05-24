import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { PublicLayout } from "@/components/layout/public-layout";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Toaster } from "@/components/ui/sonner";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <PublicLayout>
        <Outlet />
      </PublicLayout>
      <ThemeToggle />
      <Toaster richColors position="top-right" />
      {import.meta.env.DEV ? <TanStackRouterDevtools position="bottom-right" /> : null}
    </>
  );
}
