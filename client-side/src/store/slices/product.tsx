import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../actions/apiActions";
import { IProductCreate } from "../../pages/Product/ProductCreate";

interface ProductState {
  loading: boolean;
  products: Array<Record<string, any>>;
  singleProduct: Record<string, any>;
}

const initialState: ProductState = {
  loading: false,
  products: [],
  singleProduct: {},
};

const slice = createSlice({
  name: "product",
  initialState,
  reducers: {
    productRequested: (product, action) => {
      product.loading = true;
    },

    productRequestFailed: (product, action) => {
      product.loading = false;
    },

    productCreated: (product, action) => {
      product.loading = false;
    },

    productsRecieved: (product, action) => {
      product.loading = false;
      product.products = action.payload;
    },

    singleProductRecieved: (product, action) => {
      product.loading = false;
      product.singleProduct = action.payload;
    },
  },
});

const {
  productRequested,
  productRequestFailed,
  productCreated,
  productsRecieved,
  singleProductRecieved,
} = slice.actions;

export const createProduct = (data: IProductCreate) =>
  apiCallBegan({
    urls: ["/product/add-product"],
    data,
    method: "POST",
    onStart: productRequested.type,
    onSuccess: productCreated.type,
    onError: productRequestFailed.type,
    successMessage: "Successfully Created the Product",
  });

export const getAllProducts = () =>
  apiCallBegan({
    urls: ["/product/all-products"],
    method: "GET",
    onStart: productRequested.type,
    onSuccess: productsRecieved.type,
    onError: productRequestFailed.type,
  });

export const getSingleProduct = (productId: string) =>
  apiCallBegan({
    urls: [`/product/${productId}`],
    method: "GET",
    onStart: productRequested.type,
    onSuccess: singleProductRecieved.type,
    onError: productRequestFailed.type,
  });

export default slice.reducer;
