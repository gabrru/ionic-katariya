import * as http from "../utils/http";
import endpoint from "../constant/endPoint";
import ApiResponse from "../resources/entity/IApiResponse";
import { IProduct } from "../interfaces/productInterface";

/**
 * Login request handling
 * @param params ILoginState
 * @returns http post service for user login
 */


export const addProduct = (data: IProduct): Promise<ApiResponse> => {
  return http.post(endpoint.product.ADD_PRODUCT, data);
};


export const manProduct = (): Promise<ApiResponse> => {
  return http.get(endpoint.product.MAN_PRODUCT);
};

export const all_Product = (): Promise<ApiResponse> => {
  return http.get(endpoint.product.ALL_PRODUCT);
};


export const womanProduct = (): Promise<ApiResponse> => {
  return http.get(endpoint.product.WOMAN_PRODUCT);
};


export const electronicProduct = (): Promise<ApiResponse> => {
  return http.get(endpoint.product.ELECTRONIC_PRODUCT);
};


export const homeProduct = (): Promise<ApiResponse> => {
  return http.get(endpoint.product.HOME_PRODUCT);
};









