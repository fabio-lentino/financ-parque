import { ColumnDef } from "@tanstack/react-table";
import { RowActions } from "./row-actions";
import { Model } from "../config";
import { format } from "date-fns";
import { brl } from "@/lib/format";

export const columns: ColumnDef<Partial<Model>, any>[] = [
  { id: "actions", cell: ({ row }) => <RowActions row={row} /> },
  { accessorKey: "id", header: "ID" },
];
