import {
  GET_ALL_SERVICES_REQUEST,
  GET_ALL_SERVICES_SUCCESS,
  GET_ALL_SERVICES_ERROR,
  ADD_A_NEW_SERVICE_REQUEST,
ADD_A_NEW_SERVICE_SUCCESS,
ADD_A_NEW_SERVICE_ERROR,
UPATE_A_SERVICE_REQUEST,
UPATE_A_SERVICE_SUCCESS,
UPATE_A_SERVICE_ERROR,
DELETE_A_SERVICE_REQUEST,
DELETE_A_SERVICE_SUCCESS,
DELETE_A_SERVICE_ERROR,
} from "./actionTypes";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const allServicesRequest = () => {
  return { type: GET_ALL_SERVICES_REQUEST };
};
const allServicesSuccess = (data) => {
  return { type: GET_ALL_SERVICES_SUCCESS, payload: data };
};
const allServicesError = () => {
  return { type: GET_ALL_SERVICES_ERROR };
};

const addNewServiceRequest = () => {
  return { type: ADD_A_NEW_SERVICE_REQUEST };
};
const addNewServiceSuccess = (data) => {
  return { type: ADD_A_NEW_SERVICE_SUCCESS, payload: data };
};
const addNewServiceError = () => {
  return { type: ADD_A_NEW_SERVICE_ERROR };
};
export const getAllServices = () => {
  return async (dispatch) => {
    dispatch(allServicesRequest());
    try {
      const response = await axios.get(
        `${BACKEND_URL}/services/all-categories`
      );
      dispatch(allServicesSuccess(response.data.data));
    } catch (error) {
      dispatch(
        allServicesError(
          error.response ? error.response.message : error.message
        )
      );
    }
  };
};
export const addNewService = (newService,openSnackbar,closeAddnewDialog)=>{
  return async (dispatch) =>{
    dispatch(addNewServiceRequest())
try {
  await axios.post(`${BACKEND_URL}/services/all-categories`, newService);
  dispatch(addNewServiceSuccess(newService))
  openSnackbar(
    `${newService.service} added to column ${newService.column}`,
    'success'
  );
} catch (error) {
  dispatch(addNewServiceError( error.response.message || error.messagge  ))
  openSnackbar(
    `Failed to ${newService.service} add to column ${newService.column}`,
    'error'
  );
}finally{
  closeAddnewDialog()
}
  }
}
