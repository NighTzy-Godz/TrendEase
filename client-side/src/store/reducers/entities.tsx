import { combineReducers } from "redux";
import authReducer from "../slices/auth";
import productReducer from "../slices/product";
import cartReducer from "../slices/cart";
import checkoutReducer from "../slices/checkout";
import userReducer from "../slices/user";
import orderReducer from "../slices/order";

export default combineReducers({
  auth: authReducer,
  product: productReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  user: userReducer,
  order: orderReducer,
});
