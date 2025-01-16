import axios from "axios";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR,LOGIN_EXPIRED } from "./actionTypes";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const loginRequest = () => {
  return { type: LOGIN_REQUEST };
};
const loginSuccess = (payload) => {
  return { type: LOGIN_SUCCESS, payload };
};
const loginError = (payload) => {
  return { type: LOGIN_ERROR, payload };
};
export const loginExpired = (payload)=>{
  return {type:LOGIN_EXPIRED,payload}
  }
export const adminLogin = (email, password, openSnackBar) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      const response = await axios.post(`${BACKEND_URL}/admin/login`, {
        email,
        password,
      });
      dispatch(loginSuccess( response.data.token ));
      openSnackBar(response.data.message, "success");
    } catch (error) {
      dispatch(
        loginError({
          message: error.response?.data.message || error.message,
          status: error.status,
        })
      );
      openSnackBar(error.response?.data.message || error.message, "error");
    }
  };
};
