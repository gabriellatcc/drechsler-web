import type { ReactNode } from "react";

import { PageAreaHeader } from "@/components/layout/page-area-header";
import { PageHeroBand } from "@/components/layout/page-hero-band";
import { SiteIllustration } from "@/components/site/site-illustration";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { type PageSegmentKey } from "@/lib/page-content";
import { useResolvedPageContent } from "@/lib/use-page-content";
import { SITE_IMAGES } from "@/lib/site-images";

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

function SharedPageHero() {
  const content = useResolvedPageContent();
  const usesSharedHero =
    content.segment === "sobre" ||
    content.segment === "servicos" ||
    content.segment === "contato";

  if (!usesSharedHero) {
    return null;
  }

  return (
    <PageHeroBand aside={getSharedHeroAside(content.segment)}>
      <PageAreaHeader />
    </PageHeroBand>
  );
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <SharedPageHero />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
