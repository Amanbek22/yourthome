import {setData, setDataRefresh} from "./authReducer";

const INITIALIZE_SUCCEED = "INITIALIZE_SUCCEED";

let initialState = {
        initialise: false
}


export const appReducer = (state = initialState, action) => {

    switch (action.type) {
        case INITIALIZE_SUCCEED:
            return {
                ...state,
                initialise: true
                }
        default:
            return {
                ...state
            }
    }
}


export const initializeSuccess = () => {
    return {
        type: INITIALIZE_SUCCEED
    }
}


export const initializeApp = () => (dispatch) => {
    let data = JSON.parse(localStorage.getItem('userData'));
    if (!data){
        dispatch(initializeSuccess())
    } else{
        let promise = dispatch(setDataRefresh())
        Promise.all([promise]).then(()=> {
            dispatch(initializeSuccess())
        })
    }
}
