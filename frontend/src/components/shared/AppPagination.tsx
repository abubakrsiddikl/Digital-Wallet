"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

interface AppPaginationProps {
  total: number;
  page: number;
  limit: number;
}

const AppPagination = ({ total, page, limit }: AppPaginationProps) => {
  const [currentLimit, setCurrentLimit] = useState(limit);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(total / limit);
  if (totalPages <= 1) return null;

  // 🔥 keep sync with URL
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setCurrentLimit(limit);
  }, [limit]);

  const updateQuery = (newPage: number, newLimit?: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", String(newPage));

    if (newLimit) {
      params.set("limit", String(newLimit));
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const goToPage = (p: number) => {
    if (p < 1 || p > totalPages) return;
    updateQuery(p);
  };

  // ── Page logic ─────────────────────────────
  const getPages = (): (number | "ellipsis")[] => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (page <= 3) return [1, 2, 3, 4, "ellipsis", totalPages];

    if (page >= totalPages - 2) {
      return [
        1,
        "ellipsis",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [1, "ellipsis", page - 1, page, page + 1, "ellipsis", totalPages];
  };

  const pages = getPages();

  return (
    <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
      
      {/* Meta */}
      <p className="text-xs text-muted-foreground">
        Showing{" "}
        <span className="font-medium text-foreground">
          {Math.min((page - 1) * limit + 1, total)}
        </span>{" "}
        –{" "}
        <span className="font-medium text-foreground">
          {Math.min(page * limit, total)}
        </span>{" "}
        of{" "}
        <span className="font-medium text-foreground">{total}</span>
      </p>

      {/* Pagination */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => goToPage(page - 1)}
              className={page === 1 ? "pointer-events-none opacity-40" : ""}
            />
          </PaginationItem>

          {pages.map((p, idx) =>
            p === "ellipsis" ? (
              <PaginationItem key={idx}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={p}>
                <PaginationLink
                  isActive={p === page}
                  onClick={() => goToPage(p)}
                  className="cursor-pointer"
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() => goToPage(page + 1)}
              className={
                page === totalPages ? "pointer-events-none opacity-40" : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {/* 🔥 Limit selector FIXED */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">
          Items per page:
        </span>

        <Select
          value={String(currentLimit)}
          onValueChange={(value) => {
            const newLimit = Number(value);
            setCurrentLimit(newLimit);

            // 🔥 FIX: send limit in URL
            updateQuery(1, newLimit);
          }}
        >
          <SelectTrigger className=" h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[1, 5, 10, 20, 50, 100].map((num) => (
              <SelectItem key={num} value={String(num)}>
                {num}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default AppPagination;