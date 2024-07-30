import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { Button } from "../ui/button";

interface ClearFiltersProps<TData> {
  table: Table<TData>;
}

export function ClearFilters<TData>({ table }: ClearFiltersProps<TData>) {
  return table.getState().columnFilters.length ? (
    <Button
      className="ml-auto hidden h-10 lg:flex"
      variant="outline"
      size="sm"
      onClick={() => table.resetColumnFilters()}
    >
      <X className="mr-2 h-4 w-4" /> <p className="text-sm">Limpar Filtros</p>
    </Button>
  ) : null;
}
