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
  ADD_A_NEW_SERVICE_IMAGE_REQUEST,
  ADD_A_NEW_SERVICE_IMAGE_SUCCESS,
  ADD_A_NEW_SERVICE_IMAGE_ERROR,
} from "../actionTypes";

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
    case ADD_A_NEW_SERVICE_REQUEST:
    case EDIT_A_SERVICE_REQUEST:
    case DELETE_A_SERVICE_REQUEST:
      return { ...state, isLoading: true, isError: null };
    case GET_ALL_SERVICES_SUCCESS:
      return { isLoading: false, isError: null, allServices: payload };
    case ADD_A_NEW_SERVICE_SUCCESS: {
      let temp = [...state.allServices];
      temp[payload.column - 1].push(payload);
      state = { isLoading: false, isError: null, allServices: temp };
      return state;
    }
    case EDIT_A_SERVICE_SUCCESS: {
      let temp = state.allServices.map((innerArray) =>
        innerArray.map((service) =>
          service.id === payload.id
            ? { ...payload.updatedService }
            : { ...service }
        )
      );
      return (state = { isLoading: false, isError: null, allServices: temp });
    }
    case DELETE_A_SERVICE_SUCCESS:{
      let temp = state.allServices.map(innerArray=>innerArray.filter(service=>service.id!==payload))
      return state = {isLoading:false,isError:null,allServices:temp}
    }
    case GET_ALL_SERVICES_ERROR:
    case ADD_A_NEW_SERVICE_ERROR:
    case EDIT_A_SERVICE_ERROR:
    case DELETE_A_SERVICE_ERROR:
      return { ...state, isLoading: false, isError: payload };

    default:
      return state;
  }
};
const defaultServiceImages = {
  isLoading: false,
  isError: null,
  category: "",
  title: "",
  description: "",
  images: [],
};
export const serviceImagesReducer = (
  state = defaultServiceImages,
  { type, payload }
) => {
  switch (type) {
    case ADD_A_NEW_SERVICE_IMAGE_REQUEST:
      return { ...state, isLoading: true, isError: null };
    case ADD_A_NEW_SERVICE_IMAGE_SUCCESS:
      return { ...state, isLoading: false, isError: null, ...payload };
    case ADD_A_NEW_SERVICE_IMAGE_ERROR:
      return { ...state, isLoading: false, isError: payload };

    default:
      return state;
  }
};
