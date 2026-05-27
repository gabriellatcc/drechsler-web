import { Link } from "@tanstack/react-router";
import { MessageCircle, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { useTheme } from "@/components/providers/theme-provider";
import { Button } from "@/components/ui/button";
import { useSiteNavItems } from "@/hooks/use-site-nav-items";
import { SITE_IMAGES } from "@/lib/site-images";
import { CONTACT, whatsappUrl } from "@/lib/site-content";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const { theme } = useTheme();
  const navItems = useSiteNavItems();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-200",
        scrolled
          ? "border-border/70 bg-background/70 backdrop-blur-md"
          : "border-border bg-background",
      )}
    >
      <div className="site-container flex h-14 items-center justify-between gap-4">
        <Link
          to="/"
          className="flex shrink-0 items-center"
          onClick={() => setMobileOpen(false)}
        >
          <img
            src={theme === "dark" ? SITE_IMAGES.logoDark : SITE_IMAGES.logoColor}
            alt="DRECHSLER Inovação & Tecnologia Química"
            className="h-9 w-auto sm:h-10"
          />
        </Link>

        <nav className="hidden items-center gap-5 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-xs font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="size-4" />
              WhatsApp
            </a>
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex size-9 items-center justify-center rounded-sm border border-border md:hidden"
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      <div
        className={cn(
          "border-t md:hidden",
          scrolled ? "border-border/70 bg-background/70 backdrop-blur-md" : "border-border bg-background",
          mobileOpen ? "block" : "hidden",
        )}
      >
        <nav className="site-container flex flex-col gap-0 py-2">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="border-b border-border px-3 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground last:border-b-0 hover:bg-muted hover:text-foreground"
              activeProps={{ className: "bg-muted text-foreground" }}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Button asChild className="mt-2">
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="size-4" />
              WhatsApp {CONTACT.whatsapp}
            </a>
          </Button>
        </nav>
      </div>
    </header>
  );
}
