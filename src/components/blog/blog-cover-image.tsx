import { ImageOff } from "lucide-react";
import { useState } from "react";

import { resolveMediaUrl } from "@/lib/resolve-media-url";
import { cn } from "@/lib/utils";

type BlogCoverImageProps = {
  src: string | null | undefined;
  alt: string;
  className?: string;
  imageClassName?: string;
  placeholderClassName?: string;
};

export function BlogCoverImage({
  src,
  alt,
  className,
  imageClassName,
  placeholderClassName,
}: BlogCoverImageProps) {
  const [failed, setFailed] = useState(false);
  const resolvedSrc = resolveMediaUrl(src);

  if (!resolvedSrc || failed) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-muted/30 text-muted-foreground",
          className,
          placeholderClassName,
        )}
        role="img"
        aria-label={alt}
      >
        <ImageOff className="size-8 opacity-50" aria-hidden />
      </div>
    );
  }

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      loading="lazy"
      className={cn(className, imageClassName)}
      onError={() => setFailed(true)}
      onLoad={(event) => {
        if (event.currentTarget.naturalWidth === 0) {
          setFailed(true);
        }
      }}
    />
  );
}
