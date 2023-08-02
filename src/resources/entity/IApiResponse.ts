import { AxiosResponse } from "axios";

export interface StringKeyObject {
  [key: string]: any;
}

export type TApiState = Record<string, any> | null;

export default interface ApiResponse extends Partial<AxiosResponse<any>> {
  data: TApiState;
  error: TApiState;
// eslint-disable-next-line semi
}



