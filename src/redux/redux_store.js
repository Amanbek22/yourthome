import {applyMiddleware, combineReducers, createStore} from "redux";
import {googleMapReducer} from "./googleMap_reducer";
import thunk  from 'redux-thunk'


let reducers = combineReducers({
    points: googleMapReducer,
    apartment: googleMapReducer
})

let store  = createStore(reducers, applyMiddleware(thunk));

window.store = store;

export default store;