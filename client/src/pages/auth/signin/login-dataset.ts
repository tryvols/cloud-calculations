import { IValidDataset } from "../../../common/dataset/types";
import { ValidDataStore } from "../../../common/dataset";
import { NotEmpty } from "../../../common/validation/rules/not-empty";

export type LoginDataScheme = Readonly<{
  username: string;
  password: string;
}>;

export type LoginDataset = IValidDataset<LoginDataScheme>;

export const LoginDataset$ = Symbol('LoginDataset');

export const loginDataset: LoginDataset = {
  username: new ValidDataStore<string>('', { validationRules: [NotEmpty] }),
  password: new ValidDataStore<string>('', { validationRules: [NotEmpty] }),
};
