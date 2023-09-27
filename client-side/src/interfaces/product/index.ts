import { UserData } from "../user";

enum ProductCategory {
  Electronics = "electronics",
  Fashion = "fashion",
  Appliances = "appliances",
  Apparel = "apparel",
  Instruments = "instruments",
  Sports = "sports",
  HealthAndBeauty = "health and beauty",
}

export interface ProductData {
  _id: string;
  availabilty: boolean;
  title: string;
  images: string[];
  desc: string;
  price: number;
  quantity: number;
  ratings: number;
  category: ProductCategory;
  reviews: [];
  sold: number;
  owner: UserData | string;
  relatedProducts: [];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductFilterData {
  id: number;
  name: string;
  value: string;
}
