import { IValidDataset } from "../../../common/dataset/types";
import { ValidDataStore } from "../../../common/dataset";
import { LengthInRange } from "../../../common/validation";
import { ConfirmationRule } from "./validation/confirmation-rule";

export type RegistrationDataScheme = Readonly<{
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirmation: string;
}>;

export type RegistrationDataset = IValidDataset<RegistrationDataScheme>;

export const RegistrationDataset$ = Symbol('RegistrationDataset');

export const registrationDataset = {
  username: new ValidDataStore<string>('', { validationRules: [LengthInRange(1, 30)] }),
  firstName: new ValidDataStore<string>('', { validationRules: [LengthInRange(2, 30)] }),
  lastName: new ValidDataStore<string>('', { validationRules: [LengthInRange(2, 30)] }),
  password: new ValidDataStore<string>('', { validationRules: [LengthInRange(6, 50)] }),
} as RegistrationDataset;

// @ts-ignore
registrationDataset.passwordConfirmation = new ValidDataStore<string>('', {
  validationRules: [ConfirmationRule(registrationDataset)],
});
