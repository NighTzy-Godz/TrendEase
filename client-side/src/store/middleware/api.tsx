import axios, { AxiosError, AxiosRequestConfig } from "axios";
import {
  apiCallBegan,
  apiCallSuccess,
  apiCallFailed,
} from "../actions/apiActions";
import { toast } from "react-toastify";
import { Middleware } from "redux";

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
      baseURL: "http://localhost:8080/api",
      url,
      params: queryParams,
      method,
      data,
      headers: {
        "x-auth-token": localStorage.getItem("token") || undefined,
        "Content-Type": "multipart/form-data",
      },
    };

    if (params) {
      config.params = { ...queryParams, ...params };
    }

    const request = await axios.request(config);

    try {
      const responseData = request.data;

      dispatch(apiCallSuccess(responseData));

      if (onSuccess) dispatch({ type: onSuccess, payload: responseData });
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
