"use client";

import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input, InputProps } from "../ui/input";
import { cn } from "@/lib/utils";

interface InputFormProps {
  name: string;
  label: string;
  className?: string;
}

interface InputFormRootProps extends InputFormProps {
  classNameFormItem?: string;
}

export function InputFormRoot({
  name,
  label,
  className,
  classNameFormItem,
  ...props
}: InputProps & InputFormRootProps) {
  const { control, register } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className={classNameFormItem}>
            <FormLabel className="sm:text-right">{label}</FormLabel>
            <FormControl>
              <Input
                {...register(name, {
                  valueAsNumber: props.type === "number" ? true : false,
                })}
                className={cn("col-span-3", className)}
                {...props}
              />
            </FormControl>
          </div>
          <FormMessage className="text-right" />
        </FormItem>
      )}
    />
  );
}

export function HorizontalInputForm(props: InputProps & InputFormProps) {
  return (
    <InputFormRoot
      {...props}
      classNameFormItem="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4"
    />
  );
}

export const InputForm = {
  Root: InputFormRoot,
  H: HorizontalInputForm,
};
