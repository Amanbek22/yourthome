import React from 'react';
import WrapperMap from "./googleMap";
import {connect} from "react-redux";
import {setPoint, addPoints, setSelected} from '../../redux/googleMap_reducer'

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
        addPoints: (point) =>{
            dispatch(addPoints(point))
        },
        setSelected: (item) =>{
            dispatch(setSelected(item))
        }
    }
}

const WrapperMapContainer = connect(mapStateToProps,mapDispatchToProps)(WrapperMap)
export default WrapperMapContainer;