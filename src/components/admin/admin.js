import React from 'react';
import {GoogleMap, withGoogleMap, withScriptjs} from "react-google-maps";
import css from './admin.module.css'


const MyMapComponent = withScriptjs(withGoogleMap((props) => {
        let map = React.createRef()
        return (
            <div>
                <GoogleMap
                    ref={map}
                    defaultZoom={7}
                    defaultCenter={{lat: 41.204380, lng: 74.766098}}
                    onClick={()=>{

                    }}
                >
                </GoogleMap>
            </div>
        )
    }
))


const Admin = props => {
    return (
        <div className={css.wrapper}>
            <div>
                <MyMapComponent
                    googleMapURL="
                        https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyC31ZdDwrrTeMu4oaL5m5q4m6gCqAGkIKM
                        "
                    loadingElement={<div
                        style={{height: `100%`, position: `sticky`, zIndex: `99999990`, top: `0`, left: `0`}}/>}
                    containerElement={<div
                        style={{
                            height: `90vh`,
                            position: `sticky`,
                            zIndex: `99999990`,
                            top: `10%`,
                            left: `0`
                        }}/>}
                    mapElement={<div
                        style={{height: `100%`, position: `sticky`, zIndex: `99999990`, top: `0`, left: `0`}}/>}
                />
            </div>
            <div>

            </div>
        </div>
    )
}


export default Admin;