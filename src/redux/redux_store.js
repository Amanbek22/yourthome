import {applyMiddleware, combineReducers, createStore} from "redux";
import {googleMapReducer} from "./googleMap_reducer";
import thunk  from 'redux-thunk'
import {authReducer} from "./authReducer";
import {FilterReducer} from "./filterReducer"
import { reducer as formReducer } from 'redux-form'

let reducers = combineReducers({
    points: googleMapReducer,
    apartment: googleMapReducer,
    data: authReducer,
    filterData: FilterReducer,
    form: formReducer,
})

let store  = createStore(reducers, applyMiddleware(thunk));

window.store = store;

export default store;