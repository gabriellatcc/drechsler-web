import { Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";

import { ServiceCard } from "@/components/site/service-card";
import { SiteIllustration } from "@/components/site/site-illustration";
import { Button } from "@/components/ui/button";
import {
  ABOUT,
  getHomeFeaturedServices,
  MISSION_VISION_VALUES,
  SERVICE_CATEGORIES,
  whatsappUrl,
} from "@/lib/site-content";
import {
  HOME_SERVICE_CATEGORY_SHORTCUTS,
  SERVICE_CATEGORY_ICONS,
} from "@/lib/service-icons";
import { SITE_IMAGES } from "@/lib/site-images";

export function HomePage() {
  const featuredServices = getHomeFeaturedServices();

  return (
    <>
      <section className="section-padding border-y border-border bg-muted/20">
        <div className="site-container space-y-4">
          <div className="border-l-4 border-primary pl-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-xl space-y-2">
                <h2 className="heading-tight text-2xl md:text-3xl">Serviços</h2>
                <p className="text-sm text-muted-foreground">
                  Amplo portfólio de soluções tecnológicas, analíticas, regulatórias e de
                  treinamento para os setores químico e farmacêutico.
                </p>
              </div>

              <div className="flex flex-wrap justify-start gap-3 sm:justify-end md:gap-4 lg:shrink-0">
                {HOME_SERVICE_CATEGORY_SHORTCUTS.map((category) => {
                  const Icon = SERVICE_CATEGORY_ICONS[category];
                  const label = SERVICE_CATEGORIES[category];

                  return (
                    <Link
                      key={category}
                      to="/servicos"
                      search={{ categoria: category }}
                      className="group flex w-20 flex-col items-center gap-2 text-center sm:w-24"
                      aria-label={label}
                    >
                      <span className="inline-flex size-11 items-center justify-center rounded-full bg-primary text-background transition-opacity group-hover:opacity-90">
                        <Icon className="size-5" />
                      </span>
                      <span className="line-clamp-3 text-xs font-medium leading-snug text-muted-foreground transition-colors group-hover:text-foreground">
                        {label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service) => (
              <ServiceCard
                key={service.slug}
                slug={service.slug}
                title={service.title}
                summary={service.summary}
              />
            ))}
          </div>

          <div className="flex justify-center pt-1">
            <Button asChild variant="outline">
              <Link to="/servicos">Ver todos os serviços</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding">
      <div className="site-container space-y-10">
        <div className="space-y-2 border-l-4 border-primary pl-4">
          <h2 className="heading-tight text-2xl md:text-3xl">Sobre a DRECHSLER</h2>
          <p className="max-w-3xl text-sm text-muted-foreground">
            {ABOUT.custom}
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div className="grid gap-4">
            {[
              { id: "01", title: "Missão", data: MISSION_VISION_VALUES.mission },
              { id: "02", title: "Visão", data: MISSION_VISION_VALUES.vision },
              { id: "03", title: "Valores", data: MISSION_VISION_VALUES.values },
            ].map((item) => (
              <div
                key={item.id}
                className="flex flex-col rounded-xl border border-border/50 bg-card p-6 shadow-sm transition-colors hover:border-primary/40"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="font-mono text-xs font-bold tracking-widest text-primary">
                    {item.id}
                  </span>
                  <div className="h-px flex-1 bg-border/50"></div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-foreground/70">
                    {item.title}
                  </h3>
                </div>
                <div className="flex-1">
                  {Array.isArray(item.data) ? (
                    <ul className="flex flex-wrap gap-2">
                      {item.data.map((value) => (
                        <li
                          key={value}
                          className="rounded-md border border-primary/20 bg-primary/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary"
                        >
                          {value}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.data}
                    </p>
                  )}
                </div>
              </div>
            ))}
            <Button asChild>
              <Link to="/sobre">Conheça nossa história</Link>
            </Button>
          </div>

          <div className="space-y-6">
            <SiteIllustration
              src={SITE_IMAGES.homemAnotacoes}
              alt="Pesquisador analisando estruturas químicas"
              aspect="wide"
            />

            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {ABOUT.intro}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

      <section className="section-padding border-t border-border bg-background">
        <div className="site-container mx-auto max-w-2xl space-y-3 text-center">
          <h2 className="heading-tight text-2xl md:text-3xl">Pronto para conversar?</h2>
          <p className="text-sm text-muted-foreground">
            Entre em contato e descubra como podemos apoiar seu projeto com soluções
            científicas customizadas e confidenciais.
          </p>
          <div className="flex flex-wrap justify-center gap-2 pt-1">
            <Button asChild size="lg" variant="outline">
              <Link to="/contato">Enviar mensagem</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a
                href={whatsappUrl("Olá! Gostaria de falar com a equipe DRECHSLER.")}
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
