import { Filter } from "lucide-react";
import { TableRow } from "../ui/table";
import { Table as TableType } from "@tanstack/react-table";

interface TableHeaderFilterProps<TData> {
  table: TableType<TData>;
}

export function TableHeaderFilter<TData>({
  table,
}: TableHeaderFilterProps<TData>) {
  return (
    <TableRow className="hover:bg-inherit">
      {table.getHeaderGroups()[0].headers.map((header) => (
        <th key={header.id}>
          {header.column.getCanFilter() && (
            <div className="flex items-center relative min-w-32">
              <Filter size={14} className="absolute left-3" />
              <input
                className="p-2 py-4 pl-8 border-none focus:outline-none h-full w-full font-normal rounded-md"
                value={(header.column.getFilterValue() as string) ?? ""}
                onChange={(e) => header.column.setFilterValue(e.target.value)}
                data-test={`filter_${header.id}`}
              />
            </div>
          )}
        </th>
      ))}
    </TableRow>
  );
}
