import { IValidDataset } from "../../../../common/dataset/types";
import { ValidDataStore } from "../../../../common/dataset";
import { LengthInRange } from "../../../../common/validation";

export type UpdateQueueDataScheme = Readonly<{
  name: string;
  address: string;
}>;

export type UpdateQueueDataset = IValidDataset<UpdateQueueDataScheme>;

export const UpdateQueueDataset$ = Symbol('UpdateQueueDataset');

export const updateQueueDataset: UpdateQueueDataset = {
  name: new ValidDataStore<string>('', { validationRules: [LengthInRange(2, 30)] }),
  address: new ValidDataStore<string>('', { validationRules: [LengthInRange(10, 100)] }),
};
