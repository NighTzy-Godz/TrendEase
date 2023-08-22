import http from "./httpServices";
const BASE_URL = "http://localhost:8080/api/user";
import { toast } from "react-toastify";

import { RegisterValuesData } from "../pages/auth/Register";
import { LoginFormData } from "../pages/auth/Login";

export const registerUser = (data: RegisterValuesData): Promise<any> => {
  return http
    .post(`${BASE_URL}/register`, data)
    .then((user) => {
      toast.success("Successfully Created the Account!", { autoClose: 2500 });
      return user;
    })
    .catch((err) => {
      toast.error(err.response.data, { autoClose: 2500 });
      return err;
    });
};

export const loginUser = (data: LoginFormData): Promise<any> => {
  return http
    .post(`${BASE_URL}/login`, data)
    .then((user) => {
      toast.success("Successfully Logged In!", { autoClose: 2500 });
      return user;
    })
    .catch((err) => {
      toast.error(err.response.data, { autoClose: 2500 });
      return err;
    });
};
