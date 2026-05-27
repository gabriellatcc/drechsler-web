import { useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect } from "react";

import {
  DEFAULT_PER_PAGE,
  PER_PAGE_OPTIONS,
  type PerPageOption,
} from "@/lib/pagination/constants";
import { writeStoredPerPage } from "@/lib/pagination/per-page-storage";
import { clampPage, resolvePage, resolvePerPage } from "@/lib/pagination/resolve-pagination";

type UsePaginatedListOptions = {
  storageKey: string;
  pageKey: string;
  perPageKey: string;
  search: Record<string, unknown>;
  defaultPerPage?: PerPageOption;
  perPageOptions?: readonly PerPageOption[];
};

type PaginatedListSearchUpdate = Record<string, number | undefined>;

export function usePaginatedList({
  storageKey,
  pageKey,
  perPageKey,
  search,
  defaultPerPage = DEFAULT_PER_PAGE,
  perPageOptions = PER_PAGE_OPTIONS,
}: UsePaginatedListOptions) {
  const navigate = useNavigate({ from: "/admin/dashboard" });

  const page = resolvePage(search[pageKey], 1);
  const perPage = resolvePerPage(search[perPageKey], storageKey, defaultPerPage);

  const syncToUrl = useCallback(
    (updates: PaginatedListSearchUpdate) => {
      void navigate({
        replace: true,
        search: (prev) => {
          const next = { ...(prev as Record<string, unknown>) };

          for (const [key, value] of Object.entries(updates)) {
            if (value === undefined || (key.endsWith("_page") && value <= 1)) {
              delete next[key];
            } else {
              next[key] = value;
            }
          }

          return next as typeof prev;
        },
      });
    },
    [navigate],
  );

  const setPage = useCallback(
    (nextPage: number) => {
      syncToUrl({ [pageKey]: Math.max(1, nextPage) });
    },
    [pageKey, syncToUrl],
  );

  const setPerPage = useCallback(
    (nextPerPage: number) => {
      if (!perPageOptions.includes(nextPerPage as PerPageOption)) return;

      writeStoredPerPage(storageKey, nextPerPage as PerPageOption);
      syncToUrl({
        [pageKey]: 1,
        [perPageKey]: nextPerPage,
      });
    },
    [pageKey, perPageKey, perPageOptions, storageKey, syncToUrl],
  );

  return {
    page,
    perPage,
    setPage,
    setPerPage,
    apiParams: { page, perPage },
    perPageOptions,
  };
}

export function usePaginatedLastPageGuard(
  page: number,
  lastPage: number | undefined,
  setPage: (page: number) => void,
): void {
  useEffect(() => {
    if (lastPage === undefined) return;

    const corrected = clampPage(page, Math.max(lastPage, 1));
    if (corrected !== page) {
      setPage(corrected);
    }
  }, [lastPage, page, setPage]);
}
