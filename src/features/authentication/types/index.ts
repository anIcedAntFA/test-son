import { EUserRole, IdType } from 'src/types';

export interface IUser {
  id: IdType;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: EUserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISimpleUser {
  id: IdType;
  firstName: string;
  lastName: string;
  role: EUserRole;
  status: number;
}

export interface ILoginResponse {
  accessToken: string;
  simpleUser: ISimpleUser;
}

export interface IAuthentication {
  simpleUser: ISimpleUser;
  accessToken: string;
  isAuthenticated: boolean;
}
