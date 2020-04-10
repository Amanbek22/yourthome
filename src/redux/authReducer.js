import api from "../api/api";

const authData = "SET_DATA";

let initialState = {
        logged: false
}


export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case authData:
            return {
                ...state,
                logged: action.logged
                }
        default:
            return {
                ...state
            }
    }
}


export const setData = (logged) => {
    return {
        type: authData,
        logged
    }
}

export const getUserData = (login,password) => (dispatch) => {
    return api.signIn({
        'username': login,
        'password': password
    }).then(
        res => {
            localStorage.setItem("userData", JSON.stringify(res.data));
            api.signInWithRefresh()
                .then(res=>{
                    localStorage.setItem("newToken", JSON.stringify(res.data));
                    let logged = true
                    dispatch(setData(logged))
                })
        }
        // error => {
        //     stopSubmit('login', {_error: "Login or password was Not correct"})
        // }
    )
}

export const setDataRefresh = () => (dispatch) => {
    return api.signInWithRefresh()
        .then(res=>{
            localStorage.setItem("newToken", JSON.stringify(res.data));
            let logged = true
            dispatch(setData(logged))
        })
}