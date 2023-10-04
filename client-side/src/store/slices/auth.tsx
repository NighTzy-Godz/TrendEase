import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan, apiCallSuccess } from "../actions/apiActions";
import { LoginData } from "../../pages/auth/Login";
import { RegisterValuesData } from "../../pages/auth/Register";
import { ChangePasswordData } from "../../pages/auth/ChangePassword";
import { AddUserAddress, DecodedUserData } from "../../interfaces/user";

interface AuthState {
  loading: boolean;
  error: unknown;
  token: string;
  statusCode: number | null;
  decodedUser: DecodedUserData | null;
}

const initialState: AuthState = {
  loading: false,
  error: null,
  token: "",
  statusCode: null,
  decodedUser: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authRequest: (auth, action) => {
      auth.loading = true;
    },

    authRequestFailed: (auth, action) => {
      auth.loading = false;
      auth.error = action.payload;
    },

    authenticateUser: (auth, action) => {
      auth.loading = false;
      auth.error = "";
      auth.token = action.payload.data;
      auth.statusCode = action.payload.status;
    },

    authChangePass: (auth, action) => {
      auth.loading = false;
      auth.error = "";
      auth.statusCode = action.payload.status;
    },

    setDecodedUser: (auth, action) => {
      auth.decodedUser = action.payload;
    },

    setStatusCode: (auth, action) => {
      auth.statusCode = action.payload;
    },

    updateDecodedUser: (auth, action) => {
      if (auth.decodedUser) {
        auth.decodedUser.address = action.payload.address;
        auth.error = "";
      }
    },
  },
});

export const { setDecodedUser, setStatusCode } = slice.actions;

const {
  authRequest,
  authRequestFailed,
  authenticateUser,
  authChangePass,
  updateDecodedUser,
} = slice.actions;

export const userChangePass = (data: ChangePasswordData) =>
  apiCallBegan({
    url: "/user/change-pass",
    method: "PUT",
    data,
    onStart: authRequest.type,
    onError: authRequestFailed.type,
    onSuccess: authChangePass.type,
    successMessage: `Successfully Changed the Password!`,
  });

export const loginUser = (data: LoginData) =>
  apiCallBegan({
    url: "/user/login",
    method: "POST",
    data,
    onStart: authRequest.type,
    onSuccess: authenticateUser.type,
    onError: authRequestFailed.type,
    successMessage: `Successfully Logged In!`,
  });

export const registerUser = (data: RegisterValuesData) =>
  apiCallBegan({
    url: "/user/register",
    method: "POST",
    data,
    onStart: authRequest.type,
    onError: authRequestFailed.type,
    successMessage: "Successfully Registered the User!",
  });

export const addUserAddress = (data: AddUserAddress) =>
  apiCallBegan({
    url: "/user/add-address",
    method: "POST",
    data,
    onStart: authRequest.type,
    onError: authRequestFailed.type,
    onSuccess: updateDecodedUser.type,
    successMessage: "Successfully Registered the User!",
  });

export default slice.reducer;
