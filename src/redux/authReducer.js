import axios from "axios";

const authData = "SET_DATA";

let initialState = {
        username: '',
        token: '',
        logged: true
}


export const authReducer = (state = initialState, action) => {
    debugger
    switch (action.type) {
        case authData:
            return {
                    username: action.data.username,
                    token: action.data.token,
                    logged: false
                }
        default:
            return {
                ...state
            }
    }
}


export const setData = (data) => {
    debugger
    return {
        type: authData,
        data
    }
}
