"use client";

import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useResults } from "@/query/use-results-query";
import { columns } from "./columns";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ToolBar } from "./tool-bar";
import { Pagination } from "./pagination";
import { PageSizeSelect } from "./page-size-select";

export const ResultsTable = () => {
  const { data } = useResults();

  const table = useReactTable({
    data: data?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-3">
      <ToolBar />

      <Table onKeyDown={console.log}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex items-center md:flex-row flex-col-reverse gap-4 justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-secondary-foreground">
            Showing {data?.data.length} of {data?.total} results
          </span>
          <PageSizeSelect />
        </div>

        <Pagination totalPages={data?.totalPages || 1} />
      </div>
    </div>
  );
};
