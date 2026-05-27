import ampolasTabela from "@/assets/ampolas-tabela.png";
import anotacoesQuadro2 from "@/assets/anotacoes-quadro-2.png";
import anotacoesQuadro from "@/assets/anotacoes-quadro.png";
import bequerLiquidoVerde from "@/assets/bequer-liquido-verde.png";
import bequersComContagotas from "@/assets/bequers-com-contagotas.png";
import cano from "@/assets/cano.png";
import cristaisAzuis from "@/assets/cristais-azuis.png";
import fundoLandingPage1 from "@/assets/fundo-landing-page-1.png";
import fundoLandingPage2 from "@/assets/fundo-landing-page-2.png";
import fundoLandingPage3 from "@/assets/fundo-landing-page-3.png";
import homemAnotacoes from "@/assets/homem-anotacoes.png";
import ligacoesQuimicas2 from "@/assets/ligacoes-quimicas-2.png";
import liquidoDistribuido from "@/assets/liquido-distribuido.png";
import logoColorida from "@/assets/logo-colorida.png";
import logoModoEscuro from "@/assets/logo-modo-escuro.png";
import povPesquisador from "@/assets/pov-pesquisador.png";
import propriedadeIntelectual from "@/assets/proriedade-intelectual.png";
import segurandoTubo from "@/assets/segurando-tubo.png";

import type { Service } from "@/lib/site-content";

export const HOME_HERO_SLIDES = [
  fundoLandingPage1,
  fundoLandingPage2,
  fundoLandingPage3,
] as const;

export const SITE_IMAGES = {
  logoColor: logoColorida,
  logoDark: logoModoEscuro,
  homemAnotacoes,
  povPesquisador,
  fundoLandingPage: fundoLandingPage1,
} as const;

export const SERVICE_IMAGES: Record<Service["slug"], string> = {
  "revisao-rotas-quimicas": ligacoesQuimicas2,
  "degradacao-forcada": liquidoDistribuido,
  "sinteses-padroes": cristaisAzuis,
  "especificacoes-tecnicas": anotacoesQuadro,
  "desenvolvimento-produtos": bequerLiquidoVerde,
  "servicos-analiticos": bequersComContagotas,
  "revisao-literatura-cientifica": anotacoesQuadro2,
  "propriedade-intelectual": propriedadeIntelectual,
  "documentacao-anvisa": ampolasTabela,
  "cursos-treinamentos": segurandoTubo,
};

export const DIFFERENTIAL_IMAGES: Record<string, string> = {
  "Expertise científica": povPesquisador,
  "Atendimento customizado": homemAnotacoes,
  Confidencialidade: propriedadeIntelectual,
  "Rede de relacionamento": cano,
};

export function getServiceImage(slug: string): string | undefined {
  return SERVICE_IMAGES[slug as Service["slug"]];
}
