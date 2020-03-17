import React, {useEffect, useState} from 'react';
import {GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs} from "react-google-maps";
import GoogleMapReact from "google-map-react"
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

const {MarkerClusterer} = require("react-google-maps/lib/components/addons/MarkerClusterer");


const MyMapComponent = withScriptjs(withGoogleMap((props) => {
        let map = React.createRef()
        let arr = [];
        let newarr = [];
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
                                    } }
                                    position={{
                                        lat: item.location.latitude,
                                        lng: item.location.longitude
                                    }}
                                    title={item.description}
                                    color={'#ffffff'}
                                    markerWithLabel={"Hello"}
                                    label={{text:String(item.price) + '$',color: '#000',fontSize: 16 + 'px'}}
                                    icon={
                                        // iconMarker
                                        {
                                            url: String(item.price).length > 3 ? marker: String(item.price).length >= 2 ? marker2 : marker,
                                            scaledSize: {width: String(item.price).length > 3 ? 60: String(item.price).length >= 5 ? 70 : 40, height: 35},
                                            labelOrigin: new window.google.maps.Point(String(item.price).length > 3 ? 30: String(item.price).length >= 5 ? 25 : 20, 12),
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
                                <div>
                                    <img src={apartment} alt="dsvs"/>
                                    <div>
                                        <Link to={`/more-info/${selectedPark.id}`}>
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
    console.log(props)
    const [filteredCity, setFilteredCity] = useState("all")
    const [selected, setSelected] = useState([])
    const [apartments, setApartments] = useState(props.points.points)
    useEffect(() => {
        setApartments(props.points.points)
    });
    useEffect(() => {
        debugger
        if (filteredCity === 'all') {
            setApartments(props.points.points)
        } else if (filteredCity === 'bishkek') {
            let arr = [];
            props.points.allPoints.map(item => {
                if (item.location.city === 'Бишкек') {
                    arr.push(item)
                    console.log(item)
                }
            })
            props.setPoint(arr)
        }else if (filteredCity === 'osh') {
            let arr = [];
            props.points.allPoints.map(item => {
                if (item.location.city === 'Ош') {
                    arr.push(item)
                    console.log(item)
                }
            })
            props.setPoint(arr)
        }else if (filteredCity === 'talas') {
            let arr = [];
            props.points.allPoints.map(item => {
                if (item.location.city === 'Талас') {
                    arr.push(item)
                    console.log(item)
                }
            })
            props.setPoint(arr)
        }else if (filteredCity === 'naryn') {
            let arr = [];
            props.points.allPoints.map(item => {
                if (item.location.city === 'Нарын') {
                    arr.push(item)
                    console.log(item)
                }
            })
            props.setPoint(arr)
        }else if (filteredCity === 'issyk-kul') {
            let arr = [];
            props.points.allPoints.map(item => {
                if (item.location.city === 'Иссык-Куль') {
                    arr.push(item)
                    console.log(item)
                }
            })
            props.setPoint(arr)
        }else if (filteredCity === 'djalal-abad') {
            let arr = [];
            props.points.allPoints.map(item => {
                if (item.location.city === 'Джалал-Абад') {
                    arr.push(item)
                    console.log(item)
                }
            })
            props.setPoint(arr)
        }else if (filteredCity === 'batken') {
            let arr = [];
            props.points.allPoints.map(item => {
                if (item.location.city === 'Баткен') {
                    arr.push(item)
                    console.log(item)
                }
            })
            props.setPoint(arr)
        }
    }, [filteredCity])

    useEffect(() => {
        api.getApartments()
            .then(response=>{
                props.setPoint(response.data)
                props.setAllPointsAC(response.data)
            })
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
                            style={{height: `90vh`, position: `sticky`, zIndex: `99999990`, top: `10vh`, left: `0`,}}/>}
                        mapElement={<div
                            style={{height: `100%`, position: `sticky`, zIndex: `99999990`, top: `0`, left: `0`}}/>}
                        points={apartments}
                    />
                </div>
                <div className={css.elemetsWrapper}>
                    {/*<div className={css.filterBtnWrapper}>*/}
                        {/*<button>Фильтер</button>*/}
                    {/*</div>*/}
                    {/*<div style={{display: 'none'}}>*/}
                        <FilterForMap items={arr} setItem={selectedItems}/>
                    {/*</div>*/}
                    {/*<div style={{display: 'block'}}>*/}
                        {/*{items}*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    )
}



export default WrapperMap;