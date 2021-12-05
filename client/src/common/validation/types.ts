
export type ValidationRule<T> = Readonly<{
  error: string;
  condition: (val: T) => boolean;
}>;
