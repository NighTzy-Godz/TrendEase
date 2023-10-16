import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../actions/apiActions";
import {
  ProductCreateData,
  ProductEditData,
  ProductParams,
} from "../../interfaces/product";
import { ProductData } from "../../interfaces/product";

interface ProductState {
  error: string;
  loading: boolean;
  statusCode: number | null;

  products: Array<ProductData>;
  singleProduct: ProductData | null;
  myProducts: ProductData[] | null;
  latestProducts: ProductData[];
  topProducts: ProductData[];
}

const initialState: ProductState = {
  error: "",
  statusCode: null,
  loading: false,

  products: [],
  singleProduct: null,
  myProducts: null,
  latestProducts: [],
  topProducts: [],
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
      product.error = action.payload;
    },

    productCreated: (product, action) => {
      product.loading = false;
      product.error = "";
      product.statusCode = action.payload.status;
    },

    productsRecieved: (product, action) => {
      product.loading = false;
      product.products = action.payload.data;
      product.error = "";
    },

    myProductsRecieved: (product, action) => {
      product.loading = false;
      product.myProducts = action.payload.data;
      product.error = "";
    },

    singleProductRecieved: (product, action) => {
      product.loading = false;
      product.singleProduct = action.payload.data;
      product.error = "";
    },

    singleProductUpdated: (product, action) => {
      product.loading = false;
      product.singleProduct = action.payload.data;
      product.error = "";
      product.statusCode = action.payload.status;
    },

    latestProductsRecieved: (product, action) => {
      product.loading = false;
      product.error = "";
      product.latestProducts = action.payload.data;
    },
    topProductsRecieved: (product, action) => {
      product.loading = false;
      product.error = "";
      product.topProducts = action.payload.data;
    },

    setStatusCode: (product, action) => {
      product.statusCode = action.payload;
    },
  },
});

export const { setStatusCode } = slice.actions;

const {
  latestProductsRecieved,
  productRequested,
  productRequestFailed,
  productCreated,
  productsRecieved,
  myProductsRecieved,
  singleProductRecieved,
  singleProductUpdated,
  topProductsRecieved,
} = slice.actions;

export const getLatestProducts = () =>
  apiCallBegan({
    url: "/product/latestProducts",
    method: "GET",
    onStart: productRequested.type,
    onSuccess: latestProductsRecieved.type,
    onError: productRequestFailed.type,
  });

export const getTopProducts = () =>
  apiCallBegan({
    url: "/product/topProducts",
    method: "GET",
    onStart: productRequested.type,
    onSuccess: topProductsRecieved.type,
    onError: productRequestFailed.type,
  });

export const getAllProducts = (params: ProductParams) =>
  apiCallBegan({
    url: "/product/all-products",
    method: "GET",
    params,
    onStart: productRequested.type,
    onSuccess: productsRecieved.type,
    onError: productRequestFailed.type,
  });

export const getSingleProduct = (productId: string) =>
  apiCallBegan({
    url: `/product/single-product/${productId}`,
    method: "GET",
    onStart: productRequested.type,
    onSuccess: singleProductRecieved.type,
    onError: productRequestFailed.type,
  });

export const getMyProducts = () =>
  apiCallBegan({
    url: "/product/my-products",
    method: "GET",
    onStart: productRequested.type,
    onSuccess: myProductsRecieved.type,
    onError: productRequestFailed.type,
  });

export const updateProduct = (data: ProductEditData, productId: string) =>
  apiCallBegan({
    url: `/product/edit-product/${productId}`,
    data,
    method: "PUT",
    onStart: productRequested.type,
    onSuccess: singleProductUpdated.type,
    onError: productRequestFailed.type,
    successMessage: "Product has been successfully updated!",
  });

export const createProduct = (data: ProductCreateData) =>
  apiCallBegan({
    url: "/product/add-product",
    data,
    method: "POST",
    onStart: productRequested.type,
    onSuccess: productCreated.type,
    onError: productRequestFailed.type,
    successMessage: "Successfully Created the Product",
  });

export default slice.reducer;
