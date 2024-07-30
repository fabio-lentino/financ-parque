"use client";

import { Table } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Check, Columns, X } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

interface TableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function TableViewOptions<TData>({
  table,
}: TableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto h-10">
          <Columns className="mr-2 h-4 w-4" />
          Colunas
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[180px]">
        <ScrollArea className="h-60">
          <DropdownMenuLabel>Colunas</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={table.getIsAllColumnsVisible()}
            onCheckedChange={(value) => {
              table.toggleAllColumnsVisible(!!value);
              table.getColumn("actions")?.toggleVisibility(true);
            }}
            onSelect={(e) => e.preventDefault()}
          >
            Todas
          </DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          {table
            .getAllColumns()
            .filter(
              (column) =>
                typeof column.accessorFn !== "undefined" && column.getCanHide()
            )
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  onSelect={(e) => e.preventDefault()}
                >
                  <>{column.columnDef.header}</>
                </DropdownMenuCheckboxItem>
              );
            })}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
