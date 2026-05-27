import type { LucideIcon } from "lucide-react";
import { Loader2 } from "lucide-react";
import type { ReactNode } from "react";

import { ListPaginationBar } from "@/components/ui/list-pagination-bar";
import type { PaginationResource } from "@/generated/api/models/paginationResource";
import type { PerPageOption } from "@/lib/pagination/constants";

type PaginatedListPanelProps<T> = {
  title: string;
  icon: LucideIcon;
  items: T[];
  getItemKey: (item: T) => string;
  renderItem: (item: T) => ReactNode;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  emptyMessage: string;
  errorMessage: string;
  itemLabel: string;
  meta?: PaginationResource;
  perPage: number;
  perPageOptions: readonly PerPageOption[];
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
};

function EmptyState({ icon: Icon, message }: { icon: LucideIcon; message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-10 text-center text-muted-foreground">
      <Icon className="size-8 opacity-50" />
      <p className="text-sm">{message}</p>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center py-10 text-muted-foreground">
      <Loader2 className="size-6 animate-spin" />
    </div>
  );
}

export function PaginatedListPanel<T>({
  title,
  icon: Icon,
  items,
  getItemKey,
  renderItem,
  isLoading,
  isFetching,
  isError,
  emptyMessage,
  errorMessage,
  itemLabel,
  meta,
  perPage,
  perPageOptions,
  onPageChange,
  onPerPageChange,
}: PaginatedListPanelProps<T>) {
  const showEmpty = !isLoading && !isError && items.length === 0;

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col bg-card">
      <div className="shrink-0 border-b border-border px-5 py-4 md:px-6">
        <h2 className="font-serif text-xl font-semibold tracking-tight text-card-foreground flex items-center gap-2.5">
          <Icon className="size-5 shrink-0 text-primary" />
          {title}
        </h2>
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-5 py-4 md:px-6">
        {isLoading ? <LoadingState /> : null}
        {isError ? <EmptyState icon={Icon} message={errorMessage} /> : null}
        {showEmpty ? <EmptyState icon={Icon} message={emptyMessage} /> : null}
        {!isLoading && !isError
          ? items.map((item) => <div key={getItemKey(item)}>{renderItem(item)}</div>)
          : null}

        {meta ? (
          <ListPaginationBar
            meta={meta}
            perPage={perPage}
            perPageOptions={perPageOptions}
            onPageChange={onPageChange}
            onPerPageChange={onPerPageChange}
            isFetching={isFetching}
            itemLabel={itemLabel}
          />
        ) : null}
      </div>
    </div>
  );
}
