import { IValidDataset } from "../../../../common/dataset/types";
import { ValidDataStore } from "../../../../common/dataset";
import { LengthInRange } from "../../../../common/validation";
import { Min } from "../../../../common/validation/rules/min";

export type CreateQueueDataScheme = Readonly<{
  name: string;
  address: string;
  expiresAt: Date | undefined;
  maxVolume: number | undefined;
}>;

export type CreateQueueDataset = IValidDataset<CreateQueueDataScheme>;

export const CreateQueueDataset$ = Symbol('CreateQueueDataset');

export const createQueueDataset: CreateQueueDataset = {
  name: new ValidDataStore<string>('', { validationRules: [LengthInRange(2, 30)] }),
  address: new ValidDataStore<string>('', { validationRules: [LengthInRange(10, 100)] }),
  expiresAt: new ValidDataStore<Date | undefined>(undefined, { validationRules: [] }),
  maxVolume: new ValidDataStore<number | undefined>(undefined, { validationRules: [Min(2)] }),
};
