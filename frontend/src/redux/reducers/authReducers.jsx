import { ACTION_TYPES } from "../../constants";

const initialState = {
  isAuthenticated: false,
  token: null,
  user: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.AUTH:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.userdetails,
      };

    case ACTION_TYPES.RESTORE_SESSION:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.user,
      };

    case ACTION_TYPES.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: null,
      };

    default:
      return state;
  }
}
