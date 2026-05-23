import { createFileRoute } from "@tanstack/react-router";

import {
  getServiceBySlug,
  ServiceDetailPage,
  ServiceNotFoundPage,
} from "@/components/site/service-detail-page";
import { SITE } from "@/lib/site-content";

export const Route = createFileRoute("/servicos/$slug")({
  component: ServiceDetailRoute,
  head: ({ params }) => {
    const service = getServiceBySlug(params.slug);
    return {
      meta: [
        {
          title: service
            ? `${service.title} — ${SITE.shortName}`
            : `Serviço — ${SITE.shortName}`,
        },
      ],
    };
  },
});

function ServiceDetailRoute() {
  const { slug } = Route.useParams();
  const service = getServiceBySlug(slug);

  if (!service) {
    return <ServiceNotFoundPage />;
  }

  return <ServiceDetailPage service={service} />;
}
