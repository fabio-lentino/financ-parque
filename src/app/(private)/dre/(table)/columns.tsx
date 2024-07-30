import { ColumnDef } from "@tanstack/react-table";
import { RowActions } from "./row-actions";
import { Model } from "../config";
import { format } from "date-fns";
import { brl } from "@/lib/format";

export const columns: ColumnDef<Partial<Model>, any>[] = 
[
  {
    id: "actions",
    cell: ({ row }) => <RowActions row={row} />
  },
  {
    accessorKey: "id",
    header: "ID"
  },
  {
    accessorKey: "receita",
    header: "Receita"
  },
  {
    accessorKey: "despesa",
    header: "Despesa"
  },
  {
    header: "Valor",
    accessorFn: (row) => row.valor && brl(row.valor)
  },
  {
    header: "Data de Criação",
    accessorFn: (row) => row.createdAt && format(row.createdAt, "dd/MM/yyyy")
  },
  {
    header: "Data de Atualização",
    accessorFn: (row) => row.updatedAt && format(row.updatedAt, "dd/MM/yyyy")
  }

  
];
