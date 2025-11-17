/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import axiosInstance from "./axios_interceptor"
import { API_ENDPOINTS } from "../constants";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getUserDetails: () => {
    return axiosInstance.get(API_ENDPOINTS.GET_USER_DETAILS, {
      headers: { isAuthRequired: true, "Content-Type": "application/json" },
    });
  },
updateProfile: (formData) => {
  return axiosInstance.put(API_ENDPOINTS.UPDATE_PROFILE, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      isAuthRequired: true,
    },
  });
},
};
