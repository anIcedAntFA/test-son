import { HTTPClient } from 'src/libraries';
import { IdType } from 'src/types';
import { IAuthentication, ILoginResponse, IUser } from 'src/features/authentication/types';

class AuthenticationAPI extends HTTPClient {
  private static classInstance: AuthenticationAPI;

  protected constructor() {
    super(`${import.meta.env.VITE_APP_SERVER_BASE_URL}/auth`);
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new AuthenticationAPI();
    }

    return this.classInstance;
  }

  async registerUser(
    newUser: Pick<IUser, 'firstName' | 'lastName' | 'email' | 'password'>,
  ): Promise<IdType> {
    const res: IdType = await this.axiosInstance({
      method: 'POST',
      url: '/register',
      data: newUser,
    });

    return res;
  }

  async loginUser(userAuthenticate: Pick<IUser, 'email' | 'password'>): Promise<IAuthentication> {
    const res: IAuthentication = await this.axiosInstance({
      method: 'POST',
      url: '/authenticate',
      data: userAuthenticate,
    });

    return res;
  }
}

export default AuthenticationAPI;
