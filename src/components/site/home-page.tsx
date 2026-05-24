import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";

import { ServiceCard } from "@/components/site/service-card";
import { SiteIllustration } from "@/components/site/site-illustration";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ABOUT,
  MISSION_VISION_VALUES,
  SERVICES,
  SITE,
  whatsappUrl,
} from "@/lib/site-content";
import { SITE_IMAGES } from "@/lib/site-images";

export function HomePage() {
  const featuredServices = SERVICES.slice(0, 6);

  return (
    <>
      <section className="hero-gradient section-padding">
        <div className="site-container grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <p className="label-technical text-primary">{SITE.shortName}</p>
            <h1 className="heading-tight text-3xl md:text-4xl lg:text-5xl">
              Inteligência científica para a indústria química e farmacêutica
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">{ABOUT.intro}</p>
            <div className="flex flex-wrap gap-2 pt-1">
              <Button asChild size="lg">
                <Link to="/servicos">
                  Conheça nossos serviços
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={whatsappUrl("Olá! Gostaria de saber mais sobre os serviços da DRECHSLER.")} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="size-4" />
                  Fale no WhatsApp
                </a>
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <SiteIllustration
              src={SITE_IMAGES.hero}
              alt="Ilustração representando camadas de soluções científicas"
              aspect="square"
              className="border-primary/30 bg-card"
              imageClassName="object-contain bg-black p-4"
            />
            <Card className="border-primary/30 bg-card">
              <CardHeader>
                <CardTitle>O que realizamos</CardTitle>
                <CardDescription>Expertise, qualidade e segurança em cada projeto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                <p>{ABOUT.team}</p>
                <p>{ABOUT.custom}</p>
                <p>{ABOUT.confidentiality}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="section-padding border-y bg-muted/20">
        <div className="site-container space-y-6">
          <div className="max-w-2xl space-y-2 border-l-4 border-zinc-900 pl-4">
            <h2 className="heading-tight text-2xl md:text-3xl">Serviços</h2>
            <p className="text-sm text-muted-foreground">
              Amplo portfólio de soluções tecnológicas, analíticas, regulatórias e de
              treinamento para os setores químico e farmacêutico.
            </p>
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

          <div className="border-t border-border pt-4">
            <Button asChild variant="outline">
              <Link to="/servicos">Ver todos os serviços</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="site-container grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <SiteIllustration
              src={SITE_IMAGES.homemAnotacoes}
              alt="Pesquisador analisando estruturas químicas"
              aspect="wide"
            />
            <div className="space-y-3">
              <h2 className="heading-tight text-2xl md:text-3xl">Sobre a DRECHSLER</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{ABOUT.intro}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{ABOUT.custom}</p>
              <Button asChild>
                <Link to="/sobre">Conheça nossa história</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Missão</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-relaxed text-muted-foreground">
                {MISSION_VISION_VALUES.mission}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Visão</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-relaxed text-muted-foreground">
                {MISSION_VISION_VALUES.vision}
              </CardContent>
            </Card>
            <Card className="sm:col-span-2">
              <CardHeader>
                <CardTitle>Valores</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-wrap gap-2">
                  {MISSION_VISION_VALUES.values.map((value) => (
                    <li
                      key={value}
                      className="border border-border bg-secondary px-2 py-0.5 text-xs font-medium uppercase tracking-wider text-secondary-foreground"
                    >
                      {value}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="section-padding border-t bg-primary text-primary-foreground">
        <div className="site-container grid items-center gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="max-w-2xl space-y-3">
            <h2 className="heading-tight text-2xl md:text-3xl">Pronto para conversar?</h2>
            <p className="text-sm text-primary-foreground/90">
              Entre em contato e descubra como podemos apoiar seu projeto com soluções
              científicas customizadas e confidenciais.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <Button asChild size="lg" variant="secondary">
                <Link to="/contato">Enviar mensagem</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <a href={whatsappUrl("Olá! Gostaria de falar com a equipe DRECHSLER.")} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="size-4" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
          <SiteIllustration
            src={SITE_IMAGES.imagemFluidos}
            alt="Fluidos e reações químicas em laboratório"
            aspect="wide"
            className="border-primary-foreground/30"
          />
        </div>
      </section>
    </>
  );
}
