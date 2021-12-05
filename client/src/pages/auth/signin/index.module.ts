import { ContainerModule } from "inversify";
import { LoginDataset, loginDataset, LoginDataset$ } from "./login-dataset";

export const signInModule = new ContainerModule(bind => {
  bind<LoginDataset>(LoginDataset$).toConstantValue(loginDataset);
})