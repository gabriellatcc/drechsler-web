import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  isSiteAccessGateActive,
  isSiteAccessUnlocked,
  setSiteAccessUnlocked,
} from "@/lib/site-access-gate";

type SiteAccessGateContextValue = {
  active: boolean;
  unlocked: boolean;
  unlock: () => void;
};

const SiteAccessGateContext = createContext<SiteAccessGateContextValue | undefined>(
  undefined,
);

type SiteAccessGateProviderProps = {
  children: ReactNode;
};

export function SiteAccessGateProvider({ children }: SiteAccessGateProviderProps) {
  const active = isSiteAccessGateActive();
  const [unlocked, setUnlocked] = useState(() => isSiteAccessUnlocked());

  const unlock = useCallback(() => {
    setSiteAccessUnlocked();
    setUnlocked(true);
  }, []);

  const value = useMemo(
    () => ({
      active,
      unlocked,
      unlock,
    }),
    [active, unlocked, unlock],
  );

  return (
    <SiteAccessGateContext.Provider value={value}>{children}</SiteAccessGateContext.Provider>
  );
}

export function useSiteAccessGate() {
  const context = useContext(SiteAccessGateContext);
  if (!context) {
    throw new Error("useSiteAccessGate must be used within a SiteAccessGateProvider");
  }
  return context;
}
