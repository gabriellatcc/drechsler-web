export function formatBlogDate(
  value: string | null | undefined,
  options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  },
): string {
  if (!value) return "—";

  return new Date(value).toLocaleDateString("pt-BR", options);
}
