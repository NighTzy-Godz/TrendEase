import { combineReducers } from "redux";
import authReducer from "../slices/auth";
import productReducer from "../slices/product";
import cartReducer from "../slices/cart";
import checkoutReducer from "../slices/checkout";
import userReducer from "../slices/user";
import orderReducer from "../slices/order";
import reviewReducer from "../slices/review";

export default combineReducers({
  auth: authReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  order: orderReducer,
  product: productReducer,
  review: reviewReducer,
  user: userReducer,
});
