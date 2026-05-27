import { Link } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { clearAuthAccessToken } from "@/lib/api-client";
import { SITE } from "@/lib/site-content";

type AdminShellProps = {
  children: ReactNode;
  title?: string;
  onLogout?: () => void;
};

export function AdminShell({ children, title, onLogout }: AdminShellProps) {
  function handleLogout() {
    clearAuthAccessToken();
    onLogout?.();
  }

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <header className="border-b border-border">
        <div className="site-container flex h-14 items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold uppercase tracking-wider">
              {title ?? "Painel administrativo"}
            </p>
            <p className="truncate text-xs text-muted-foreground">{SITE.shortName}</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/">Voltar ao site</Link>
            </Button>
            {onLogout ? (
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="size-4" />
                Sair
              </Button>
            ) : null}
          </div>
        </div>
      </header>
      <main className="flex min-h-0 flex-1 flex-col">{children}</main>
    </div>
  );
}
