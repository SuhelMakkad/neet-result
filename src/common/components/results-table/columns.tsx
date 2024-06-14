"use client";

import { Result } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Result>[] = [
  {
    accessorKey: "id",
    header: "Application Number",
  },
  {
    accessorKey: "displayName",
    header: "Name",
  },
  {
    accessorKey: "air",
    header: "AIR",
  },
  {
    accessorKey: "marks",
    header: "Marks",
  },
];
