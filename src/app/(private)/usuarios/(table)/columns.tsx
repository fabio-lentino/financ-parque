import { ColumnDef } from "@tanstack/react-table";
import { RowActions } from "./row-actions";
import { Model } from "../config";

export const columns: ColumnDef<Partial<Model>, any>[] = [
  { id: "actions", cell: ({ row }) => <RowActions row={row} /> },
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Nome" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Função" },
];
