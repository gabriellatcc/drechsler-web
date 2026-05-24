import { ABOUT, getServiceBySlug, SERVICE_CATEGORIES, SITE } from "@/lib/site-content";

export type PageSegmentKey =
  | "home"
  | "sobre"
  | "servicos"
  | "contato"
  | "service-detail"
  | "service-not-found";

export type PageContentEntry = {
  label?: string;
  title: string;
  description: string;
};

export const PAGE_CONTENT: Record<
  Exclude<PageSegmentKey, "service-detail">,
  PageContentEntry
> = {
  home: {
    label: SITE.shortName,
    title: SITE.tagline,
    description: ABOUT.intro,
  },
  sobre: {
    label: "Sobre",
    title: SITE.name,
    description: ABOUT.intro,
  },
  servicos: {
    label: "Serviços",
    title: "Nossos serviços",
    description:
      "Soluções tecnológicas, analíticas, regulatórias e de treinamento para atender clientes nos setores químico, farmacêutico e regulatório.",
  },
  contato: {
    label: "Contato",
    title: "Fale conosco",
    description:
      "Envie sua mensagem ou fale diretamente pelo WhatsApp. Retornaremos o contato o mais breve possível.",
  },
  "service-not-found": {
    title: "Serviço não encontrado",
    description: "O serviço solicitado não existe ou foi removido.",
  },
};

export type ResolvedPageContent = PageContentEntry & {
  segment: PageSegmentKey;
  animationKey: string;
};

export function resolvePageSegment(pathname: string, slug?: string): ResolvedPageContent {
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";

  if (normalizedPath === "/") {
    return {
      segment: "home",
      animationKey: "home",
      ...PAGE_CONTENT.home,
    };
  }

  if (normalizedPath === "/sobre") {
    return {
      segment: "sobre",
      animationKey: "sobre",
      ...PAGE_CONTENT.sobre,
    };
  }

  if (normalizedPath === "/servicos") {
    return {
      segment: "servicos",
      animationKey: "servicos",
      ...PAGE_CONTENT.servicos,
    };
  }

  if (normalizedPath === "/contato") {
    return {
      segment: "contato",
      animationKey: "contato",
      ...PAGE_CONTENT.contato,
    };
  }

  if (normalizedPath.startsWith("/servicos/") && slug) {
    const service = getServiceBySlug(slug);

    if (!service) {
      return {
        segment: "service-not-found",
        animationKey: "service-not-found",
        ...PAGE_CONTENT["service-not-found"],
      };
    }

    return {
      segment: "service-detail",
      animationKey: `service-detail:${slug}`,
      label: SERVICE_CATEGORIES[service.category],
      title: service.title,
      description: service.summary,
    };
  }

  return {
    segment: "home",
    animationKey: "home",
    ...PAGE_CONTENT.home,
  };
}
