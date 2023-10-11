import { createSlice } from "@reduxjs/toolkit";
import { ReviewData } from "../../interfaces/review";
import { apiCallBegan } from "../actions/apiActions";

interface ReviewState {
  myReviews: ReviewData[];
  productReview: ReviewData[];
  loading: boolean;
  error: string;
}

const initialState: ReviewState = {
  myReviews: [],
  productReview: [],
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
        (state.myReviews = action.payload.data);
    },

    productReviewSuccess: (state, action) => {
      state.loading = false;
      state.error = "";
      state.productReview = action.payload.data;
    },
  },
});

const {
  reviewRequested,
  reviewRequestFailed,
  reviewRequestSuccess,
  productReviewSuccess,
} = slice.actions;

export const getMyReviews = () =>
  apiCallBegan({
    url: "/review/myReviews",
    onStart: reviewRequested.type,
    onError: reviewRequestFailed.type,
    onSuccess: reviewRequestSuccess.type,
  });

export const getProductReviews = (productId: string) =>
  apiCallBegan({
    url: `/review/${productId}`,
    onStart: reviewRequested.type,
    onError: reviewRequestFailed.type,
    onSuccess: productReviewSuccess.type,
  });

export default slice.reducer;
