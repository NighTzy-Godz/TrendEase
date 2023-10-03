import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../actions/apiActions";

export interface CheckoutItemsData {
  product: string;
  quantity: number;
  price: number;
  productOwner: string;
}

interface AddOrderData {
  checkoutItems: Array<CheckoutItemsData>;
  paymentMethod: string;
  fromCart: boolean;
}

interface CheckoutState {
  checkoutItems: Array<CheckoutItemsData>;
  paymentMethod: string;
  loading: boolean;
  error: unknown;
  submitted: boolean;
}

const initialState: CheckoutState = {
  checkoutItems: [],
  paymentMethod: "",
  loading: false,
  error: null,
  submitted: false,
};

const slice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    checkoutRequested: (state, action) => {
      state.loading = true;
      state.submitted = true;
    },

    checkoutRequestFailed: (state, action) => {
      state.loading = false;
      state.submitted = false;
      state.error = action.payload;
    },

    checkoutSuccess: (state, action) => {
      state.loading = false;
      state.submitted = false;
      state.error = null;
      state.checkoutItems = [];
      state.paymentMethod = "";
    },

    setCheckoutBuyNow: (state, action) => {
      state.checkoutItems = action.payload;
    },

    setCheckoutItems: (state, action) => {
      state.checkoutItems = action.payload;
    },

    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },

    setSubmitted: (state, action) => {
      state.submitted = action.payload;
    },
  },
});

export const {
  setCheckoutItems,
  setPaymentMethod,
  setCheckoutBuyNow,
  setSubmitted,
} = slice.actions;

const { checkoutRequested, checkoutRequestFailed, checkoutSuccess } =
  slice.actions;

export const addOrder = (data: AddOrderData) =>
  apiCallBegan({
    url: "/order/add-order",
    method: "POST",
    data,
    onStart: checkoutRequested.type,
    onSuccess: checkoutSuccess.type,
    onError: checkoutRequestFailed.type,
    successMessage: "Successfully checked out the items!",
  });

export default slice.reducer;
