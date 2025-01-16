import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import { allServicesReducer, serviceImagesReducer } from './servicesReducers'
import {thunk} from 'redux-thunk'
import { authReducer } from './authReducer'
const rootReducer = combineReducers({
    allServices : allServicesReducer,
    serviceImages: serviceImagesReducer,
    auth:authReducer
})
export const store = legacy_createStore(rootReducer,applyMiddleware(thunk))

