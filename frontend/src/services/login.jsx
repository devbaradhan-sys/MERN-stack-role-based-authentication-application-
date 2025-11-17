/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import { API_ENDPOINTS } from "../constants";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  loggedin: (data) => {
    return axios.post(API_ENDPOINTS.LOGIN, data, {
      headers: { isAuthRequired: true, "Content-Type": "application/json" },
    });
  },
  register: (data) => {
    return axios.post(API_ENDPOINTS.REGISTER, data, {
      headers: { isAuthRequired: true, "Content-Type": "application/json" },
    });
  },
};
