"use client";

import { Table as TableType, flexRender } from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { TableHeaderFilter } from "./header-filter";
import { ArrowDown, ArrowUp, ChevronDown, ChevronUp } from "lucide-react";

interface DatatableProps<TData> {
  table: TableType<TData>;
}

export function Datatable<TData>({ table }: DatatableProps<TData>) {
  return (
    <Table className="relative">
      <TableHeader>
        <TableRow className="hover:bg-inherit">
          {table.getHeaderGroups()[0].headers.map((header) => (
            <TableHead
              key={header.id}
              onClick={header.column.getToggleSortingHandler()}
              className="cursor-pointer"
            >
              <div className="flex items-center gap-1">
                {{
                  asc: <ArrowUp size={12} />,
                  desc: <ArrowDown size={12} />,
                }[header.column.getIsSorted() as string] ?? null}
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </div>
            </TableHead>
          ))}
        </TableRow>
        <TableHeaderFilter table={table} />
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id} data-test={`cell_${cell.id}`}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
