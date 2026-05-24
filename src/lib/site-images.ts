import ampolaLigacoes from "@/assets/ampola-ligacoes.png";
import ampolasTabela from "@/assets/ampolas-tabela.png";
import anotacoesQuadro2 from "@/assets/anotacoes-quadro-2.png";
import anotacoesQuadro from "@/assets/anotacoes-quadro.png";
import bequerCalculos from "@/assets/bequer-calculos.png";
import bequerLiquidoVerde from "@/assets/bequer-liquido-verde.png";
import bequersComContagotas from "@/assets/bequers-com-contagotas.png";
import cano from "@/assets/cano.png";
import cristaisAzuis from "@/assets/cristais-azuis.png";
import fundoAzul from "@/assets/fundoazul.png";
import fundoLandingPage from "@/assets/fundo-landing-page.png";
import hero from "@/assets/hero.png";
import homemAnotacoes from "@/assets/homem-anotacoes.png";
import imagemFluidos from "@/assets/imagem-fluidos.png";
import ligacoesQuimicas2 from "@/assets/ligacoes-quimicas-2.png";
import liquidoDistribuido from "@/assets/liquido-distribuido.png";
import logoColorida from "@/assets/logo-colorida.png";
import logoPretoBranco from "@/assets/logo-preto-branco.png";
import particulas from "@/assets/particulas.png";
import povPesquisador from "@/assets/pov-pesquisador.png";
import propriedadeIntelectual from "@/assets/proriedade-intelectual.png";
import resolveProblemas from "@/assets/resolve-problemas.png";
import segurandoTubo from "@/assets/segurando-tubo.png";

import type { Service } from "@/lib/site-content";

export const SITE_IMAGES = {
  logoColor: logoColorida,
  logoMono: logoPretoBranco,
  hero,
  homemAnotacoes,
  povPesquisador,
  resolveProblemas,
  fundoAzul,
  fundoLandingPage,
  particulas,
  imagemFluidos,
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
