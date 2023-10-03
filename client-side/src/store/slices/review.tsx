import { createSlice } from "@reduxjs/toolkit";
import { ReviewData } from "../../interfaces/review";
import { apiCallBegan } from "../actions/apiActions";

interface ReviewState {
  myReviews: ReviewData[];
  loading: boolean;
  error: string;
}

const initialState: ReviewState = {
  myReviews: [],
  loading: false,
  error: "",
};

const slice = createSlice({
  name: "review",
  initialState,
  reducers: {
    reviewRequested: (state, action) => {
      state.loading = true;
    },

    reviewRequestFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    reviewRequestSuccess: (state, action) => {
      (state.loading = false),
        (state.error = ""),
        (state.myReviews = action.payload);
    },
  },
});

const { reviewRequested, reviewRequestFailed, reviewRequestSuccess } =
  slice.actions;

export const getMyReviews = () =>
  apiCallBegan({
    url: "/review/myReviews",
    onStart: reviewRequested.type,
    onError: reviewRequestFailed.type,
    onSuccess: reviewRequestSuccess.type,
  });

export default slice.reducer;
