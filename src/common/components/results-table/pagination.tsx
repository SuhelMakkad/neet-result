import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFilters } from "@/hooks/use-filters";

interface PaginationProps {
  totalPages: number;
}

export const Pagination = ({ totalPages }: PaginationProps) => {
  const { pageNo, updatePageNo } = useFilters();

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
        type="number"
        name="page"
        step={1}
        min={1}
        max={totalPages}
        value={pageNo}
        className="max-w-24"
        onChange={(e) => {
          const target = e.target;
          let pageNo = +(target.value || 1);

          if (pageNo > totalPages) {
            pageNo = +(target.value = totalPages.toString());
          } else if (pageNo < 1) {
            pageNo = +(target.value = "1");
          }

          updatePageNo(pageNo || 1);
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
