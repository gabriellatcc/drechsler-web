import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";

import { SiteAccessGateProvider } from "@/components/providers/site-access-gate-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { RootNotFoundPage } from "@/components/site/not-found-page";
import { routeTree } from "@/routeTree.gen";

import "./global.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1 },
    mutations: { retry: 0 },
  },
});

const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: "intent",
  scrollRestoration: true,
  notFoundMode: "root",
  defaultNotFoundComponent: RootNotFoundPage,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SiteAccessGateProvider>
          <RouterProvider router={router} />
        </SiteAccessGateProvider>
      </ThemeProvider>
    </QueryClientProvider>
    <Analytics />
  </StrictMode>,
);
