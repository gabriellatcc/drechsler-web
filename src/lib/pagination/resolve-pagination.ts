import { DEFAULT_PER_PAGE, isPerPageOption, type PerPageOption } from "./constants";
import { readStoredPerPage } from "./per-page-storage";

export function resolvePage(value: unknown, fallback = 1): number {
  if (value === undefined || value === null || value === "") return fallback;

  const parsed = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(parsed) || parsed < 1) return fallback;

  return Math.floor(parsed);
}

export function resolvePerPage(
  urlValue: unknown,
  storageKey: string,
  fallback: PerPageOption = DEFAULT_PER_PAGE,
): PerPageOption {
  if (urlValue !== undefined && urlValue !== null && urlValue !== "") {
    const parsed = typeof urlValue === "number" ? urlValue : Number(urlValue);
    if (isPerPageOption(parsed)) return parsed;
  }

  return readStoredPerPage(storageKey, fallback);
}

export function clampPage(page: number, lastPage: number): number {
  if (lastPage < 1) return 1;
  return Math.min(Math.max(1, page), lastPage);
}
