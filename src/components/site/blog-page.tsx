import { Link } from "@tanstack/react-router";
import { getRouteApi } from "@tanstack/react-router";
import { ArrowRight, Calendar, ChevronLeft, ChevronRight, File, Loader2 } from "lucide-react";
import { useCallback, useEffect } from "react";

import { BlogCoverImage } from "@/components/blog/blog-cover-image";
import { Button } from "@/components/ui/button";
import { useBlogListPosts } from "@/generated/api/blog/blog";
import type { BlogPostResource } from "@/generated/api/models/blogPostResource";
import { formatBlogDate } from "@/lib/blog/format-date";
import { DEFAULT_PER_PAGE } from "@/lib/pagination/constants";
import { clampPage, resolvePage } from "@/lib/pagination/resolve-pagination";

const blogRoute = getRouteApi("/blog/");

type BlogPostSummary = Pick<
  BlogPostResource,
  "id" | "title" | "slug" | "excerpt" | "coverImage" | "publishedAt"
>;

function BlogPostListItem({ post }: { post: BlogPostSummary }) {
  return (
    <article className="blog-publication-item group">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
        {post.coverImage ? (
          <Link
            to="/blog/$slug"
            params={{ slug: post.slug }}
            className="blog-publication-cover shrink-0 overflow-hidden rounded-sm border border-border bg-muted/30 lg:w-44"
          >
            <BlogCoverImage
              src={post.coverImage}
              alt={`Capa de ${post.title}`}
              className="aspect-[4/3] w-full transition-transform duration-300 group-hover:scale-[1.02]"
              imageClassName="size-full object-cover"
            />
          </Link>
        ) : null}

        <div className="min-w-0 flex-1 space-y-3">
          <div className="space-y-2">
            <p className="label-technical text-primary">Artigo</p>
            <h2 className="font-serif text-xl font-semibold leading-snug tracking-tight text-foreground md:text-2xl">
              <Link
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="transition-colors hover:text-primary"
              >
                {post.title}
              </Link>
            </h2>
            <p className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="size-3.5" />
                Publicado em {formatBlogDate(post.publishedAt)}
              </span>
            </p>
          </div>

          {post.excerpt ? (
            <p className="border-l-2 border-primary/30 pl-3 text-sm italic leading-relaxed text-muted-foreground">
              {post.excerpt}
            </p>
          ) : null}

          <Link
            to="/blog/$slug"
            params={{ slug: post.slug }}
            className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-primary transition-colors hover:text-primary/80"
          >
            Ler publicação
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function BlogPage() {
  const search = blogRoute.useSearch();
  const navigate = blogRoute.useNavigate();

  const page = resolvePage(search.page, 1);
  const perPage = DEFAULT_PER_PAGE;

  const { data, isLoading, isError, isFetching } = useBlogListPosts(
    { page, perPage },
    {
      query: {
        placeholderData: (previousData) => previousData,
      },
    },
  );

  const posts = (data?.data?.data ?? []) as BlogPostSummary[];
  const meta = data?.data?.meta;

  const setPage = useCallback(
    (nextPage: number) => {
      void navigate({
        replace: true,
        search: (prev) => {
          const next = { ...prev };
          if (nextPage <= 1) {
            delete next.page;
          } else {
            next.page = nextPage;
          }
          return next;
        },
      });
    },
    [navigate],
  );

  useEffect(() => {
    if (meta?.lastPage === undefined) return;

    const corrected = clampPage(page, Math.max(meta.lastPage, 1));
    if (corrected !== page) {
      setPage(corrected);
    }
  }, [meta?.lastPage, page, setPage]);

  const canGoPrevious = (meta?.page ?? 1) > 1;
  const canGoNext = meta ? meta.page < meta.lastPage : false;

  return (
    <section className="section-padding">
      <div className="site-container space-y-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-16 text-muted-foreground">
            <Loader2 className="size-6 animate-spin" />
          </div>
        ) : null}

        {isError ? (
          <div className="flex flex-col items-center justify-center gap-2 py-16 text-center text-muted-foreground">
            <File className="size-8 opacity-50" />
            <p className="text-sm">Não foi possível carregar as publicações.</p>
          </div>
        ) : null}

        {!isLoading && !isError && posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-16 text-center text-muted-foreground">
            <File className="size-8 opacity-50" />
            <p className="text-sm">Nenhuma publicação disponível no momento.</p>
          </div>
        ) : null}

        {!isLoading && !isError && posts.length > 0 ? (
          <div className="space-y-0 divide-y divide-border">
            {posts.map((post) => (
              <BlogPostListItem key={post.id} post={post} />
            ))}
          </div>
        ) : null}

        {meta && meta.lastPage > 1 ? (
          <div className="flex items-center justify-center gap-3 border-t border-border pt-6">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={!canGoPrevious || isFetching}
              aria-label="Página anterior"
              onClick={() => setPage(meta.page - 1)}
            >
              <ChevronLeft className="size-4" />
              Anterior
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={!canGoNext || isFetching}
              aria-label="Próxima página"
              onClick={() => setPage(meta.page + 1)}
            >
              Próxima
              <ChevronRight className="size-4" />
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
