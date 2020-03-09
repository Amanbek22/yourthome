import axios from "axios";

const setPoints = "SET_POINTS";
const chooseApartmentAC = "CHOOSE_APARTMENT";

let initialState = {
    points: [],
    apartment: 0,
}


export const googleMapReducer = (state = initialState, action) => {
    switch (action.type) {
        case setPoints:
            if (state.points.length === 0) {
                return {
                    points: [...state.points, ...action.points]
                }
            } else {
                return{
                    points: [...action.points]
                }
            }
        case chooseApartmentAC:
            return{
                ...state,
                apartment: [action.apartment]
            }
        default:
            return {
                ...state
            }
    }
}


export const setPoint = (points) => {
    return {
        type: setPoints,
        points: points
    }
}
export const setApartment = apartment => {
    return {
        type: chooseApartmentAC,
        apartment
    }
}

export let getApartment = () => (dispatch) =>{
    axios.get("https://yourthomeneobis2.herokuapp.com/apartments")
        .then(res => {
            console.log(res)
            dispatch(setPoint(res.data))
        })
}