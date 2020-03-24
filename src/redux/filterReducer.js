
const SET_FILTER_DATA = 'SET_DATA';


const initialState = {
    city: '',
    dateFrom: '',
    dateTo: '',
    rooms: '',
    floor: '',
    priceFrom: '',
    priceTo: '',
    internet: false,
    furniture: false,
}


export const FilterReducer = (state = initialState,action) => {
    switch (action.type){
        case SET_FILTER_DATA:
            return {
                ...state,
                ...action.data
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