import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../actions/apiActions";
import { UserData } from "../../interfaces/user";
import { UserUpdateData } from "../../pages/Profile/EditProfile";

interface UserState {
  info: UserData | null;
  error: string;
  loading: boolean;
}

const initialState: UserState = {
  info: null,
  error: "",
  loading: false,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userRequested: (user, action) => {
      user.loading = true;
    },

    userRequestFailed: (user, action) => {
      user.loading = false;
      user.error = action.payload;
    },

    userRequestSuccess: (user, action) => {
      user.info = action.payload[0];

      user.loading = false;
      user.error = "";
    },

    userUpdateSuccess: (user, action) => {
      user.info = action.payload[0];
      (user.loading = false), (user.error = "");
    },
  },
});

const {
  userRequested,
  userRequestFailed,
  userRequestSuccess,
  userUpdateSuccess,
} = slice.actions;

export const getUserData = () =>
  apiCallBegan({
    urls: ["user/me"],
    method: "GET",
    onStart: userRequested.type,
    onSuccess: userRequestSuccess.type,
    onError: userRequestFailed.type,
  });

export const updateUserData = (data: UserUpdateData) =>
  apiCallBegan({
    urls: ["user/update-profile"],
    method: "PUT",
    data,
    onStart: userRequested.type,
    onSuccess: userUpdateSuccess.type,
    onError: userRequestFailed.type,
    successMessage: "Successfully Updated Your Profile!",
  });

export default slice.reducer;
