import { Link } from "@tanstack/react-router";
import { ArrowLeft, MessageCircle } from "lucide-react";

import { SiteIllustration } from "@/components/site/site-illustration";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  getServiceBySlug,
  SERVICE_CATEGORIES,
  whatsappUrl,
  type Service,
} from "@/lib/site-content";
import { getServiceImage } from "@/lib/site-images";

type ServiceDetailPageProps = {
  service: Service;
};

export function ServiceDetailPage({ service }: ServiceDetailPageProps) {
  const serviceImage = getServiceImage(service.slug);

  return (
    <>
      <section className="section-padding border-b bg-muted/20">
        <div className="site-container grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="max-w-3xl space-y-6">
            <Button asChild variant="ghost" className="h-auto p-0">
              <Link to="/servicos">
                <ArrowLeft className="size-4" />
                Voltar aos serviços
              </Link>
            </Button>

            <div className="space-y-3">
              <p className="text-sm font-medium text-primary">
                {SERVICE_CATEGORIES[service.category]}
              </p>
              <h1 className="text-4xl font-bold tracking-tight">{service.title}</h1>
              <p className="text-lg text-muted-foreground">{service.summary}</p>
            </div>
          </div>

          {serviceImage ? (
            <SiteIllustration
              src={serviceImage}
              alt={service.title}
              aspect="wide"
            />
          ) : null}
        </div>
      </section>

      <section className="section-padding">
        <div className="site-container max-w-3xl space-y-8">
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-4">
                {service.items.map((item) => (
                  <li key={item} className="flex gap-3 text-muted-foreground">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="flex flex-wrap gap-3">
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
    <section className="section-padding">
      <div className="site-container max-w-xl space-y-4 text-center">
        <h1 className="text-2xl font-bold">Serviço não encontrado</h1>
        <p className="text-muted-foreground">
          O serviço solicitado não existe ou foi removido.
        </p>
        <Button asChild>
          <Link to="/servicos">Ver todos os serviços</Link>
        </Button>
      </div>
    </section>
  );
}

export { getServiceBySlug };
