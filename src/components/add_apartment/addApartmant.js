import React, {useState} from 'react';
import {GoogleMap, withGoogleMap, withScriptjs} from "react-google-maps";
import css from "./addApartmant.module.css";
import axios from "axios";

const MyMapComponent = withScriptjs(withGoogleMap((props) => {
        let map = React.createRef()
        return (
            <div>
                <GoogleMap
                    ref={map}
                    onClick={props.pushLocation}
                    defaultZoom={7}
                    defaultCenter={{lat: 41.204380, lng: 74.766098}}
                >

                </GoogleMap>
            </div>
        )
    }
))


const AddApartment = props => {
    const [rooms, setRooms] = useState("");
    const [area, setArea] = useState("");
    const [floor, setFloor] = useState("");
    const [item, setItem] = useState();
    const [latLng, setLatLng] = useState([])
    const [num, setNum] = useState();
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState();
    console.log(item)
    let address = {};
    // let item;
    let add;
    const pushLocation = async e => {
        let latlng = [e.latLng.lat(), e.latLng.lng()];
        setLatLng(latlng)
        let newurl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latlng[0]}&lon=${latlng[1]}&accept-language=ru`
        //let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng[0]},${latlng[1]}&key=AIzaSyC31ZdDwrrTeMu4oaL5m5q4m6gCqAGkIKM`
        await axios.get(newurl)
            .then(res => {
                let address_1 = res.data.address;
                address = address_1;
                console.log(address_1)
                setNum(address_1.house_number)
                setStreet(address_1.road)
                setCity(address_1.city)
                setCountry(address_1.country)
            })
        console.log(address)
    }
    const sendData = () => {
        console.log(typeof (Number(rooms)))
        if (latLng.length > 0) {
            axios.post("https://yourthomeneobis2.herokuapp.com/apartment/", {
                "type": 1,
                "room": rooms,
                "square": 1,
                "date_of_arrival": "2020-02-22",
                "date_of_departure": "2020-02-22",
                "price": Number(floor),
                "description": description,
                "status": false,
                "images": [],
                "owner": 1,
                "latitude": latLng[0],
                "longitude": latLng[1],
                "address": {
                    "house_number": Number(num),
                    "street": street,
                    "city": city,
                    "postcode": "1",
                    "country": country,
                    "country_code": "1"
                }
            })
                .then(
                    (response) => {
                        alert('Daaamn you did it!')
                    },
                    (error) => {
                        alert("Wrong address")
                    }
                )
        }
    }

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
                            height: `85vh`,
                            position: `sticky`,
                            zIndex: `99999990`,
                            top: `15vh`,
                            left: `0`
                        }}/>}
                    mapElement={<div
                        style={{height: `100%`, position: `sticky`, zIndex: `99999990`, top: `0`, left: `0`}}/>}
                    pushLocation={pushLocation}
                />
            </div>
            <div>
                <div>
                    <div>
                        <label>Number of house</label>
                        <input value={num} placeholder={"Номер дома"} type="text"/>
                    </div>
                    <div>
                        <label>Street</label>
                        <input value={street} placeholder={"улица"} type="text"/>
                    </div>
                    <div>
                        <label>City</label>
                        <input value={city} placeholder={"город"} type="text"/>
                    </div>
                    <div>
                        <label>Country</label>
                        <input value={country} placeholder={"Страна"} type="text"/>
                    </div>
                </div>
                <input value={description} onChange={e=>setDescription(e.target.value)} placeholder={"Описание"} type="text"/>
                <input value={area} onChange={(e) => setArea(e.target.value)} placeholder={"Площадь"} type="text"/>
                <input value={rooms} onChange={(e) => setRooms(e.target.value)} placeholder={"Количества комнат"}
                       type="text"/>
                <input value={floor} onChange={(e) => setFloor(e.target.value)} placeholder={"Цена"} type="text"/>
                <input value={image} onChange={(e) => setImage(e.target.value)} type="file"/>
                <button onClick={sendData} className={css.sendBtn}>Send</button>
            </div>
        </div>
    )
}


export default AddApartment;