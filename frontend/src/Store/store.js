import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import { allServicesReducer, serviceImagesReducer } from './servicesReducers'
import {thunk} from 'redux-thunk'
const rootReducer = combineReducers({
    allServices : allServicesReducer,
    serviceImages: serviceImagesReducer
})
export const store = legacy_createStore(rootReducer,applyMiddleware(thunk))

