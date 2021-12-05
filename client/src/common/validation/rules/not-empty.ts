import { ValidationRule } from "../types";

export const NotEmpty: ValidationRule<string> = {
  error: `Must be not empty`,
  condition: (value: string) => !value,
};
