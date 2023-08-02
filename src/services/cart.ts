import { ICreateSignup, IGetCart } from "../interfaces/cartInterface";
import ApiResponse from "../resources/entity/IApiResponse";
import { http } from "../utils/http";
import endpoint from "../constant/endPoint";

// create Cart
export const createCart = (data: ICreateSignup): Promise<ApiResponse> => {
  return http.post(endpoint.cart.CREATE_CART, data);
};

// get Cart
export const getCart = (data: IGetCart): Promise<ApiResponse> => {
  return http.post(endpoint.cart.GET_CART, data);
};
