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
        const onMarkerMounted = (element) => {
            arr.push(element)
        }
        const [selectedPark, setSelectedPark] = useState(null);
        // alert(center)
        // console.log(center)
        // useEffect(()=>{
        //     setCenter(props.cityCenter)
        // },[])
        // if (props.cityCenter === "all") {
        //     setCenter({lat: 41.204380, lng: 74.766098});
        // } else if (props.cityCenter === "bishkek") {
        //     setCenter({lat: 42.874622, lng: 74.569763})
        // }
        return (
            <div className={css.mainWrapper}>
                <GoogleMap
                    ref={map}
                    defaultZoom={7}
                    //zoom={zoom}
                    defaultCenter={{lat: 41.204380, lng: 74.766098}}
                    // onCenterChanged={()=>alert("hello")}
                    //center={center === '' ? {lat: 41.204380, lng: 74.766098}: {lat: 42.874622, lng: 74.569763}}
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
                                    lat: item.latitude,
                                    lng: item.longitude
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
                            lat: selectedPark.latitude,
                            lng: selectedPark.longitude
                        }}
                                    onCloseClick={() => setSelectedPark(null)}
                        >
                            <div>
                                <img src={apartment} alt="dsvs"/>
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
    const [selected, setSelected] = useState([])

    useEffect(() => {
        axios.get("http://yourthomeneobis2.herokuapp.com/announcements")
            .then(res => {
                console.log(res.data)
                props.setPoint(res.data)
            })
    }, []);
    const selectedPark = item => {
        setSelected(item)
    };
    let arr = [];
    if (selected.length > 0) {
        selected.map(id => arr.push(...props.points.points.filter(item => item.id === id)));
    }

    let items = arr.map(item => {
        console.log(item)
        return (
            <div key={item.id}>
                <Element
                    img={item.preview_image}
                    forSale={item.description}
                    house_number={item.address.house_number}
                    street={item.address.street}
                    city={item.address.city}
                    area={item.square}
                    room={item.room}
                    floor={item.floor}
                    price={item.price}
                    addetDate={"Вчера"}
                    url={""}
                />
            </div>
        )
    })
    const [filteredCity, setFilteredCity] = useState("all")
    const selectedItems = (item) => {
        setFilteredCity(item)
    }
    const [apartments,setApartments] = useState(props.points.points)
    useEffect(()=>{
        setApartments(props.points.points)
    });
    useEffect(()=>{
        if(filteredCity === 'all'){
            setApartments(props.points.points)
        }else if(filteredCity === 'bishkek'){
            let arr = [];
            props.points.points.map(item=>{
                if(item.address.city === 'Бишкек'){
                    arr.push(item)
                    console.log(item)
                }
            })
            props.setPoint(arr)
        }
    },[filteredCity])
    return (
        <div>
            <div className={css.filterWrapper}>
                <FilterForMap items={arr} setItem={selectedItems}/>
            </div>
            <div className={css.wrapper}>
                <div className={css.map}>
                    <MyMapComponent
                        cityCenter={filteredCity}
                        setVisibleMarkers={selectedPark}
                        googleMapURL="
                        https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyC31ZdDwrrTeMu4oaL5m5q4m6gCqAGkIKM
                        "
                        loadingElement={<div style={{height: `100%`, position: `sticky`, zIndex: `99999990`, top: `0`, left: `0`}}/>}
                        containerElement={<div style={{height: `84vh`,position: `sticky`, zIndex: `99999990`, top: `16vh`, left: `0`,}}/>}
                        mapElement={<div style={{height: `100%`, position: `sticky`, zIndex: `99999990`, top: `0`, left: `0`}}/>}
                        points={apartments}
                        //pushLocation={pushLocation}
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