import { cn } from "@/lib/utils";

type SiteIllustrationProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  aspect?: "video" | "square" | "wide" | "auto";
};

const aspectClasses = {
  video: "aspect-video",
  square: "aspect-square",
  wide: "aspect-[16/10]",
  auto: "",
} as const;

export function SiteIllustration({
  src,
  alt,
  className,
  imageClassName,
  aspect = "video",
}: SiteIllustrationProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border bg-muted/30 shadow-sm",
        aspectClasses[aspect],
        className,
      )}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={cn("size-full object-cover", imageClassName)}
      />
    </div>
  );
}
