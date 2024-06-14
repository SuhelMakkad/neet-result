import { useEffect, useState } from "react";

import { FilterIcon, Plus, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/utils/ui";

const filedOptions = [
  { label: "Marks", value: "marks" },
  { label: "AIR", value: "air" },
  { label: "Application No.", value: "id" },
];

const operatorOptions = [
  { label: ">", value: "gt" },
  { label: "<", value: "lt" },
  { label: ">=", value: "gte" },
  { label: "<=", value: "lte" },
  { label: "=", value: "eq" },
  { label: "!=", value: "ne" },
];

type FilterState = {
  id: number;
  field: string;
  operator: string;
  value: number;
};

const defaultState = {
  id: 1,
  field: "",
  operator: "",
  value: 0,
};

export const Filter = () => {
  const [filters, setFilters] = useState<FilterState[]>([{ ...defaultState }]);

  const handleAddFilter = () => {
    const newFilter = {
      ...defaultState,
      id: Date.now(),
    };

    setFilters((prev) => [...prev, newFilter]);
  };

  const handelDeleteFilter = (index: number) => {
    setFilters((prev) => {
      const newFilters = [...prev];
      newFilters.splice(index, 1);
      return newFilters;
    });
  };

  const handleChangeFilter = <TKey extends keyof FilterState>(
    index: number,
    key: TKey,
    value: FilterState[TKey]
  ) => {
    setFilters((prev) => {
      const newFilters = [...prev];
      newFilters[index][key] = value;
      return newFilters;
    });
  };

  useEffect(() => {
    if (!filters.length) {
      setFilters([
        {
          ...defaultState,
          id: Date.now(),
        },
      ]);
    }
  }, [filters.length]);

  return (
    <Popover>
      <PopoverTrigger>
        <Button size="sm" variant="secondary" className={"gap-2 relative"}>
          <FilterIcon className="w-4 h-4" />
          Filter
          {filters.length && (
            <span className="text-[0.55rem] grid place-content-center absolute top-0 right-0 w-3.5 h-3.5 bg-primary text-background rounded-full shadow-md translate-x-1 -translate-y-1">
              {filters.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto mr-2 md:mr-0">
        <ul className="flex flex-col gap-2">
          {filters.map((filter, index) => (
            <li className="flex items-center gap-2" key={filter.id}>
              <Select onValueChange={(value) => handleChangeFilter(index, "field", value)}>
                <SelectTrigger className="w-28 shrink-0">
                  <SelectValue placeholder="Field" />
                </SelectTrigger>
                <SelectContent>
                  {filedOptions.map((option) => (
                    <SelectItem value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select onValueChange={(value) => handleChangeFilter(index, "operator", value)}>
                <SelectTrigger className="md:w-28 w-[6.5rem] shrink-0">
                  <SelectValue placeholder="Operator" />
                </SelectTrigger>
                <SelectContent>
                  {operatorOptions.map((option) => (
                    <SelectItem value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                type="number"
                placeholder="Value"
                className="md:w-28 w-20 shrink-0"
                onBlur={(e) => handleChangeFilter(index, "value", +e.target.value)}
              />

              {index === filters.length - 1 ? (
                <Button variant="ghost" size="icon" className="w-5 h-5" onClick={handleAddFilter}>
                  <Plus className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-5 h-5"
                  onClick={() => handelDeleteFilter(index)}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex justify-end">
          <Button size="sm">Apply</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
