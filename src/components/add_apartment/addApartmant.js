import React, {useState} from 'react';
import {GoogleMap, withGoogleMap, withScriptjs} from "react-google-maps";
import css from "./addApartmant.module.css";
import axios from "axios";
import api from "../../api/api";
// import roomsImg from '../../img/room.png'

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

    const [rooms, setRooms] = useState();
    const [area, setArea] = useState();
    const [floor, setFloor] = useState();
    const [latLng, setLatLng] = useState([])
    const [num, setNum] = useState(null);
    const [street, setStreet] = useState();
    const [city, setCity] = useState();
    const [country, setCountry] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [images, setImages] = useState(null);
    let address = {};
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
                setCity(address_1.city ? address_1.city : address_1.town)
                setCountry(address_1.country)
            })
    }
    const sendData = () => {
        if (latLng.length > 0) {
            let preview_image = new FormData();
            preview_image.append('preview_image', null);
            // data.forEach((value, key) => {
            //     data[key] = value;
            // });
            let formData = {
                "id": 1,
                "type": 1,
                "room": rooms,
                "floor": floor,
                "area": {
                    "id": 1,
                    "total_area": Number(area),
                    "living_area": 35.0
                },
                "series": 1,
                "construction_type": 1,
                "state": 1,
                "detail": {
                    "id": 1,
                    "furniture": false,
                    "heat": false,
                    "gas": false,
                    "electricity": true,
                    "internet": false,
                    "phone": false,
                    "elevator": true,
                    "security": false,
                    "parking": false
                },
                "location": {
                    "id": 1,
                    "country": 1,
                    "region": 1,
                    "city": city === 'Бишкек' ? 1 : 2,
                    "district": 1,
                    "street": street,
                    "house_number": 1,
                    "latitude": latLng[0],
                    "longitude": latLng[1]
                },
                "rental_period": 1,
                "price": Number(price),
                "currency": 1,
                "preview_image": null,
                "description": description,
                "pub_date": "2020-03-04T15:54:31.822777+06:00",
                "images": [],
                "contact": {
                    "id": 1,
                    "role": 1,
                    "phone": "0554151520",
                    "name": "A",
                    "surname": "A"
                },
                "owner": 2,
                "comments": [],
                "orders": []
            }
            api.add(formData)
                .then(
                    (response) =>{
                        alert('You add an apartment!')
                        window.location.href = '/admin'
                    },
                    (error) => alert("Wrong address")
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
                            height: `90vh`,
                            position: `sticky`,
                            zIndex: `99999990`,
                            top: `10%`,
                            left: `0`
                        }}/>}
                    mapElement={<div
                        style={{height: `100%`, position: `sticky`, zIndex: `99999990`, top: `0`, left: `0`}}/>}
                    pushLocation={pushLocation}
                />
            </div>
            <div id={"formID"}>
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
                <input value={description} onChange={e => setDescription(e.target.value)} placeholder={"Описание"}
                       type="text"/>
                <input value={area} onChange={(e) => setArea(e.target.value)} placeholder={"Площадь"} type="text"/>
                <input value={rooms} onChange={(e) => setRooms(e.target.value)} placeholder={"Количества комнат"}
                       type="text"/>
                <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder={"Цена"} type="text"/>
                <input value={floor} onChange={(e) => setFloor(e.target.value)} placeholder={"Этаж"} type="text"/>
                <input

                    onChange={(e) => {
                        setImages(e.target.files[0]);
                    }}
                    id="image"
                    accept="image/png, image/jpeg, image/jpg"
                    type="file"/>
                <button onClick={sendData} className={css.sendBtn}>Send</button>
            </div>
        </div>
    )
}
export default AddApartment;