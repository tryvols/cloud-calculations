import { ValidationRule } from "../types";

export const Min = (min: number): ValidationRule<number | undefined> => {
  return {
    error: `Min value is ${min}`,
    condition: (value: number = min) => value < min,
  };
}
