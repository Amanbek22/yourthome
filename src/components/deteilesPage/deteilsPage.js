import React, {useEffect, useState} from 'react';
import css from './deteils.module.css'
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import api from "../../api/api";
import axios from 'axios'
import {DatePicker, DatePickerInput} from "rc-datepicker";
import 'moment/locale/ru.js';
import 'rc-datepicker/lib/style.css';
import {GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs} from "react-google-maps";


const DeteilsPage = props => {
    const [apartment, setApartment] = useState({});
    const [address, setAddress] = useState({});
    const [date, setDate] = useState(new Date());
    const [todate, setTodate] = useState(new Date());
    const [som, setSom] = useState();
    const [usd, setUsd] = useState();
    useEffect(() => {
        axios.get('https://www.cbr-xml-daily.ru/daily_json.js')
            .then(res => {
                console.log(res.data.Valute)
                setSom(res.data.Valute.KGS.Value / 10)
                // setRub(res.data.Valute.KGS.Value)
                setUsd(res.data.Valute.USD.Value)
            })
        api.getApartmentApi(props.match.params.id)
            .then(res => {
                setApartment(res.data)
                setAddress(res.data.address)
                // console.log(res.data)
            })
    }, [])
    let area = {...apartment.area}
    let phone = {...apartment.contact}
    const onDataChange = (jsDate, dateString) => {
        console.log(jsDate, dateString)
    }
    return (
        <div className={css.wrapper}>
            <div className={css.slider_block}>
                <Carousel
                    autoPlay
                    showIndicators={false}
                    infiniteLoop={true}
                    width={`90%`}
                    swipeable={true}
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
            </div>
            <div className={css.moreInfoBlock}>
                <div className={css.priceBlock}>
                    <div>{apartment.description}</div>
                    <div>{Math.round(apartment.price * som / usd)}$</div>
                </div>
                <div className={css.information}>
                    <div>Информация</div>
                    <div className={css.listInfo}>
                        <div>Камнат: {apartment.room}</div>
                        <div>Общая площадь: {area.total_area}m<sup>2</sup></div>
                        <div>Этаж: {apartment.floor}</div>
                        <div>Тип строение: {apartment.construction_type}</div>
                        <div>Этажность дома: {apartment.floor}</div>
                        <div>Планировка: {apartment.floor}</div>
                        <div>Тип ремонта: {apartment.construction_type}</div>
                        <div></div>
                        <div>Меблирована: {apartment.construction_type}</div>
                        <div></div>
                    </div>
                    <div className={css.listNear}>
                        <div>
                            <div>Рядом есть:</div>
                            <ul>
                                <li>Рестораны кафе</li>
                                <li>Детский сад</li>
                                <li>Стоянка</li>
                                <li>Остановки</li>
                                <li>Супермаркет</li>
                                <li>магазины</li>
                                <li>Парк</li>
                                <li>Зелёная зона</li>
                                <li>Больница</li>
                            </ul>
                        </div>
                        <div>
                            <div>В квартире есть:</div>
                            <ul>
                                <li>Рестораны кафе</li>
                                <li>Детский сад</li>
                                <li>Стоянка</li>
                                <li>Остановки</li>
                                <li>Супермаркет</li>
                                <li>магазины</li>
                                <li>Парк</li>
                                <li>Зелёная зона</li>
                                <li>Больница</li>
                            </ul>
                        </div>
                    </div>
                    <div className={css.dateWrapper}>
                        <div>
                            <label>От</label>
                            <DatePickerInput
                                disabled={true}
                                placeholder={'От какого числа занято'}
                                onChange={onDataChange}
                                value={date}
                                className='my-custom-datepicker-component'
                                onHide={() => 0}
                                showOnInputClick={true}
                            />
                        </div>
                        <div>
                            До
                            <DatePickerInput
                                disabled={true}
                                placeholder={'От какого числа занято'}
                                onChange={onDataChange}
                                value={todate}
                                className='my-custom-datepicker-component'
                                onHide={() => 0}
                            />
                        </div>
                    </div>
                    <div className={css.descriptionWrapper}>
                        <div>Описание</div>
                        <div>
                            В Новом Роскошном Жилом Комплексе!!!
                            Продается 2- комнатная квартира с общей площадью 70 м2.

                            Преимущества Ж.К:
                            - Качественная Российская входная - металлическая дверь;
                            - Пластиковые рамы imzo premium;
                            - Счётчики;
                            - Видео наблюдение 24/7
                            - Детские площадки во дворе Ж.К
                            - Охраняемая территория.

                            Сдача Объекта август 2020 Год!!!
                        </div>
                    </div>
                    <div className={css.mapWrapper}>
                        <MyMapComponent
                            googleMapURL="
                        https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyC31ZdDwrrTeMu4oaL5m5q4m6gCqAGkIKM
                        "
                            loadingElement={<div
                                style={{height: `100%`}}/>}
                            containerElement={<div
                                style={{height: `300px`}}/>}
                            mapElement={<div
                                style={{height: `100%`}}/>}
                            location={apartment.location}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
const MyMapComponent = withScriptjs(withGoogleMap((props) => {
    return (
        <div>
            {props.location ?
                <GoogleMap
                    defaultZoom={12}
                    defaultCenter={{lat: props.location.latitude, lng: props.location.longitude}}
                >
                    <Marker
                        position={{
                            lat: props.location.latitude,
                            lng: props.location.longitude
                        }}
                        key={props.location.id}
                    />

                </GoogleMap> : console.log('error')}
        </div>
    )
}))


const mapStateToProps = state => {
    return {
        apartment: state.apartment
    }
}
const DeteilsPageContainer = connect(mapStateToProps, {})(DeteilsPage)


let WithRouterDeteilsPage = withRouter(DeteilsPageContainer);


export default WithRouterDeteilsPage;






























