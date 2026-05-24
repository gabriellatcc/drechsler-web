import { ServiceCard } from "@/components/site/service-card";
import { SERVICE_CATEGORIES, SERVICES } from "@/lib/site-content";

export function ServicesPage() {
  const categories = Object.entries(SERVICE_CATEGORIES) as Array<
    [keyof typeof SERVICE_CATEGORIES, string]
  >;

  return (
    <>
      {categories.map(([categoryKey, categoryLabel]) => {
        const categoryServices = SERVICES.filter((service) => service.category === categoryKey);
        if (categoryServices.length === 0) return null;

        return (
          <section key={categoryKey} className="section-padding border-b border-border last:border-b-0">
            <div className="site-container space-y-6">
              <div className="grid items-center gap-4 border-b border-border pb-4 lg:grid-cols-[1.2fr_0.8fr]">
                <h2 className="heading-tight text-xl md:text-2xl">{categoryLabel}</h2>
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
