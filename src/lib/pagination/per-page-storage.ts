import { DEFAULT_PER_PAGE, isPerPageOption, type PerPageOption } from "./constants";

export function readStoredPerPage(
  storageKey: string,
  fallback: PerPageOption = DEFAULT_PER_PAGE,
): PerPageOption {
  if (typeof window === "undefined") return fallback;

  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return fallback;

    const parsed = Number.parseInt(raw, 10);
    if (!isPerPageOption(parsed)) return fallback;

    return parsed;
  } catch {
    return fallback;
  }
}

export function writeStoredPerPage(storageKey: string, perPage: PerPageOption): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(storageKey, String(perPage));
  } catch {
    // ignore quota / privacy errors
  }
}
