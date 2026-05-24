import { Link } from "@tanstack/react-router";
import { ExternalLink, Mail } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { SITE_IMAGES } from "@/lib/site-images";
import { CONTACT, NAV_ITEMS, SITE } from "@/lib/site-content";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/20">
      <div className="site-container section-padding pb-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-2">
            <img
              src={SITE_IMAGES.logoMono}
              alt={SITE.name}
              className="h-9 w-auto dark:invert"
            />
            <p className="text-xs leading-relaxed text-muted-foreground">{SITE.tagline}</p>
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
                  <a href={`mailto:${email}`} className="inline-flex items-center gap-2 hover:text-foreground">
                    <Mail className="size-3.5" />
                    {email}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={CONTACT.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-foreground"
                >
                  <ExternalLink className="size-3.5" />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-6" />

        <p className="text-center text-xs uppercase tracking-wider text-muted-foreground">
          © {year} {SITE.name}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
