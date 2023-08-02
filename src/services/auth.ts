import * as http from "../utils/http";
import {
  IFacebook,
  IForgetPassword,
  ILoginData,
  IResetPassword,
  ISignup,
  IUserInfo,
  IVerifyOtpParams,
} from "../interfaces/authInterface";
import endpoint from "../constant/endPoint";
import ApiResponse from "../resources/entity/IApiResponse";
import { IAddress } from "../interfaces/commonInterface";
/**
 * Login request handling
 * @param params ILoginState
 * @returns http post service for user login
 */

export const signUp = (data: ISignup): Promise<ApiResponse> => {
  return http.post(endpoint.auth.SIGNUP, data);
};

export const login = (data: ILoginData): Promise<ApiResponse> => {
  return http.post(endpoint.auth.LOGIN, data);
};

export const googleLogin = (data: string): Promise<ApiResponse> => {
  return http.post(endpoint.auth.GOOGLE, data);
};

export const faceBookLogin = (data: IFacebook): Promise<ApiResponse> => {
  return http.post(endpoint.auth.FACEBOOK, data);
};

export const forgetPassword = (data: IForgetPassword): Promise<ApiResponse> => {
  return http.post(endpoint.auth.FORGOT_PASSWORD, data);
};

export const verifyOtp = (data: IVerifyOtpParams): Promise<ApiResponse> => {
  return http.post(endpoint.auth.VERIFY_OTP, data);
};

/**
 * Reset password request
 * @param params IResetPasswordParams
 * @returns http post service for reset password
 */
export const resetPassword = (data: IResetPassword): Promise<ApiResponse> =>
  http.patch(endpoint.auth.RESET_PASSWORD, data);

/**
 * Reset password request
 * @param params IResetPasswordParams
 * @returns http post service for reset password
 */
export const insertAddress = (data: IAddress): Promise<ApiResponse> =>
  http.post(endpoint.auth.CREATE_ADDRESS, data);
/**
 * Reset password request
 * @param params IResetPasswordParams
 * @returns http post service for reset password
 */
export const userInfo = (data: IUserInfo): Promise<ApiResponse> =>
  http.post(endpoint.auth.GET_ADDRESS, data);
