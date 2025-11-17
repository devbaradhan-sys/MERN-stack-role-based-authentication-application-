import axios from "axios";
import store from "../../redux/store";
import { CUSTOM_CONSTANTS } from '../../constants';

const axiosInstance = axios.create({
  baseURL: CUSTOM_CONSTANTS.API_BASE_URL ,
});

// ✅ Interceptor to attach token automatically
axiosInstance.interceptors.request.use(
  (config) => {
    const { auth } = store.getState();
    const token = auth?.token; // assuming your redux stores token here

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
