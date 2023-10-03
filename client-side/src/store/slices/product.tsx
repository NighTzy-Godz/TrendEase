import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../actions/apiActions";
import { IProductCreate } from "../../pages/Product/ProductCreate";
import { ProductData } from "../../interfaces/product";

interface ProductState {
  error: string;
  loading: boolean;
  products: Array<ProductData>;
  singleProduct: ProductData | null;
  myProducts: ProductData[] | null;
}

const initialState: ProductState = {
  error: "",
  loading: false,
  products: [],
  singleProduct: null,
  myProducts: null,
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
    },

    productsRecieved: (product, action) => {
      product.loading = false;
      product.products = action.payload;
      product.error = "";
    },

    myProductsRecieved: (product, action) => {
      product.loading = false;
      product.myProducts = action.payload;
      product.error = "";
    },

    singleProductRecieved: (product, action) => {
      product.loading = false;
      product.singleProduct = action.payload;
      product.error = "";
    },
  },
});

const {
  productRequested,
  productRequestFailed,
  productCreated,
  productsRecieved,
  myProductsRecieved,
  singleProductRecieved,
} = slice.actions;

export const createProduct = (data: IProductCreate) =>
  apiCallBegan({
    url: "/product/add-product",
    data,
    method: "POST",
    onStart: productRequested.type,
    onSuccess: productCreated.type,
    onError: productRequestFailed.type,
    successMessage: "Successfully Created the Product",
  });

interface ProductParams {
  sort_by: string;
  category: string;
}

export const getAllProducts = (params: ProductParams) =>
  apiCallBegan({
    url: "/product/all-products",
    method: "GET",
    params,
    onStart: productRequested.type,
    onSuccess: productsRecieved.type,
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

export const getSingleProduct = (productId: string) =>
  apiCallBegan({
    url: `/product/${productId}`,
    method: "GET",
    onStart: productRequested.type,
    onSuccess: singleProductRecieved.type,
    onError: productRequestFailed.type,
  });

export default slice.reducer;
