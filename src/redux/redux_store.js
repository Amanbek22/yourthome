import {applyMiddleware, combineReducers, createStore} from "redux";
import {googleMapReducer} from "./googleMap_reducer";
import thunk  from 'redux-thunk'
import {authReducer} from "./authReducer";
import {FilterReducer} from "./filterReducer"


let reducers = combineReducers({
    points: googleMapReducer,
    apartment: googleMapReducer,
    data: authReducer,
    filterData: FilterReducer,
})

let store  = createStore(reducers, applyMiddleware(thunk));

window.store = store;

export default store;