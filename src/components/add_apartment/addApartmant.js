import React, {useEffect, useState} from 'react';
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";
import css from "./addApartmant.module.css";
import axios from "axios";
import api from "../../api/api";
import Modal from 'react-awesome-modal'
import {connect} from "react-redux";
import {WithNotAuthRedirect} from "../../HOC/AuthRedirect";
import {Field, reduxForm,  change} from "redux-form";
import { InputAdd, SelectAdd, TextareaAdd} from "../forForms/inputs";
import Select from "react-select";

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
                    {
                        props.marker.length > 0 ? <Marker
                            position={{
                                lat: props.marker[0],
                                lng: props.marker[1]
                            }}
                            color={'#ffffff'}
                            cursor={"pointer"}
                        /> : null
                    }
                </GoogleMap>
            </div>
        )
    }
))


const validate = values => {
    const errors = {}
    if (!values.headline) {
        errors.headline = 'Обязательное поле'
    } else if (values.headline.length > 0) {
        errors.headline = undefined
    }
    if (!values.price) {
        errors.price = 'Обязательное поле'
    } else if (values.price.length > 0) {
        errors.price = undefined
    }
    if (!values.area) {
        errors.area = 'Обязательное поле'
    } else if (values.area.length > 0) {
        errors.area = undefined
    }
    if (!values.liveArea) {
        errors.liveArea = 'Обязательное поле'
    } else if (values.liveArea.length > 0) {
        errors.liveArea = undefined
    }
    if (!values.rooms) {
        errors.rooms = 'Обязательное поле'
    } else if (values.rooms.length > 0) {
        errors.rooms = undefined
    }
    if (!values.constractionType) {
        errors.constractionType = 'Обязательное поле'
    } else if (values.constractionType.length > 0) {
        errors.constractionType = undefined
    }
    if (!values.floor) {
        errors.floor = 'Обязательное поле'
    } else if (values.floor.length > 0) {
        errors.floor = undefined
    }
    if (!values.floors) {
        errors.floors = 'Обязательное поле'
    } else if (values.floors.length > 0) {
        errors.floors = undefined
    }
    if (!values.apartmentType) {
        errors.apartmentType = 'Обязательное поле'
    } else if (values.apartmentType.length > 0) {
        errors.apartmentType = undefined
    }
    if (!values.description) {
        errors.description = 'Обязательное поле'
    } else if (values.description.length) {
        errors.description = undefined
    }
    if (!values.number) {
        errors.number = 'Обязательное поле'
    } else if (values.number.length) {
        errors.number = undefined
    }
    if (!values.name) {
        errors.name = 'Обязательное поле'
    } else if (values.name.length) {
        errors.name = undefined
    }
    if (!values.state) {
        errors.state = 'Обязательное поле'
    } else if (values.state.length) {
        errors.state = undefined
    }
    return errors
}

const Sel = props => {
    let {placeholder, options} = props
    return (
        <>
            <Select
                placeholder={placeholder}
                options={options}
                {...props}
                onChange={(data) => {
                    let arr = []
                    data.map(item => {
                        arr.push(item.value)
                    })
                    props.setDetails(arr)
                }}
            />
        </>
    )
}

const AddApartmentForm = props => {
    // useEffect(()=>{
    //     api.getDetails().then(res=>console.log(res))
    // },[])
    const [mark, setMark] = useState([])
    const [visible, setVisible] = useState(false);
    const [question, setQuestion] = useState(false);
    const [hide, setHide] = useState(false)
    const pushLocation = e => {
        let latlng = [e.latLng.lat(), e.latLng.lng()];
        props.setLat(latlng[0])
        props.setLng(latlng[1])
        setMark(latlng)
        let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng[0]},${latlng[1]}&key=AIzaSyC31ZdDwrrTeMu4oaL5m5q4m6gCqAGkIKM&language=ru&region=RU"`
        axios.get(url)
            .then(async res => {
                console.log(res.data.results)
                res.data.results.forEach(item => {
                    if (item.types.includes('administrative_area_level_1')) {
                        if (item.place_id === 'ChIJSYCimF4xmTgRu6zwHysIk4A') props.setRegion(1)
                        if (item.place_id === 'ChIJZYZaKB-svTgRZsjuUjKmMCk') props.setRegion(2)
                        if (item.place_id === 'ChIJLQAMhYOWkDgRKmo5Z1ts44M') props.setRegion(3)
                        if (item.place_id === 'ChIJTVS47SPHozgRqyAdJHOnVQ4') props.setRegion(4)
                        if (item.place_id === 'ChIJmSXShAk8hDgRmaJEQ04p-zo') props.setRegion(5)
                        if (item.place_id === 'ChIJZ_Y3HKc3ozgRGVCldXSjb00') props.setRegion(6)
                        if (item.place_id === 'ChIJVYNrr04RujgRvyIWQs1WzCk') props.setRegion(7)
                    }
                })
                let arr = [...res.data.results[0].address_components];
                await arr.forEach(item => {
                    if (item.types.includes('street_number')) {
                        props.setHouse(item.short_name)
                    }
                    if (item.types.includes('route')) {
                        props.setStreet(item.short_name)
                    }
                    if (item.types.includes("locality")) {
                        props.setCity(item.short_name)
                    }
                    if (item.types.includes('country')) {
                        props.setCountry(item.long_name)
                    }
                })
                setQuestion(true)
                if (width <= 768) {
                    setHide(true)
                }
            })

    };
    let width = window.innerWidth;
    console.log(props.app)
    const data = [
        {id: '', type: 'Тип недвижемости'},
        ...props.app.types
    ]
    const rooms = [
        {id: '', type: 'Количества комнат'},
        {id: 1, type: 1},
        {id: 2, type: 2},
        {id: 3, type: 3},
        {id: 4, type: 4},
        {id: 5, type: 5},
        {id: 6, type: 6},
    ]
    const constractionType = [
        {id: '', type: 'Тип строения'},
        ...props.app.constructionType
    ]
    const options = [
        {value: 'internet', label: 'Интернет'},
        {value: 'gas', label: 'Газ'},
        {value: 'heat', label: 'Отопление'},
        {value: 'phone', label: 'Телефон'},
        {value: 'electricity', label: 'Электричество'},
        {value: 'furniture', label: 'Мебель'},
        {value: 'elevator', label: 'Лифт'},
        {value: 'security', label: 'Охрана'},
        {value: 'parking', label: 'Парковка'},
    ]
    const state = [
        {id: '', type: 'Тип ремонта'},
        {id: '1', type: 'Отличное'},
    ]
    const onSubmit = data => {
        props.handleSubmit()
    }
    const sub = e => {
        e.preventDefault()
        setVisible(true)
    }
    return (
        <form onSubmit={sub} className={css.formWrapper}>
            <div className={css.main}>
                <div>
                    <label>Заголовок*</label>
                    <Field name={'headline'} placeholder={"Заголовок*"}
                           type="text" component={InputAdd}/>
                </div>
                <div>
                    <label>Тип недвижемости</label>
                    <Field name={'apartmentType'} component={SelectAdd} data={data} valueField={'value'}
                           textField={'text'}/>
                </div>
            </div>
            <div className={css.infos + ' ' + css.main}>
                <div>
                    <label>Цена</label>
                    <Field placeholder={"Цена"} type="number" name={'price'} component={InputAdd}
                    />
                </div>

                <div>
                    <label>Количество комнат</label>
                    <Field component={SelectAdd} name={'rooms'} data={rooms}/>
                </div>
                <div>
                    <label>Площадь</label>
                    <Field name={'area'} placeholder={"Площадь"} type="number" component={InputAdd}/>
                </div>
                <div>
                    <label>Этаж</label>
                    <Field name={'floor'} component={InputAdd} placeholder={'Этаж'} type={'number'}/>
                </div>
                <div>
                    <label>Жилая площадь</label>
                    <Field name={'liveArea'} placeholder={"Площадь"} type="number" component={InputAdd}/>
                </div>
                <div>
                    <label>Этажность дома</label>
                    <Field name={'floors'} component={InputAdd} type={'number'} placeholder={'Этажность дома'}/>
                </div>
                <div>
                    <label>Тип строения</label>
                    <Field name={'constractionType'} component={SelectAdd} data={constractionType}/>
                </div>
                <div>
                    <label>Тип ремонта</label>
                    <Field name={'state'} component={SelectAdd} data={state}/>
                </div>
            </div>
            <div className={css.main + ' ' + css.details}>
                <Field setDetails={props.setDetails} name={'details'} component={Sel} options={options} isMulti
                       placeholder={'Детали...'}/>
            </div>
            <div className={css.main}>
                <div>
                    <label>Описание</label>
                    <Field component={TextareaAdd} name={'description'} placeholder={"Описание...."}/>
                </div>
            </div>
            <div className={css.main}>
                <div>
                    <label>Номер телефона*</label>
                    <Field component={InputAdd} name={'number'} type={'phone'} placeholder={'Номер телефона*'}/>
                </div>
                <div>
                    <label>Имя</label>
                    <Field component={InputAdd} name={'name'} type={'text'} placeholder={'Ваше имя*'}/>
                </div>
            </div>
            <input type={'submit'} className={css.sendBtn}
                   value={'Далее'}/>
            <div style={{display: 'none'}}>
                <Field name={'lat'} component={'input'}/>
                <Field name={'lng'} component={'input'}/>
            </div>
            <Modal
                visible={visible}
                width="95%"
                height="95%"
                effect="fadeInDown"
                onClickAway={() => setVisible(false)}
            >
                <div className={css.modal}>
                    <a style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: 20,
                        height: 20,
                        marginRight: 5,
                        marginTop: 5,
                        zIndex: 3
                    }} onClick={() => setVisible(false)}>
                        <img style={{width: 100 + '%', height: 100 + '%'}}
                             src="https://image.flaticon.com/icons/svg/1828/1828774.svg" alt="x"/>
                    </a>
                    <h3 className={css.mainText}>Выберите место расположение вашего жилья.</h3>

                    <div style={{display: width <= 768 ? hide ? 'none' : 'block' : 'block'}}>
                        <MyMapComponent
                            marker={mark}
                            googleMapURL="
                            https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyC31ZdDwrrTeMu4oaL5m5q4m6gCqAGkIKM&language=ru&region=RU
                            "
                            loadingElement={<div
                                style={{
                                    height: `90%`,
                                    position: `sticky`,
                                    zIndex: `99999990`,
                                    top: `0`,
                                    left: `0`
                                }}/>}
                            containerElement={<div
                                style={{
                                    height: `85vh`,
                                    position: `sticky`,
                                    zIndex: `99999990`,
                                    left: `0`
                                }}/>}
                            mapElement={<div
                                style={{
                                    height: `100%`,
                                    position: `sticky`,
                                    zIndex: `99999990`,
                                    top: `0`,
                                    left: `0`
                                }}/>}
                            pushLocation={pushLocation}
                        />
                    </div>
                    <MapForm onSubmit={onSubmit} regions={props.app.regions} setHide={setHide} setMark={setMark} question={question}/>
                </div>
            </Modal>
        </form>
    )
}

const MapForm = props => {
    const regions = [
        {id: '', name: 'Регион'},
        ...props.regions
        // {text: 1, value: 'Чуй'},
        // {text: 2, value: 'Ош'},
        // {text: 3, value: 'Нарын'},
        // {text: 4, value: 'Талас'},
        // {text: 5, value: 'Иссык-Куль'},
        // {text: 6, value: 'Джалал-Абад'},
        // {text: 7, value: 'Баткен'},
    ]
    return (
        <form onSubmit={props.onSubmit} className={css.addressWrapper}>
            <div style={{textAlign: 'center'}}>
                {props.question ? <div>
                    Это адрес вашего жилья?
                </div> : null}
            </div>

            <div>
                <label>Номер дома</label>
                <Field component={InputAdd} placeholder={"Номер дома"} name={'house_number'} type="text"/>
                {/*<input required value={num} placeholder={"Номер дома"} type="text"*/}
                {/*className={css.inputs} onChange={e => setNum(e.target.value)}/>*/}
            </div>
            <div>
                <label>Улица</label>
                <Field component={InputAdd} name={'street'} placeholder={"улица"} type="text"/>
                {/*<input required value={street} placeholder={"улица"} type="text"*/}
                {/*className={css.inputs} onChange={e => setStreet(e.target.value)}/>*/}
            </div>
            <div>
                <label>Город</label>
                <Field component={InputAdd} name={'city'} placeholder={"город"} type="text"/>
                {/*<input required value={city} placeholder={"город"} type="text"*/}
                {/*className={css.inputs} onChange={e => setCity(e.target.value)}/>*/}
            </div>
            <div>
                <label>Регион</label>
                <Field component={SelectAdd} name={'region'} data={regions}/>
            </div>
            <div>
                <label>Страна</label>
                <Field component={InputAdd} name={'country'} placeholder={"Страна"} type="text"/>
                {/*<input required value={country} placeholder={"Страна"} type="text"*/}
                {/*className={css.inputs} onChange={e => setCountry(e.target.value)}/>*/}
            </div>
            {
                props.question ?
                    <div>
                        <div style={{fontSize: "14px"}}>Если ваш адресс указан не правильно вы
                            можете исправить вручную.
                        </div>
                        <div style={{display: "flex"}}>
                            <input style={{width: "100px"}} type="submit"
                                   value={'Да'}
                                   className={css.sendBtn}/>
                            <input
                                style={{width: "100px", background: 'red'}} type="button"
                                value={'Нет'} className={`${css.sendBtn} ${css.rejectBtn}`}
                                onClick={() => {
                                    props.setHide(false)
                                    props.setMark('')
                                }}
                            />
                        </div>
                    </div>
                    : null
            }
        </form>
    )
}

const mapStateToProps = state => {
    return {
        form: state.form.addApartment.values,
        app: state.app
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setLat: function (lat) {
            dispatch(change('addApartment', 'lat', lat));
        },
        setLng: function (lng) {
            dispatch(change('addApartment', 'lng', lng));
        },
        setHouse: function (num) {
            dispatch(change('addApartment', 'house_number', num))
        },
        setStreet: (street) => {
            dispatch(change('addApartment', 'street', street))
        },
        setCity: (data) => {
            dispatch(change('addApartment', 'city', data))
        },
        setCountry: (data) => {
            dispatch(change('addApartment', 'country', data))
        },
        setRegion: (data) => {
            dispatch(change('addApartment', 'region', data))
        },
        setDetails: (data) => {
            dispatch(change('addApartment', 'details', data))
        }
    }
}

const AddApartmentConnectForm = connect(mapStateToProps, mapDispatchToProps)(AddApartmentForm)
const AddApartmentReduxForm = reduxForm({form: 'addApartment', validate})(AddApartmentConnectForm)

const AddApartment = props => {
    const sendData = (data) => {
        console.log(data)
        // let preview_image = new FormData();
        // preview_image.append("preview_image", data.images);
        let formData = {
            "title": data.headline,
            "type": Number(data.apartmentType),
            "room": data.rooms,
            "floor": data.floor,
            "area": {
                "id": 1,
                "total_area": Number(data.area),
                "living_area": Number(data.liveArea)
            },
            "series": 1,
            "construction_type": Number(data.constractionType),
            "state": Number(data.state),
            "detail": {
                "furniture": data.details ? data.details.includes('furniture') : false,
                "heat": data.details ? data.details.includes('heat') : false,
                "gas": data.details ? data.details.includes('gas') : false,
                "electricity": data.details ? data.details.includes('electricity') : false,
                "internet": data.details ? data.details.includes('internet') : false,
                "phone": data.details ? data.details.includes('phone') : false,
                "elevator": data.details ? data.details.includes('elevator') : false,
                "security": data.details ? data.details.includes('security') : false,
                "parking": data.details ? data.details.includes('parking') : false
            },
            "location": {
                "id": 1,
                "country": 1,
                "region": Number(data.region),
                "city": data.city,
                "district": 1,
                "street": data.street,
                "house_number": data.house_number,
                "latitude": data.lat,
                "longitude": data.lng
            },
            "rental_period": null,
            "price": Number(data.price),
            "currency": 1,
            "preview_image": null,
            "description": data.description,
            "images": [],
            "contact": {
                "id": 1,
                "role": 1,
                "phone": data.number,
                "name": data.name,
                "surname": data.name
            },
            "comments": [],
            "orders": []
        }
        api.add(formData)
            .then(
                (response) => {
                    console.log(response)
                    window.location.href = `/addPhoto/${response.data.id}`
                },
                (error) => {
                    console.log(error)
                    alert(error)
                }
            )
    }
    useEffect(()=>{
       api.getDetails()
           .then(res=>{
               console.log(res)
           })
    },[])
    return (
        <div className={css.wrapper}>
            <div id={"formID"}>
                <h2 className={css.h2}>Подать объявление </h2>
                <AddApartmentReduxForm onSubmit={sendData}/>
            </div>
        </div>
    )
}

const AddApartmentConnect = WithNotAuthRedirect(AddApartment);

export default AddApartmentConnect;
