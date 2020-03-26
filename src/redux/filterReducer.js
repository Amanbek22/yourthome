
const SET_FILTER_DATA = 'SET_DATA_FILTER';


const initialState = {
    city: '',
    dateFrom: '',
    dateTo: '',
    rooms: '',
    floor: '',
    priceFrom: '',
    priceTo: '',
    apartmentType: '',
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