import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PaginationProps {
  totalPages: number;
}

export const Pagination = ({ totalPages }: PaginationProps) => {
  return (
    <div className="flex items-center justify-end gap-2">
      <Button variant="outline" size="sm">
        Previous
      </Button>

      <Input
        type="number"
        step={1}
        min={1}
        max={totalPages}
        defaultValue={1}
        className="max-w-24"
      />

      <Button variant="outline" size="sm">
        Next
      </Button>
    </div>
  );
};
