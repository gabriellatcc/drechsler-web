import { Link } from "@tanstack/react-router";
import { Mail, Phone } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import { CONTACT, NAV_ITEMS, SITE } from "@/lib/site-content";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/20">
    <div className="site-container py-4">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-6">
        <div>
          <p className="label-technical mb-2 text-foreground">Sobre</p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {SITE.name}
          </p>
          <p className="text-xs leading-relaxed text-muted-foreground">
            {SITE.tagline}
          </p>
        </div>
        <div>
          <p className="label-technical mb-2 text-foreground">Navegação</p>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label-technical mb-2 text-foreground">Contato</p>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            {CONTACT.emails.map((email) => (
              <li key={email}>
                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center gap-2 hover:text-foreground"
                >
                  <Mail className="size-3.5" />
                  {email}
                </a>
              </li>
            ))}
            {CONTACT.whatsapp && (
              <li>
                <a
                  href={`https://wa.me/${CONTACT.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-foreground"
                >
                  <Phone className="size-3.5" />
                  {CONTACT.whatsapp}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 border-t border-border pt-2 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-3">
          {CONTACT.emails[0] && (
            <a
              href={`mailto:${CONTACT.emails[0]}`}
              aria-label="E-mail"
              className="rounded-full border border-border p-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="size-4" />
            </a>
          )}
          <a
            href={CONTACT.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="rounded-full border border-border p-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <FaLinkedin className="size-4" />
          </a>
        </div>
        <div className="flex flex-col items-center gap-0.5 sm:items-end">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            © {year} {SITE.name}. Todos os direitos reservados.
          </p>
          <a
            href="https://github.com/gabriellatcc"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[10px] text-muted-foreground transition-colors hover:text-foreground"
          >
            desenvolvido por
            <FaGithub className="size-3" aria-hidden />
            gabriellatcc
          </a>
        </div>
      </div>
    </div>
  </footer>
  );
}