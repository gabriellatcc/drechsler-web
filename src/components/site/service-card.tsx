import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { SiteIllustration } from "@/components/site/site-illustration";
import type { Service } from "@/lib/site-content";
import { SERVICE_IMAGES } from "@/lib/site-images";

type ServiceCardProps = {
  slug: Service["slug"];
  title: string;
  summary: string;
  linkLabel?: string;
};

export function ServiceCard({
  slug,
  title,
  summary,
  linkLabel = "Saiba mais",
}: ServiceCardProps) {
  return (
    <div className="flex overflow-hidden rounded-sm border border-border bg-card shadow-sm">
      <SiteIllustration
        src={SERVICE_IMAGES[slug]}
        alt={title}
        aspect="auto"
        className="w-24 shrink-0 rounded-none border-0 border-r border-border sm:w-28"
        imageClassName="size-full min-h-[6.5rem] object-cover"
      />
      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
        <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{summary}</p>
        <Link
          to="/servicos/$slug"
          params={{ slug }}
          className="label-technical mt-3 inline-flex w-fit items-center gap-1 text-primary hover:text-primary/80"
        >
          {linkLabel}
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </div>
  );
}
