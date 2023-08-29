import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../actions/apiActions";
import { IProductCreate } from "../../pages/Product/ProductCreate";

const slice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    products: [],
  },
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
  },
});

const { productRequested, productRequestFailed, productCreated } =
  slice.actions;

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
