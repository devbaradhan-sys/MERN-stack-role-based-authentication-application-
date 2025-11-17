/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import axiosInstance from "./axios_interceptor"
import { API_ENDPOINTS } from "../constants";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getdashboarddata: () => {
    return axiosInstance.get(API_ENDPOINTS.GET_DASH_DATA, {
      headers: { isAuthRequired: true, "Content-Type": "application/json" },
    });
  }
};
