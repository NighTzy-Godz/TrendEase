import { OrderData } from "../order";
import { UserData } from "../user";

export interface ReviewSubmitData {
  orderId: string;
  content: string;
  rating: number;
}
export interface ReviewFilterData {
  id: number;
  name: string;
  value: boolean;
}

export interface ReviewData {
  _id: string;
  orderPost: OrderData;
  reviewOwner: UserData;
  rating: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
