import { createSlice } from "@reduxjs/toolkit";

interface User {
  _id: string;
  first_name: string;
  last_name: string;
}

interface AuthState {
  user: null | Partial<User>;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (auth, action) => {
      auth.loading = true;
    },

    loginRequestFailed: (auth, action) => {
      auth.loading = false;
    },

    loginUser: (auth, action) => {
      auth.loading = false;
      auth.user = action.payload;
    },
  },
});

export default slice.reducer;
