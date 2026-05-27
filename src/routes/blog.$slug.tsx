import { createFileRoute } from "@tanstack/react-router";

import { BlogPostPage } from "@/components/site/blog-post-page";
import { SITE } from "@/lib/site-content";

export const Route = createFileRoute("/blog/$slug")({
  component: BlogPostRoute,
  head: () => ({
    meta: [{ title: `Publicação — ${SITE.shortName}` }],
  }),
});

function BlogPostRoute() {
  const { slug } = Route.useParams();

  return <BlogPostPage slug={slug} />;
}
