import { useMemo } from "react";

import { useBlogListPosts } from "@/generated/api/blog/blog";
import { BASE_NAV_ITEMS, BLOG_NAV_ITEM, type SiteNavItem } from "@/lib/site-content";

export function useSiteNavItems(): SiteNavItem[] {
  const { data } = useBlogListPosts(
    { page: 1, perPage: 1 },
    {
      query: {
        staleTime: 60_000,
      },
    },
  );

  const hasPublishedPosts = (data?.data?.meta?.total ?? 0) > 0;

  return useMemo(() => {
    if (!hasPublishedPosts) {
      return [...BASE_NAV_ITEMS];
    }

    const items: SiteNavItem[] = [...BASE_NAV_ITEMS];
    const contactIndex = items.findIndex((item) => item.to === "/contato");

    if (contactIndex === -1) {
      return [...items, BLOG_NAV_ITEM];
    }

    return [
      ...items.slice(0, contactIndex),
      BLOG_NAV_ITEM,
      ...items.slice(contactIndex),
    ];
  }, [hasPublishedPosts]);
}
