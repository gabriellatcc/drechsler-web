function parseOptionalInt(value: unknown): number | undefined {
  if (value === undefined || value === null || value === "") return undefined;

  const parsed = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(parsed)) return undefined;

  return Math.floor(parsed);
}

export type PublicBlogSearch = {
  page?: number;
};

export function validatePublicBlogSearch(search: Record<string, unknown>): PublicBlogSearch {
  const page = parseOptionalInt(search.page);

  return {
    page: page !== undefined && page >= 1 ? page : undefined,
  };
}
