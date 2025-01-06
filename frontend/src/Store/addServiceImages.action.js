import {
  ADD_A_NEW_SERVICE_IMAGE_REQUEST,
  ADD_A_NEW_SERVICE_IMAGE_SUCCESS,
  ADD_A_NEW_SERVICE_IMAGE_ERROR,
} from "./actionTypes";
import axios from 'axios'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const request = () => {
  return {type: ADD_A_NEW_SERVICE_IMAGE_REQUEST}
};
const success = (data) =>{
    return {type:ADD_A_NEW_SERVICE_IMAGE_SUCCESS,payload:data}
}
const error = (data)=>{
    return {type:ADD_A_NEW_SERVICE_IMAGE_ERROR,payload:data}
}
const addNewServiceImage =(newImageData)=>{
return async (dispatch)=>{
    dispatch(request())
    try {
        await axios.post(`${BACKEND_URL}/services/categories/${newImageData.category}`)
        dispatch(success())
    } catch (error) {
        dispatch(error())
    }
}
}