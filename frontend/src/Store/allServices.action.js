import {
  GET_ALL_SERVICES_REQUEST,
  GET_ALL_SERVICES_SUCCESS,
  GET_ALL_SERVICES_ERROR,
  ADD_A_NEW_SERVICE_REQUEST,
  ADD_A_NEW_SERVICE_SUCCESS,
  ADD_A_NEW_SERVICE_ERROR,
  EDIT_A_SERVICE_REQUEST,
  EDIT_A_SERVICE_SUCCESS,
  EDIT_A_SERVICE_ERROR,
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
const allServicesError = (message) => {
  return { type: GET_ALL_SERVICES_ERROR, payload: message };
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

const editAServiceRequest = () => {
  return { type: EDIT_A_SERVICE_REQUEST };
};
const editAServiceSuccess =(id,updatedService)=>{
  return {type:EDIT_A_SERVICE_SUCCESS,payload:{id,updatedService}}
}
const editAServiceError =(error)=>{
  return {type:EDIT_A_SERVICE_ERROR,payload:error}
}

const deleteAServiceRequest = ()=>{
  return {type:DELETE_A_SERVICE_REQUEST}
}

const deleteAServiceSuccess=(id)=>{
return {type:DELETE_A_SERVICE_SUCCESS,payload:id}
}

const deleteAServiceError=(error)=>{
  return {type:DELETE_A_SERVICE_ERROR,payload:error}
}

 const getAllServices = () => {
  return async (dispatch) => {
    dispatch(allServicesRequest());
    try {
      const response = await axios.get(
        `${BACKEND_URL}/services/all-categories`
      );
      dispatch(allServicesSuccess(response.data.data));
    } catch (error) {
      dispatch(allServicesError(error.response?.message || error.message));
    }
  };
};

 const addNewService = (newService, openSnackbar, closeAddnewDialog) => {
  return async (dispatch) => {
    dispatch(addNewServiceRequest());
    try {
    const response =   await axios.post(`${BACKEND_URL}/services/all-categories`, newService);
      dispatch(addNewServiceSuccess(response.data.data));
      openSnackbar(
        response.data.message,
        "success"
      );
    } catch (error) {
      dispatch(addNewServiceError(error.response?.message || error.messagge));
      openSnackbar(
        `Failed to ${newService.service} add to column ${newService.column}`,
        "error"
      );
    } finally {
      closeAddnewDialog();
    }
  };
};

 const editAService = (
  id,
  updatedService,
  openSnackbar,
  closeEditServiceDialog
) => {
  return async (dispatch) => {
    dispatch(editAServiceRequest());
    try {
     const response = await axios.patch(
        `${BACKEND_URL}/services/all-categories/${id}`,
        updatedService
      );
      dispatch(editAServiceSuccess(id,updatedService))
      openSnackbar(response.data.message,"success");
    } catch (error) {
      dispatch(editAServiceError)
      openSnackbar(error.response?.message||error.message,'error')
    }finally{
      closeEditServiceDialog()
    }
  };
};

 const deleteAService = (id,openSnackbar,closeDeleteDialog)=>{
  return async (dispatch)=>{
    dispatch(deleteAServiceRequest())
    try {
      const response = await axios.delete(`${BACKEND_URL}/services/all-categories/${id}`)
      dispatch(deleteAServiceSuccess(id))
      openSnackbar(response.data.message,'success')
    } catch (error) {
      dispatch(deleteAServiceError(error.response?.data.message || error.message))
      openSnackbar(error.response?.message||error.message,'error')
    }finally{
      closeDeleteDialog()
    }
  }
}
export {getAllServices,addNewService,editAService,deleteAService}