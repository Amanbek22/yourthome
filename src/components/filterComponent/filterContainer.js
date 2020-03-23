import React from 'react';
import Filter from './filter';
import {connect} from "react-redux";
import {setFilterData} from '../../redux/filterReducer'


const mapStateToProps = state =>{
    debugger
    return {
        filterData: state.filterData
    }
}


export  const FilterContainer = connect(mapStateToProps,{setFilterData})(Filter) 





