import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../actions/apiActions";

interface UserState {
  info: Record<string, any>;
  error: string;
  loading: boolean;
}

const initialState: UserState = {
  info: {},
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
      user.info.user = action.payload[0];

      user.loading = false;
      user.error = "";
    },
  },
});

const { userRequested, userRequestFailed, userRequestSuccess } = slice.actions;

export const getUserData = () =>
  apiCallBegan({
    urls: ["user/me"],
    method: "GET",
    onStart: userRequested.type,
    onSuccess: userRequestSuccess.type,
    onError: userRequestFailed.type,
  });

export default slice.reducer;
