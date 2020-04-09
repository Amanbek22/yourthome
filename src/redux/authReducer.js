
const authData = "SET_DATA";

let initialState = {
        username: '',
        token: '',
        logged: false
}


export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case authData:
            return {
                    username: action.data.username,
                    token: action.data.token,
                    logged: action.logged
                }
        default:
            return {
                ...state
            }
    }
}


export const setData = (data,logged) => {
    return {
        type: authData,
        data,
        logged
    }
}
