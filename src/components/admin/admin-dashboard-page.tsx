import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, File, Loader2, Newspaper } from "lucide-react";
import { useState } from "react";

import { AdminShell } from "@/components/admin/admin-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuthMe } from "@/generated/api/auth/auth";
import { useBlogListPostsDrafts } from "@/generated/api/blog/blog";
import { useContactListSubmissions } from "@/generated/api/contact/contact";
import type { BlogPostResource } from "@/generated/api/models/blogPostResource";
import { BlogPostResourceStatus } from "@/generated/api/models/blogPostResourceStatus";
import type { ContactResource } from "@/generated/api/models/contactResource";
import { cn } from "@/lib/utils";

const BLOG_PER_PAGE = 10;

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function ContactSubmissionItem({ submission }: { submission: ContactResource }) {
  return (
    <article className="space-y-1 rounded-sm border border-border bg-card p-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <p className="font-medium text-card-foreground">{submission.name}</p>
        <time className="text-xs text-muted-foreground">{formatDate(submission.createdAt)}</time>
      </div>
      <p className="text-sm text-muted-foreground">{submission.email}</p>
      {submission.phone ? (
        <p className="text-sm text-muted-foreground">{submission.phone}</p>
      ) : null}
      {submission.company ? (
        <p className="text-sm text-muted-foreground">{submission.company}</p>
      ) : null}
      <p className="text-sm leading-relaxed text-foreground">{submission.message}</p>
    </article>
  );
}

type BlogPostListItem = Pick<
  BlogPostResource,
  "id" | "title" | "slug" | "status" | "updatedAt"
> & {
  excerpt?: string | null;
  author?: BlogPostResource["author"];
};

function BlogPostItem({ post }: { post: BlogPostListItem }) {
  const isPublished = post.status === BlogPostResourceStatus.PUBLISHED;
  const authorName = post.author?.name;

  return (
    <article className="space-y-2 rounded-sm border border-border bg-card p-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <p className="font-medium text-card-foreground">{post.title}</p>
        <span
          className={cn(
            "rounded-sm px-2 py-0.5 text-xs font-medium uppercase tracking-wide",
            isPublished
              ? "bg-primary/15 text-primary"
              : "bg-muted text-muted-foreground",
          )}
        >
          {isPublished ? "Publicado" : "Rascunho"}
        </span>
      </div>
      {post.excerpt ? (
        <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
      ) : null}
      <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
        {authorName ? <span>{authorName}</span> : null}
        {authorName ? <span>·</span> : null}
        <time>{formatDate(post.updatedAt)}</time>
        <span>·</span>
        <span>{post.slug}</span>
      </div>
    </article>
  );
}

function EmptyState({ icon: Icon, message }: { icon: typeof File; message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-10 text-center text-muted-foreground">
      <Icon className="size-8 opacity-50" />
      <p className="text-sm">{message}</p>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center py-10 text-muted-foreground">
      <Loader2 className="size-6 animate-spin" />
    </div>
  );
}

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const [blogPage, setBlogPage] = useState(1);

  const { data: meData } = useAuthMe();

  const {
    data: submissionsData,
    isLoading: submissionsLoading,
    isError: submissionsError,
  } = useContactListSubmissions({ perPage: 100 });

  const {
    data: postsData,
    isLoading: postsLoading,
    isError: postsError,
  } = useBlogListPostsDrafts({ page: blogPage, perPage: BLOG_PER_PAGE });

  const submissions = submissionsData?.data.data ?? [];
  const posts = postsData?.data.data ?? [];
  const postsMeta = postsData?.data.meta;

  function handleLogout() {
    void navigate({ to: "/admin" });
  }

  return (
    <AdminShell
      title={meData?.data.name ? `Olá, ${meData.data.name}` : "Painel administrativo"}
      onLogout={handleLogout}
    >
      <div className="site-container flex flex-1 flex-col py-6 md:py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Formulários recebidos e postagens do blog em um só lugar.
          </p>
        </div>

        <div className="grid min-h-0 flex-1 gap-6 lg:grid-cols-2">
          <Card className="flex min-h-[420px] flex-col lg:min-h-[calc(100vh-12rem)]">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <File className="size-5" />
                Formulários preenchidos
              </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="flex flex-1 flex-col gap-3 overflow-y-auto pt-4">
              {submissionsLoading ? <LoadingState /> : null}
              {submissionsError ? (
                <EmptyState icon={File} message="Não foi possível carregar os formulários." />
              ) : null}
              {!submissionsLoading && !submissionsError && submissions.length === 0 ? (
                <EmptyState icon={File} message="Nenhum formulário recebido ainda." />
              ) : null}
              {!submissionsLoading && !submissionsError
                ? submissions.map((submission) => (
                    <ContactSubmissionItem key={submission.id} submission={submission} />
                  ))
                : null}
            </CardContent>
          </Card>

          <Card className="flex min-h-[420px] flex-col lg:min-h-[calc(100vh-12rem)]">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Newspaper className="size-5" />
                Postagens do blog
              </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="flex flex-1 flex-col gap-3 overflow-y-auto pt-4">
              {postsLoading ? <LoadingState /> : null}
              {postsError ? (
                <EmptyState icon={Newspaper} message="Não foi possível carregar as postagens." />
              ) : null}
              {!postsLoading && !postsError && posts.length === 0 ? (
                <EmptyState icon={Newspaper} message="Nenhuma postagem cadastrada." />
              ) : null}
              {!postsLoading && !postsError
                ? posts.map((post) => <BlogPostItem key={post.id} post={post} />)
                : null}

              {postsMeta && postsMeta.lastPage > 1 ? (
                <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4">
                  <p className="text-xs text-muted-foreground">
                    Página {postsMeta.page} de {postsMeta.lastPage} · {postsMeta.total} postagens
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={blogPage <= 1 || postsLoading}
                      onClick={() => setBlogPage((page) => Math.max(1, page - 1))}
                    >
                      <ChevronLeft className="size-4" />
                      Anterior
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={blogPage >= postsMeta.lastPage || postsLoading}
                      onClick={() => setBlogPage((page) => page + 1)}
                    >
                      Próxima
                      <ChevronRight className="size-4" />
                    </Button>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminShell>
  );
}
