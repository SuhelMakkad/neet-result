"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Result } from "@/utils/types";

const sortIconMap = {
  asc: <ChevronUp className="h-4 w-4 ml-2" />,
  desc: <ChevronDown className="h-4 w-4 ml-2" />,
  none: <ArrowUpDown className="h-4 w-4 ml-2" />,
};

export const columns: ColumnDef<Result>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      const sortState = column.getIsSorted();

      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(sortState === "asc")}>
          Application Number
          {sortState ? sortIconMap[sortState] : sortIconMap.none}
        </Button>
      );
    },
  },
  {
    accessorKey: "displayName",
    header: ({ column }) => {
      const sortState = column.getIsSorted();

      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(sortState === "asc")}>
          Name
          {sortState ? sortIconMap[sortState] : sortIconMap.none}
        </Button>
      );
    },
  },
  {
    accessorKey: "air",
    header: ({ column }) => {
      const sortState = column.getIsSorted();

      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(sortState === "asc")}>
          AIR
          {sortState ? sortIconMap[sortState] : sortIconMap.none}
        </Button>
      );
    },
  },
  {
    accessorKey: "marks",
    header: ({ column }) => {
      const sortState = column.getIsSorted();

      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(sortState === "asc")}>
          Marks
          {sortState ? sortIconMap[sortState] : sortIconMap.none}
        </Button>
      );
    },
  },
];
