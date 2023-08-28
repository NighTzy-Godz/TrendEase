import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../actions/apiActions";
import { LoginFormData } from "../../pages/auth/Login";
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
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  token: null,
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

      auth.token = action.payload[0].headers["x-auth-token"];
    },
  },
});

const { authRequest, authRequestFailed, authenticateUser } = slice.actions;

export const loginUser = (data: LoginFormData) =>
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

export default slice.reducer;
