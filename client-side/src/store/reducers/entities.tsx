import { combineReducers } from "redux";
import authReducer from "../slices/auth";
import productReducer from "../slices/product";
export default combineReducers({
  auth: authReducer,
  product: productReducer,
});
