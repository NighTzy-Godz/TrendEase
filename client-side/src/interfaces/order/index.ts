import { UserData } from "../user";
import { ProductData } from "../product";

export enum OrderStatus {
  Processing = "Processing",
  Delivered = "Delivered",
  Recieved = "Recieved",
}

enum PaymentMethod {
  CashOnDelivery = "Cash on Delivery",
  GCash = "GCash",
}

interface ItemData {
  product: ProductData;
  quantity: number;
  price: number;
  productOwner: UserData;
}

export interface OrderStatusValue {
  id: number;
  name: string;
  value: string;
}

export interface OrderData {
  _id: string;
  buyer: UserData;
  item: ItemData;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  shippingAddress: string;
  subTotal: number;
  shippingFee: number;
  tax: number;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateOrderStatusData {
  orderId: string;
  status: OrderStatus;
}
