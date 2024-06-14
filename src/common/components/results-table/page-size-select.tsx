import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFilters } from "@/hooks/use-filters";

export const PageSizeSelect = () => {
  const { pageSize, updatePageSize } = useFilters();

  return (
    <Select onValueChange={updatePageSize} value={pageSize.toString()}>
      <SelectTrigger className="w-16">
        <SelectValue placeholder={pageSize} />
      </SelectTrigger>
      <SelectContent className="w-20">
        <SelectItem value="10">10</SelectItem>
        <SelectItem value="25">25</SelectItem>
        <SelectItem value="50">50</SelectItem>
        <SelectItem value="100">100</SelectItem>
      </SelectContent>
    </Select>
  );
};
