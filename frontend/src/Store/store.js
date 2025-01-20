import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import { allServicesReducer, serviceImagesReducer } from './reducers/servicesReducers'
import {thunk} from 'redux-thunk'
import { authReducer } from './reducers/authReducer'
import { contactusFormReducer } from './reducers/contactusformReducer'
const rootReducer = combineReducers({
    allServices : allServicesReducer,
    serviceImages: serviceImagesReducer,
    auth:authReducer,
    contactusForm:contactusFormReducer
})
export const store = legacy_createStore(rootReducer,applyMiddleware(thunk))

