import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  getBlogListPostsDraftsQueryKey,
  getBlogListPostsQueryKey,
  useBlogCreatePost,
  useBlogUpdatePost,
} from "@/generated/api/blog/blog";
import type { BlogPostResource } from "@/generated/api/models/blogPostResource";
import { BlogCreatePostBodyStatus } from "@/generated/api/models/blogCreatePostBodyStatus";
import { toastApiError, toastApiSuccess } from "@/lib/api-toast";

import {
  blogPostFormDefaultValues,
  blogPostFormSchema,
  type BlogPostFormValues,
} from "./blog-post-schema";
import { BlogCoverImage } from "./blog-cover-image";

type BlogPostFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  post?: Pick<
    BlogPostResource,
    "id" | "title" | "excerpt" | "content" | "coverImage" | "status"
  > | null;
};

function toFormValues(
  post?: Pick<
    BlogPostResource,
    "title" | "excerpt" | "content" | "coverImage" | "status"
  > | null,
): BlogPostFormValues {
  if (!post) return blogPostFormDefaultValues;

  return {
    title: post.title,
    excerpt: post.excerpt ?? "",
    content: post.content,
    coverImage: post.coverImage ?? "",
    status:
      post.status === BlogCreatePostBodyStatus.PUBLISHED
        ? BlogCreatePostBodyStatus.PUBLISHED
        : BlogCreatePostBodyStatus.DRAFT,
  };
}

export function BlogPostFormDialog({
  open,
  onOpenChange,
  mode,
  post,
}: BlogPostFormDialogProps) {
  const queryClient = useQueryClient();
  const isEdit = mode === "edit";

  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostFormSchema),
    defaultValues: blogPostFormDefaultValues,
  });

  useEffect(() => {
    if (open) {
      form.reset(toFormValues(post));
    }
  }, [open, post, form]);

  function invalidateBlogQueries() {
    void queryClient.invalidateQueries({ queryKey: getBlogListPostsDraftsQueryKey() });
    void queryClient.invalidateQueries({ queryKey: getBlogListPostsQueryKey() });
  }

  const { mutate: createPost, isPending: isCreating } = useBlogCreatePost({
    mutation: {
      onSuccess: (data) => {
        toastApiSuccess(data);
        invalidateBlogQueries();
        onOpenChange(false);
        form.reset(blogPostFormDefaultValues);
      },
      onError: (error) => toastApiError(error),
    },
  });

  const { mutate: updatePost, isPending: isUpdating } = useBlogUpdatePost({
    mutation: {
      onSuccess: (data) => {
        toastApiSuccess(data);
        invalidateBlogQueries();
        onOpenChange(false);
      },
      onError: (error) => toastApiError(error),
    },
  });

  const isPending = isCreating || isUpdating;
  const coverImageValue = form.watch("coverImage");

  function onSubmit(values: BlogPostFormValues) {
    if (isEdit && post) {
      updatePost({
        id: post.id,
        data: {
          title: values.title,
          excerpt: values.excerpt,
          content: values.content,
          coverImage: values.coverImage,
        },
      });
      return;
    }

    createPost({
      data: {
        title: values.title,
        excerpt: values.excerpt,
        content: values.content,
        coverImage: values.coverImage,
        status: values.status,
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Editar postagem" : "Nova postagem"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Altere título, resumo, conteúdo e imagem de capa da postagem."
              : "Preencha os dados para criar uma nova postagem no blog."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Título da postagem" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resumo</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Breve resumo exibido na listagem"
                      rows={2}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Conteúdo</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Conteúdo completo da postagem" rows={6} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="coverImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imagem de capa (URL)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://exemplo.com/capa.jpg"
                      {...field}
                    />
                  </FormControl>
                  <p className="text-xs text-muted-foreground">
                    Cole o endereço direto do arquivo de imagem, não a página do site onde ela
                    aparece.
                  </p>
                  <FormMessage />
                  {coverImageValue.trim() ? (
                    <BlogCoverImage
                      src={coverImageValue}
                      alt="Pré-visualização da capa"
                      label="Pré-visualização da capa"
                      showErrorMessage
                    />
                  ) : null}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isEdit}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={BlogCreatePostBodyStatus.DRAFT}>Rascunho</SelectItem>
                      <SelectItem value={BlogCreatePostBodyStatus.PUBLISHED}>
                        Publicado
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isPending}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Salvando...
                  </>
                ) : isEdit ? (
                  "Salvar alterações"
                ) : (
                  "Criar postagem"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
