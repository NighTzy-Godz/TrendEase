import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/Auth";

export default combineReducers({
  auth: authReducer,
});
