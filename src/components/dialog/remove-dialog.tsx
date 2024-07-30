"use client";

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

interface RemoveDialogProps {
  removeFn: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  title?: string;
  description?: string;
}

export function RemoveDialogContent({
  removeFn,
  description,
  title,
}: RemoveDialogProps) {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{title ? title : "Tem certeza?"}</AlertDialogTitle>
        <AlertDialogDescription>
          {description
            ? description
            : "Tem certeza que deseja remover esse(s) registro(s)? Essa operação não poderá ser revertida."}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction
          onClick={removeFn}
          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          data-test="remove-dialog-confirm"
        >
          Remover
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
