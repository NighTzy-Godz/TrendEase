import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers/reducers";
import api from "./middleware/api";

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api),
});

export default store;
