import { Container } from "inversify";
import { signInModule } from "./auth/signin/index.module";
import { signUpModule } from "./auth/signup/index.module";
import { pagesStoresModule } from "./stores/pages-stores.module";

export const bindPages = (container: Container) => {
  container.load(signInModule);
  container.load(signUpModule);
  container.load(pagesStoresModule);
}
