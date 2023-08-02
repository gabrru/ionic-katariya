import { ICreateOrder, IPayment } from "../interfaces/paymentInterface";
import ApiResponse from "../resources/entity/IApiResponse";
import { http } from "../utils/http";
import endpoint from "../constant/endPoint";

/**
 * Login request handling
 * @param params ILoginState
 * @returns http post service for user login
 */
export const create_payment = (data: IPayment): Promise<ApiResponse> => {
  return http.post(endpoint.payment.CREATE_PAYMENT, data);
};

export const create_order = (data: ICreateOrder): Promise<ApiResponse> => {
  return http.post(endpoint.payment.CREATE_ORDER, data);
};
export const create_all_order = (data: any): Promise<ApiResponse> => {
  return http.post(endpoint.payment.CREATE_ALL_ORDER, data);
};
