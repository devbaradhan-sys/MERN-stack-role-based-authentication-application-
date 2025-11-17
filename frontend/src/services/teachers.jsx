import axiosInstance from "./axios_interceptor";
import { API_ENDPOINTS } from "../constants";

const teachersService = {
   getAll: () => axiosInstance.get(API_ENDPOINTS.TEACHERS_LIST, { headers: { isAuthRequired: true } }),

  
  edit: (data) =>
    axiosInstance.post(API_ENDPOINTS.TEACHER_EDIT, data, { headers: { isAuthRequired: true } }),


  delete: (id) =>
    axiosInstance.delete(`${API_ENDPOINTS.TEACHER_DELETE}/${id}`, { headers: { isAuthRequired: true } })
}

export default teachersService;