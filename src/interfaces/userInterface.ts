import { IAddress } from "./commonInterface";

export interface IUserInterface {
  id: number;
  account_type: string;
  name : string;
  email: string;
  phone?: string;
  company_name?: string;
  image?: string;
  address?: IAddress;
  order_status: string;
  is_active: number;
  is_verified: number;
  token: string;
  isActive: number;
  membership_plan: number;
}
