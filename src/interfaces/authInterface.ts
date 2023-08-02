import { IAddress } from "./commonInterface";

export interface ISignup {
  name: string;
  email: string;
  phone: number;
  password: string;
  confirm_password: string;
  account_type: string;
}

export interface IUserInfo {
  user_id: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string | number;
  country?: string;
  user?: ISignup;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface FbData {
  height: number;
  is_silhouette: boolean;
  url: string;
  width: number;
}
export interface IFbPicture {
  data: FbData[];
}

export interface IFacebook {
  name: string;
  email: string;
  picture: IFbPicture[];
  accessToken: string;
  id: string;
  userID: string;
}

export interface IForgetPassword {
  email: string;
}

export interface IVerifyOtpParams {
  email: string;
  dotp: number;
  otp: number;
}

export interface IResetPassword {
  email?: string;
  password: string;
  confirm_password: string;
}


