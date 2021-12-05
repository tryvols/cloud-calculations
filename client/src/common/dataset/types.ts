import { DataStore } from "./data-store";
import { ValidDataStore } from "./valid-data-store";
import { ValidationRule } from "../validation/types";

// Dataset types

export interface IDataScheme {
  readonly [key: string]: boolean | string | number | Date | undefined;
}

export type IDataset<T extends IDataScheme> = {
  readonly [P in keyof T]: DataStore<T[P]>;
}

export type IValidDataset<T extends IDataScheme> = {
  readonly [P in keyof T]: ValidDataStore<T[P]>;
}

export type WithValidDataStore<T> = {
  readonly validDataStore: ValidDataStore<T>;
};

// Data store types

export type Transformer<T> = (value: T) => T;

export type DataStoreOptions<T> = Readonly<{
  transformers?: ReadonlyArray<Transformer<T>>;
}>;

export type ValidDataStoreOptions<T> = DataStoreOptions<T> & Readonly<{
  validationRules?: ReadonlyArray<ValidationRule<T>>;
}>;
