import React, {useState} from 'react';
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";
import someData from './point.json'
import css from './map.module.css'
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

const MyMapComponent = withScriptjs(withGoogleMap((props) => {
        const [points, setPoints] = useState(someData);
        const pushLocation = e =>{
            let latlng = [e.latLng.lat(), e.latLng.lng()]
            let items = {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: latlng
                }
            }
            let arr = {...points};
            arr.features.push(items);
            setPoints(arr)
        }
        return (
            <div >
            <GoogleMap
                onClick={pushLocation}
                defaultZoom={7}
                defaultCenter={{lat: 42, lng: 74}}
            >
                <MarkerClusterer
                    onClick={props.onMarkerClustererClick}
                    averageCenter
                    enableRetinaIcons
                    gridSize={60}
                >
                {points.features.map((item) => (
                    <Marker
                        onClick={(e)=>console.log(e)}
                        position={{
                            lat: item.geometry.coordinates[0],
                            lng: item.geometry.coordinates[1]
                        }}
                    />
                ))}
                </MarkerClusterer>
            </GoogleMap>
            </div>
        )
    }
))


export default MyMapComponent;