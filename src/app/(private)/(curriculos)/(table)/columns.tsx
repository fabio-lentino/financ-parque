import { ColumnDef } from "@tanstack/react-table";
import { RowActions } from "./row-actions";
import { Model } from "../config";
import { format } from "date-fns";
import { brl } from "@/lib/format";

export const columns: ColumnDef<Partial<Model>, any>[] = [
  {
    id: "actions",
    cell: ({ row }) => <RowActions row={row} />
  },
  {
    accessorKey: "id",
    header: "ID"
  },
  {
    header: "Data",
    accessorFn: (row) => row.data && format(row.data, "dd/MM/yyyy")
  },
  {
    accessorKey: "descricao",
    header: "Descrição"
  },
  {
    accessorKey: "item",
    header: "Item"
  },
  {
    accessorKey: "conta",
    header: "Conta"
  },
  {
    accessorKey: "valor",
    header: "Valor",
    accessorFn: (row) => row.valor && brl(row.valor)
  },
  {
    accessorKey: "formaDePagamento",
    header: "Forma de Pagamento"
  },
  {
    accessorKey: "status",
    header: "Status"
  },
  // {
  //   header: "Saldo",
  //   accessorFn: (row,) => row.saldo && brl(row.saldo)
  // },
  
];
