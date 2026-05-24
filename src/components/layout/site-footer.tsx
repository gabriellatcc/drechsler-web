import { FaGithub } from "react-icons/fa";

import { SITE } from "@/lib/site-content";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/20">
      <div className="site-container flex flex-col items-center gap-1 py-3">
        <p className="text-[10px] tracking-wide text-muted-foreground">
          © {year} {SITE.name}
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
    </footer>
  );
}
