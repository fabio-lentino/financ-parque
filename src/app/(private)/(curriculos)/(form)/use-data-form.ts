"use client";

import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { initialFormData } from "./initial-form-data";
import { Model, config } from "../config";

interface UseDataFormProps {
  dataToUpdate?: Partial<Model>;
}

export function useDataForm({ dataToUpdate }: UseDataFormProps) {
  const save = !!dataToUpdate ? config.actions.update : config.actions.create;

  const { toast } = useToast();

  const methods = useForm({
    defaultValues: dataToUpdate || initialFormData,
  });

  const onSubmit = async (data: any) => {
    const response = await save(data);
    response?.error
      ? toast({
          title: config.conteudo.formulario.erroAoSalvar,
          description: response.error,
          variant: "destructive",
        })
      : toast({
          title: config.conteudo.formulario.sucessoAoSalvar,
          variant: "success",
        });
  };

  return {
    methods,
    onSubmit,
  };
}
