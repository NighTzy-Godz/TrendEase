import axios, { AxiosError, AxiosRequestConfig } from "axios";
import {
  apiCallBegan,
  apiCallSuccess,
  apiCallFailed,
} from "../actions/apiActions";
import { toast } from "react-toastify";
import { Middleware } from "redux";

const BASE_URL = import.meta.env.VITE_BASE_URL;
console.log(BASE_URL);

const api: Middleware =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== apiCallBegan.type) return next(action);
    next(action);

    const {
      url,
      method,
      data,
      params,
      successMessage,
      onSuccess,
      onError,
      onStart,
    } = action.payload;

    if (onStart) dispatch({ type: onStart });

    const queryParams: AxiosRequestConfig["params"] = {};
    const config: AxiosRequestConfig = {
      baseURL: BASE_URL,
      url,
      params: queryParams,
      method,
      data,
      headers: {
        "x-auth-token": localStorage.getItem("token") || undefined,
      },
    };

    if (params) {
      config.params = { ...queryParams, ...params };
    }

    try {
      const request = await axios.request(config);
      const data = request.data;
      const status = request.status;

      dispatch(apiCallSuccess({ data }));

      if (onSuccess) dispatch({ type: onSuccess, payload: { data, status } });
      if (successMessage)
        toast.success(successMessage, {
          autoClose: 2500,
        });
    } catch (error) {
      const axiosError = (error as AxiosError).response?.data;

      if (axiosError) {
        toast.error(axiosError as string, {
          autoClose: 2500,
        });
        dispatch(apiCallFailed(axiosError));
      }
      if (onError) dispatch({ type: onError, payload: axiosError });
    }
  };

export default api;
