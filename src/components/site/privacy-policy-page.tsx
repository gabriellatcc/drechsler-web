import { CONTACT, SITE } from "@/lib/site-content";

const LAST_UPDATED = "27 de maio de 2026";

const SECTIONS = [
  {
    title: "1. Introdução",
    paragraphs: [
      `Esta Política de Privacidade descreve como a ${SITE.name} ("DRECHSLER", "nós") trata dados pessoais de visitantes e usuários do site ${SITE.domain}, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD).`,
      "Ao utilizar nosso site ou enviar informações pelo formulário de contato, você declara ter lido e compreendido esta política.",
    ],
  },
  {
    title: "2. Dados que coletamos",
    paragraphs: [
      "Podemos tratar os seguintes dados, conforme sua interação com o site:",
    ],
    list: [
      "Dados de identificação e contato enviados voluntariamente pelo formulário: nome, e-mail, telefone e mensagem.",
      "Dados técnicos de navegação, como páginas visitadas, tipo de navegador, dispositivo e horário de acesso, de forma agregada ou anonimizada.",
      "Preferência de tema (claro/escuro), armazenada localmente no seu navegador.",
    ],
  },
  {
    title: "3. Finalidade e base legal",
    paragraphs: [
      "Utilizamos os dados para responder solicitações de contato, prestar informações sobre nossos serviços, melhorar a experiência no site e analisar o uso do site de forma agregada.",
      "As bases legais incluem a execução de medidas pré-contratuais a seu pedido, o legítimo interesse em operar e aprimorar o site e, quando aplicável, o consentimento.",
    ],
  },
  {
    title: "4. Cookies e tecnologias similares",
    paragraphs: [
      "Utilizamos armazenamento local do navegador (localStorage) para salvar sua preferência de tema. Essa informação permanece no seu dispositivo e não é compartilhada conosco.",
      "Utilizamos Vercel Analytics para métricas agregadas de acesso ao site, sem identificação pessoal direta do visitante.",
      "Não utilizamos cookies de marketing ou publicidade de terceiros neste site.",
    ],
  },
  {
    title: "5. Compartilhamento de dados",
    paragraphs: [
      "Não vendemos dados pessoais. Podemos compartilhar informações apenas com prestadores de serviço necessários à operação do site (por exemplo, hospedagem e analytics), sempre com medidas de proteção adequadas e na medida do necessário.",
    ],
  },
  {
    title: "6. Retenção",
    paragraphs: [
      "Mantemos os dados de contato pelo tempo necessário para responder à sua solicitação e cumprir obrigações legais ou regulatórias. Dados analíticos agregados podem ser mantidos por períodos compatíveis com a finalidade estatística.",
    ],
  },
  {
    title: "7. Seus direitos",
    paragraphs: [
      "Nos termos da LGPD, você pode solicitar confirmação de tratamento, acesso, correção, anonimização, eliminação, portabilidade, informação sobre compartilhamentos e revogação de consentimento, quando aplicável.",
      `Para exercer seus direitos, entre em contato pelo e-mail ${CONTACT.emails[0]}.`,
    ],
  },
  {
    title: "8. Segurança",
    paragraphs: [
      "Adotamos medidas técnicas e organizacionais razoáveis para proteger os dados pessoais contra acessos não autorizados, perda ou alteração indevida.",
    ],
  },
  {
    title: "9. Alterações",
    paragraphs: [
      "Esta política pode ser atualizada periodicamente. A data da última revisão será indicada no topo desta página.",
    ],
  },
] as const;

export function PrivacyPolicyPage() {
  return (
    <section className="section-padding bg-background">
      <div className="site-container max-w-3xl space-y-8">
        <header className="space-y-2">
          <h1 className="heading-tight text-2xl md:text-3xl">Política de Privacidade</h1>
          <p className="text-sm text-muted-foreground">Última atualização: {LAST_UPDATED}</p>
        </header>

        <div className="space-y-8">
          {SECTIONS.map((section) => (
            <article key={section.title} className="space-y-3">
              <h2 className="heading-tight text-lg">{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
              {"list" in section && section.list ? (
                <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
