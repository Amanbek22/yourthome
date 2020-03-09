import React, {useEffect, useState} from 'react';
import {GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs} from "react-google-maps";
import css from './map.module.css'
import apartment from '../../img/room.png'
import axios from "axios";
import FilterForMap from "../filterForMap/filterForMap";
import {Link} from "react-router-dom";
import Element from "../element/element";

const {MarkerClusterer} = require("react-google-maps/lib/components/addons/MarkerClusterer");


const MyMapComponent = withScriptjs(withGoogleMap((props) => {
        let map = React.createRef()
        let arr = [];
        let newarr = [];
        const [val, setVal] = useState([])
        const [zoom, setZoom] = useState(6)
        const onMarkerMounted = (element) => {
            arr.push(element)
        }
        const [selectedPark, setSelectedPark] = useState(null);
        return (
            <div className={css.mainWrapper}>
                {props.points.length > 0 ?
                <GoogleMap
                    onTilesLoaded={() => {
                        setTimeout(() => {
                            setZoom(7)
                        }, 500)
                    }}
                    ref={map}
                    // defaultZoom={7}
                    zoom={zoom}
                    defaultCenter={{lat: 41.204380, lng: 74.766098}}
                    onBoundsChanged={() => {
                        newarr = [];
                        arr.forEach((item => {
                            if (map.current.getBounds().contains(item.props.position)) {
                                newarr.push(item.props.id)
                            } else {
                                console.log("failed")
                            }
                        }))
                        props.setVisibleMarkers(newarr)
                    }}
                >
                    <MarkerClusterer>
                        {props.points.map((item) => (
                            <Marker
                                ref={onMarkerMounted}
                                onClick={() => setSelectedPark(item)}
                                position={{
                                    lat: item.location.latitude,
                                    lng: item.location.longitude
                                }}
                                title={item.description}
                                text={item.price}
                                markerWithLabel={"Hello"}
                                // icon={{
                                //     url:"https://image.flaticon.com/icons/svg/1218/1218459.svg",
                                //     scaledSize: new window.google.maps.Size(45,45)
                                // }}
                                color={"blue"}
                                key={item.id}
                                id={item.id}
                                cursor={"pointer"}
                                name={item.name}
                            />
                        ))}
                    </MarkerClusterer>
                    {selectedPark && (
                        <InfoWindow position={{
                            lat: selectedPark.location.latitude,
                            lng: selectedPark.location.longitude,
                        }}
                                    onCloseClick={() => setSelectedPark(null)}
                        >
                            <div>
                                <img src={apartment} alt="dsvs"/>
                                <div>
                                    <Link onClick={() => props.chooseApartment(selectedPark.id)}
                                          to={`/more-info/${selectedPark.id}`}>
                                        Подробнее
                                    </Link>
                                </div>
                            </div>
                        </InfoWindow>
                    )}

                </GoogleMap> : console.log('error')}
            </div>
        )
    }
))

const WrapperMap = props => {
    const [filteredCity, setFilteredCity] = useState("all")
    const [selected, setSelected] = useState([])
    const [apartments, setApartments] = useState(props.points.points)
    useEffect(() => {
        setApartments(props.points.points)
    });
    useEffect(() => {
        if (filteredCity === 'all') {
            setApartments(props.points.points)
        } else if (filteredCity === 'bishkek') {
            let arr = [];
            props.points.points.map(item => {
                if (item.location.city === 'Бишкек') {
                    arr.push(item)
                    console.log(item)
                }
            })
            props.setPoint(arr)
        }
    }, [filteredCity])

    useEffect(() => {
        props.getApartment()
    }, []);
    let arr = [];
    selected.map(id => arr.push(...props.points.points.filter(item => item.id === id)));
    let chooseApartment = item => {
        props.setApartment(item)
    };
    let items;
    if (arr.length > 0) {
        items = arr.map(item => {
            return (
                <div key={item.id}>
                    <Element
                        id={item.id}
                        chooseAp={chooseApartment}
                        img={item.preview_image}
                        forSale={item.description}
                        house_number={item.location.house_number}
                        street={item.location.street}
                        city={item.location.city}
                        area={item.area.total_area}
                        room={item.room}
                        floor={item.floor}
                        price={item.price}
                        addetDate={item.date_of_arrival}
                    />
                </div>
            )
        })
    }
    const selectedItems = (item) => {
        setFilteredCity(item)
    }

    return (
        <div>
            <div className={css.filterWrapper}>
                <FilterForMap items={arr} setItem={selectedItems}/>
            </div>
            <div className={css.wrapper}>
                <div className={css.map}>
                    <MyMapComponent
                        chooseApartment={props.setApartment}
                        cityCenter={filteredCity}
                        setVisibleMarkers={setSelected}
                        googleMapURL="
                        https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyC31ZdDwrrTeMu4oaL5m5q4m6gCqAGkIKM
                        "
                        loadingElement={<div
                            style={{height: `100%`, position: `sticky`, zIndex: `99999990`, top: `0`, left: `0`}}/>}
                        containerElement={<div
                            style={{height: `84vh`, position: `sticky`, zIndex: `99999990`, top: `16vh`, left: `0`,}}/>}
                        mapElement={<div
                            style={{height: `100%`, position: `sticky`, zIndex: `99999990`, top: `0`, left: `0`}}/>}
                        points={apartments}
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