import { ISignup } from "./authInterface";



export interface IProduct {
  id? : unknown, 
  image: string;
  prize: number;
  discount: number;
  product_name: string;
  signup: unknown;
  product_category: string;
  description: string;
  quantity? : number
}

export interface IShowCart {
  id: string;
  created_date: string;
  quantity: number;
  product_id: IProduct[];
  user_id: ISignup[]
}

export interface IByAllProduct {
  address_id?: string;
  amount: number;
  product_id: string;
  user_id: string;
  quantity: string;
}



