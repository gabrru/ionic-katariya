import { ISignup } from "./authInterface";
import { IProduct } from "./productInterface";

export interface ICreateSignup{
    user_id : undefined;
    product_id : number;
    quantity : number
};


export interface IGetCart {
    user_id : unknown
};

export interface IBuyCartOne {
  quantity: number;
  product_id: IProduct;
  signup_id: unknown;
  user_id: ISignup;
}




