import { CheckCircle2 } from "lucide-react";

import { SiteIllustration } from "@/components/site/site-illustration";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ABOUT,
  CREDENTIALS,
  DIFFERENTIALS,
  MISSION_VISION_VALUES,
} from "@/lib/site-content";
import { DIFFERENTIAL_IMAGES } from "@/lib/site-images";

export function AboutPage() {
  return (
    <>
      <section className="section-padding">
        <div className="site-container grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-3">
            <h2 className="heading-tight text-xl md:text-2xl">Quem somos</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">{ABOUT.team}</p>
            <p className="text-sm leading-relaxed text-muted-foreground">{ABOUT.custom}</p>
            <p className="text-sm leading-relaxed text-muted-foreground">{ABOUT.confidentiality}</p>
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
                <ul className="grid gap-2 sm:grid-cols-2">
                  {MISSION_VISION_VALUES.values.map((value) => (
                    <li key={value} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="size-3.5 shrink-0 text-primary" />
                      {value}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="section-padding border-y border-border bg-muted/20">
        <div className="site-container space-y-6">
          <div className="space-y-2 border-b border-border pb-4">
            <h2 className="heading-tight text-xl md:text-2xl">Diferenciais</h2>
            <p className="text-sm text-muted-foreground">
              O que nos permite entregar resultados com segurança e qualidade.
            </p>
          </div>

          <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
            {DIFFERENTIALS.map((item) => (
              <Card key={item.title} className="gap-2 overflow-hidden">
                <SiteIllustration
                  src={DIFFERENTIAL_IMAGES[item.title]}
                  alt={item.title}
                  aspect="video"
                  className="rounded-none border-0 border-b shadow-none mx-4"
                />
                <CardHeader className="border-0 pb-0">
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="site-container grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div className="space-y-4">
            <h2 className="heading-tight text-xl md:text-2xl">Credenciais e atuação regulatória</h2>
            <ul className="space-y-2">
              {CREDENTIALS.map((credential) => (
                <li key={credential} className="flex gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" />
                  <span>{credential}</span>
                </li>
              ))}
            </ul>
          </div>
  
        </div>
      </section>
    </>
  );
}
