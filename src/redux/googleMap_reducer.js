const setPoints = "SET_POINTS"
const addPoint = "ADD_POINT"
const selected = "SELECTED_ITEM"

let initialState = {
    points: [],
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
        case addPoint:
            return {
                points: [...state.points, ...action.item]
            }
        case selected:
            return {
                selectedPark: [...action.item]
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
export const addPoints = (point) => {
    return {
        type: addPoint,
        item: point
    }
}
export const setSelected = item => {
    return {
        type: selected,
        item
    }
}