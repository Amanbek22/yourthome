import React, {useEffect, useState} from 'react';
import css from './deteils.module.css'
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import api from "../../api/api";
import {DatePickerInput} from "rc-datepicker";
import 'moment/locale/ru.js';
import 'rc-datepicker/lib/style.css';
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";
import {compose} from "redux";
import img from '../../img/mainImg.png'
import Card from '../card/card'
import dropDown from '../../img/dropDown.png'
import Preloader from "../preloader/Preloader";

const DeteilsPage = props => {
    const {id} = props.match.params;
    const [apartment, setApartment] = useState({});
    const [comments, setComments] = useState([])
    const [orders, setOrders] = useState([])
    const [commentInput, setCommentInput] = useState();
    const [images, setImages] = useState([]);
    const [description, setDescription] = useState([])
    const [nearby_objects, setNearby_objects] = useState([])
    const [objects_in_apartment, setObjects_in_apartment] = useState([])
    const [phone, setPhone] = useState('')
    const [nearApartments, setNearApartments] = useState([])
    const [details, setDetails] = useState(true)
    const [noApartments, setNoApartments] = useState(true)
    const [pending, setPending] = useState(true)

    let token = JSON.parse(localStorage.getItem('newToken'));
    let comment = comments.map(item => {
        return (
            <div className={css.comment} key={item.id}>
                <h4>{item.owner}</h4>
                <div>
                    {item.text_of_publication}
                </div>
            </div>
        )
    })

    useEffect(() => {
        api.getApartmentApi(props.match.params.id)
            .then(res => {
                console.log(res.data)
                setDescription(res.data.description.split('\n'))
                setApartment(res.data)
                setPhone(res.data.contact.phone)
                setComments(res.data.comments)
                setOrders(res.data.orders)
                setImages(res.data.apartment_image)
                setNearby_objects(res.data.nearby_objects)
                setObjects_in_apartment(res.data.objects_in_apartment)
            })
        setPending(false)
        api.nearApartment(id).then(res => {
            setNearApartments(res.data)
            if ( res.data.length === 0 ){
                setNoApartments(false)
            }
        }, error => setNoApartments(false))
    }, [id]);
    const sendComment = () => {
        api.sendComment(id, commentInput)
            .then(res => res.status === 201 ? window.location.href = `/more-info/${id}` : console.log(res))
    }
    let area = {...apartment.area}
    const onDataChange = (jsDate, dateString) => {
        console.log(jsDate, dateString)
    }

    if(pending){
        return <Preloader />
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
                    swipeable={true}

                >
                    {images.length <= 0 ?
                        null : images.map(item => {
                            return item.image ?
                                <div className={css.imgWrapper} key={item}>
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
                </div>
                <div className={css.information}>
                    {
                        apartment.status
                            ? <div style={{color: '#57C325'}}>Свободно</div>
                            : <div style={{color: 'red'}}>Занято до {orders.length ? orders[0].departure_date : ''}</div>
                    }
                </div>
                <div className={css.price}>
                    <div>
                        Цена:
                    </div>
                    <div style={{marginLeft: '15px'}}>
                        {Math.round(apartment.currency === '$' ? apartment.price : apartment.another_price)}$
                    </div>
                </div>
                <div className={css.information}>
                    <div>Информация</div>
                    <div className={css.listInfo}>
                        <div>Комнат: {apartment.room}</div>
                        <div>Общая площадь: {area.total_area}m<sup>2</sup></div>
                        <div>Этаж: {apartment.floor}</div>
                        <div>Тип строение: {apartment.construction_type}</div>
                        <div>Этажность дома: {apartment.storey}</div>
                        <div>Тип ремонта: {apartment.state}</div>
                    </div>
                    <div className={css.detailsWrapper}>
                        <div style={{cursor: 'pointer'}} onClick={() => setDetails(!details)}>
                            <span style={{color: '#57C325', fontWeight: 500}}>Детали  </span>
                            <img style={{
                                marginLeft: '4px',
                                transition: 'transform 0.4s ease',
                                transform: details ? 'rotate(0)' : 'rotate(-180deg)'
                            }} src={dropDown} alt="^"/>
                        </div>
                        <div className={css.listNear}
                             style={{transitionDuration: '1s', display: details ? 'none' : 'grid'}}>
                            <div>
                                <div>Рядом есть:</div>
                                <div className={css.details}>
                                    {nearby_objects.map(item => <div key={item}>{item}</div>)}
                                </div>
                            </div>
                            <div>
                                <div>В квартире есть:</div>
                                <div className={css.details}>
                                    {objects_in_apartment.map(item => <div key={item}>{item}</div>)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={css.description} style={{marginTop: "20px"}}>Даты арендования:</div>
                        <div style={{margin: '10px 0 0 10px'}}>
                            {booking}
                        </div>
                    </div>
                    <div className={css.descriptionWrapper}>
                        <div>
                            <span className={css.description}>Описание:</span>
                            <span className={css.description}
                                  style={{marginLeft: "20%"}}>тел.: {phone}</span>
                        </div>
                        <div style={{margin: '10px 0 0 10px'}}>
                            {description.map((item, index) => <span key={index}>{item} <br/></span>)}
                        </div>
                    </div>
                    <div>
                        <label className={css.description}>Дата публикации</label>
                        <div style={{margin: '10px'}}>
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
                            {comment.length ? comment : <div className={css.titles}>Пока нет отзывов</div>}
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
                                <div>
                                    <button onClick={sendComment}>Отправить</button>
                                </div>
                            </div> : console.log('error')
                        }
                    </div>
                </div>
                <div className={css.titles}>Другие варианты жилья в этом районе</div>
                <div style={{position: 'relative'}} className={css.cards}>
                    {
                        nearApartments.length ? nearApartments.map(item => {
                                return <Card
                                    id={item.id}
                                    key={item.id}
                                    img={item.apartment_image[0] ? item.apartment_image[0].image : null}
                                    city={item.location.city}
                                    street={item.location.street}
                                    houseNumber={item.location.house_number}
                                    price={item.price}
                                    rooms={item.room}
                                    floor={item.floor}
                                    area={item.area.total_area}
                                    title={item.title}
                                    userName={item.owner}
                                />
                            }) : <div />
                    }
                </div>
                {
                    !noApartments
                        ? <div className={css.titles}>Больше нет объявлений в этом районе.</div>
                        : <div />
                }
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


// {details.parking ? <div>Парковка</div> : null}
// {details.security ? <div>Охрана</div> : null}
// {details.furniture ? <div>Мебель</div> : null}
// {details.internet ? <div>Интернет</div> : null}
// {details.gas ? <div>Газ</div> : null}
// {details.heat ? <div>Отопление</div> : null}
// {details.electricity ? <div>Электричество</div> : null}
// {details.elevator ? <div>Лифт</div> : null}
// {details.phone ? <div>Телефон</div> : null}