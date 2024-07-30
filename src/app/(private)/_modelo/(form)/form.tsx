"use client";

import { InputForm } from "@/components/form/input-form";
import { Button } from "@/components/ui/button";
import { FormProvider } from "react-hook-form";
import { useDataForm } from "./use-data-form";
import { Model } from "../config";
import { DatepickerForm } from "@/components/form/datepicker-form";
import { SelectForm } from "@/components/form/select-form";

interface FormProps {
  dataToUpdate?: Partial<Model>;
}

export function Form({ dataToUpdate }: FormProps) {
  const { methods, onSubmit } = useDataForm({ dataToUpdate });
  return (
    <FormProvider {...methods}>
      <form
        className="grid gap-4 py-4 pr-2"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        {/* Adicione os itens do formulário aqui */}
        {/* Finalize os itens do formulário aqui */}
        {/* Modelo de código para inserir SELECT: */}
        {/* <SelectForm.H name="categoria" label="Categoria" options={[
          { label: "Receita", value: "Receita" },
          { label: "Despesa", value: "Despesa" },
        ]} /> */}
        <div className="flex justify-end">
          <Button className="w-32" type="submit">
            Salvar
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
