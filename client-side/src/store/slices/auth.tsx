import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../actions/apiActions";
import { LoginData } from "../../pages/auth/Login";
import { RegisterValuesData } from "../../pages/auth/Register";

interface User {
  _id: string;
  first_name: string;
  last_name: string;
}

interface AuthState {
  user: null | Partial<User>;
  loading: boolean;
  error: unknown;
  token: unknown;
  decodedUser: unknown;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  token: null,
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
      auth.token = action.payload;
    },

    setUserInfo: (auth, action) => {
      auth.user = action.payload;
    },
  },
});

const { authRequest, authRequestFailed, authenticateUser, setUserInfo } =
  slice.actions;

export const loginUser = (data: LoginData) =>
  apiCallBegan({
    urls: ["/user/login"],
    method: "POST",
    data,
    onStart: authRequest.type,
    onSuccess: authenticateUser.type,
    onError: authRequestFailed.type,
    successMessage: `Successfully Logged In!`,
  });

export const registerUser = (data: RegisterValuesData) =>
  apiCallBegan({
    urls: ["user/register"],
    method: "POST",
    data,
    onStart: authRequest.type,
    onError: authRequestFailed.type,
    successMessage: "Successfully Registered the User!",
  });

export const getUserData = () =>
  apiCallBegan({
    urls: ["user/me"],
    method: "GET",
    onStart: authRequest.type,
    onSuccess: setUserInfo.type,
    onError: authRequestFailed.type,
  });

export default slice.reducer;
