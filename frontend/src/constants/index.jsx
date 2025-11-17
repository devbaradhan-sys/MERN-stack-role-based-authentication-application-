// connection configuration
 const apiUrl = "http://localhost:5500";

export const CUSTOM_CONSTANTS = {
  API_BASE_URL: apiUrl
};

export const API_ENDPOINTS = {

LOGIN: `${apiUrl}/login`,
REGISTER: `${apiUrl}/register`,
GET_DASH_DATA:`${apiUrl}/dashboard`,
GET_USER_DETAILS:`${apiUrl}/profile`,
UPDATE_PROFILE:`${apiUrl}/profile`,
STUDENTS_LIST: `${apiUrl}/school/students`,
STUDENT_EDIT: `${apiUrl}/school/editstudent`,
STUDENT_DELETE: `${apiUrl}/school/deletestudent`,
TEACHERS_LIST: `${apiUrl}/school/teachers`,
TEACHER_EDIT: `${apiUrl}/school/editteacher`,
TEACHER_DELETE: `${apiUrl}/school/deleteteacher`,


};

export const ACTION_TYPES = {
  AUTH: "AUTH",
  PROFILE_SETTINGS: "PROFILE_SETTINGS",
  RESTORE_SESSION: "RESTORE_SESSION",
  LOGOUT: "LOGOUT",
};
