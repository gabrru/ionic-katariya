import ApiResponse from "../resources/entity/IApiResponse";
import { http } from "../utils/http";
import endpoint from "../constant/endPoint";
import { IUserOrder } from "../interfaces/commonInterface";



export const getUserOrder = (data: IUserOrder): Promise<ApiResponse> => {
  return http.post(endpoint.order.GET_USER_ORDER, data);
};






