import type { ReactNode } from "react";

import { PageAreaHeader } from "@/components/layout/page-area-header";
import { cn } from "@/lib/utils";

type PageHeroBandProps = {
  children?: ReactNode;
  aside?: ReactNode;
  prefix?: ReactNode;
  suffix?: ReactNode;
  variant?: "default" | "hero";
  backgroundImage?: string;
  className?: string;
};

export function PageHeroBand({
  children,
  aside,
  prefix,
  suffix,
  variant = "default",
  backgroundImage,
  className,
}: PageHeroBandProps) {
  const isHero = variant === "hero";

  return (
    <section
      className={cn(
        isHero
          ? "hero-overlay relative flex min-h-[calc(50vh-1.75rem)] items-center justify-center border-b bg-cover bg-center sm:min-h-[calc((100vh-3.5rem)/2)]"
          : "section-padding border-b border-border bg-muted/20",
        className,
      )}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
    >
      <div
        className={cn(
          "site-container relative z-10",
          isHero ? "py-6 md:py-8" : undefined,
        )}
      >
        {isHero ? (
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            {prefix}
            {children ?? <PageAreaHeader variant="hero" />}
            {suffix}
          </div>
        ) : (
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.1fr]">
            <div className="space-y-4">
              {prefix}
              {children ?? <PageAreaHeader />}
            </div>
            {aside}
          </div>
        )}
      </div>
    </section>
  );
}
