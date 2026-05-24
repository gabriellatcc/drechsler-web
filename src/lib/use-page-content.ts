import { useRouterState } from "@tanstack/react-router";

import { resolvePageSegment, type ResolvedPageContent } from "@/lib/page-content";

function getSlugFromParams(params: unknown): string | undefined {
  if (params && typeof params === "object" && "slug" in params) {
    const slug = params.slug;
    return typeof slug === "string" ? slug : undefined;
  }

  return undefined;
}

export function useResolvedPageContent(): ResolvedPageContent {
  const { pathname, slug } = useRouterState({
    select: (state) => {
      const match = state.matches[state.matches.length - 1];
      return {
        pathname: state.location.pathname,
        slug: getSlugFromParams(match?.params),
      };
    },
  });

  return resolvePageSegment(pathname, slug);
}
