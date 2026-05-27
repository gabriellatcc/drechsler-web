import type { ReactNode } from "react";

import { HomeHeroActions } from "@/components/layout/home-hero-actions";
import { HomeHeroCarousel } from "@/components/layout/home-hero-carousel";
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
  const isServicos = content.segment === "servicos";
  const aside = getSharedHeroAside(content.segment);

  if (isHero) {
    return (
      <HomeHeroCarousel>
        <div className="space-y-4 text-center">
          <PageAreaHeader variant="hero" />
          <HomeHeroActions />
        </div>
      </HomeHeroCarousel>
    );
  }

  return (
    <section
      className={cn(
        "bg-muted/20",
        isServicos ? "pt-9 md:pt-10" : "section-padding",
      )}
    >
      <div className="site-container relative z-10 w-full">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-4">
            <PageAreaHeader variant="default" />
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
