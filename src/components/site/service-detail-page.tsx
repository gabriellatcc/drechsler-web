import { Link } from "@tanstack/react-router";
import { ArrowLeft, MessageCircle } from "lucide-react";

import { PageHeroBand } from "@/components/layout/page-hero-band";
import { SiteIllustration } from "@/components/site/site-illustration";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getServiceBySlug, whatsappUrl, type Service } from "@/lib/site-content";
import { getServiceImage } from "@/lib/site-images";

type ServiceDetailPageProps = {
  service: Service;
};

export function ServiceDetailPage({ service }: ServiceDetailPageProps) {
  const serviceImage = getServiceImage(service.slug);

  return (
    <>
      <PageHeroBand
        prefix={
          <Button asChild variant="ghost" className="h-auto p-0">
            <Link to="/servicos" search={{ categoria: service.category }}>
              <ArrowLeft className="size-4" />
              Voltar aos serviços
            </Link>
          </Button>
        }
        aside={
          serviceImage ? (
            <SiteIllustration src={serviceImage} alt={service.title} aspect="wide" />
          ) : null
        }
      />

      <section className="section-padding">
        <div className="site-container space-y-6">
          <Card>
            <CardContent className="pt-4">
              <ul className="divide-y divide-border">
                {service.items.map((item) => (
                  <li key={item} className="flex gap-3 py-3 text-sm text-muted-foreground first:pt-0 last:pb-0">
                    <span className="mt-1.5 size-1.5 shrink-0 bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="flex flex-wrap gap-2 border-t border-border pt-4">
            <Button asChild>
              <Link to="/contato">Solicitar informações</Link>
            </Button>
            <Button asChild variant="outline">
              <a
                href={whatsappUrl(`Olá! Gostaria de saber mais sobre: ${service.title}`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="size-4" />
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

export function ServiceNotFoundPage() {
  return (
    <>
      <PageHeroBand />
      <section className="section-padding">
        <div className="site-container max-w-xl border border-border p-6 text-center">
          <Button asChild>
            <Link to="/servicos">Ver todos os serviços</Link>
          </Button>
        </div>
      </section>
    </>
  );
}

export { getServiceBySlug };
