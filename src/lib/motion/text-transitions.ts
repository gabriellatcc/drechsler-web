import type { Transition, Variants } from "framer-motion";

export const textRevealTransition: Transition = {
  duration: 0.3,
  ease: [0.22, 1, 0.36, 1],
};

export const textRevealDelays = {
  label: 0,
  title: 0.08,
  description: 0.18,
} as const;

export const textRevealVariants: Variants = {
  initial: {
    opacity: 0,
    y: 6,
    filter: "blur(6px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
  exit: {
    opacity: 0,
    y: -6,
    filter: "blur(6px)",
  },
};

export const textRevealReducedMotionVariants: Variants = {
  initial: {
    opacity: 0,
    y: 6,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -6,
  },
};
