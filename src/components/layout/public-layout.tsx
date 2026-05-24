import type { ReactNode } from "react";

import { HomeHeroActions } from "@/components/layout/home-hero-actions";
import { PageAreaHeader } from "@/components/layout/page-area-header";
import { SiteIllustration } from "@/components/site/site-illustration";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { type PageSegmentKey, usesNavPageHeader } from "@/lib/page-content";
import { useResolvedPageContent } from "@/lib/use-page-content";
import { SITE_IMAGES } from "@/lib/site-images";
import { cn } from "@/lib/utils";

type PublicLayoutProps = {
  children: ReactNode;
};

function getSharedHeroAside(segment: PageSegmentKey): ReactNode {
  if (segment === "sobre") {
    return (
      <SiteIllustration
        src={SITE_IMAGES.povPesquisador}
        alt="Laboratório com estruturas químicas e equipamentos de pesquisa"
        aspect="auto"
        className="h-44 sm:h-48 md:h-52"
      />
    );
  }

  return null;
}

function NavPageHero() {
  const content = useResolvedPageContent();

  if (!usesNavPageHeader(content.segment)) {
    return null;
  }

  const isHero = content.segment === "home";
  const aside = getSharedHeroAside(content.segment);

  return (
    <section
      className={cn(
        isHero
          ? "hero-overlay relative flex min-h-[calc(50vh-1.75rem)] items-center justify-center border-b bg-cover bg-center sm:min-h-[calc((100vh-3.5rem)/2)]"
          : "section-padding border-b border-border bg-muted/20",
      )}
      style={isHero ? { backgroundImage: `url(${SITE_IMAGES.fundoLandingPage})` } : undefined}
    >
      <div
        className={cn(
          "site-container relative z-10 w-full",
          isHero ? "py-6 md:py-8" : undefined,
        )}
      >
        <div
          className={cn(
            "grid items-center gap-8",
            isHero ? "mx-auto max-w-3xl" : "lg:grid-cols-[1fr_1.1fr]",
          )}
        >
          <div className={cn("space-y-4", isHero && "text-center")}>
            <PageAreaHeader variant={isHero ? "hero" : "default"} />
            {isHero ? <HomeHeroActions /> : null}
          </div>
          {aside}
        </div>
      </div>
    </section>
  );
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <NavPageHero />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
