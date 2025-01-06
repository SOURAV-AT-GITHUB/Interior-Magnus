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

export const defaultAllServices = {
  isLoading: false,
  isError: null,
  allServices: [[], []],
};
export const allServicesReducer = (
  state = defaultAllServices,
  { type, payload }
) => {
  switch (type) {
    case GET_ALL_SERVICES_REQUEST:
      return { ...state, isLoading: true, isError: null };
    case GET_ALL_SERVICES_SUCCESS:
      return { isLoading: false, isError: null, allServices: payload };
    case GET_ALL_SERVICES_ERROR:
      return { ...state, isLoading: false, isError: payload };
    default:
      return state;
  }
};
const defaultServiceImages = {
  isLoading:false,
  isError:null,
  category:"",
  title:"",
  description:"",
  images:[]
}
export const serviceImagesReducer = (state=defaultServiceImages,{type,payload})=>{
switch (type) {
  case ADD_A_NEW_SERVICE_REQUEST: return {...state,isLoading:true,isError:null}
  case ADD_A_NEW_SERVICE_SUCCESS : return {...state,isLoading:false,isError:null,...payload}
  case ADD_A_NEW_SERVICE_ERROR : return {...state,isLoading:false,isError:payload}

  default:
    return state
}
}