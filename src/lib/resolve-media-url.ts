function trimTrailingSlash(value: string): string {
  return value.replace(/\/$/, "");
}

function mediaBaseUrl(): string | undefined {
  const mediaBase = import.meta.env.VITE_MEDIA_BASE_URL;
  if (typeof mediaBase === "string" && mediaBase.trim()) {
    return trimTrailingSlash(mediaBase.trim());
  }

  const apiBase = import.meta.env.VITE_API_BASE_URL;
  if (typeof apiBase === "string" && apiBase.trim()) {
    return trimTrailingSlash(apiBase.trim());
  }

  return undefined;
}

export function resolveMediaUrl(path: string | null | undefined): string | null {
  if (!path) return null;

  const trimmed = path.trim();
  if (!trimmed) return null;

  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.startsWith("//")) return `https:${trimmed}`;

  const base = mediaBaseUrl();
  if (!base) return trimmed;

  const relative = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return `${base}${relative}`;
}
