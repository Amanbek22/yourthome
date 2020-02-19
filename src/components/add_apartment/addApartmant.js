import React from 'react';
import {GoogleMap, withGoogleMap, withScriptjs} from "react-google-maps";
import css from "./addApartmant.module.css";
import axios from "axios";

const MyMapComponent = withScriptjs(withGoogleMap((props) => {
        let map = React.createRef()
        return (
            <div >
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
    let address = {}
    const pushLocation =  e => {
        let latlng = [e.latLng.lat(), e.latLng.lng()];
        let newurl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latlng[0]}&lon=${latlng[1]}&accept-language=ru`
         axios.get(newurl)
            .then(res =>{
                let addresss = res.data.address;
                address = addresss;
            })
        let add = prompt("input your description?", "Help me!");
        //let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng[0]},${latlng[1]}&key=AIzaSyDMDrqHrfbKWIzQDmnxHl2WcJGAnAgUX0A`
        let item = {
            "type": 1,
            "room": "3",
            "square": 85.0,
            "date_of_arrival": "2020-02-20",
            "date_of_departure": "2020-02-22",
            "price": 30000,
            "description": add,
            "status": true,
            "images": [
            ],
            "owner": 1,
            "latitude": latlng[0],
            "longitude": latlng[1],
            "address": {
                "house_number": Number(address.house_number),
                "street": address.road,
                "city": address.city,
                "postcode": "722011",
                "country": address.country,
                "country_code": address.country_code
            }
        };
        axios.post("https://yourthomeneobis2.herokuapp.com/apartment/",item)
            .then(
                (response)=>{
                    alert('Daaamn you did it!')
                },
                (error)=>{
                    alert("Wrong address")
                }
            )

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
                <input placeholder={"Площадь"} type="text"/>
                <input placeholder={"Количества комнат"} type="text"/>
                <input placeholder={"какой этаж"} type="text"/>
            </div>
        </div>
    )
}



export default AddApartment;