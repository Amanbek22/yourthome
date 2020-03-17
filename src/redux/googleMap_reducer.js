import axios from "axios";

const setPoints = "SET_POINTS";
const setAllPoints = "SET_ALL_POINTS";
const chooseApartmentAC = "CHOOSE_APARTMENT";


let initialState = {
    points: [],
    allPoints: [],
    apartment: 0,
}


export const googleMapReducer = (state = initialState, action) => {
    switch (action.type) {
        case setPoints:
            if (state.points.length === 0) {
                return {
                    ...state,
                    points: [...state.points, ...action.points],
                }

            } else {
                return {
                    ...state,
                    points: [...action.points],
                }
            }
        case setAllPoints:
            if (state.allPoints.length === 0){
                return{
                    ...state,
                    allPoints: [...state.allPoints, ...action.points]
                }
            } else {
                return {
                    ...state,
                    allPoints: [...action.points]
                }
            }
        case chooseApartmentAC:
            return {
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
export const setAllPointsAC = (points) => {
    return {
        type: setAllPoints,
        points: points
    }
}
export const setApartment = apartment => {
    return {
        type: chooseApartmentAC,
        apartment
    }
}

export let getApartment = () => (dispatch) => {
    axios.get("https://yourthomeneobis2.herokuapp.com/apartments")
        .then(res => {
            console.log(res)
            dispatch(setPoint(res.data))
        })
}