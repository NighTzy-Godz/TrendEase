import { combineReducers } from "redux";
import authReducer from "../slices/auth";

export default combineReducers({
  auth: authReducer,
});
