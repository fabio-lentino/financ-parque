import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { TSelectOption } from "@/types/form";

interface SelectFormProps {
  name: string;
  label: string;
  className?: string;
  options: TSelectOption<string | number>[];
}

interface SelectFormRootProps extends SelectFormProps {
  classNameFormItem?: string;
}

export function SelectFormRoot({
  className,
  classNameFormItem,
  label,
  name,
  options = [],
}: SelectFormRootProps) {
  const { control } = useFormContext();

  const findLabel = (value: string | number) => {
    return options.find(
      (option) => option.value?.toString() === value?.toString()
    )?.label;
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className={classNameFormItem}>
            <Label className="sm:text-right">{label}</Label>
            <FormControl>
              <Select
                name={field.name}
                onValueChange={field.onChange}
                value={field.value}
                disabled={field.disabled}
              >
                <SelectTrigger
                  className={cn("col-span-3", className)}
                  onBlur={field.onBlur}
                  ref={field.ref}
                >
                  <div className="w-full text-left">
                    {findLabel(field.value)}
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value?.toString() ?? ""}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
          </div>
          <FormMessage className="text-right" />
        </FormItem>
      )}
    />
  );
}

export function HorizontalSelectForm(props: SelectFormProps) {
  return (
    <SelectFormRoot
      {...props}
      classNameFormItem="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4"
    />
  );
}

export const SelectForm = {
  Root: SelectFormRoot,
  H: HorizontalSelectForm,
};
