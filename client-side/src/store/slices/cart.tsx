import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../actions/apiActions";
import { ProductData } from "../../interfaces/product";
import { CartData } from "../../interfaces/cart";

interface CartState {
  error: unknown;
  loading: boolean;
  cart: Array<CartData>;
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
      cart.cart.push(action.payload.data);
    },

    cartQtyChange: (cart, action) => {
      const { _id, qty } = action.payload;
      const index = cart.cart.findIndex((item) => item._id === _id);
      cart.cart[index].quantity = qty;
    },

    allUserCartAdded: (cart, action) => {
      cart.loading = false;
      cart.cart = action.payload.data;
    },

    removeCart: (cart, action) => {
      cart.loading = false;
      console.log(action.payload);
      const newCart = cart.cart.filter(
        (cart) => cart._id !== action.payload.data._id
      );
      cart.cart = newCart;
    },

    resetCart: (cart, action) => {
      cart.cart = [];
    },
  },
});

export const { cartQtyChange, resetCart } = slice.actions;

const {
  cartRequested,
  cartRequestFailed,
  cartAdded,
  allUserCartAdded,
  removeCart,
} = slice.actions;

export const getUserCart = () =>
  apiCallBegan({
    url: "/cart/get-user-cart",
    method: "GET",
    onStart: cartRequested.type,
    onSuccess: allUserCartAdded.type,
    onError: cartRequestFailed.type,
  });

export const addToCart = (productId: string) =>
  apiCallBegan({
    url: "/cart/add-cart",
    method: "POST",
    data: { productId },
    onStart: cartRequested.type,
    onSuccess: cartAdded.type,
    onError: cartRequestFailed.type,
    successMessage: "Successfully added to the cart",
  });

export const deleteCart = (cartId: string) =>
  apiCallBegan({
    url: `/cart/delete-cart/${cartId}`,
    method: "DELETE",
    onStart: cartRequested.type,
    onSuccess: removeCart.type,
    onError: cartRequestFailed.type,
    successMessage: "Successfully removed to the cart",
  });

export default slice.reducer;
