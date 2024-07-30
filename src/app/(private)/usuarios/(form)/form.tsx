"use client";

import { InputForm } from "@/components/form/input-form";
import { Button } from "@/components/ui/button";
import { FormProvider } from "react-hook-form";
import { useDataForm } from "./use-data-form";
import { Model } from "../config";
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
        <InputForm.H name="name" label="Nome" required />
        <InputForm.H name="email" label="Email" required />
        <InputForm.H name="password" label="Senha" type="password" />
        <SelectForm.H
          name="role"
          label="Função"
          options={[
            { label: "ADMIN", value: "ADMIN" },
            { label: "EDITOR", value: "EDITOR" },
          ]}
        />

        <div className="flex justify-end">
          <Button className="w-32" type="submit">
            Salvar
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
