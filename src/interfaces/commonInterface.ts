import { IProduct } from "./productInterface";

export interface IAddress {
  address_line_2?: string;
  address_line_1?: string;
  address?: string;
  city?: string;
  state?: string;
  zip: string | number;
  country?: string;
  lat?: number;
  lng?: number;
}

export interface IUserOrder {
  user_id?: number;
  address_id?: IAddress;
  quantity: number;
  shipping_status: string;
  order_date: number;
  product_id: IProduct;
}
