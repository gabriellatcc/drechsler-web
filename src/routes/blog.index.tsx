import { createFileRoute } from "@tanstack/react-router";

import { BlogPage } from "@/components/site/blog-page";
import { validatePublicBlogSearch } from "@/lib/pagination/public-blog-search";
import { SITE } from "@/lib/site-content";

export const Route = createFileRoute("/blog/")({
  validateSearch: validatePublicBlogSearch,
  component: BlogPage,
  head: () => ({
    meta: [{ title: `Publicações — ${SITE.shortName}` }],
  }),
});
