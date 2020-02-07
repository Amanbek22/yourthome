import React, {useEffect, useState} from 'react';
import {GoogleMap, InfoWindow, Marker, Polygon, Rectangle, withGoogleMap, withScriptjs} from "react-google-maps";
import someData from './point.json'
import css from './map.module.css'
import appartment from './img/room.png'
import Element from "./components/element/element";
import roomsImg from './img/room.png'
import axios from "axios";

const {MarkerClusterer} = require("react-google-maps/lib/components/addons/MarkerClusterer");

const MyMapComponent = withScriptjs(withGoogleMap((props) => {
        const [selectedPark, setSelectedPark] = useState(null)
        const [sortedArea, setSortedArea] = useState()


        return (
            <div className={css.mainWrapper}>

                <GoogleMap
                    //onClick={(e)=>console.log(e)}
                     onClick={props.pushLocation}
                    defaultZoom={7}
                    defaultCenter={{lat: 42, lng: 74}}
                >

                    <MarkerClusterer
                        onClick={props.onMarkerClustererClick}
                        averageCenter
                        enableRetinaIcons
                        gridSize={60}
                    >
                        {props.points.features.map((item) => (
                            <Marker
                                onClick={() => setSelectedPark(item)}
                                position={{
                                    lat: item.geometry.coordinates[0],
                                    lng: item.geometry.coordinates[1]
                                }}
                            />
                        ))}
                    </MarkerClusterer>
                    {selectedPark && (
                        <InfoWindow position={{
                            lat: selectedPark.geometry.coordinates[0],
                            lng: selectedPark.geometry.coordinates[1]
                        }}
                                    onCloseClick={() => setSelectedPark(null)}
                        >
                            <div>
                                <img src={appartment} alt="dsvs"/>
                                <div>
                                    <button>
                                        Подробнее
                                    </button>
                                </div>
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
            </div>
        )
    }
))

const WrapperMap = props => {
    const [points, setPoints] = useState(someData);
    const pushLocation = e => {

        let add = prompt("input your addres?", "");
        let latlng = [e.latLng.lat(), e.latLng.lng()]
        let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng[0]},${latlng[1]}&key=AIzaSyC31ZdDwrrTeMu4oaL5m5q4m6gCqAGkIKM`
        let newurl = `https://api.mapbox.com/geocoding/v5/mapbox.places/chester.json?${latlng[1]},${latlng[0]}&access_token=pk.eyJ1IjoiYW1hbmNoaWsiLCJhIjoiY2s1emVrY2kyMDl5MjNnbzFxdjVmbXo3YyJ9.J-UCM3pArJCq1sHdOJ9mHg`
            axios.get(newurl)
                .then(res=>console.log(res));
        let items = {
            name: add,
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: latlng
            }
        }
        let arr = {...points};
        arr.features.unshift(items);
        setPoints(arr)
    }
    let items = points.features.map(item => {
        return (
            <div>
                <Element
                    img={roomsImg}
                    forSale={item.name}
                    address={"г. Ташкент, Алмазарский район, Чиланзар-1/4"}
                    area={75}
                    room={3}
                    floor={"5/9"}
                    addetDate={"Вчера"}
                    saved={false}
                    url={""}
                />
            </div>
        )
    })
    return (
        <div className={css.wrapper}>
            <div className={css.map}>
            <MyMapComponent
                googleMapURL="
                        https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyC31ZdDwrrTeMu4oaL5m5q4m6gCqAGkIKM
                        "
                loadingElement={<div style={{height: `100%`,position: `sticky`,zIndex: `99999990`,top: `0`,left: `0`}}/>}
                containerElement={<div style={{height: `85vh`,position: `sticky`,zIndex: `99999990`,top: `15vh`,left: `0`}}/>}
                mapElement={<div style={{height: `100%`,position: `sticky`,zIndex: `99999990`,top: `0`,left: `0`}}/>}
                points={points}
                pushLocation={pushLocation}
            />
            </div>
            <div className={css.elemetsWrapper}>
                {items}
            </div>
        </div>
    )
}


export default WrapperMap;