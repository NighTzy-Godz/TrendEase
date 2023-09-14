import { ProductData } from "../product";

export interface CartData {
  _id: string;
  user: string;
  item: ProductData;
  quantity: number;
}
