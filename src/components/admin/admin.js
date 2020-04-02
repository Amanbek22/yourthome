import React, {useEffect, useState} from 'react';
import {GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs} from "react-google-maps";
import css from './admin.module.css'
import api from "../../api/api";
import Element from "../element/element";
import marker from "../../img/marker6.png";
import marker2 from "../../img/marker10.png";
import axios from "axios";
import apartment from "../../img/room.png";
import {Link} from "react-router-dom";
import {Carousel} from "react-responsive-carousel";
import Modal from 'react-awesome-modal';
// import MarkerClusterer from "react-google-maps/src/components/addons/MarkerClusterer";
const {MarkerClusterer} = require("react-google-maps/lib/components/addons/MarkerClusterer");


const MyMapComponent = withScriptjs(withGoogleMap((props) => {
    let map = React.createRef();
    const [selectedPark, setSelectedPark] = useState(null);
    let som = props.som / 10;

    return (
        <div>
            <GoogleMap
                ref={map}
                defaultZoom={7}
                defaultCenter={{lat: 41.204380, lng: 74.766098}}
            >
                <MarkerClusterer
                    // onClick={props.onMarkerClustererClick}
                >
                    {props.points.map((item) => (
                        <Marker
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
                            label={{
                                text: Math.floor(item.another_price) + '$',
                                color: '#000',
                                fontSize: 16 + 'px'
                            }}
                            icon={
                                // iconMarker
                                {
                                    url: String(item.price).length > 3 ? marker : String(item.price).length >= 2 ? marker2 : marker,
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
                        <div>
                            <Carousel
                                width={`250px`}
                                autoPlay={true}
                                swipeable={true}
                                infiniteLoop={true}
                                showThumbs={false}
                            >
                                <div>
                                    <img
                                        src="https://img.freepik.com/free-vector/vector-illustration-cartoon-interior-orange-home-room-living-room-with-two-soft-armchairs_1441-399.jpg?size=626&ext=jpg"/>
                                </div>
                                <div>
                                    <img
                                        src="https://media.gettyimages.com/photos/laptop-on-coffee-table-in-a-modern-living-room-of-an-old-country-picture-id900217718?s=612x612"/>
                                </div>
                                <div>
                                    <img
                                        src="https://yourthomeneobis2.herokuapp.com/media/photos/1a4da06bcdf207407ef4767711eeb20e.jpg"/>
                                </div>
                            </Carousel>
                            <div className={css.btnWrapper}>
                                <Link to={`/change-apartment/${selectedPark.id}`}>
                                    Изменить
                                </Link>
                                <div className={css.del} onClick={()=>{
                                    props.setVisible(true)
                                    props.setDelApartment(selectedPark)
                                }}>
                                    Удалить
                                </div>
                                <Link style={{color: 'white'}}  to={`/more-info/${selectedPark.id}`}>
                                    Подробнее
                                </Link>
                                <Link style={{color: 'white'}}  to={`/booking/${selectedPark.id}`}>
                                    Настроить
                                </Link>
                            </div >
                            {/*<div className={css.more}>*/}
                                {/*<Link style={{color: 'white'}}  to={`/more-info/${selectedPark.id}`}>*/}
                                    {/*Подробнее*/}
                                {/*</Link>*/}
                            {/*</div>*/}
                        </div>
                    </InfoWindow>
                )}

            </GoogleMap>
        </div>
    )
}))


const Admin = props => {
    const [apartment, setApartment] = useState([]);
    const [som, setSom] = useState();
    const [usd, setUsd] = useState();
    const [visible,setVisible] = useState(false);
    const [delApartment,setDelApartment] = useState(0)

    const DeleteAction = () =>{
        api.deleteApartment(delApartment.id)
            .then(res=> window.location.href="/admin")
    }
    useEffect(() => {
        let token = JSON.parse(localStorage.getItem('newToken'));
        if (!token) {
            api.signInWithRefresh()
                .then(res => {
                    localStorage.setItem("newToken", JSON.stringify(res.data));
                    axios.get('https://www.cbr-xml-daily.ru/daily_json.js')
                        .then(res => {
                            console.log(res.data.Valute)
                            setSom(res.data.Valute.KGS.Value)
                            setUsd(res.data.Valute.USD.Value)
                        })
                    api.getOwnApartments()
                        .then(res => {
                            setApartment(res.data)
                            // console.log(res.data)
                        })
                })
        }else{
            axios.get('https://www.cbr-xml-daily.ru/daily_json.js')
                .then(res => {
                    // console.log(res.data.Valute)
                    setSom(res.data.Valute.KGS.Value)
                    setUsd(res.data.Valute.USD.Value)
                })
            api.getOwnApartments()
                .then(res => {
                    setApartment(res.data)
                    // console.log(res.data)
                })
        }

    }, [])
    let items;
    if (apartment.length > 0) {
        items = apartment.map(item => {
            return (
                <div key={item.id}>
                    <Element
                        id={item.id}
                        changeBtn={true}
                        // chooseAp={chooseApartment}
                        img={item.preview_image}
                        forSale={item.description}
                        house_number={item.location.house_number}
                        street={item.location.street}
                        city={item.location.city}
                        area={item.area.total_area}
                        room={item.room}
                        floor={item.floor}
                        price={item.another_price}
                        // addetDate={item.date_of_arrival}
                    />
                </div>
            )
        })
    }
    return (
        <div className={css.wrapper}>
            <div style={{zIndex: 1}}>
                <MyMapComponent
                    points={apartment}
                    som={som}
                    usd={usd}
                    setVisible={setVisible}
                    setDelApartment={setDelApartment}
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
                />
            </div>
            <div>
                {items}
            </div>
            <Modal
                visible={visible}
                width="400"
                height="300"
                effect="fadeInDown"
                onClickAway={()=>setVisible(false)}
            >
                <div className={css.modal}>
                    <span style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: 20,
                        height: 20,
                        marginRight: 5,
                        marginTop: 5,
                    }}  onClick={() => setVisible(false)}>
                        <img style={{width: 100 + '%', height: 100 + '%'}} src="https://image.flaticon.com/icons/svg/1828/1828774.svg" alt="x"/>
                    </span>
                    <p>Вы действительно хотите удолить это объявление?</p>
                    <div className={css.btnWrapperDel}>
                        <div className={css.yesBtn} onClick={DeleteAction}>Да</div>
                        <div style={{background: 'red'}} className={css.yesBtn} onClick={()=>setVisible(false)}>Нет</div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}


export default Admin;