import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../actions/apiActions";
import { OrderData, UpdateOrderStatusData } from "../../interfaces/order";

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
      state.myOrders = action.payload[0];
    },

    myRecievedOrderSuccess: (state, action) => {
      (state.loading = false), (state.myRecievedOrders = action.payload[0]);
    },

    mySoldOrderRequestSuccess: (state, action) => {
      state.loading = false;
      state.mySoldOrders = action.payload[0];
    },

    mySoldOrdersUpdate: (state, action) => {
      state.loading = false;
      const filteredOrder = state.mySoldOrders.filter(
        (item) => item._id !== action.payload[0]._id
      );

      state.mySoldOrders = filteredOrder;
    },

    myOrdersUpdate: (state, action) => {
      state.loading = false;
      const filteredOrder = state.myOrders.filter(
        (item) => item._id !== action.payload[0]._id
      );

      state.myOrders = filteredOrder;
    },
  },
});

const {
  orderRequested,
  orderRequestFailed,
  myRecievedOrderSuccess,
  myOrderRequestSuccess,
  mySoldOrderRequestSuccess,
  mySoldOrdersUpdate,
  myOrdersUpdate,
} = slice.actions;

export const getMyOrders = () =>
  apiCallBegan({
    urls: ["/order/my-orders"],
    method: "GET",
    onStart: orderRequested.type,
    onSuccess: myOrderRequestSuccess.type,
    onError: orderRequestFailed.type,
  });

export const getMySoldOrders = () =>
  apiCallBegan({
    urls: ["/order/my-sold-orders"],
    method: "GET",
    onStart: orderRequested.type,
    onSuccess: mySoldOrderRequestSuccess.type,
    onError: orderRequestFailed.type,
  });

export const getMyRecievedOrders = () =>
  apiCallBegan({
    urls: ["/order/my-recieved-orders"],
    method: "GET",
    onStart: orderRequested.type,
    onSuccess: myRecievedOrderSuccess.type,
    onError: orderRequestFailed.type,
  });

export const orderProcessed = (data: UpdateOrderStatusData) =>
  apiCallBegan({
    urls: ["/order/order-processed"],
    method: "PUT",
    data,
    onStart: orderRequested.type,
    onSuccess: mySoldOrdersUpdate.type,
    onError: orderRequestFailed.type,
    successMessage: `Successfully Flagged the Order as ${data.status}`,
  });

export const orderRecieved = (data: UpdateOrderStatusData) =>
  apiCallBegan({
    urls: ["/order/order-recieved"],
    method: "PUT",
    data,
    onStart: orderRequested.type,
    onSuccess: myOrdersUpdate.type,
    onError: orderRequestFailed.type,
    successMessage: `Successfully Flagged the Order as ${data.status}`,
  });

export default slice.reducer;
