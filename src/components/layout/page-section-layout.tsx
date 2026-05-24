import type { ReactNode } from "react";

import { PageHeroBand } from "@/components/layout/page-hero-band";
import { useResolvedPageContent } from "@/lib/use-page-content";

type PageSectionLayoutProps = {
  children: ReactNode;
  heroAside?: ReactNode;
  heroPrefix?: ReactNode;
  heroVariant?: "default" | "hero";
  backgroundImage?: string;
  hideHero?: boolean;
};

export function PageSectionLayout({
  children,
  heroAside,
  heroPrefix,
  heroVariant,
  backgroundImage,
  hideHero = false,
}: PageSectionLayoutProps) {
  const content = useResolvedPageContent();
  const resolvedVariant =
    heroVariant ?? (content.segment === "home" ? "hero" : "default");

  return (
    <>
      {!hideHero ? (
        <PageHeroBand
          variant={resolvedVariant}
          aside={heroAside}
          prefix={heroPrefix}
          backgroundImage={backgroundImage}
        />
      ) : null}
      {children}
    </>
  );
}
