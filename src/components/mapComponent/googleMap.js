import React, {useEffect, useState} from 'react';
import { GoogleMap, InfoWindow, Marker, Rectangle, withGoogleMap, withScriptjs} from "react-google-maps";
import someData from '../../point.json'
import css from './map.module.css'
import appartment from '../../img/room.png'
import Element from "../element/element";
import roomsImg from '../../img/room.png'
import axios from "axios";



const {MarkerClusterer} = require("react-google-maps/lib/components/addons/MarkerClusterer");

window.googlemap = <GoogleMap />;


const MyMapComponent = withScriptjs(withGoogleMap((props) => {
        const onMarkerMounted = (element) => {
            // props.setSortedArea(element )
        }
        const [selectedPark, setSelectedPark] = useState(null);
        return (
            <div className={css.mainWrapper}>

                <GoogleMap
                    //onClick={(e) => console.log(e)}
                    //onTilesLoaded={
                        // onMarkerMounted
                    //}

                    onClick={props.pushLocation}
                    defaultZoom={7}
                    defaultCenter={{lat: 41.204380, lng: 74.766098}}

                >
                    <MarkerClusterer
                        onClick={props.onMarkerClustererClick}
                        averageCenter
                        enableRetinaIcons
                        gridSize={60}
                    >
                        {props.points.points.map((item) => (
                            <Marker
                                // ref={onMarkerMounted}
                                onClick={() => setSelectedPark(item)}
                                position={{
                                    lat: item.geometry.coordinates[0],
                                    lng: item.geometry.coordinates[1]
                                }}
                                title={item.name}
                                name={item.name}
                                key={item.name}
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


        // const [selectedPark, setSelectedPark] = useState(null)
    }
))

const WrapperMap = props => {
    useEffect(() => {
        props.setPoint(someData.features)
    }, []);
    let sorted = (elemet) => {
        props.setSortedArea(elemet)
    };

    const pushLocation = e => {
        let add = prompt("input your addres?", "");
        let latlng = [e.latLng.lat(), e.latLng.lng()];
        let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng[0]},${latlng[1]}&key=AIzaSyA1uIgJLlFocMlwcu8b3wKPKkdT2mWV3AU`
        axios.get(url)
            .then(res => console.log(res));
        let items = {
            name: add,
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: latlng
            }
        }
        props.addPoints([items])
    }
    let items = props.points.points.map(item => {
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
                    saved={item.saved}
                    url={""}
                />
            </div>
        )
    })
    return (
        <div className={css.wrapper}>
            <div className={css.map}>
                <MyMapComponent
                    setSortedArea={sorted}
                    googleMapURL="
                        https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA1uIgJLlFocMlwcu8b3wKPKkdT2mWV3AU
                        "
                    loadingElement={<div
                        style={{height: `100%`, position: `sticky`, zIndex: `99999990`, top: `0`, left: `0`}}/>}
                    containerElement={<div
                        style={{height: `85vh`, position: `sticky`, zIndex: `99999990`, top: `15vh`, left: `0`}}/>}
                    mapElement={<div
                        style={{height: `100%`, position: `sticky`, zIndex: `99999990`, top: `0`, left: `0`}}/>}
                    points={props.points}
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