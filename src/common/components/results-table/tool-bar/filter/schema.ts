import { z } from "zod";

export const filedOptions = [
  { label: "Marks", value: "marks" },
  { label: "AIR", value: "air" },
  { label: "Application No.", value: "id" },
];

export const operatorOptions = [
  { label: ">", value: "gt" },
  { label: "<", value: "lt" },
  { label: ">=", value: "gte" },
  { label: "<=", value: "lte" },
  { label: "=", value: "eq" },
  { label: "!=", value: "ne" },
];

export const defaultState = {
  field: "",
  operator: "",
  value: 0,
};

export const defaultFormState = {
  filters: [{ ...defaultState }],
};

export const filtersSchema = z.array(
  z.object({
    field: z
      .string({
        required_error: "Field is required",
      })
      .trim()
      .min(1, {
        message: "Field is required",
      }),
    operator: z
      .string({
        required_error: "Operator is required",
      })
      .trim()
      .min(1, {
        message: "Operator is required",
      }),
    value: z.coerce
      .number({
        required_error: "Value is required",
        invalid_type_error: "Value must be a number",
      })
      .min(0, {
        message: "Value must be greater than 0",
      }),
  })
);

export const filterFormSchema = z.object({
  filters: filtersSchema,
});

export type FiltersSchema = z.infer<typeof filtersSchema>;

export type FilterState = z.infer<typeof filterFormSchema>["filters"][number];

export type FormValues = z.infer<typeof filterFormSchema>;

export type ErrorFiled = { message: string };
