import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { PaginationResource } from "@/generated/api/models/paginationResource";
import type { PerPageOption } from "@/lib/pagination/constants";
import { cn } from "@/lib/utils";

type ListPaginationBarProps = {
  meta: PaginationResource;
  perPage: number;
  perPageOptions: readonly PerPageOption[];
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
  isFetching?: boolean;
  itemLabel?: string;
  className?: string;
};

export function ListPaginationBar({
  meta,
  perPage,
  perPageOptions,
  onPageChange,
  onPerPageChange,
  isFetching = false,
  itemLabel = "itens",
  className,
}: ListPaginationBarProps) {
  if (meta.total <= 0) return null;

  const canGoPrevious = meta.page > 1;
  const canGoNext = meta.page < meta.lastPage;

  return (
    <div
      className={cn(
        "mt-auto flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <p className="text-xs text-muted-foreground">
        {meta.total} {itemLabel} · {perPage} por página · página {meta.page} de {meta.lastPage}
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <Label htmlFor={`per-page-${itemLabel}`} className="text-xs text-muted-foreground">
            Por página
          </Label>
          <select
            id={`per-page-${itemLabel}`}
            value={perPage}
            disabled={isFetching}
            aria-label="Itens por página"
            className="h-8 rounded-sm border border-input bg-background px-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-50"
            onChange={(event) => onPerPageChange(Number(event.target.value))}
          >
            {perPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={!canGoPrevious || isFetching}
            aria-label="Página anterior"
            onClick={() => onPageChange(meta.page - 1)}
          >
            <ChevronLeft className="size-4" />
            Anterior
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={!canGoNext || isFetching}
            aria-label="Próxima página"
            onClick={() => onPageChange(meta.page + 1)}
          >
            Próxima
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
