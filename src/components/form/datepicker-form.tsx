import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { format, isValid, parseISO } from "date-fns";

interface DatepickForm {
  name: string;
  label: string;
  className?: string;
}

interface DatepickFormRootProps extends DatepickForm {
  classNameFormItem?: string;
}

export function DatepickFormRoot({
  className,
  classNameFormItem,
  label,
  name,
  ...props
}: DatepickFormRootProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, ...field } }) => {
        return (
          <FormItem>
            <div className={classNameFormItem}>
              <Label className="sm:text-right">{label}</Label>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  value={value ? format(value, "yyyy-MM-dd") : ""}
                  onChange={(e) => {
                    const date = parseISO(e.target.value);
                    if (isValid(date)) field.onChange(date);
                  }}
                  className={cn("col-span-3", className)}
                  {...props}
                />
              </FormControl>
            </div>
            <FormMessage className="text-right" />
          </FormItem>
        );
      }}
    />
  );
}

export function HorizontalDatepickerForm(props: DatepickForm) {
  return (
    <DatepickFormRoot
      {...props}
      classNameFormItem="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4"
    />
  );
}

export const DatepickerForm = {
  Root: DatepickFormRoot,
  H: HorizontalDatepickerForm,
};
