export interface UserData {
  _id: string;
  pfp: string;
  cover_photo: string;
  bio: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  balance: string;
  password: string;
  customer_orders: [];
}

export interface DecodedUserData {
  _id: string;
  full_name: string;
  address: string;
}

export interface AddUserAddress {
  address: string;
}
