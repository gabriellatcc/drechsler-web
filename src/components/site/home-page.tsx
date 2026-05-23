import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";

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
import { SERVICE_IMAGES, SITE_IMAGES } from "@/lib/site-images";

export function HomePage() {
  const featuredServices = SERVICES.slice(0, 6);

  return (
    <>
      <section className="hero-gradient section-padding">
        <div className="site-container grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <p className="text-sm font-medium uppercase tracking-wider text-primary">
              {SITE.shortName}
            </p>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Inteligência científica para a indústria química e farmacêutica
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">{ABOUT.intro}</p>
            <div className="flex flex-wrap gap-3">
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

          <div className="space-y-6">
            <SiteIllustration
              src={SITE_IMAGES.hero}
              alt="Ilustração representando camadas de soluções científicas"
              aspect="square"
              className="border-primary/20 bg-card/80 shadow-lg backdrop-blur"
              imageClassName="object-contain bg-black p-6"
            />
            <Card className="border-primary/20 bg-card/80 shadow-lg backdrop-blur">
              <CardHeader>
                <CardTitle>O que realizamos</CardTitle>
                <CardDescription>Expertise, qualidade e segurança em cada projeto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p>{ABOUT.team}</p>
                <p>{ABOUT.custom}</p>
                <p>{ABOUT.confidentiality}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/30">
        <div className="site-container space-y-10">
          <div className="max-w-2xl space-y-3">
            <h2 className="text-3xl font-bold tracking-tight">Serviços</h2>
            <p className="text-muted-foreground">
              Amplo portfólio de soluções tecnológicas, analíticas, regulatórias e de
              treinamento para os setores químico e farmacêutico.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service) => (
              <Card key={service.slug} className="flex flex-col overflow-hidden">
                <SiteIllustration
                  src={SERVICE_IMAGES[service.slug]}
                  alt={service.title}
                  aspect="video"
                  className="rounded-none border-0 border-b shadow-none"
                />
                <CardHeader>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <CardDescription>{service.summary}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <Button asChild variant="link" className="h-auto p-0">
                    <Link to="/servicos/$slug" params={{ slug: service.slug }}>
                      Saiba mais
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div>
            <Button asChild variant="outline">
              <Link to="/servicos">Ver todos os serviços</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="site-container grid gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <SiteIllustration
              src={SITE_IMAGES.homemAnotacoes}
              alt="Pesquisador analisando estruturas químicas"
              aspect="wide"
            />
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">Sobre a DRECHSLER</h2>
              <p className="text-muted-foreground">{ABOUT.intro}</p>
              <p className="text-muted-foreground">{ABOUT.custom}</p>
              <Button asChild>
                <Link to="/sobre">Conheça nossa história</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Missão</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {MISSION_VISION_VALUES.mission}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Visão</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {MISSION_VISION_VALUES.vision}
              </CardContent>
            </Card>
            <Card className="sm:col-span-2">
              <CardHeader>
                <CardTitle className="text-base">Valores</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-wrap gap-2">
                  {MISSION_VISION_VALUES.values.map((value) => (
                    <li
                      key={value}
                      className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground"
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

      <section className="section-padding bg-primary text-primary-foreground">
        <div className="site-container grid items-center gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Pronto para conversar?</h2>
            <p className="text-primary-foreground/90">
              Entre em contato e descubra como podemos apoiar seu projeto com soluções
              científicas customizadas e confidenciais.
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
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
            className="border-primary-foreground/20"
          />
        </div>
      </section>
    </>
  );
}
