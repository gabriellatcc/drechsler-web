import { Link, type NotFoundRouteProps } from "@tanstack/react-router";
import { Home } from "lucide-react";
import { useLayoutEffect } from "react";

import { PageHeroBand } from "@/components/layout/page-hero-band";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site-content";

type NotFoundPageProps = {
  documentTitle?: string;
  homeLabel?: string;
  secondaryAction?: { to: "/servicos" | "/blog"; label: string };
};

export function RootNotFoundPage(_props: NotFoundRouteProps) {
  return <NotFoundPage />;
}

export function NotFoundPage({
  documentTitle = `Página não encontrada — ${SITE.shortName}`,
  homeLabel = "Voltar ao início",
  secondaryAction,
}: NotFoundPageProps) {
  useLayoutEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  return (
    <>
      <PageHeroBand />
      <section className="section-padding">
        <div className="site-container flex max-w-xl flex-col items-center gap-6 p-8 text-center">
          <p
            className="text-9xl font-semibold tracking-tight text-foreground"
            aria-hidden
          >
            404
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild>
              <Link to="/">
                <Home className="size-4" />
                {homeLabel}
              </Link>
            </Button>
            {secondaryAction ? (
              <Button asChild variant="outline">
                <Link to={secondaryAction.to}>{secondaryAction.label}</Link>
              </Button>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}
