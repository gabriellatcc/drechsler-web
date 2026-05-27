import { ABOUT, getServiceBySlug, SERVICE_CATEGORIES, SITE } from "@/lib/site-content";

export type PageSegmentKey =
  | "home"
  | "sobre"
  | "servicos"
  | "blog"
  | "blog-post-detail"
  | "blog-post-not-found"
  | "contato"
  | "service-detail"
  | "service-not-found"
  | "not-found";

export type PageContentEntry = {
  label?: string;
  title: string;
  description: string;
};

export const PAGE_CONTENT: Record<
  Exclude<PageSegmentKey, "service-detail" | "blog-post-detail">,
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
  blog: {
    label: "Blog",
    title: "Publicações científicas",
    description:
      "Artigos, notas técnicas e conteúdos elaborados pela equipe DRECHSLER sobre química, regulatório e inovação.",
  },
  "blog-post-not-found": {
    title: "Publicação não encontrada",
    description: "A publicação solicitada não existe ou não está mais disponível.",
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
  "not-found": {
    label: "404",
    title: "Página não encontrada",
    description:
      "O endereço que você acessou não existe ou não está mais disponível. Verifique o link ou volte ao início.",
  },
};

export type ResolvedPageContent = PageContentEntry & {
  segment: PageSegmentKey;
  animationKey: string;
};

const NAV_HEADER_SEGMENTS: PageSegmentKey[] = [
  "home",
  "sobre",
  "servicos",
  "blog",
  "contato",
];

export function usesNavPageHeader(segment: PageSegmentKey): boolean {
  return NAV_HEADER_SEGMENTS.includes(segment);
}

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

  if (normalizedPath === "/blog") {
    return {
      segment: "blog",
      animationKey: "blog",
      ...PAGE_CONTENT.blog,
    };
  }

  if (normalizedPath.startsWith("/blog/") && slug) {
    return {
      segment: "blog-post-detail",
      animationKey: `blog-post-detail:${slug}`,
      label: "Publicação",
      title: slug,
      description: "Conteúdo técnico e científico publicado pela DRECHSLER.",
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
    segment: "not-found",
    animationKey: "not-found",
    ...PAGE_CONTENT["not-found"],
  };
}
