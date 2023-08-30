import axios, { AxiosError, AxiosRequestConfig } from "axios";
import {
  apiCallBegan,
  apiCallSuccess,
  apiCallFailed,
} from "../actions/apiActions";
import { toast } from "react-toastify";
import { Dispatch, Middleware } from "redux";

const api: Middleware =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== apiCallBegan.type) return next(action);
    next(action);

    const {
      urls,
      method,
      data,
      params,
      successMessage,
      onSuccess,
      onError,
      onStart,
    } = action.payload;

    if (onStart) dispatch({ type: onStart });

    const requests = urls.map((url: string) => {
      const queryParams: AxiosRequestConfig["params"] = {};
      const config: AxiosRequestConfig = {
        baseURL: "http://localhost:8080/api",
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

      return axios.request(config);
    });

    try {
      const responses = await Promise.all(requests);
      const responseData = responses.map((response) => response.data);

      dispatch(apiCallSuccess(responseData));
      console.log(responseData);
      if (onSuccess) dispatch({ type: onSuccess, payload: responseData[0] });
      if (successMessage) toast.success(successMessage, { autoClose: 2500 });
    } catch (error) {
      const axiosError = (error as AxiosError).response?.data;

      if (axiosError) {
        toast.error(axiosError as string, { autoClose: 2500 });
        dispatch(apiCallFailed(axiosError));
      }
      if (onError) dispatch({ type: onError, payload: axiosError });
    }
  };

export default api;
