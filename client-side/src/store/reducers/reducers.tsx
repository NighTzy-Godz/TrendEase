import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/auth";

export default combineReducers({
  auth: authReducer,
});
