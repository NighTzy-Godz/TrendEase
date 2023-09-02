import { combineReducers } from "redux";
import authReducer from "../slices/auth";
import productReducer from "../slices/product";
import cartReducer from "../slices/cart";

export default combineReducers({
  auth: authReducer,
  product: productReducer,
  cart: cartReducer,
});
