import { useNavigate } from "@tanstack/react-router";
import { File, Newspaper } from "lucide-react";

import { PaginatedListPanel } from "@/components/admin/paginated-list-panel";
import { AdminShell } from "@/components/admin/admin-shell";
import { Route } from "@/routes/admin.dashboard";
import { useAuthMe } from "@/generated/api/auth/auth";
import { useBlogListPostsDrafts } from "@/generated/api/blog/blog";
import { useContactListSubmissions } from "@/generated/api/contact/contact";
import type { BlogPostResource } from "@/generated/api/models/blogPostResource";
import { BlogPostResourceStatus } from "@/generated/api/models/blogPostResourceStatus";
import type { ContactResource } from "@/generated/api/models/contactResource";
import { usePaginatedLastPageGuard, usePaginatedList } from "@/hooks/use-paginated-list";
import { cn } from "@/lib/utils";

const CONTACT_STORAGE_KEY = "admin-contact:list-per-page";
const BLOG_STORAGE_KEY = "admin-blog:list-per-page";

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

function ContactSubmissionsSection() {
  const search = Route.useSearch();
  const pagination = usePaginatedList({
    storageKey: CONTACT_STORAGE_KEY,
    pageKey: "contact_page",
    perPageKey: "contact_per_page",
    search,
  });

  const {
    data,
    isLoading,
    isFetching,
    isError,
  } = useContactListSubmissions(pagination.apiParams);

  const items = data?.data.data ?? [];
  const meta = data?.data.meta;

  usePaginatedLastPageGuard(pagination.page, meta?.lastPage, pagination.setPage);

  return (
    <PaginatedListPanel
      title="Formulários preenchidos"
      icon={File}
      items={items}
      getItemKey={(submission) => submission.id}
      renderItem={(submission) => <ContactSubmissionItem submission={submission} />}
      isLoading={isLoading}
      isFetching={isFetching}
      isError={isError}
      emptyMessage="Nenhum formulário recebido ainda."
      errorMessage="Não foi possível carregar os formulários."
      itemLabel="formulários"
      meta={meta}
      perPage={pagination.perPage}
      perPageOptions={pagination.perPageOptions}
      onPageChange={pagination.setPage}
      onPerPageChange={pagination.setPerPage}
    />
  );
}

function BlogPostsSection() {
  const search = Route.useSearch();
  const pagination = usePaginatedList({
    storageKey: BLOG_STORAGE_KEY,
    pageKey: "blog_page",
    perPageKey: "blog_per_page",
    search,
  });

  const {
    data,
    isLoading,
    isFetching,
    isError,
  } = useBlogListPostsDrafts(pagination.apiParams);

  const items = data?.data.data ?? [];
  const meta = data?.data.meta;

  usePaginatedLastPageGuard(pagination.page, meta?.lastPage, pagination.setPage);

  return (
    <PaginatedListPanel
      title="Postagens do blog"
      icon={Newspaper}
      items={items}
      getItemKey={(post) => post.id}
      renderItem={(post) => <BlogPostItem post={post} />}
      isLoading={isLoading}
      isFetching={isFetching}
      isError={isError}
      emptyMessage="Nenhuma postagem cadastrada."
      errorMessage="Não foi possível carregar as postagens."
      itemLabel="postagens"
      meta={meta}
      perPage={pagination.perPage}
      perPageOptions={pagination.perPageOptions}
      onPageChange={pagination.setPage}
      onPerPageChange={pagination.setPerPage}
    />
  );
}

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const { data: meData } = useAuthMe();

  function handleLogout() {
    void navigate({ to: "/admin" });
  }

  return (
    <AdminShell
      title={meData?.data.name ? `Olá, ${meData.data.name}` : "Painel administrativo"}
      onLogout={handleLogout}
    >
      <div className="site-container flex w-full flex-1 flex-col gap-8 py-6 md:py-8 md:pb-10">
        <header>
          <h1 className="font-serif text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Formulários recebidos e postagens do blog em um só lugar.
          </p>
        </header>

        <div className="flex flex-col gap-8">
          <section className="flex min-h-[28rem] flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm">
            <BlogPostsSection />
          </section>

          <section className="flex min-h-[28rem] flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm">
            <ContactSubmissionsSection />
          </section>
        </div>
      </div>
    </AdminShell>
  );
}
