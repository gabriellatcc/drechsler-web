import type { LucideIcon } from "lucide-react";
import { FlaskConical, GraduationCap, Microscope, Scale } from "lucide-react";

import type { Service } from "@/lib/site-content";

export const HOME_SERVICE_CATEGORY_SHORTCUTS = [
  "tecnologicos",
  "analiticos",
  "regulatorios",
  "treinamentos",
] as const satisfies readonly Service["category"][];

export const SERVICE_CATEGORY_ICONS: Record<Service["category"], LucideIcon> = {
  tecnologicos: FlaskConical,
  analiticos: Microscope,
  regulatorios: Scale,
  treinamentos: GraduationCap,
};
