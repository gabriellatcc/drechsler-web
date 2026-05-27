export const DEFAULT_PER_PAGE = 5;

export const PER_PAGE_OPTIONS = [5, 10, 15, 20, 25] as const;

export type PerPageOption = (typeof PER_PAGE_OPTIONS)[number];

export function isPerPageOption(value: number): value is PerPageOption {
  return (PER_PAGE_OPTIONS as readonly number[]).includes(value);
}
