import { ServiceCard } from "@/components/site/service-card";
import { SiteIllustration } from "@/components/site/site-illustration";
import { SERVICE_CATEGORIES, SERVICES } from "@/lib/site-content";
import { CATEGORY_IMAGES, SITE_IMAGES } from "@/lib/site-images";

export function ServicesPage() {
  const categories = Object.entries(SERVICE_CATEGORIES) as Array<
    [keyof typeof SERVICE_CATEGORIES, string]
  >;

  return (
    <>
      <section className="section-padding border-b border-border bg-muted/20">
        <div className="site-container grid items-center gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-3">
            <p className="label-technical text-primary">Serviços</p>
            <h1 className="heading-tight text-3xl md:text-4xl">Nossos serviços</h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Soluções tecnológicas, analíticas, regulatórias e de treinamento para atender
              clientes nos setores químico, farmacêutico e regulatório.
            </p>
          </div>
          <SiteIllustration
            src={SITE_IMAGES.fundoAzul}
            alt="Ilustração científica com estruturas moleculares"
            aspect="wide"
          />
        </div>
      </section>

      {categories.map(([categoryKey, categoryLabel]) => {
        const categoryServices = SERVICES.filter((service) => service.category === categoryKey);
        if (categoryServices.length === 0) return null;

        return (
          <section key={categoryKey} className="section-padding border-b border-border last:border-b-0">
            <div className="site-container space-y-6">
              <div className="grid items-center gap-4 border-b border-border pb-4 lg:grid-cols-[1.2fr_0.8fr]">
                <h2 className="heading-tight text-xl md:text-2xl">{categoryLabel}</h2>
                <SiteIllustration
                  src={CATEGORY_IMAGES[categoryKey]}
                  alt={categoryLabel}
                  aspect="video"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {categoryServices.map((service) => (
                  <ServiceCard
                    key={service.slug}
                    slug={service.slug}
                    title={service.title}
                    summary={service.summary}
                    linkLabel="Ver detalhes"
                  />
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
