import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFilters } from "@/hooks/use-filters";
import { useEffect, useRef, useState } from "react";

interface PaginationProps {
  totalPages: number;
}

export const Pagination = ({ totalPages }: PaginationProps) => {
  const { pageNo, updatePageNo } = useFilters();
  const ref = useRef<HTMLInputElement>(null);

  const handleUpdatePageNo = (page: string) => {
    let pageNo = +(page || 1);

    if (pageNo > totalPages) {
      pageNo = +(page = totalPages.toString());
    } else if (pageNo < 1) {
      pageNo = +(page = "1");
    }

    updatePageNo(pageNo || 1);
  };

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    ref.current.value = pageNo.toString();
  }, [pageNo, ref.current]);

  return (
    <div className="flex items-center justify-end gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          pageNo > 1 && updatePageNo(pageNo - 1);
        }}
      >
        Previous
      </Button>

      <Input
        ref={ref}
        type="number"
        name="page"
        step={1}
        min={1}
        max={totalPages}
        defaultValue={pageNo}
        className="max-w-24"
        onBlur={(e) => handleUpdatePageNo(e.target.value)}
        onKeyDown={(e) => {
          const target = e.target as HTMLInputElement;
          if (e.key === "Enter") {
            handleUpdatePageNo(target.value);
            (document.activeElement as HTMLElement)?.blur();
          }
        }}
      />

      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          pageNo < totalPages && updatePageNo(pageNo + 1);
        }}
      >
        Next
      </Button>
    </div>
  );
};
