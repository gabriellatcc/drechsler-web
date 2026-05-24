import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ElementType } from "react";

import {
  textRevealReducedMotionVariants,
  textRevealTransition,
  textRevealVariants,
} from "@/lib/motion/text-transitions";
import { cn } from "@/lib/utils";

type AnimatedTextProps = {
  animationKey: string;
  children: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  delay?: number;
};

export function AnimatedText({
  animationKey,
  children,
  as = "p",
  className,
  delay = 0,
}: AnimatedTextProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion.create(as as ElementType);
  const variants = reduceMotion ? textRevealReducedMotionVariants : textRevealVariants;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <MotionTag
        key={animationKey}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        transition={{ ...textRevealTransition, delay }}
        className={cn(className)}
      >
        {children}
      </MotionTag>
    </AnimatePresence>
  );
}
