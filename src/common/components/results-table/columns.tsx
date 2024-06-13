"use client";

import { Result } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Result>[] = [
  {
    accessorKey: "id",
    header: "Application Number",
  },
  {
    accessorKey: "air",
    header: "AIR",
  },
  {
    accessorKey: "displayName",
    header: "Name",
  },
  {
    accessorKey: "marks",
    header: "Marks",
  },
  {
    accessorKey: "marks",
    header: "Marks",
  },
];
