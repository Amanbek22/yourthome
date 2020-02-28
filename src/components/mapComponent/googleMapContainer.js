import React from 'react';
import WrapperMap from "./googleMap";
import {connect} from "react-redux";
import {setPoint, setApartment,} from '../../redux/googleMap_reducer'

const mapStateToProps = state => {
    return {
        points: state.points
    }
}

const  mapDispatchToProps = dispatch =>{
    return {
        setPoint: (points)=>{
            dispatch(setPoint(points))
        },
        setApartment: (apartment) =>{
            dispatch(setApartment(apartment))
        }
    }
}

const WrapperMapContainer = connect(mapStateToProps,mapDispatchToProps)(WrapperMap)
export default WrapperMapContainer;