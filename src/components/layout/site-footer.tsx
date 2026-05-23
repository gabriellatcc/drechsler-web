import { Link } from "@tanstack/react-router";
import { ExternalLink, Mail } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { SITE_IMAGES } from "@/lib/site-images";
import { CONTACT, NAV_ITEMS, SITE } from "@/lib/site-content";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/40">
      <div className="site-container section-padding pb-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-3">
            <img
              src={SITE_IMAGES.logoMono}
              alt={SITE.name}
              className="h-10 w-auto dark:invert"
            />
            <p className="text-sm text-muted-foreground">{SITE.tagline}</p>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold">Navegação</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
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
            <p className="mb-3 text-sm font-semibold">Contato</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {CONTACT.emails.map((email) => (
                <li key={email}>
                  <a href={`mailto:${email}`} className="inline-flex items-center gap-2 hover:text-foreground">
                    <Mail className="size-4" />
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
                  <ExternalLink className="size-4" />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <p className="text-center text-sm text-muted-foreground">
          © {year} {SITE.name}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
