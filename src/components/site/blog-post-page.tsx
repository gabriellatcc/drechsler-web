import { Link } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Loader2 } from "lucide-react";

import { BlogCoverImage } from "@/components/blog/blog-cover-image";
import { NotFoundPage } from "@/components/site/not-found-page";
import { PageHeroBand } from "@/components/layout/page-hero-band";
import { useBlogShowPost } from "@/generated/api/blog/blog";
import { formatBlogDate } from "@/lib/blog/format-date";
import { SITE } from "@/lib/site-content";
import { Button } from "@/components/ui/button";

type BlogPostPageProps = {
  slug: string;
};

export function BlogPostPage({ slug }: BlogPostPageProps) {
  const { data, isLoading, isError } = useBlogShowPost(slug);
  const post = data?.data;

  if (isLoading) {
    return (
      <section className="section-padding">
        <div className="site-container flex items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="size-6 animate-spin" />
        </div>
      </section>
    );
  }

  if (isError || !post) {
    return <BlogPostNotFoundPage />;
  }

  return (
    <>
      <PageHeroBand
        prefix={
          <Button asChild variant="ghost" className="h-auto p-0">
            <Link to="/blog">
              <ArrowLeft className="size-4" />
              Voltar ao blog
            </Link>
          </Button>
        }
      />

      <article className="section-padding">
        <div className="site-container mx-auto max-w-3xl space-y-8">
          <header className="space-y-4 border-b border-border pb-6">
            <div className="flex flex-row justify-between items-center">
              <p className="label-technical text-primary">
                Publicação da equipe DRECHSLER
              </p>
              <div className="space-y-1">
                <dd className="inline-flex items-center gap-1.5 text-foreground">
                  <Calendar className="size-3.5 text-muted-foreground" />
                  {formatBlogDate(post.publishedAt)}
                </dd>
              </div>
            </div>
            <h1 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
              {post.title}
            </h1>
          </header>

          {post.coverImage ? (
            <figure className="overflow-hidden rounded-sm border border-border bg-muted/30">
              <BlogCoverImage
                src={post.coverImage}
                alt={`Ilustração de capa para ${post.title}`}
                className="aspect-video w-full"
                imageClassName="size-full object-cover"
              />
            </figure>
          ) : null}

          {post.excerpt ? (
            <section aria-labelledby="blog-post-abstract" className="space-y-2">
              <h2 id="blog-post-abstract" className="label-technical text-foreground">
                Resumo
              </h2>
              <p className="rounded-sm border border-border bg-muted/20 p-4 text-sm italic leading-relaxed text-muted-foreground">
                {post.excerpt}
              </p>
            </section>
          ) : null}

          <section aria-labelledby="blog-post-content" className="space-y-3">
            <div className="blog-article-body whitespace-pre-wrap text-sm leading-relaxed text-foreground md:text-base">
              {post.content}
            </div>
          </section>
        </div>
      </article>
    </>
  );
}

export function BlogPostNotFoundPage() {
  return (
    <NotFoundPage
      documentTitle={`Publicação não encontrada — ${SITE.shortName}`}
      secondaryAction={{ to: "/blog", label: "Ver publicações" }}
    />
  );
}
