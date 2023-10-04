import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../actions/apiActions";
import { OrderData, UpdateOrderStatusData } from "../../interfaces/order";
import { ReviewSubmitData } from "../../interfaces/review";

interface OrderState {
  myOrders: Array<OrderData>;
  mySoldOrders: Array<OrderData>;
  myRecievedOrders: OrderData[];

  loading: boolean;
  error: string;
}

const initialState: OrderState = {
  myOrders: [],
  mySoldOrders: [],
  myRecievedOrders: [],
  loading: false,
  error: "",
};

const slice = createSlice({
  name: "order",
  initialState,
  reducers: {
    orderRequested: (state, action) => {
      state.loading = true;
    },

    orderRequestFailed: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    myOrderRequestSuccess: (state, action) => {
      state.loading = false;
      state.error = "";
      state.myOrders = action.payload.data;
    },

    myOrdersUpdate: (state, action) => {
      state.loading = false;
      const filteredOrder = state.myOrders.filter(
        (item) => item._id !== action.payload._id
      );

      state.myOrders = filteredOrder;
    },

    mySoldOrderRequestSuccess: (state, action) => {
      state.loading = false;
      state.error = "";
      state.mySoldOrders = action.payload.data;
    },

    mySoldOrdersUpdate: (state, action) => {
      state.loading = false;
      state.error = "";
      const filteredOrder = state.mySoldOrders.filter(
        (item) => item._id !== action.payload._id
      );

      state.mySoldOrders = filteredOrder;
    },

    myRecievedOrderSuccess: (state, action) => {
      (state.loading = false), (state.myRecievedOrders = action.payload);
      state.error = "";
    },

    myRecievedOrderUpdate: (state, action) => {
      state.loading = false;
      state.error = "";
      const filteredOrder = state.myRecievedOrders.filter((item) => {
        return item._id !== action.payload.orderPost;
      });

      state.myRecievedOrders = filteredOrder;
    },
  },
});

const {
  orderRequested,
  orderRequestFailed,
  myRecievedOrderSuccess,
  myRecievedOrderUpdate,
  myOrderRequestSuccess,
  myOrdersUpdate,
  mySoldOrderRequestSuccess,
  mySoldOrdersUpdate,
} = slice.actions;

export const getMyOrders = () =>
  apiCallBegan({
    url: "/order/my-orders",
    method: "GET",
    onStart: orderRequested.type,
    onSuccess: myOrderRequestSuccess.type,
    onError: orderRequestFailed.type,
  });

export const getMySoldOrders = () =>
  apiCallBegan({
    url: "/order/my-sold-orders",
    method: "GET",
    onStart: orderRequested.type,
    onSuccess: mySoldOrderRequestSuccess.type,
    onError: orderRequestFailed.type,
  });

export const getMyRecievedOrders = () =>
  apiCallBegan({
    url: "/order/my-recieved-orders",
    method: "GET",
    onStart: orderRequested.type,
    onSuccess: myRecievedOrderSuccess.type,
    onError: orderRequestFailed.type,
  });

export const orderProcessed = (data: UpdateOrderStatusData) =>
  apiCallBegan({
    url: "/order/order-processed",
    method: "PUT",
    data,
    onStart: orderRequested.type,
    onSuccess: mySoldOrdersUpdate.type,
    onError: orderRequestFailed.type,
    successMessage: `Successfully Flagged the Order as ${data.status}`,
  });

export const orderRecieved = (data: UpdateOrderStatusData) =>
  apiCallBegan({
    url: "/order/order-recieved",
    method: "PUT",
    data,
    onStart: orderRequested.type,
    onSuccess: myOrdersUpdate.type,
    onError: orderRequestFailed.type,
    successMessage: `Successfully Flagged the Order as ${data.status}`,
  });

export const orderReviewed = (data: ReviewSubmitData) =>
  apiCallBegan({
    url: "/review/add-review",
    data,
    method: "POST",
    onStart: orderRequested.type,
    onSuccess: myRecievedOrderUpdate.type,
    onError: orderRequestFailed.type,
    successMessage: `Successfully added the review`,
  });

export default slice.reducer;
