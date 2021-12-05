import { ValidationRule } from "../types";

export const MinLength = (min: number): ValidationRule<string> => {
  return {
    error: `Min length is ${min}`,
    condition: (value: string) => value.length < min,
  };
}
