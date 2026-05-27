import type { ReactNode } from "react";
import { Calendar, Loader2, Tag, User } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetAdminBlogPostsId } from "@/generated/api/blog/blog";
import { BlogPostResourceStatus } from "@/generated/api/models/blogPostResourceStatus";
import { cn } from "@/lib/utils";

type BlogPostDetailDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  postId: string | null;
};

function formatDate(value: string | null | undefined): string {
  if (!value) return "—";

  return new Date(value).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function DetailField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <div className="text-sm text-foreground">{children}</div>
    </div>
  );
}

export function BlogPostDetailDialog({ open, onOpenChange, postId }: BlogPostDetailDialogProps) {
  const { data, isLoading, isError } = useGetAdminBlogPostsId(postId ?? "", {
    query: {
      enabled: open && Boolean(postId),
    },
  });

  const post = data?.data;
  const isPublished = post?.status === BlogPostResourceStatus.PUBLISHED;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        {isLoading ? (
          <div className="flex items-center justify-center py-12 text-muted-foreground">
            <Loader2 className="size-6 animate-spin" />
          </div>
        ) : isError || !post ? (
          <div className="py-8 text-center text-sm text-muted-foreground">
            Não foi possível carregar os detalhes da postagem.
          </div>
        ) : (
          <>
            <DialogHeader>
              <div className="flex flex-wrap items-start justify-between gap-3 pr-8">
                <DialogTitle className="text-left font-serif text-xl leading-snug">
                  {post.title}
                </DialogTitle>
                <span
                  className={cn(
                    "shrink-0 rounded-sm px-2 py-0.5 text-xs font-medium uppercase tracking-wide",
                    isPublished
                      ? "bg-primary/15 text-primary"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {isPublished ? "Publicado" : "Rascunho"}
                </span>
              </div>
              <DialogDescription className="text-left">
                Visualização completa da postagem selecionada.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5">
              {post.coverImage ? (
                <div className="overflow-hidden rounded-md border border-border bg-muted/30">
                  <img
                    src={post.coverImage}
                    alt={`Capa de ${post.title}`}
                    className="aspect-video w-full object-cover"
                  />
                </div>
              ) : null}

              <div className="grid gap-4 sm:grid-cols-2">
                <DetailField label="Autor">
                  <span className="inline-flex items-center gap-1.5">
                    <User className="size-3.5 text-muted-foreground" />
                    {post.author?.name ?? "—"}
                  </span>
                </DetailField>
                <DetailField label="Slug">
                  <span className="inline-flex items-center gap-1.5 break-all">
                    <Tag className="size-3.5 shrink-0 text-muted-foreground" />
                    {post.slug}
                  </span>
                </DetailField>
                <DetailField label="Criado em">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="size-3.5 text-muted-foreground" />
                    {formatDate(post.createdAt)}
                  </span>
                </DetailField>
                <DetailField label="Atualizado em">{formatDate(post.updatedAt)}</DetailField>
                <DetailField label="Publicado em">{formatDate(post.publishedAt)}</DetailField>
              </div>

              {post.excerpt ? (
                <DetailField label="Resumo">
                  <p className="leading-relaxed text-muted-foreground">{post.excerpt}</p>
                </DetailField>
              ) : null}

              <DetailField label="Conteúdo">
                <div className="rounded-md border border-border bg-muted/20 p-3 leading-relaxed whitespace-pre-wrap">
                  {post.content}
                </div>
              </DetailField>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
