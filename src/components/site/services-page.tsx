import { getRouteApi } from "@tanstack/react-router";

import { ServiceCard } from "@/components/site/service-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  isServiceCategory,
  SERVICE_CATEGORIES,
  SERVICE_CATEGORY_KEYS,
  SERVICES,
} from "@/lib/site-content";

const servicosRoute = getRouteApi("/servicos/");

export function ServicesPage() {
  const { categoria } = servicosRoute.useSearch();
  const navigate = servicosRoute.useNavigate();

  const categories = SERVICE_CATEGORY_KEYS.filter((categoryKey) =>
    SERVICES.some((service) => service.category === categoryKey),
  );

  const activeCategory =
    categoria && isServiceCategory(categoria) && categories.includes(categoria)
      ? categoria
      : categories[0];

  const handleCategoryChange = (value: string) => {
    if (!isServiceCategory(value)) return;

    void navigate({
      search: { categoria: value },
      replace: true,
    });
  };

  return (
    <section className="section-padding">
      <div className="site-container">
        <Tabs value={activeCategory} onValueChange={handleCategoryChange} className="gap-6">
          <TabsList className="inline-flex h-auto w-full max-w-full flex-nowrap items-center justify-start gap-2 overflow-x-auto rounded-none border-b border-border bg-transparent p-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((categoryKey) => (
              <TabsTrigger
                key={categoryKey}
                value={categoryKey}
                className="label-technical relative h-auto shrink-0 grow-0 basis-auto rounded-sm border-0 bg-transparent px-3 py-2.5 font-medium text-muted-foreground shadow-none after:hidden hover:bg-muted/70 hover:text-foreground data-[state=active]:bg-accent data-[state=active]:font-semibold data-[state=active]:text-card-foreground data-[state=active]:shadow-sm"
              >
                {SERVICE_CATEGORIES[categoryKey]}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((categoryKey) => {
            const categoryServices = SERVICES.filter(
              (service) => service.category === categoryKey,
            );

            return (
              <TabsContent key={categoryKey} value={categoryKey} className="mt-0">
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
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
}
