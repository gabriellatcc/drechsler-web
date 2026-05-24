import { AnimatedText } from "@/components/ui/animated-text";
import { useResolvedPageContent } from "@/lib/use-page-content";
import { cn } from "@/lib/utils";

type PageAreaHeaderProps = {
  variant?: "default" | "hero";
  className?: string;
};

export function PageAreaHeader({ variant = "default", className }: PageAreaHeaderProps) {
  const content = useResolvedPageContent();
  const isHero = variant === "hero";

  return (
    <header
      aria-live="polite"
      aria-atomic="true"
      className={cn("space-y-3", className)}
    >
      {content.label ? (
        <AnimatedText
          animationKey={`${content.animationKey}-label`}
          as="p"
          animateOnMount={isHero}
          delay={isHero ? 0 : undefined}
          className={cn(
            "label-technical",
            isHero ? "text-white/80" : "text-primary",
          )}
        >
          {content.label}
        </AnimatedText>
      ) : null}

      <AnimatedText
        animationKey={`${content.animationKey}-title`}
        as="h1"
        animateOnMount={isHero}
        delay={isHero ? 0.08 : undefined}
        className={cn(
          "heading-tight text-3xl md:text-4xl",
          isHero && "text-white lg:text-5xl",
        )}
      >
        {content.title}
      </AnimatedText>

      <AnimatedText
        animationKey={`${content.animationKey}-description`}
        as="p"
        animateOnMount={isHero}
        delay={isHero ? 0.18 : undefined}
        className={cn(
          "text-sm leading-relaxed",
          isHero ? "text-white/75" : "text-muted-foreground",
        )}
      >
        {content.description}
      </AnimatedText>
    </header>
  );
}
