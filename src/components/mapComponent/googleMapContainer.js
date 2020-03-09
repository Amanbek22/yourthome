import React from 'react';
import WrapperMap from "./googleMap";
import {connect} from "react-redux";
import {setPoint, setApartment, getApartment} from '../../redux/googleMap_reducer'

const mapStateToProps = state => {
    return {
        points: state.points
    }
}

const WrapperMapContainer = connect(mapStateToProps,{setPoint,setApartment,getApartment})(WrapperMap)
export default WrapperMapContainer;