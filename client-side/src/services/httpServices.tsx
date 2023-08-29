import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.headers.common;

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response.status >= 400 && error.response.status <= 500;

  if (!expectedError) {
    toast.error("Unexpected Error Happened", { autoClose: 2500 });
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};