import React, {useEffect, useState} from 'react';
import {GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs} from "react-google-maps";
import someData from '../../point.json'
import css from './map.module.css'
import appartment from '../../img/room.png'
import axios from "axios";
import FilterForMap from "../filterForMap/filterForMap";
import {Link} from "react-router-dom";
import Element from "../element/element";
import roomsImg from '../../img/room.png'

const {MarkerClusterer} = require("react-google-maps/lib/components/addons/MarkerClusterer");


const MyMapComponent = withScriptjs(withGoogleMap((props) => {
        let map = React.createRef()
        let arr = [];
        let newarr = [];
        const onMarkerMounted = (element) => {
            arr.push(element)
        }
        const [selectedPark, setSelectedPark] = useState(null);
        return (
            <div className={css.mainWrapper}>
                <GoogleMap
                    ref={map}
                    onClick={props.pushLocation}
                    defaultZoom={7}
                    defaultCenter={{lat: 41.204380, lng: 74.766098}}
                    onBoundsChanged={() => {
                        newarr = [];
                        arr.map((item => {
                            if (map.current.getBounds().contains(item.props.position)) {
                                // console.log(item)
                                newarr.push(item.props.id)
                                // console.log(newarr)
                            } else {

                            }
                        }))
                        props.setVisibleMarkers(newarr)
                    }}

                >
                    <MarkerClusterer
                        //onClick={props.onMarkerClustererClick}
                    >
                        {props.points.map((item) => (
                            <Marker
                                ref={onMarkerMounted}
                                onClick={() => setSelectedPark(item)}
                                position={{
                                    lat: item.geometry.coordinates[0],
                                    lng: item.geometry.coordinates[1]
                                }}

                                title={item.name}
                                text={item.price}
                                key={item.id}
                                id={item.id}
                                cursor={"pointer"}
                                name={item.name}
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
                                    <Link to={"/more-info"}>
                                        Подробнее
                                    </Link>
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
    useEffect(() => {
        props.setPoint(someData.features)
        axios.get("http://yourthomeneobis2.herokuapp.com/announcements/")
            .then(res=>{
                console.log(res)
            })
    }, []);
    const [selected, setSelected] = useState([])
    const selectedPark = item => {
        setSelected(item)
    }
    const pushLocation = e => {
        let add = prompt("input your addres?", "");
        let latlng = [e.latLng.lat(), e.latLng.lng()];
        console.log("" + latlng[0],+ "\n"+latlng[1]);
        //let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng[0]},${latlng[1]}&key=AIzaSyDMDrqHrfbKWIzQDmnxHl2WcJGAnAgUX0A`
        let newurl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latlng[0]}&lon=${latlng[1]}&accept-language=ru`
        axios.get(newurl)
            .then(res => alert(res.data.display_name));
        let items = {
            name: add,
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: latlng
            },
            id: Math.random()
        }
        props.addPoints([items])
    }
    let arr = [];
    selected.map(id => arr.push(...props.points.points.filter(item => item.id === id)));
    let items = arr.map(item => {

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
    // let items = props.points.points.map(item => {
    //     return (
    //         <div>
    //             <Element
    //                 img={roomsImg}
    //                 forSale={item.name}
    //                 address={"г. Ташкент, Алмазарский район, Чиланзар-1/4"}
    //                 area={75}
    //                 room={3}
    //                 floor={"5/9"}
    //                 addetDate={"Вчера"}
    //                 saved={item.saved}
    //                 url={""}
    //             />
    //         </div>
    //     )
    // })
    return (
        <div>
            <div className={css.filterWrapper}>
                <FilterForMap/>
            </div>
            <div className={css.wrapper}>
                <div className={css.map}>
                    <MyMapComponent
                        setVisibleMarkers={selectedPark}
                        googleMapURL="
                        https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyC31ZdDwrrTeMu4oaL5m5q4m6gCqAGkIKM
                        "
                        loadingElement={<div
                            style={{height: `100%`, position: `sticky`, zIndex: `99999990`, top: `0`, left: `0`}}/>}
                        containerElement={<div
                            style={{
                                height: `85vh`,
                                position: `sticky`,
                                zIndex: `99999990`,
                                top: `15vh`,
                                left: `0`
                            }}/>}
                        mapElement={<div
                            style={{height: `100%`, position: `sticky`, zIndex: `99999990`, top: `0`, left: `0`}}/>}
                        points={props.points.points}
                        pushLocation={pushLocation}
                    />
                </div>
                <div className={css.elemetsWrapper}>
                    {items}
                </div>
            </div>
        </div>
    )
}


export default WrapperMap;