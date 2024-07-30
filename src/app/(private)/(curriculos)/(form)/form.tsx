"use client";

import { InputForm } from "@/components/form/input-form";
import { Button } from "@/components/ui/button";
import { FormProvider } from "react-hook-form";
import { useDataForm } from "./use-data-form";
import { Model } from "../config";
import { DatepickerForm } from "@/components/form/datepicker-form";
import { SelectForm } from "@/components/form/select-form";
import { Label } from "@radix-ui/react-dropdown-menu";

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
        <DatepickerForm.H name="data" label="Data" />
      <SelectForm.H name="descricao" label="Descrição" options={[
        { label: "Diária", value: "Diária" },
        { label: "Salário", value: "Salário" },
      ]} />
      <InputForm.H name="item" label="Item" />
      <SelectForm.H  name="conta" label="Conta" options={[
        { label: "Receita", value: "Receita" },
        { label: "Despesa", value: "Despesa" },
      ]} />
      <InputForm.H name="valor" label="Valor" type="number" min="0" step="0.01" />
      <SelectForm.H name="formaDePagamento" label="Forma de Pagamento" options={[
        { label: "Dinheiro", value: "Dinheiro" },
        { label: "Cartão", value: "Cartão" },
        { label: "Pix", value: "Pix" },
      ]}/>
      <SelectForm.H name="status" label="Status" options={[
        { label: "Pago", value: "Pago" },
        { label: "Em aberto", value: "Em aberto" },
      ]} />
      {/* <InputForm.H name="saldo" label="Saldo" type="number" min="0" step="0.01" /> */}
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
