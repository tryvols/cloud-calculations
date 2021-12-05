import { ValidationRule } from "../types";

export const MaxLength = (max: number): ValidationRule<string> => {
  return {
    error: `Max length is ${max}`,
    condition: (value: string) => value.length > max,
  };
}
