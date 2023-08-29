import axios, { AxiosResponse } from "axios";
import { getAccessToken } from "../helper/storage";
import ApiResponse from "../resources/entity/IApiResponse";
// import config from "../config/config";

export const http = axios.create({
  baseURL: "http://localhost:5000",
  // baseURL: "https://7u7e1zi4xe.execute-api.us-east-1.amazonaws.com/dev",
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use((req: any) => {
  if (getAccessToken) req.headers.authorization = `Bearer ${getAccessToken()}`;

  return req;
});

interface IGetResult {
  success: boolean;
  data : unknown;
  message : string;
  error? : string | unknown;
}

export function get<P>(url: string, params?: P): Promise<ApiResponse> {
  return http({
    method: "get",
    url,
    params,
  });
}

export function post<D, P>(url: string, data: D, params?: P): any {
  return http({
    method: "post",
    url,
    data,
    params,
  });
}

export function postFile<D, P>(url: string, data: D, params?: P): any {
  return http({
    method: "post",
    headers: { "Content-Type": "multipart/form-data" },
    url,
    data,
    params,
  });
}

export function put<D, P>(url: string, data: D, params?: P): any {
  return http({
    method: "put",
    url,
    data,
    params,
  });
}

export function patch<D, P>(url: string, data: D, params?: P): any {
  return http({
    method: "patch",
    url,
    data,
    params,
  });
}

export function remove<P>(url: string, params?: P): any {
  return http({
    method: "delete",
    url,
    params,
  });
}
