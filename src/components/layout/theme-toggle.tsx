import { Moon, Sun } from "lucide-react";
import { useState } from "react";

import { useTheme } from "@/components/providers/theme-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [rotation, setRotation] = useState(() => (theme === "dark" ? 180 : 0));

  const handleToggle = () => {
    setRotation((current) => current + 180);
    toggleTheme();
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="icon-lg"
      onClick={handleToggle}
      aria-label={theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
      className={cn(
        "fixed bottom-6 right-6 z-50 size-11 rounded-full shadow-md",
        "border-border bg-background text-foreground hover:bg-muted",
      )}
    >
      <span
        aria-hidden
        className="inline-flex transition-transform duration-300 ease-in-out"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {theme === "dark" ? <Moon className="size-5" /> : <Sun className="size-5" />}
      </span>
    </Button>
  );
}
