import { IDataset, IDataScheme, IValidDataset } from "./types";

export class DatasetUtils {
  static serialize<T extends IDataScheme>(dataset: IDataset<T>): T {
    return Object.keys(dataset).reduce<T>((acc, key: keyof T) => {
      acc[key] = dataset[key].value as T[keyof T];
      return acc;
    }, {} as T);
  }

  static isValid<T extends IDataScheme>(dataset: IValidDataset<T>): boolean {
    const keys = Object.keys(dataset).filter(key => !dataset[key].validate());
    return keys.length === 0;
  }

  static reset<T extends IDataScheme>(dataset: IValidDataset<T>): void {
    Object.keys(dataset).forEach(key => dataset[key].reset());
  }
}