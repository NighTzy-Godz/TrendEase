import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../actions/apiActions";
import { LoginData } from "../../pages/auth/Login";
import { RegisterValuesData } from "../../pages/auth/Register";
import { ChangePasswordData } from "../../pages/auth/ChangePassword";
import { DecodedUserData } from "../../interfaces/user";

interface AuthState {
  loading: boolean;
  error: unknown;
  token: string;
  decodedUser: DecodedUserData | null;
}

const initialState: AuthState = {
  loading: false,
  error: null,
  token: "",
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
      auth.token = action.payload[0];
    },

    authChangePass: (auth, action) => {
      auth.loading = false;
      auth.error = "";
    },

    setDecodedUser: (auth, action) => {
      auth.decodedUser = action.payload;
    },
  },
});

export const { setDecodedUser } = slice.actions;

const { authRequest, authRequestFailed, authenticateUser } = slice.actions;

export const userChangePass = (data: ChangePasswordData) =>
  apiCallBegan({
    urls: ["/user/change-pass"],
    method: "PUT",
    data,
    onStart: authRequest.type,
    onError: authRequestFailed.type,
    successMessage: `Successfully Changed the Password!`,
  });

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

export default slice.reducer;
