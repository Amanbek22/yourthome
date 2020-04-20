import React from 'react';
import Filter from './filter';
import {connect} from "react-redux";
import {setFilterData} from '../../redux/filterReducer'


const mapStateToProps = state =>{
    return {
        filterData: state.filterData,
        app: state.app
    }
}


export  const FilterContainer = connect(mapStateToProps,{setFilterData})(Filter) 





