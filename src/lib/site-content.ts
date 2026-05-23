export const SITE = {
  name: "DRECHSLER Inovação & Tecnologia Química",
  shortName: "DRECHSLER",
  domain: "drechsler.com.br",
  tagline: "Inteligência científica para a indústria química e farmacêutica",
} as const;

export const CONTACT = {
  emails: ["contato@drechsler.net.br", "lj@drechsler.net.br"],
  whatsapp: "12991076376",
  linkedin: "https://www.linkedin.com/company/drechsler-inovação-tecnologia-química",
} as const;

export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/55${CONTACT.whatsapp}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export const ABOUT = {
  intro:
    "A DRECHSLER Inovação & Tecnologia Química é uma empresa de inteligência científica que conta com um amplo portfólio de serviços e soluções para atender seus clientes com expertise, alta qualidade e com segurança.",
  team:
    "Contando com equipe técnica com alta qualificação e grande rede de relacionamento, está preparada para propor soluções para diversos setores químico, farmacêutico, veterinário, especialidades químicas, setor regulatório, inovação e propriedade intelectual.",
  custom:
    "Desenvolvemos atendimentos customizados visando entregar resultados aos nossos clientes, proporcionando segurança ao cliente.",
  confidentiality:
    "Nossos serviços possuem contratos de confidencialidade resguardando informações tecnológicas e a propriedade intelectual ou industrial dos nossos clientes.",
} as const;

export const MISSION_VISION_VALUES = {
  mission:
    "Oferecer soluções inteligentes e eficientes, garantindo segurança, qualidade, valor e gerando bem-estar aos clientes.",
  vision:
    "Crescer com sustentabilidade sendo reconhecida pelos seus produtos e serviços de alta tecnologia.",
  values: ["Confiança", "Respeito", "Qualidade", "Competência"],
} as const;

export const DIFFERENTIALS = [
  {
    title: "Expertise científica",
    description:
      "Equipe técnica altamente qualificada com ampla experiência em química, farmácia e regulatório.",
  },
  {
    title: "Atendimento customizado",
    description:
      "Soluções sob medida para cada cliente, com foco em resultados e segurança.",
  },
  {
    title: "Confidencialidade",
    description:
      "Contratos de confidencialidade que resguardam informações tecnológicas e propriedade intelectual.",
  },
  {
    title: "Rede de relacionamento",
    description:
      "Grande rede de contatos nos setores químico, farmacêutico, veterinário e regulatório.",
  },
] as const;

export const CREDENTIALS = [
  "Atuação conforme RDC 964/2025, RDC 318/2019, RDC 166/2017, RDC 359/2020, RDC 654/2022 e RDC 34",
  "Experiência em documentação técnica para ANVISA e órgãos reguladores",
  "Suporte em propriedade intelectual e pareceres técnicos",
  "Serviços analíticos e de caracterização estrutural",
] as const;

export type Service = {
  slug: string;
  title: string;
  summary: string;
  category: "tecnologicos" | "analiticos" | "regulatorios" | "treinamentos";
  items: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "revisao-rotas-quimicas",
    title: "Revisão de rotas químicas",
    summary:
      "Proposição, revisão e melhoria de rotas sintéticas para especialidades químicas, IFAs e excipientes.",
    category: "tecnologicos",
    items: [
      "Proposição e desenvolvimento de rotas químicas sintéticas para a obtenção de substâncias químicas, sejam elas, especialidades químicas, insumos farmacêuticos ativos, excipientes, entre outras.",
      "Revisão de rotas sintéticas existentes.",
      "Melhoria de processos químicos produtivos visando atualização da tecnologia empregada buscando aumento do rendimento e pureza, evitando formação de impurezas indesejáveis.",
      "Desenvolvimento de forma de purificação de substâncias por métodos físicos ou químicos, tais como destilação, precipitação, extração e cristalização.",
      "Estudo especializado para redução de custos na produção de um processo químico.",
    ],
  },
  {
    slug: "degradacao-forcada",
    title: "Degradação forçada de substâncias e impurezas",
    summary:
      "Estudos de degradação forçada conforme RDC 964/2025 e RDC 318/2019, com predição e caracterização de impurezas.",
    category: "tecnologicos",
    items: [
      "Estudo e avaliação técnica dos potenciais vias de degradação de fármaco, baseada na RDC964/2025 (degradação forçada) e RDC 318/2019 (Estabilidade), realizando a predição de formação de impurezas conhecidas ou desconhecidas através dos estudos de degradação ou através de reatividade e mecanismos reacionais, justificando a formação das mesmas.",
      "Realizamos experimentos de degradação forçada.",
      "Auxiliamos o cliente quanto a justificativa técnica científica para apresentação aos órgãos reguladores.",
      "Realizamos síntese, isolamento e caracterização de impurezas sob demanda.",
    ],
  },
  {
    slug: "sinteses-padroes",
    title: "Sínteses de Padrões",
    summary:
      "Caracterização e elucidação estrutural com emissão de relatórios e certificados SQR conforme RDC 166/2017.",
    category: "tecnologicos",
    items: [
      "Efetuamos a caracterização e elucidação estrutural de substâncias com emissão de relatórios técnicos e certificados que a atestam como Substância Química Caracterizada (SQR) conforme regulamentação RDC166/2017.",
    ],
  },
  {
    slug: "especificacoes-tecnicas",
    title: "Especificações Técnicas",
    summary:
      "Revisão e elaboração de especificações técnicas alinhadas às necessidades do cliente e à regulamentação.",
    category: "tecnologicos",
    items: [
      "Revisão e Elaboração de Especificações Técnicas conforme necessidade do cliente, auxiliando o cliente em deficiências comumente encontradas como: faixas muito amplas, ausência de métodos analíticos não validados, perfil granulométrico inconsistente para sólidos, ausência de controle de solventes residuais e validade — falta de correlação com estabilidade do produto.",
    ],
  },
  {
    slug: "desenvolvimento-produtos",
    title: "Desenvolvimento de Produtos",
    summary:
      "Revisão e desenvolvimento de formulações, novas formas farmacêuticas e produtos inovadores.",
    category: "tecnologicos",
    items: [
      "Revisamos formulações existentes.",
      "Desenvolvemos formulações de produtos com novas formas farmacêuticas.",
      "Estudo visando melhoramento o shelf-life do produto ou contornar alguma deficiência na formulação.",
      "Desenvolvimento de novos produtos ou fórmulas inovadoras.",
    ],
  },
  {
    slug: "servicos-analiticos",
    title: "Serviços analíticos",
    summary:
      "Análises instrumentais e caracterização físico-química para suporte à qualidade e desenvolvimento.",
    category: "analiticos",
    items: [
      "Cromatografia líquida e gasosa.",
      "Espectrometria de massas acoplada a cromatografia gasosa ou líquida de alto desempenho.",
      "Determinação de umidade.",
      "Espectrometria no ultravioleta ou infravermelho.",
      "Análise de DSC e TGA.",
      "Distribuição por tamanho de partículas.",
      "Análise elementar.",
      "Ressonância magnética nuclear de 1H e 13C.",
    ],
  },
  {
    slug: "revisao-literatura-cientifica",
    title: "Revisão da Literatura Científica",
    summary:
      "Mapeamento tecnológico e dossiês do estado da técnica a partir de periódicos e patentes.",
    category: "regulatorios",
    items: [
      "Visando o resgate de informações científicas e mapeamento tecnológico, tanto publicadas em periódicos como em patentes, realizamos a busca de dados em plataformas internacionais especializadas, fazendo o refinamento da pesquisa, e compilamos relatórios na forma de Dossiê do estado da técnica.",
    ],
  },
  {
    slug: "propriedade-intelectual",
    title: "Propriedade Intelectual e Parecer Técnico",
    summary:
      "Apoio técnico em patentes, estado da técnica e pareceres especializados.",
    category: "regulatorios",
    items: [
      "Atuamos como apoio técnico para discussão do estado da técnica.",
      "Auxiliamos no descritivo técnico na elaboração de patentes.",
      "Revisamos criticamente relatórios e dossiê.",
      "Colaboramos para montagem estratégica de caminhos para evitar infração de patentes.",
      "Elaboramos pareceres técnicos.",
    ],
  },
  {
    slug: "documentacao-anvisa",
    title: "Documentação técnica — ANVISA",
    summary:
      "Compilação e avaliação de DMF e documentação regulatória para insumos farmacêuticos.",
    category: "regulatorios",
    items: [
      "Compilamos e/ou Avaliamos Drug Master File (Dossiê de Insumo Farmacêutico Ativo) conforme RDC 359/2020 ou afins.",
      "Elaboramos Justificativa técnica para a escolha do material de partida.",
      "Descrevemos rota sintética conforme requerido pela legislação.",
      "Emitimos relatório de discussão técnica sobre processos de fabricação, caracterização estrutural, impurezas, métodos analíticos, embalagem, degradação e estabilidade.",
    ],
  },
  {
    slug: "cursos-treinamentos",
    title: "Cursos e Treinamentos",
    summary:
      "Cursos virtuais ou in company em química orgânica, BPF, DMF e temas sob demanda.",
    category: "treinamentos",
    items: [
      "Curso de Química Orgânica.",
      "Curso sobre reatividade química e mecanismos de reações orgânicas.",
      "Síntese de Insumos Farmacêuticos.",
      "Treinamentos de Elaboração do Dossiê do Insumo Farmacêutico Ativo.",
      "Treinamento de Boas Práticas de Fabricação para Indústrias Farmoquímicas conforme RDC 654/2022.",
      "Treinamento de Boas Práticas de Fabricação de Excipientes conforme RDC 34.",
      "Boas Práticas de Laboratório.",
      "Curso de Estudos de degradação forçada de substâncias.",
      "Cursos especiais na área de química sob demanda.",
    ],
  },
];

export const SERVICE_CATEGORIES: Record<Service["category"], string> = {
  tecnologicos: "Serviços Tecnológicos",
  analiticos: "Serviços Analíticos",
  regulatorios: "Regulatório e Propriedade Intelectual",
  treinamentos: "Cursos e Treinamentos",
};

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}

export const NAV_ITEMS = [
  { label: "Início", to: "/" as const },
  { label: "Sobre", to: "/sobre" as const },
  { label: "Serviços", to: "/servicos" as const },
  { label: "Contato", to: "/contato" as const },
] as const;
