import React, {useEffect, useState} from 'react';
import {GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs} from "react-google-maps";
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
                                console.log("failed")
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
                                    lat: item.latitude,
                                    lng: item.longitude
                                }}

                                title={item.description}
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
                            lat: selectedPark.latitude,
                            lng: selectedPark.longitude
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
    console.log(props.points.points)
    useEffect(() => {
        // props.setPoint(someData.features)
        axios.get("https://yourthomeneobis2.herokuapp.com/announcements/")
            .then(res=>{
                console.log(res.data)
                props.setPoint(res.data)
            })
    }, []);
    const [selected, setSelected] = useState([])
    const [address,setAddress] = useState()
    const selectedPark = item => {
        setSelected(item)
    }
    const pushLocation = e => {
        let latlng = [e.latLng.lat(), e.latLng.lng()];
        let newurl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latlng[0]}&lon=${latlng[1]}&accept-language=ru`
        axios.get(newurl)
            .then(res =>{
                // alert(res.data.display_name)
                let addresss = res.data.address;
                setAddress(addresss)
            })
        let add = prompt("input your description?", "");
        //let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng[0]},${latlng[1]}&key=AIzaSyDMDrqHrfbKWIzQDmnxHl2WcJGAnAgUX0A`

        let items = {
                id: props.points.points.length + 1,
                type: "квартира",
                room: "3",
                address: {
                    id: 1,
                    house_number: "1",
                    street: "1",
                    city: "1",
                    postcode: "1",
                    country: "1",
                    country_code: "1"
                },
                square: 45.0,
                date_of_arrival: "2020-02-18",
                date_of_departure: "2020-02-18",
                price: 1500,
                description: add,
                status: false,
                latitude: latlng[0],
                longitude: latlng[1],
                pub_date: "2020-02-18T20:15:56.439719+06:00",
                images: [],
                owner: "na za\b\b, "
            }
        // props.addPoints([items])
        axios.post("https://yourthomeneobis2.herokuapp.com/apartment",{
            "type": 4,
            "room": "3",
            "square": 55,
            "date_of_arrival": "2020-02-20",
            "date_of_departure": "2020-02-22",
            "price": 30000,
            "description": "это квартира.",
            "status": true,
            "images": [],
            "owner": 1,
            "latitude": 34.3456789,
            "longitude": 33.3456789,
            "address": {
                "house_number": 6,
                "street": "Абая",
                "city": "Бишкек",
                "postcode": "722011",
                "country": "Кыргызстан",
                "country_code": "kg"
            }
        }).then(res=>{
            console.log(res)
        })
    }
    let arr = [];
    selected.map(id => arr.push(...props.points.points.filter(item => item.id === id)));
    let items = arr.map(item => {

        return (
            <div>
                <Element
                    img={roomsImg}
                    forSale={item.description}
                    address={item.address.house_number}
                    area={75}
                    room={3}
                    floor={"5/9"}
                    addetDate={"Вчера"}
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