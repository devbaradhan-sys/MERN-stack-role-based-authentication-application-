import axiosInstance from "./axios_interceptor";
import { API_ENDPOINTS } from "../constants";

const studentsService = {
  getAll: () =>
    axiosInstance.get(API_ENDPOINTS.STUDENTS_LIST, {
      headers: { isAuthRequired: true },
    }),

  update: (data) =>
    axiosInstance.post(API_ENDPOINTS.STUDENT_EDIT, data, {
      headers: { isAuthRequired: true },
    }),

  delete: (id) =>
    axiosInstance.delete(`${API_ENDPOINTS.STUDENT_DELETE}/${id}`, {
      headers: { isAuthRequired: true },
    }),
};

export default studentsService;
