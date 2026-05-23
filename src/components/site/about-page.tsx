import { CheckCircle2 } from "lucide-react";

import { SiteIllustration } from "@/components/site/site-illustration";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ABOUT,
  CREDENTIALS,
  DIFFERENTIALS,
  MISSION_VISION_VALUES,
  SITE,
} from "@/lib/site-content";
import { DIFFERENTIAL_IMAGES, SITE_IMAGES } from "@/lib/site-images";

export function AboutPage() {
  return (
    <>
      <section className="section-padding border-b bg-muted/20">
        <div className="site-container grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="max-w-3xl space-y-4">
            <p className="text-sm font-medium uppercase tracking-wider text-primary">Sobre</p>
            <h1 className="text-4xl font-bold tracking-tight">{SITE.name}</h1>
            <p className="text-lg text-muted-foreground">{ABOUT.intro}</p>
          </div>
          <SiteIllustration
            src={SITE_IMAGES.povPesquisador}
            alt="Laboratório com estruturas químicas e equipamentos de pesquisa"
            aspect="wide"
          />
        </div>
      </section>

      <section className="section-padding">
        <div className="site-container grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Quem somos</h2>
            <p className="text-muted-foreground">{ABOUT.team}</p>
            <p className="text-muted-foreground">{ABOUT.custom}</p>
            <p className="text-muted-foreground">{ABOUT.confidentiality}</p>
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
                <ul className="grid gap-2 sm:grid-cols-2">
                  {MISSION_VISION_VALUES.values.map((value) => (
                    <li key={value} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="size-4 shrink-0 text-primary" />
                      {value}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/30">
        <div className="site-container space-y-8">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-2xl font-bold">Diferenciais</h2>
            <p className="text-muted-foreground">
              O que nos permite entregar resultados com segurança e qualidade.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {DIFFERENTIALS.map((item) => (
              <Card key={item.title} className="overflow-hidden">
                <SiteIllustration
                  src={DIFFERENTIAL_IMAGES[item.title]}
                  alt={item.title}
                  aspect="video"
                  className="rounded-none border-0 border-b shadow-none"
                />
                <CardHeader>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  {item.description}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="site-container grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="max-w-3xl space-y-6">
            <h2 className="text-2xl font-bold">Credenciais e atuação regulatória</h2>
            <ul className="space-y-3">
              {CREDENTIALS.map((credential) => (
                <li key={credential} className="flex gap-3 text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                  <span>{credential}</span>
                </li>
              ))}
            </ul>
          </div>
          <SiteIllustration
            src={SITE_IMAGES.particulas}
            alt="Partículas em escala microscópica"
            aspect="square"
          />
        </div>
      </section>
    </>
  );
}
