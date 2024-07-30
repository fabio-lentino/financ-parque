"use client";

import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { TSelectOption } from "@/types/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { useCallback, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

interface ComboboxFormProps {
  name: string;
  label: string;
  className?: string;
  options: TSelectOption<string | number>[];
}

interface ComboboxFormRootProps extends ComboboxFormProps {
  classNameFormItem?: string;
}

export function ComboboxFormRoot({
  className,
  classNameFormItem,
  label,
  name,
  options = [],
}: ComboboxFormRootProps) {
  const [open, setOpen] = useState(false);
  const { control } = useFormContext();

  const findLabel = useCallback(
    (value: string | number) => {
      return options.find(
        (option) => option.value?.toString() === value?.toString()
      )?.label;
    },
    [options]
  );

  const filterInputValue = useCallback(
    (value: string | number, search: string) =>
      findLabel(value)?.toLowerCase().includes(search?.toLowerCase()) ? 1 : 0,
    [findLabel]
  );

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className={classNameFormItem}>
            <Label className="sm:text-right">{label}</Label>
            <FormControl>
              <Popover open={open} onOpenChange={setOpen} modal={true}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="col-span-3 justify-between"
                    disabled={field.disabled}
                  >
                    <div className="w-full text-left">
                      {findLabel(field.value)}
                    </div>
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 max-w-[60vw]" align="start">
                  <Command filter={filterInputValue}>
                    <CommandInput />
                    <CommandEmpty>Não encontrado.</CommandEmpty>
                    <CommandGroup>
                      <ScrollArea className="h-[300px]">
                        {options.map((option) => (
                          <CommandItem
                            key={option.value}
                            value={option.value?.toString() ?? ""}
                            onSelect={(currentValue) => {
                              field.onChange(
                                currentValue === field.value ? "" : currentValue
                              );
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                field.value?.toString() ===
                                  option.value?.toString()
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {option.label}
                          </CommandItem>
                        ))}
                      </ScrollArea>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormControl>
          </div>
          <FormMessage className="text-right" />
        </FormItem>
      )}
    />
  );
}

export function HorizontalComboboxForm(props: ComboboxFormProps) {
  return (
    <ComboboxFormRoot
      {...props}
      classNameFormItem="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4"
    />
  );
}

export const ComboboxForm = {
  Root: ComboboxFormRoot,
  H: HorizontalComboboxForm,
};
