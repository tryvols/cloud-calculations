import { ContainerModule } from "inversify";
import { RegistrationDataset$, registrationDataset } from "./registration-dataset";

export const signUpModule = new ContainerModule(bind => {
  bind(RegistrationDataset$).toConstantValue(registrationDataset);
})