import React, {useEffect, useState} from 'react';
import {GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs} from "react-google-maps";
// import GoogleMapReact from "google-map-react"
import css from './map.module.css'
import apartment from '../../img/room.png'
import FilterForMap from "../filterForMap/filterForMap";
import {Link} from "react-router-dom";
import Element from "../element/element";
// import Marker from "./marker";
import marker from '../../img/marker6.png'
import marker2 from '../../img/marker10.png'
import api from "../../api/api";
import {setApartment} from "../../redux/googleMap_reducer";
import axios from "axios";
import {Carousel} from "react-responsive-carousel";
import {bounce, fadeInRight, fadeOutRight} from 'react-animations';
import Radium, {StyleRoot} from 'radium';

const {MarkerClusterer} = require("react-google-maps/lib/components/addons/MarkerClusterer");


const MyMapComponent = withScriptjs(withGoogleMap((props) => {
        let map = React.createRef()
        let arr = [];
        let newarr = [];
        const [zoom, setZoom] = useState(props.zoom)
        const [center, setCenter] = useState(props.latLng)
        const onMarkerMounted = (element) => {
            arr.push(element)
        }
        const [selectedPark, setSelectedPark] = useState(null);
        return (
            <div className={css.mainWrapper}>
                {props.sended === true ?
                    <GoogleMap
                        onTilesLoaded={() => {
                            setTimeout(() => {
                                setZoom(props.zoom)
                            }, 500)
                        }}
                        ref={map}
                        onZoomChanged={zoom}
                        zoom={props.zoom}
                        center={props.latLng}
                        onBoundsChanged={() => {
                            newarr = [];
                            arr.forEach((item => {
                                if (map.current.getBounds() !== null) {
                                    if (map.current.getBounds().contains(item.props.position)) {
                                        newarr.push(item.props.id)
                                    } else {
                                        console.log("failed")
                                    }
                                }
                            }))
                            props.setVisibleMarkers(newarr)
                        }}
                    >
                        <MarkerClusterer
                            // onClick={props.onMarkerClustererClick}
                            averageCenter
                            enableRetinaIcons
                            gridSize={60}
                        >
                            {props.points.map((item) => (
                                <Marker
                                    ref={onMarkerMounted}
                                    onClick={() => {
                                        setSelectedPark(item)
                                    }}
                                    position={{
                                        lat: item.location.latitude,
                                        lng: item.location.longitude
                                    }}
                                    title={item.description}
                                    color={'#ffffff'}
                                    markerWithLabel={"Hello"}
                                    label={{
                                        text: Math.floor(item.another_price) + '$',
                                        color: '#000',
                                        fontSize: 16 + 'px',
                                        textAlign: center,
                                    }}
                                    icon={
                                        // iconMarker
                                        {
                                            url: String(item.price).length > 6 ? marker : String(item.price).length > 3 ? marker : String(item.price).length >= 2 ? marker2 : marker,
                                            scaledSize: {
                                                width: String(item.price).length > 3 ? 60 : String(item.price).length >= 5 ? 70 : 40,
                                                height: 35
                                            },
                                            labelOrigin: new window.google.maps.Point(String(item.price).length > 3 ? 30 : String(item.price).length >= 5 ? 25 : 20, 12),
                                        }
                                    }
                                    key={item.id}
                                    id={item.id}
                                    cursor={"pointer"}
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
                                <div className={css.btnWrapper}>
                                    <Carousel
                                        width={`250px`}
                                        autoPlay={true}
                                        swipeable={true}
                                        infiniteLoop={true}
                                        showThumbs={false}
                                    >
                                        <div>
                                            <img src="https://img.freepik.com/free-vector/vector-illustration-cartoon-interior-orange-home-room-living-room-with-two-soft-armchairs_1441-399.jpg?size=626&ext=jpg"/>
                                        </div>
                                        <div>
                                            <img src="https://media.gettyimages.com/photos/laptop-on-coffee-table-in-a-modern-living-room-of-an-old-country-picture-id900217718?s=612x612"/>
                                        </div>
                                        <div>
                                            <img src="https://yourthomeneobis2.herokuapp.com/media/photos/1a4da06bcdf207407ef4767711eeb20e.jpg"/>
                                        </div>
                                    </Carousel>
                                    <div>
                                        <Link
                                            to={`/more-info/${selectedPark.id}`}>
                                            Подробнее
                                        </Link>
                                    </div>
                                </div>
                            </InfoWindow>
                        )}

                    </GoogleMap>
                    : <div className={css.loading}>
                        <img src="https://flevix.com/wp-content/uploads/2019/07/Bubble-Loader-Icon.gif" alt="loading"/>
                    </div>
                }
            </div>
        )
    }
))


const WrapperMap = props => {
    console.log(props)
    const [filteredCity, setFilteredCity] = useState('')
    const [selected, setSelected] = useState([])
    const [apartments, setApartments] = useState(props.points.points);
    const [filterStyle, setFilterStyle] = useState(false);
    const [latLng, setLatLng] = useState({})
    const [zoome, setZoome] = useState(7)
    const {
        city, dateFrom, dateTo, rooms, floor,
        priceFrom, priceTo, apartmentType, internet,
        furniture, gas, phone, elevator, security,
        parcking,construction_type
    } = props.filterData;
    useEffect(() => {
        setApartments(props.points.points)
    });
    useEffect(() => {
        if (filteredCity === '') {
            setLatLng({lat: 41.204380, lng: 74.766098})
            setZoome(7)
        } else {
            setZoome(9);
            return filteredCity === '1' ? setLatLng({lat: 42.771211, lng: 74.545287}) :
                filteredCity === '6' ? setLatLng({lat: 40.532589, lng: 72.771791}) :
                    filteredCity === '7' ? setLatLng({lat: 41.426350, lng: 75.991058}) :
                        filteredCity === '8' ? setLatLng({lat: 42.521700, lng: 72.244290}) :
                            filteredCity === '9' ? setLatLng({lat: 42.261049, lng: 77.808740}) :
                                filteredCity === '10' ? setLatLng({lat: 41.434490, lng: 72.602859}) :
                                    filteredCity === '11' ? setLatLng({
                                        lat: 39.884450,
                                        lng: 71.294314
                                    }) : console.log(filteredCity)
        }
    }, [filteredCity])
    useEffect(() => {
        api.getApartments(
            city, rooms, floor, priceFrom, priceTo,
            apartmentType, internet, furniture, dateFrom, dateTo, gas,
            phone, elevator, security,parcking,construction_type
        ).then(response => {
                props.setPoint(response.data)
                // props.setAllPointsAC(response.data)
            })
    }, [
        city, dateFrom, dateTo, rooms, floor,
        priceFrom, priceTo, apartmentType,
        internet, furniture, gas, phone, elevator,
        security, parcking,construction_type
    ]);
    useEffect(() => {
        props.getApartment(
            city, rooms, floor, priceFrom, priceTo,
            apartmentType, internet, furniture, dateFrom, dateTo,construction_type
        )
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
                        price={item.another_price}
                        addetDate={item.date_of_arrival}
                    />
                </div>
            )
        })
    }
    const styles = {
        bounce: {
            animation: 'y 1s',
            animationName: Radium.keyframes(bounce, 'bounce')
        },
        fadeInLeft: {
            animation: '0.5s',
            animationName: Radium.keyframes(fadeInRight, 'fadeInRight')
        },
        fadeOutRight: {
            animation: '0.5s',
            animationName: Radium.keyframes(fadeOutRight, 'fadeOutRight')
        }
    }
    return (
        <div>
            <div className={css.wrapper}>
                <div className={css.map}>
                    <MyMapComponent
                        chooseApartment={props.setApartment}
                        latLng={latLng}
                        zoom={zoome}
                        setVisibleMarkers={setSelected}
                        sended={props.points.send}
                        googleMapURL="
                        https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyC31ZdDwrrTeMu4oaL5m5q4m6gCqAGkIKM
                        "
                        loadingElement={<div
                            style={{height: `100%`, position: `sticky`, zIndex: `99999990`, top: `0`, left: `0`}}/>}
                        containerElement={<div
                            style={{height: `90vh`, position: `sticky`, zIndex: `99999990`, top: `10vh`, left: `0`,}}/>}
                        mapElement={<div
                            style={{height: `100%`, position: `sticky`, zIndex: `99999990`, top: `0`, left: `0`}}/>}
                        points={apartments}
                    />
                </div>
                <StyleRoot>
                    <div className={css.elemetsWrapper}>
                        <div onClick={() => {
                            if (!filterStyle) {
                                setFilterStyle(true)
                            } else {
                                setFilterStyle(false)
                            }
                        }} className={css.filterBtnWrapper}>
                            <div style={
                                !filterStyle ? null : {
                                    width: 5 + '%',
                                    marginLeft: 91 + '%',
                                }
                            } className={css.filterBtn}>
                                {
                                    !filterStyle ?
                                        <img style={styles.fadeInLeft}
                                             src="https://image.flaticon.com/icons/svg/566/566011.svg" alt="left"/> :
                                        <img style={styles.fadeInLeft}
                                             src="https://image.flaticon.com/icons/svg/271/271228.svg" alt="right"/>
                                }
                            </div>
                        </div>
                        <div style={styles.fadeInLeft}>
                            <div style={
                                filterStyle === false ? styles.fadeOutRight && {display: 'none'} : styles.fadeInLeft
                            }>
                                <FilterForMap setItem={setFilteredCity}/>
                            </div>
                            <div style={
                                filterStyle === false ? styles.fadeInLeft : styles.fadeOutRight && {display: 'none'}}>
                                {items}
                            </div>
                        </div>
                    </div>
                </StyleRoot>
            </div>
        </div>
    )
}


export default WrapperMap;