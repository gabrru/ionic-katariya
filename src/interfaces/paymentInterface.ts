export interface ICreateCustomer {
  payment_method: unknown;
  name: string;
  amount: number;
  description: string;
  user_id: string;
  address: string;
  city: string;
  state: string;
  email: string;
  country: string;
  zip: string;
  image: string;
  product_id: string;
  product_name: string;
}

export interface IPayment {
  amount: number;
  name: string;
  payment_method: unknown;
  email: string;
  currency: string;
  user_id: string;
  address_id: number;

}

export interface ICreateOrder {
  amount : number;
  total_amount: number;
  user_id: string;
  address_id: string;
  product_id: string;
  status: string;
  translation_id: string;
  quantity: string;
  email: string;
}

export interface IStripe {
  product: ICreateCustomer[];
}
