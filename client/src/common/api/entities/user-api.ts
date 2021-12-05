import { injectable, inject } from "inversify";
import { API$ } from "..";
import { AxiosInstance } from "axios";
import { UserPayload } from "../types";
import { LoginDataScheme } from "../../../pages/auth/signin/login-dataset";
import { ITokenData } from '../../auth/token';
import { RegistrationDataScheme } from "../../../pages/auth/signup/registration-dataset";

@injectable()
export class UserApi {
  @inject(API$)
  private readonly api!: AxiosInstance;

  async me(): Promise<UserPayload> {
    const { data } = await this.api.get('users/me');
    return data;
  }

  async login(data: LoginDataScheme): Promise<ITokenData> {
    const response = await this.api.post('auth/login', data);
    const { access_token, expiresAt } = response.data;
    return { token: access_token, expiresAt };
  }

  async registration(data: RegistrationDataScheme): Promise<void> {
    await this.api.post('auth/registration', data);
  }
}