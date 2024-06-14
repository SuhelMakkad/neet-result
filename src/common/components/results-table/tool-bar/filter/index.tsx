import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { useFilters } from "@/hooks/use-filters";

import { FilterIcon, Plus, Trash } from "lucide-react";
import { Form, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  defaultFormState,
  filterFormSchema,
  FormValues,
  FilterState,
  ErrorFiled,
  filedOptions,
  operatorOptions,
  defaultState,
} from "./schema";

export const Filter = () => {
  const [open, setOpen] = useState(false);
  const { filters, updateFilters } = useFilters();
  const form = useForm<FormValues>({
    resolver: zodResolver(filterFormSchema),
    defaultValues: { filters: filters.length ? [...filters] : [defaultState] },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "filters",
  });

  const onSubmit = (values: FormValues) => {
    updateFilters(values.filters);
    setOpen(false);
  };

  const handleChangeFilter = <TKey extends keyof FilterState>(
    index: number,
    key: keyof FormValues["filters"][number],
    value: FilterState[TKey]
  ) => {
    form.setValue(`filters.${index}.${key}`, value);
  };

  const getErrorsMessage = (index: number) => {
    const fieldError = form.getFieldState(`filters.${index}.field`).error as ErrorFiled;
    const operatorError = form.getFieldState(`filters.${index}.operator`).error as ErrorFiled;
    const valueError = form.getFieldState(`filters.${index}.value`).error as ErrorFiled;

    const filedErrorMsg = fieldError?.message || "";
    const operatorErrorMsg = operatorError?.message || "";
    const valueErrorMsg = valueError?.message || "";

    return filedErrorMsg || operatorErrorMsg || valueErrorMsg;
  };

  return (
    <Popover
      open={open}
      onOpenChange={(state) => {
        setOpen(state);
        form.reset({ filters: filters.length ? [...filters] : [defaultState] });
      }}
    >
      <PopoverTrigger asChild>
        <Button size="sm" variant="secondary" className={"gap-2 relative"}>
          <FilterIcon className="w-4 h-4" />
          Filter
          {!!filters.length && (
            <span className="text-[0.55rem] grid place-content-center absolute top-0 right-0 w-3.5 h-3.5 bg-primary text-background rounded-full shadow-md translate-x-1 -translate-y-1">
              {filters.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto mr-2 md:mr-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
            {fields.map((filter, index) => (
              <div key={filter.id}>
                <div className="flex items-center gap-2">
                  <Select
                    defaultValue={filter.field}
                    onValueChange={(value) => handleChangeFilter(index, "field", value)}
                  >
                    <SelectTrigger className="w-28 shrink-0">
                      <SelectValue placeholder="Field" />
                    </SelectTrigger>
                    <SelectContent>
                      {filedOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    defaultValue={filter.operator}
                    onValueChange={(value) => handleChangeFilter(index, "operator", value)}
                  >
                    <SelectTrigger className="md:w-28 w-[6.5rem] shrink-0">
                      <SelectValue placeholder="Operator" />
                    </SelectTrigger>
                    <SelectContent>
                      {operatorOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Input
                    type="number"
                    placeholder="Value"
                    className="md:w-28 w-20 shrink-0"
                    defaultValue={filter.value}
                    onBlur={(e) =>
                      handleChangeFilter(index, "value", e.target.value ? +e.target.value : "")
                    }
                  />

                  {index === fields.length - 1 ? (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-5 h-5"
                      onClick={() => append({ ...defaultState })}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-5 h-5"
                      onClick={() => remove(index)}
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <FormMessage className="mt-2">{getErrorsMessage(index)}</FormMessage>
              </div>
            ))}

            <div className="mt-4 flex justify-end gap-2">
              <Button
                type="button"
                size="sm"
                variant={"ghost"}
                onClick={() => {
                  updateFilters([]);
                  setOpen(false);
                }}
              >
                Reset
              </Button>
              <Button size="sm">Apply</Button>
            </div>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
};
