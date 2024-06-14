import { z } from "zod";

export const operators = {
  GREATER_THAN: "gt",
  LESS_THAN: "lt",
  GREATER_THAN_EQUAL: "gte",
  LESS_THAN_EQUAL: "lte",
  EQUAL: "eq",
  NOT_EQUAL: "ne",
};

export const filedOptions = [
  { label: "Marks", value: "marks" },
  { label: "AIR", value: "air" },
  { label: "Application No.", value: "id" },
];

export const operatorOptions = [
  { label: ">", value: operators.GREATER_THAN },
  { label: "<", value: operators.LESS_THAN },
  { label: ">=", value: operators.GREATER_THAN_EQUAL },
  { label: "<=", value: operators.LESS_THAN_EQUAL },
  { label: "=", value: operators.EQUAL },
  { label: "!=", value: operators.NOT_EQUAL },
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
