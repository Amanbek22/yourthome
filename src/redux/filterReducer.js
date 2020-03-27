
const SET_FILTER_DATA = 'SET_DATA_FILTER';


const initialState = {
    city: '',
    dateFrom: null,
    dateTo: null,
    rooms: '',
    floor: '',
    priceFrom: '',
    priceTo: '',
    apartmentType: '',
    internet: false,
    furniture: false,
    gas: false,
    phone: false,
    elevator: false,
    security: false,
    parcking: false
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