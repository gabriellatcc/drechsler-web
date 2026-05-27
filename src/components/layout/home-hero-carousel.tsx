import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { HOME_HERO_SLIDES } from "@/lib/site-images";
import { cn } from "@/lib/utils";

const SLIDE_INTERVAL_MS = 6000;
const SWIPE_THRESHOLD_PX = 48;

const navButtonClassName =
  "inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-white/60 bg-black/55 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70";

type HomeHeroCarouselProps = {
  children: ReactNode;
  className?: string;
};

export function HomeHeroCarousel({ children, className }: HomeHeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlayKey, setAutoPlayKey] = useState(0);
  const pointerStartX = useRef<number | null>(null);
  const pointerStartY = useRef<number | null>(null);
  const isDragging = useRef(false);

  const slideCount = HOME_HERO_SLIDES.length;

  const goToSlide = useCallback(
    (index: number) => {
      setActiveIndex((index + slideCount) % slideCount);
      setAutoPlayKey((current) => current + 1);
    },
    [slideCount],
  );

  const goToPrevious = useCallback(() => {
    goToSlide(activeIndex - 1);
  }, [activeIndex, goToSlide]);

  const goToNext = useCallback(() => {
    goToSlide(activeIndex + 1);
  }, [activeIndex, goToSlide]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slideCount);
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [autoPlayKey, slideCount]);

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    pointerStartX.current = event.clientX;
    pointerStartY.current = event.clientY;
    isDragging.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (pointerStartX.current === null || pointerStartY.current === null) {
      return;
    }

    const deltaX = Math.abs(event.clientX - pointerStartX.current);
    const deltaY = Math.abs(event.clientY - pointerStartY.current);

    if (deltaX > 8 && deltaX > deltaY) {
      isDragging.current = true;
    }
  }

  function finishPointerInteraction(event: ReactPointerEvent<HTMLDivElement>) {
    if (pointerStartX.current !== null && isDragging.current) {
      const deltaX = event.clientX - pointerStartX.current;

      if (deltaX <= -SWIPE_THRESHOLD_PX) {
        goToNext();
      } else if (deltaX >= SWIPE_THRESHOLD_PX) {
        goToPrevious();
      }
    }

    pointerStartX.current = null;
    pointerStartY.current = null;
    isDragging.current = false;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Destaques da DRECHSLER"
      className={cn(
        "hero-overlay relative isolate flex min-h-[calc(62vh-1.75rem)] items-center justify-center sm:min-h-[calc((100vh-3.5rem)*0.68)]",
        className,
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 z-0 overflow-hidden touch-pan-y"
        onPointerCancel={finishPointerInteraction}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishPointerInteraction}
      >
        {HOME_HERO_SLIDES.map((slide, index) => (
          <div
            key={slide}
            className={cn(
              "absolute inset-0 bg-cover bg-center motion-safe:transition-[opacity,transform] motion-safe:duration-1000 motion-safe:ease-in-out",
              index === activeIndex ? "scale-100 opacity-100" : "scale-105 opacity-0",
            )}
            style={{ backgroundImage: `url(${slide})` }}
          />
        ))}
      </div>

      <button
        type="button"
        aria-label="Slide anterior"
        className={cn(navButtonClassName, "absolute top-1/2 left-3 z-30 -translate-y-1/2 sm:left-6")}
        onClick={goToPrevious}
      >
        <ChevronLeft className="size-5" />
      </button>

      <button
        type="button"
        aria-label="Próximo slide"
        className={cn(navButtonClassName, "absolute top-1/2 right-3 z-30 -translate-y-1/2 sm:right-6")}
        onClick={goToNext}
      >
        <ChevronRight className="size-5" />
      </button>

      <div className="site-container relative z-20 w-full py-6 md:py-8">
        <div className="mx-auto max-w-3xl px-12 sm:px-14">{children}</div>
      </div>

      <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 gap-2.5 sm:bottom-5">
        {HOME_HERO_SLIDES.map((slide, index) => (
          <button
            key={slide}
            type="button"
            aria-label={`Ir para slide ${index + 1}`}
            aria-current={index === activeIndex ? "true" : undefined}
            className={cn(
              "size-2.5 rounded-full border border-white/70 shadow-sm transition-all",
              index === activeIndex
                ? "scale-110 bg-white"
                : "bg-white/35 hover:bg-white/60",
            )}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </section>
  );
}
