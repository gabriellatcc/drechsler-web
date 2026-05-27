import { useNavigate } from "@tanstack/react-router";
import { File, Loader2, MoreHorizontal, Newspaper, Pencil, Plus, Send, Trash2, Undo2 } from "lucide-react";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { PaginatedListPanel } from "@/components/admin/paginated-list-panel";
import { AdminShell } from "@/components/admin/admin-shell";
import { BlogPostDeleteAlertDialog } from "@/components/blog/blog-post-delete-alert-dialog";
import { BlogPostFormDialog } from "@/components/blog/blog-post-form";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Route } from "@/routes/admin.dashboard";
import { useAuthMe } from "@/generated/api/auth/auth";
import {
  getBlogListPostsDraftsQueryKey,
  getBlogListPostsQueryKey,
  useBlogListPostsDrafts,
  useBlogPublish,
} from "@/generated/api/blog/blog";
import type { BlogPostResource } from "@/generated/api/models/blogPostResource";
import { BlogPostResourceStatus } from "@/generated/api/models/blogPostResourceStatus";
import { BlogPublishBodyStatus } from "@/generated/api/models/blogPublishBodyStatus";
import type { ContactResource } from "@/generated/api/models/contactResource";
import { useContactListSubmissions } from "@/generated/api/contact/contact";
import { usePaginatedLastPageGuard, usePaginatedList } from "@/hooks/use-paginated-list";
import { toastApiError, toastApiSuccess } from "@/lib/api-toast";
import { cn } from "@/lib/utils";

const CONTACT_STORAGE_KEY = "admin-contact:list-per-page";
const BLOG_STORAGE_KEY = "admin-blog:list-per-page";

const DASHBOARD_SECTION_NAV = [
  {
    label: "Postagens do blog",
    shortLabel: "Blog",
    targetId: "admin-blog-posts",
    icon: Newspaper,
  },
  {
    label: "Formulários preenchidos",
    shortLabel: "Formulários",
    targetId: "admin-contact-submissions",
    icon: File,
  },
];

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
  "id" | "title" | "slug" | "status" | "updatedAt" | "excerpt" | "content" | "coverImage"
> & {
  author?: BlogPostResource["author"];
};

type BlogPostItemProps = {
  post: BlogPostListItem;
  onEdit: (post: BlogPostListItem) => void;
  onTogglePublish: (post: BlogPostListItem) => void;
  onDelete: (post: BlogPostListItem) => void;
  isPublishing: boolean;
};

function BlogPostItem({
  post,
  onEdit,
  onTogglePublish,
  onDelete,
  isPublishing,
}: BlogPostItemProps) {
  const isPublished = post.status === BlogPostResourceStatus.PUBLISHED;
  const authorName = post.author?.name;

  return (
    <article className="space-y-2 rounded-sm border border-border bg-card p-3">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1 space-y-2">
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
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              className="shrink-0"
              aria-label="Ações da postagem"
              disabled={isPublishing}
            >
              {isPublishing ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <MoreHorizontal className="size-4" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(post)}>
              <Pencil />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onTogglePublish(post)}>
              {isPublished ? (
                <>
                  <Undo2 />
                  Mover para rascunhos
                </>
              ) : (
                <>
                  <Send />
                  Tornar público (publicar)
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={() => onDelete(post)}>
              <Trash2 />
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
  const queryClient = useQueryClient();
  const pagination = usePaginatedList({
    storageKey: BLOG_STORAGE_KEY,
    pageKey: "blog_page",
    perPageKey: "blog_per_page",
    search,
  });

  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [selectedPost, setSelectedPost] = useState<BlogPostListItem | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<BlogPostListItem | null>(null);
  const [publishingPostId, setPublishingPostId] = useState<string | null>(null);

  const {
    data,
    isLoading,
    isFetching,
    isError,
  } = useBlogListPostsDrafts(pagination.apiParams);

  const { mutate: publishPost } = useBlogPublish({
    mutation: {
      onMutate: ({ id }) => {
        setPublishingPostId(id);
      },
      onSuccess: (response) => {
        toastApiSuccess(response);
        void queryClient.invalidateQueries({ queryKey: getBlogListPostsDraftsQueryKey() });
        void queryClient.invalidateQueries({ queryKey: getBlogListPostsQueryKey() });
      },
      onError: (error) => toastApiError(error),
      onSettled: () => {
        setPublishingPostId(null);
      },
    },
  });

  const items = data?.data.data ?? [];
  const meta = data?.data.meta;

  usePaginatedLastPageGuard(pagination.page, meta?.lastPage, pagination.setPage);

  function openCreateForm() {
    setFormMode("create");
    setSelectedPost(null);
    setFormOpen(true);
  }

  function openEditForm(post: BlogPostListItem) {
    setFormMode("edit");
    setSelectedPost(post);
    setFormOpen(true);
  }

  function openDeleteDialog(post: BlogPostListItem) {
    setPostToDelete(post);
    setDeleteOpen(true);
  }

  function handleTogglePublish(post: BlogPostListItem) {
    const nextStatus =
      post.status === BlogPostResourceStatus.PUBLISHED
        ? BlogPublishBodyStatus.DRAFT
        : BlogPublishBodyStatus.PUBLISHED;

    publishPost({
      id: post.id,
      data: { status: nextStatus },
    });
  }

  return (
    <>
      <PaginatedListPanel
        title="Postagens do blog"
        icon={Newspaper}
        headerAction={
          <Button variant="outline" size="sm" onClick={openCreateForm}>
            <Plus className="size-4" />
            Criar uma nova postagem
          </Button>
        }
        items={items}
        getItemKey={(post) => post.id}
        renderItem={(post) => (
          <BlogPostItem
            post={post}
            onEdit={openEditForm}
            onTogglePublish={handleTogglePublish}
            onDelete={openDeleteDialog}
            isPublishing={publishingPostId === post.id}
          />
        )}
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

      <BlogPostFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        mode={formMode}
        post={selectedPost}
      />

      <BlogPostDeleteAlertDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        postId={postToDelete?.id ?? null}
        postTitle={postToDelete?.title}
      />
    </>
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
      userName={meData?.data.name}
      onLogout={handleLogout}
      sectionNav={DASHBOARD_SECTION_NAV}
    >
      <div className="site-container flex w-full flex-1 flex-col gap-8 py-6 md:py-8 md:pb-10">
        <header>
          <h1 className="font-serif text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Formulários recebidos e postagens do blog em um só lugar.
          </p>
        </header>

        <div className="flex flex-col gap-8">
          <section
            id="admin-blog-posts"
            className="flex min-h-[28rem] scroll-mt-28 flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm"
          >
            <BlogPostsSection />
          </section>

          <section
            id="admin-contact-submissions"
            className="flex min-h-[28rem] scroll-mt-28 flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm"
          >
            <ContactSubmissionsSection />
          </section>
        </div>
      </div>
    </AdminShell>
  );
}
