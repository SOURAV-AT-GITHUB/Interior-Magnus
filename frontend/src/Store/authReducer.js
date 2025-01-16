import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR,LOGIN_EXPIRED } from "./actionTypes";

const defaultState = {
  isLoading: false,
  isError: null,
  token: JSON.parse(localStorage.getItem("token")) || null,
};
export const authReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case LOGIN_REQUEST:
      return { ...state, isLoading: true, isError: null };
    case LOGIN_SUCCESS: {
        localStorage.setItem('token',JSON.stringify(payload))
      return (state = { isLoading: false, isError: null, token: payload });
    }
    case LOGIN_ERROR:
    case LOGIN_EXPIRED: {
      state = {...state,isLoading:false,isError:payload.message}
      if(payload.status === 401) {
        localStorage.removeItem('token')
        state = {...state,token:null}}
      return state
    }
    default:
      return state;
  }
};
