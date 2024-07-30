import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Table } from "@tanstack/react-table";

interface TableSearchInputProps<TData> {
  table: Table<TData>;
}

export function TableSearchInput<TData>({
  table,
}: TableSearchInputProps<TData>) {
  return (
    <div className="hidden lg:flex items-center relative w-full max-w-sm">
      <Search className="absolute left-3" size={18} />
      <Input
        className="pl-9"
        placeholder="Buscar na tabela..."
        onChange={(e) => table.setGlobalFilter(e.target.value)}
      />
    </div>
  );
}
