import { Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  getBlogListPostsDraftsQueryKey,
  getBlogListPostsQueryKey,
  useBlogDeletePost,
} from "@/generated/api/blog/blog";
import { toastApiError, toastApiSuccess } from "@/lib/api-toast";

type BlogPostDeleteAlertDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  postId: string | null;
  postTitle?: string;
};

export function BlogPostDeleteAlertDialog({
  open,
  onOpenChange,
  postId,
  postTitle,
}: BlogPostDeleteAlertDialogProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useBlogDeletePost({
    mutation: {
      onSuccess: (data) => {
        toastApiSuccess(data);
        void queryClient.invalidateQueries({ queryKey: getBlogListPostsDraftsQueryKey() });
        void queryClient.invalidateQueries({ queryKey: getBlogListPostsQueryKey() });
        onOpenChange(false);
      },
      onError: (error) => toastApiError(error),
    },
  });

  function handleDelete() {
    if (!postId) return;
    mutate({ id: postId });
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir postagem?</AlertDialogTitle>
          <AlertDialogDescription>
            {postTitle
              ? `A postagem "${postTitle}" será removida permanentemente. Esta ação não pode ser desfeita.`
              : "Esta postagem será removida permanentemente. Esta ação não pode ser desfeita."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
          <Button variant="destructive" disabled={isPending || !postId} onClick={handleDelete}>
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Excluindo...
              </>
            ) : (
              "Excluir"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
