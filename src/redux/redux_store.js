import {applyMiddleware, combineReducers, createStore, compose} from "redux";
import {googleMapReducer} from "./googleMap_reducer";
import thunk  from 'redux-thunk'
import {authReducer} from "./authReducer";
import {FilterReducer} from "./filterReducer"
import { reducer as formReducer } from 'redux-form'
import {appReducer} from "./appReducer";

let reducers = combineReducers({
    points: googleMapReducer,
    apartment: googleMapReducer,
    data: authReducer,
    filterData: FilterReducer,
    form: formReducer,
    app: appReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

// let store  = createStore(reducers, applyMiddleware(thunk));

window.store = store;

export default store;