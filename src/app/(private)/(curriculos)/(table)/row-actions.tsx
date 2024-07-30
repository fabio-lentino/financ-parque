import { RowActionDropdown } from "@/components/table/action-dropdown";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Edit, Trash } from "lucide-react";
import { SheetForm } from "@/components/form/sheet-form";
import { Form } from "../(form)/form";
import { RemoveDialogContent } from "@/components/dialog/remove-dialog";
import { Row } from "@tanstack/react-table";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { config } from "../config";

export function RowActions({ row }: { row: Row<any> }) {
  return (
    <AlertDialog>
      <Sheet>
        <RowActionDropdown>
          <SheetTrigger asChild>
            <DropdownMenuItem data-test="row-edit-action">
              <Edit className="mr-2 h-4 w-4" /> Abrir
            </DropdownMenuItem>
          </SheetTrigger>
          <AlertDialogTrigger data-test="row-remove-action">
            <DropdownMenuItem>
              <Trash className="mr-2 h-4 w-4" /> Excluir
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </RowActionDropdown>
        <SheetForm.Content
          title={config.conteudo.formulario.tituloEdicao}
          description={config.conteudo.formulario.descricaoEdicao}
        >
          <Form dataToUpdate={row.original} />
        </SheetForm.Content>
      </Sheet>
      <RemoveDialogContent
        removeFn={() => config.actions.remove(row.original.id)}
      />
    </AlertDialog>
  );
}
