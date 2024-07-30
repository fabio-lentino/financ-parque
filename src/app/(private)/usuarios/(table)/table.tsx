"use client";

import { columns } from "./columns";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TableViewOptions } from "@/components/table/view-options";
import { TablePagination } from "@/components/table/pagination";
import { Datatable } from "@/components/table/data-table";
import { TableSearchInput } from "@/components/table/search";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ClearFilters } from "@/components/table/clear-filters";
import { Model, config } from "../config";
import { useColumnVisibility } from "@/components/table/use-column-visibility";

interface TableProps {
  data: Partial<Model>[];
}

export function Table({ data }: TableProps) {
  const [columnVisibility, setColumnVisibility] = useColumnVisibility(
    config.id
  );

  const table = useReactTable({
    columns,
    data,
    state: {
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    autoResetAll: false,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2 mr-2">
          <TableSearchInput table={table} />
          <TableViewOptions table={table} />
          <ClearFilters table={table} />
        </div>
        <TablePagination table={table} />
      </div>
      <ScrollArea className="rounded-md border h-[calc(80vh-120px)]">
        <Datatable table={table} />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
