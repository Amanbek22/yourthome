import React, {useEffect, useState} from 'react';
import css from './deteils.module.css'
import {connect} from "react-redux";
import { withRouter} from "react-router-dom";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import api from "../../api/api";
import {DatePickerInput} from "rc-datepicker";
import 'moment/locale/ru.js';
import 'rc-datepicker/lib/style.css';
import {GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs} from "react-google-maps";
import {compose} from "redux";
import img from '../../img/mainImg.png'


const DeteilsPage = props => {
    const {id} = props.match.params;
    const [apartment, setApartment] = useState({});
    const [comments, setComments] = useState([])
    const [orders, setOrders] = useState([])
    const [address, setAddress] = useState({});
    const [commentInput, setCommentInput] = useState();
    const [img, setImg] = useState('')
    const [images, setImages] = useState([]);
    const [details, setDetails] = useState({})
    let token = JSON.parse(localStorage.getItem('newToken'));
    let comment = comments.map(item => {
        return (
            <div className={css.comment} key={item.id}>
                <h4>{item.owner}</h4>
                {item.text_of_publication}
            </div>
        )
    })
    useEffect(() => {
        api.getApartmentApi(props.match.params.id)
            .then(res => {
                console.log(res)
                setApartment(res.data)
                setAddress(res.data.address)
                setComments(res.data.comments)
                setOrders(res.data.orders)
                setDetails({...res.data.detail})
                setImg(res.data.preview_image)
                setImages(res.data.apartment_image)
            })
    }, []);
    const sendComment = () => {
        api.sendComment(id, commentInput)
            .then(res => res.status === 201 ? window.location.href = `/more-info/${id}` : console.log(res))
    }
    let area = {...apartment.area}
    const onDataChange = (jsDate, dateString) => {
        console.log(jsDate, dateString)
    }
    let booking;
    if (orders.length > 0) {
        booking = orders.map(item => {
            return <div className={css.dateWrapper} key={item.id}>
                <div>
                    <label>От</label>
                    {/*<input type="text" value={item.arrival_date}/>*/}
                    <DatePickerInput
                        disabled={true}
                        value={item.arrival_date}
                        className='my-custom-datepicker-component'
                        onHide={() => 0}
                        showOnInputClick={true}
                    />
                </div>
                <div>
                    <label>До</label>
                    <DatePickerInput
                        disabled={true}
                        value={item.departure_date}
                        className='my-custom-datepicker-component'
                    />
                </div>
            </div>
        })
    }

    return (
        <div className={css.wrapper}>
            <div className={css.slider_block}>
                <Carousel
                    autoPlay
                    showIndicators={false}
                    infiniteLoop={true}
                    width={`100%`}
                    // dynamicHeight={true}
                    swipeable={true}
                    // showThumbs={false}
                    // centerMode={true}
                    thumbWidth='50px'

                >
                    {images.length <= 0 ?
                        null : images.map(item => {
                            console.log(item.image)
                            return item.image ?
                                <div className={css.imgWrapper} key={item.id}>
                                    <img src={`${item.image}`}/>
                                </div>
                                : null
                        })
                    }
                </Carousel>
            </div>
            <div className={css.moreInfoBlock}>
                <div className={css.priceBlock}>
                    <div>{apartment.title}</div>
                    <div>{Math.round(apartment.another_price)}$</div>
                </div>
                <div className={css.information}>
                    <div>Информация</div>
                    <div className={css.listInfo}>
                        <div>Комнат: {apartment.room}</div>
                        <div>Общая площадь: {area.total_area}m<sup>2</sup></div>
                        <div>Этаж: {apartment.floor}</div>
                        <div>Тип строение: {apartment.construction_type}</div>
                        <div>Этажность дома: {apartment.floor}</div>
                        {/*<div>Планировка: {apartment.floor}</div>*/}
                        <div>Тип ремонта: {apartment.state}</div>
                        <div></div>
                        {/*<div>Меблирована: {apartment.construction_type}</div>*/}
                        <div></div>
                    </div>
                    <div className={css.listNear}>
                        <div>
                            <div>Рядом есть:</div>
                            <div>
                                {details.parking ? <div>Парковка</div> : null}
                                {details.security ? <div>Охрана</div> : null}
                            </div>
                        </div>
                        <div>
                            <div>В квартире есть:</div>
                            <div>
                                {details.furniture ? <div>Мебель</div> : null}
                                {details.internet ? <div>Интернет</div> : null}
                                {details.gas ? <div>Газ</div> : null}
                                {details.heat ? <div>Отопление</div> : null}
                                {details.electricity ? <div>Электричество</div> : null}
                                {details.elevator ? <div>Лифт</div> : null}
                                {details.phone ? <div>Телефон</div> : null}
                            </div>
                        </div>
                    </div>
                    {booking}
                    <div className={css.descriptionWrapper}>
                        <div>Описание:</div>
                        <div>
                            {apartment.description}
                        </div>
                    </div>
                    <div>
                        <label>Дата публикации</label>
                        <DatePickerInput
                            disabled={true}
                            placeholder={'От какого числа занято'}
                            onChange={onDataChange}
                            value={apartment.pub_date}
                            className='my-custom-datepicker-component'
                            onHide={() => 0}
                            showOnInputClick={true}
                        />
                    </div>
                    <h4 style={{marginTop: '10px'}}>Место положение на карте:</h4>
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
                    <div className={css.commentWrapper}>
                        <h2>Отзывы</h2>
                        <div className={css.comments}>
                            {comment}
                        </div>
                        {token ?
                            <div>
                                <div className={css.commentInput}>
                                    <textarea
                                        maxLength={100}
                                        value={commentInput}
                                        onChange={e => setCommentInput(e.target.value)}
                                        placeholder="Введите текст..."
                                    />
                                </div>
                                < div>
                                    < button onClick={sendComment}>Отправить</button>
                                </div>
                            </div> : console.log('error')
                        }
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
                    defaultZoom={15}
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

export default compose(withRouter, connect(mapStateToProps, {}))(DeteilsPage)






























