import { ACTION_TYPES } from "../../constants";

export const loginSuccess = (userData) => {
  return {
    type: ACTION_TYPES.AUTH,
    payload: userData,
  };
};
