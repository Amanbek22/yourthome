
const SET_FILTER_DATA = 'SET_DATA';


const initialState = {
    city: '',
    dateFrom: '',
    dateTo: '',
    rooms: 0,
    priceFrom: '',
    priceTo: '',
}


export const FilterReducer = (state = initialState,action) => {
    debugger
    switch (action.type){
        case SET_FILTER_DATA:
            return {
                ...state,
                city: action.data.city,
                rooms: action.data.rooms,
                priceFrom: action.data.priceFrom,
                priceTo: action.data.priceTo,
            }
        default:
            return {
                ...state
            }
    }
}


export const setFilterData = (data) => {
    return {
        type: SET_FILTER_DATA,
        data
    }   
} 