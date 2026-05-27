import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { LogOut, Menu, User, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { clearAuthAccessToken } from "@/lib/api-client";
import { SITE } from "@/lib/site-content";
import { cn } from "@/lib/utils";

export type AdminSectionNavItem = {
  label: string;
  shortLabel?: string;
  targetId: string;
  icon: LucideIcon;
};

type AdminShellProps = {
  children: ReactNode;
  title?: string;
  userName?: string;
  onLogout?: () => void;
  sectionNav?: AdminSectionNavItem[];
};

function scrollToSection(targetId: string) {
  document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function AdminShell({
  children,
  title,
  userName,
  onLogout,
  sectionNav,
}: AdminShellProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function closeMobileMenu() {
    setMobileOpen(false);
  }

  function handleLogout() {
    clearAuthAccessToken();
    closeMobileMenu();
    onLogout?.();
  }

  function handleSectionNavClick(targetId: string) {
    scrollToSection(targetId);
    closeMobileMenu();
  }

  const heading = userName ? `Olá, ${userName}` : (title ?? "Painel administrativo");

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-colors duration-200",
          scrolled || mobileOpen
            ? "border-border/70 bg-background/70 backdrop-blur-md"
            : "border-transparent bg-transparent",
        )}
      >
        <div className="site-container flex h-14 items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="flex size-9 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary"
              aria-hidden
            >
              <User className="size-4" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold tracking-tight">{heading}</p>
              <p className="truncate text-xs text-muted-foreground">{SITE.shortName}</p>
            </div>
          </div>

          <nav
            className="hidden items-center gap-2 md:flex"
            aria-label="Navegação do painel administrativo"
          >
            {sectionNav?.map((item) => (
              <Button
                key={item.targetId}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleSectionNavClick(item.targetId)}
              >
                <item.icon className="size-4" />
                {item.label}
              </Button>
            ))}
            <Button variant="outline" size="sm" asChild>
              <Link to="/">Voltar ao site</Link>
            </Button>
            {onLogout ? (
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="size-4" />
                Sair
              </Button>
            ) : null}
          </nav>

          <div className="flex shrink-0 items-center gap-2 md:hidden">
            {onLogout ? (
              <Button variant="ghost" size="sm" onClick={handleLogout} aria-label="Sair">
                <LogOut className="size-4" />
              </Button>
            ) : null}
            <button
              type="button"
              className="inline-flex size-9 items-center justify-center rounded-sm border border-border"
              aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>

        <div
          className={cn(
            "border-t md:hidden",
            scrolled || mobileOpen
              ? "border-border/70 bg-background/70 backdrop-blur-md"
              : "border-border bg-background",
            mobileOpen ? "block" : "hidden",
          )}
        >
          <nav
            className="site-container flex flex-col gap-2 py-3"
            aria-label="Menu do painel administrativo"
          >
            {sectionNav?.map((item) => (
              <Button
                key={item.targetId}
                type="button"
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleSectionNavClick(item.targetId)}
              >
                <item.icon className="size-4" />
                {item.label}
              </Button>
            ))}
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/" onClick={closeMobileMenu}>
                Voltar ao site
              </Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex min-h-0 w-full flex-1 flex-col">{children}</main>
    </div>
  );
}
