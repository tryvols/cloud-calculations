import { ValidationRule } from "../../../../common/validation/types";
import { RegistrationDataset } from "../registration-dataset";

type ConfirmationRuleBuilder = (dataset: RegistrationDataset) => ValidationRule<string>;

export const ConfirmationRule: ConfirmationRuleBuilder = dataset => ({
    error: `Password confirmation must be equals with password`,
    condition: () => dataset.password.value !== dataset.passwordConfirmation.value,
  });
