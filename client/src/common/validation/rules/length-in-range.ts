import { ValidationRule } from "../types";

export const LengthInRange = (min: number, max: number): ValidationRule<string> => {
  return {
    error: `Length must be from ${min} to ${max} symbols`,
    condition: (value: string) => value.length < min || value.length > max,
  };
}
