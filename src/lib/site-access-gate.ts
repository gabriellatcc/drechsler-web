/**
 * TEMPORARY — gate de acesso ao site público até liberação do cliente.
 *
 * Para remover depois:
 * 1. Defina `SITE_ACCESS_GATE_ENABLED` como `false` (ou apague estes arquivos).
 * 2. Remova `SiteAccessGateProvider` de `main.tsx`.
 * 3. Remova o bloco do gate em `routes/__root.tsx`.
 * 4. Apague `lib/site-access-gate.ts`, `components/providers/site-access-gate-provider.tsx`
 *    e `components/site/site-access-gate-screen.tsx`.
 */

/** Único switch: `false` desliga o gate sem apagar o código. */
export const SITE_ACCESS_GATE_ENABLED = false;

export const SITE_ACCESS_STORAGE_KEY = "drechsler_site_access_unlocked";

export function getSiteGatePassword(): string | undefined {
  const value = import.meta.env.VITE_SITE_GATE_PASSWORD;
  const trimmed = value?.trim();
  return trimmed || undefined;
}

export function isSiteAccessGateActive(): boolean {
  return SITE_ACCESS_GATE_ENABLED && Boolean(getSiteGatePassword());
}

export function isSiteAccessUnlocked(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(SITE_ACCESS_STORAGE_KEY) === "1";
}

export function setSiteAccessUnlocked(): void {
  sessionStorage.setItem(SITE_ACCESS_STORAGE_KEY, "1");
}

export function verifySiteGatePassword(input: string): boolean {
  const expected = getSiteGatePassword();
  if (!expected) return false;
  return input === expected;
}
