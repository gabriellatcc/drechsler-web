import { ImageOff } from "lucide-react";
import { useEffect, useState } from "react";

import { resolveMediaUrl } from "@/lib/resolve-media-url";
import { cn } from "@/lib/utils";

type BlogCoverImagePreviewProps = {
  src: string;
  alt: string;
  className?: string;
};

export function BlogCoverImagePreview({ src, alt, className }: BlogCoverImagePreviewProps) {
  const [status, setStatus] = useState<"idle" | "loaded" | "error">("idle");
  const resolvedSrc = resolveMediaUrl(src);

  useEffect(() => {
    setStatus("idle");
  }, [resolvedSrc]);

  if (!resolvedSrc.trim()) {
    return null;
  }

  return (
    <div className={cn("space-y-2", className)}>
      <p className="text-xs text-muted-foreground">Pré-visualização da capa</p>
      <div className="overflow-hidden rounded-sm border border-border bg-muted/20">
        {status === "error" ? (
          <div className="flex aspect-video flex-col items-center justify-center gap-2 px-4 text-center text-muted-foreground">
            <ImageOff className="size-6 opacity-60" aria-hidden />
            <p className="text-xs">
              Não foi possível carregar a imagem. Use o link direto do arquivo (ex.: .jpg, .png).
            </p>
          </div>
        ) : (
          <img
            key={resolvedSrc}
            src={resolvedSrc}
            alt={alt}
            className="aspect-video w-full object-cover"
            onLoad={(event) => {
              setStatus(event.currentTarget.naturalWidth > 0 ? "loaded" : "error");
            }}
            onError={() => setStatus("error")}
          />
        )}
      </div>
    </div>
  );
}
