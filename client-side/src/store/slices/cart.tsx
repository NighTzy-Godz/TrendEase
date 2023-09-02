import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../actions/apiActions";

interface CartState {
  error: unknown;
  loading: boolean;
  cart: Array<Record<string, any>>;
}

const initialState: CartState = {
  error: "",
  loading: false,
  cart: [],
};

const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartRequested: (cart, action) => {
      cart.loading = true;
    },

    cartRequestFailed: (cart, action) => {
      cart.loading = false;
      cart.error = action.payload;
    },

    cartAdded: (cart, action) => {
      cart.cart = action.payload;
    },
  },
});

const { cartRequested, cartRequestFailed, cartAdded } = slice.actions;

export const addToCart = (productId: string) =>
  apiCallBegan({
    urls: ["/cart/add-cart"],
    method: "POST",
    data: { productId },
    onStart: cartRequested.type,
    onSuccess: cartAdded.type,
    onError: cartRequestFailed.type,
  });

export default slice.reducer;
