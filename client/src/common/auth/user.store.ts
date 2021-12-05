import { inject, injectable, postConstruct } from "inversify";
import { UserPayload } from "../api/types";
import { UserApi } from "../api/entities/user-api";
import { observable, action, computed } from "mobx";
import { Token } from "./token";

@injectable()
export class UserStore {
  @inject(UserApi)
  private readonly userApi!: UserApi;

  @postConstruct()
  private async init(): Promise<void> {
    if (Token.isValid()) {
      await this.load();
    }
  }

  @observable
  private _user?: UserPayload;

  @computed
  get user(): UserPayload | undefined {
    return this._user;
  }

  async get(): Promise<UserPayload> {
    if (!this._user) {
      await this.load();
    }
    return this._user as UserPayload;
  }

  @action
  async load(): Promise<void> {
    this._user = await this.userApi.me();
  }
}
