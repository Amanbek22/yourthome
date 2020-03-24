import React from 'react';
import WrapperMap from "./googleMap";
import {connect} from "react-redux";
import {setPoint, setApartment, setAllPointsAC} from '../../redux/googleMap_reducer'

const mapStateToProps = state => {
    return {
        points: state.points,
        filterData: state.filterData
    }
}

const WrapperMapContainer = connect(mapStateToProps,{setPoint,setApartment,setAllPointsAC})(WrapperMap)
export default WrapperMapContainer;