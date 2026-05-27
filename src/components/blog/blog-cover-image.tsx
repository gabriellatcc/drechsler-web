import { useEffect, useState } from "react";

import { resolveMediaUrl } from "@/lib/resolve-media-url";
import { cn } from "@/lib/utils";

type BlogCoverImageAspect = "video" | "4/3";

type BlogCoverImageProps = {
  src: string | null | undefined;
  alt: string;
  className?: string;
  aspect?: BlogCoverImageAspect;
  label?: string;
  showErrorMessage?: boolean;
  imageClassName?: string;
};

const aspectClasses: Record<BlogCoverImageAspect, string> = {
  video: "aspect-video",
  "4/3": "aspect-[4/3]",
};

export function BlogCoverImage({
  src,
  alt,
  className,
  aspect = "video",
  label,
  showErrorMessage = false,
  imageClassName,
}: BlogCoverImageProps) {
  const [status, setStatus] = useState<"idle" | "loaded" | "error">("idle");
  const resolvedSrc = resolveMediaUrl(src)?.trim() ?? "";
  const aspectClass = aspectClasses[aspect];

  useEffect(() => {
    setStatus(resolvedSrc ? "idle" : "error");
  }, [resolvedSrc]);

  const frame = (
    <div className="overflow-hidden rounded-sm border border-border bg-muted/20">
      {!resolvedSrc || status === "error" ? (
        <div
          className={cn(
            "flex w-full flex-col items-center justify-center gap-2 bg-muted/20 text-muted-foreground",
            aspectClass,
          )}
          role="img"
          aria-label={alt}
        >
          <span className="text-2xl opacity-60" aria-hidden>
            🖼️
          </span>
          {showErrorMessage ? (
            <p className="px-4 text-center text-xs">
              Não foi possível carregar a imagem. Use o link direto do arquivo (ex.: .jpg, .png).
            </p>
          ) : null}
        </div>
      ) : (
        <img
          key={resolvedSrc}
          src={resolvedSrc}
          alt={alt}
          className={cn(aspectClass, "w-full object-cover", imageClassName)}
          onLoad={(event) => {
            setStatus(event.currentTarget.naturalWidth > 0 ? "loaded" : "error");
          }}
          onError={() => setStatus("error")}
        />
      )}
    </div>
  );

  if (!label) {
    return <div className={className}>{frame}</div>;
  }

  return (
    <div className={cn("space-y-2", className)}>
      <p className="text-xs text-muted-foreground">{label}</p>
      {frame}
    </div>
  );
}
