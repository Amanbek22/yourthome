import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router-dom";
import api from "../../api/api";
import axios from "axios";
// import css from './change.module.css';
import {WithNotAuthRedirect} from "../../HOC/AuthRedirect";
import {compose} from "redux";
import {change, Field, reduxForm} from "redux-form";
import {InputAdd, SelectAdd, TextareaAdd} from "../forForms/inputs";
import css from '../add_apartment/addApartmant.module.css'
import {connect} from "react-redux";
import {initialize} from 'redux-form';
import {validate} from '../add_apartment/validate'
import {MyMapComponent} from "../add_apartment/FormPage5";
import {Sel} from "../add_apartment/FormPage3";

const Form = props => {
    useEffect(() => {
        api.getApartmentApi(props.id)
            .then(res => {
                console.log(res.data)
                // props.initializePost({...res.data,area: {...res.data.area},detail: {...res.data.details},location:  {...res.data.location}, contact: {...res.data.contact}})
                props.initializePost({
                    ...res.data,
                    total_area: res.data.area.total_area,
                    living_area: res.data.area.living_area
                })
                setMark([res.data.location.latitude, res.data.location.longitude])
                // props.setNearHome(res.data.nearby_objects)
                // props.setAtHome(res.data.objects_in_apartment)
            })
    }, [])
    const [mark, setMark] = useState([])
    const [question, setQuestion] = useState(false);
    const [hide, setHide] = useState(false)
    let width = window.innerWidth;
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
    const data = [
        {id: '', type: 'Тип недвижемости'},
        ...props.app.types
    ]
    const state = [
        {id: '', name: 'Тип ремонта'},
        ...props.app.state
    ]
    const constractionType = [
        {id: '', type: 'Тип строения'},
        ...props.app.constructionType
    ]
    const regions = [
        {id: '', name: 'Регион'},
        ...props.app.regions
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
    return (
        <form onSubmit={props.handleSubmit} className={css.formWrapper}>
            <div className={css.main}>
                <div>
                    <label>Заголовок*</label>
                    <Field name={'title'} placeholder={"Заголовок*"}
                           type="text" component={InputAdd}/>
                </div>
                <div>
                    <label>Тип недвижемости</label>
                    <Field name={'type'} component={SelectAdd} data={data} valueField={'value'}
                           textField={'text'}/>
                </div>
            </div>
            <div className={css.infos + ' ' + css.main}>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gridGap: '1em'}}>
                    <div className={css.priceCur}>
                        <label>Цена</label>
                        <Field placeholder={"Цена"} type="number" name={'price'} component={InputAdd}
                        />
                    </div>
                    <div className={css.priceCur}>
                        <label>Валюта</label>
                        <Field placeholder={"Валюта"} name={'currency'} data={props.app.currency} component={SelectAdd}
                        />
                    </div>
                </div>

                <div>
                    <label>Количество комнат</label>
                    <Field component={InputAdd} name={'room'}/>
                </div>
                <div>
                    <label>Площадь</label>
                    <Field name={'total_area'} placeholder={"Площадь"} type="number" component={InputAdd}/>
                </div>
                <div>
                    <label>Этаж</label>
                    <Field name={'floor'} component={InputAdd} placeholder={'Этаж'} type={'number'}/>
                </div>
                <div>
                    <label>Жилая площадь</label>
                    <Field name={'living_area'} placeholder={"Площадь"} type="number" component={InputAdd}/>
                </div>
                <div>
                    <label>Этажность дома</label>
                    <Field name={'floors'} component={InputAdd} type={'number'} placeholder={'Этажность дома'}/>
                </div>
                <div>
                    <label>Тип строения</label>
                    <Field name={'constractionType'} component={SelectAdd}
                           data={constractionType}
                    />
                </div>
                <div>
                    <label>Тип ремонта</label>
                    <Field name={'state'} component={SelectAdd}
                           data={state}
                    />
                </div>
            </div>
            <div className={css.main + ' ' + css.details}>
                <Field
                    setDetails={props.setNearHome}
                    name={'objects_in_apartment'}
                    component={Sel} options={options} isMulti
                    placeholder={'В квартире есть...'}
                />
                <Field
                    setDetails={props.setAtHome}
                    name={'nearby_objects'}
                    component={Sel} options={options} isMulti
                    placeholder={'Рядом есть...'}
                />
            </div>
            <div className={css.main}>
                <div>
                    <label>Описание</label>
                    <Field component={TextareaAdd} name={'description'} placeholder={"Описание...."}/>
                </div>
            </div>

            <div className={css.modal}>
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
                                top: `0`,
                                left: `0`
                            }}/>}
                        containerElement={<div
                            style={{
                                height: `85vh`,
                                position: `sticky`,
                                left: `0`
                            }}/>}
                        mapElement={<div
                            style={{
                                height: `100%`,
                                position: `sticky`,
                                top: `0`,
                                left: `0`
                            }}/>}
                        pushLocation={pushLocation}
                    />
                </div>
                <div className={css.addressWrapper}>
                    <div style={{textAlign: 'center'}}>
                        {question ? <div>
                            Это адрес вашего жилья?
                        </div> : null}
                    </div>
                    <div style={{display: 'none'}}>
                        <Field name={'lat'} component={'input'}/>
                        <Field name={'lng'} component={'input'}/>
                    </div>
                    <div>
                        <label>Номер дома</label>
                        <Field component={InputAdd} placeholder={"Номер дома"} name={'location.house_number'}
                               type="text"/>
                    </div>
                    <div>
                        <label>Улица</label>
                        <Field component={InputAdd} name={'location.street'} placeholder={"улица"} type="text"/>
                    </div>
                    <div>
                        <label>Город</label>
                        <Field component={InputAdd} name={'location.city'} placeholder={"город"} type="text"/>
                    </div>
                    <div>
                        <label>Регион</label>
                        <Field component={SelectAdd} name={'location.region'} data={regions}/>
                    </div>
                    <div>
                        <label>Страна</label>
                        <Field component={InputAdd} name={'location.country'} placeholder={"Страна"} type="text"/>
                    </div>
                </div>
            </div>
            <input type={'submit'} className={css.sendBtn} style={{margin: '0 auto 20px auto'}}
                   value={'Далее'}/>
        </form>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        initializePost: function (post) {
            dispatch(initialize('changeApartment', post));
        },
        setLat: function (lat) {
            dispatch(change('changeApartment', 'location.lat', lat));
        },
        setLng: function (lng) {
            dispatch(change('changeApartment', 'location.lng', lng));
        },
        setHouse: function (num) {
            dispatch(change('changeApartment', 'location.house_number', num))
        },
        setStreet: (street) => {
            dispatch(change('changeApartment', 'location.street', street))
        },
        setCity: (data) => {
            dispatch(change('changeApartment', 'location.city', data))
        },
        setCountry: (data) => {
            dispatch(change('changeApartment', 'location.country', data))
        },
        setRegion: (data) => {
            dispatch(change('changeApartment', 'location.region', data))
        },
        setAtHome: (data) => {
            dispatch(change('changeApartment', 'objects_in_apartment', data))
        },
        setNearHome: (data) => {
            dispatch(change('changeApartment', 'nearby_objects', data))
        }
    }
}

const FormConnect = connect(null, mapDispatchToProps)(Form)
const FormChange = reduxForm({
    form: 'changeApartment', validate
})(FormConnect)

const Change = props => {


    const send = (data) => {
        // alert('aaaaa')
        console.log(data)
        let formData = {
            "type": data.type,
            "room": data.room,
            "floor": data.floor,
            "area": {
                "id": 1,
                "total_area": data.area.total_area,
                "living_area": data.area.living_area
            },
            "series": 1,
            "construction_type": data.constractionType,
            "state": 1,
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
                "region": data.location.region,
                "city": 1,
                "district": 1,
                "street": data.location.street,
                "house_number": data.location.house_number,
                "latitude": data.location.lat,
                "longitude": data.location.lng
            },
            "price": Number(data.price),
            "nearby_objects": data.nearby_objects,
            "objects_in_apartment": data.objects_in_apartment,
            "currency": data.currency,
            "description": data.description,
            "images": [],
            "comments": [],
            "orders": []
        }
        console.log(formData)
        let token = JSON.parse(localStorage.getItem('newToken'));
        axios.patch(`https://yourthomemaster.herokuapp.com/apartment/${props.match.params.id}/`,
            // {
            //     "title": data.title,
            //     'description': data.description,
            //     'price': data.price,
            //     'room': data.room,
            //     'floor': data.floor,
            // }
            {
                "type": Number(data.type),
                "room": Number(data.room),
                "floor": data.floor,
                "area": {
                    "total_area": Number(data.area.total_area),
                    "living_area": Number(data.area.living_area),
                },
                "series": 1,
                "construction_type": Number(data.constractionType),
                "state": 1,
                // "detail": {
                "furniture": data.details ? data.details.includes('furniture') : false,
                "heat": data.details ? data.details.includes('heat') : false,
                "gas": data.details ? data.details.includes('gas') : false,
                "electricity": data.details ? data.details.includes('electricity') : false,
                "internet": data.details ? data.details.includes('internet') : false,
                "phone": data.details ? data.details.includes('phone') : false,
                "elevator": data.details ? data.details.includes('elevator') : false,
                "security": data.details ? data.details.includes('security') : false,
                "parking": data.details ? data.details.includes('parking') : false,
                // },
                // "location": {
                "country": 1,
                "region": data.location.region,
                "city": data.city,
                "district": 1,
                "street": data.location.street,
                "house_number": data.location.house_number,
                "latitude": data.location.latitude,
                "longitude": data.location.longitude,
                // },
                "price": Number(data.price),
                "currency": data.currency,
                "objects_in_apartment": [],
                "nearby_objects": [],
                "description": data.description,
                "images": [],
                "tags": [],
            }
            , {
                headers: {
                    "Authorization": "Bearer " + token.access
                }
            })
            .then(
                res => {
                    console.log(res);
                    // window.location.href = '/admin'
                },
                error => alert(error)
            )

    }
    // const deleteApartment = () =>{
    //     api.deleteApartment(props.match.params.id).then(res=>{
    //         window.location.href = '/admin'
    //     })
    // }
    return (
        <div>
            <FormChange app={props.app} onSubmit={send} id={props.match.params.id}/>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        app: state.app
    }
}
export default compose(WithNotAuthRedirect, withRouter, connect(mapStateToProps, {}))(Change)

// <div className={css.wrapper}>
//     <div>
//     <label>Загаловок</label>
// <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
// </div>
// <div>
//     <label>Описание</label>
//     <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
// </div>
// <div>
// <label>Количество комнат</label>
// <input type="text" value={rooms} onChange={(e) => setRooms(e.target.value)}/>
// </div>
// {/*<input type="text" value={area} onChange={(e)=>setArea(e.target.value)}/>*/}
// <div>
//     <label>Цена</label>
//     <input type="text" value={price} onChange={(e) => setPrice(e.target.value)}/>
// </div>
// <div>
// <label>Этаж</label>
// <input type="text" value={floor} onChange={(e) => setFloor(e.target.value)}/>
// </div>
// <button className={css.deleteBtn} onClick={() => setVisible(true)}>
//     Change
// </button>
// <Modal
// visible={visible}
// width="400"
// height="300"
// effect="fadeInDown"
// onClickAway={() => setVisible(false)}
// >
// <div className={css.modal}>
//     <a style={{
//     position: 'absolute',
//         top: 0,
//         right: 0,
//         width: 20,
//         height: 20,
//         marginRight: 5,
//         marginTop: 5,
// }} href="javascript:void(0);" onClick={() => setVisible(false)}>
// <img style={{width: 100 + '%', height: 100 + '%'}}
// src="https://image.flaticon.com/icons/svg/1828/1828774.svg" alt="x"/>
//     </a>
// <p>Вы действительно хотите изменить это объявление?</p>
// <div className={css.btnWrapperDel}>
//     <div className={css.yesBtn} onClick={send}>
//     Да
//     </div>
// <div style={{background: 'red'}} className={css.yesBtn} onClick={() => setVisible(false)}>Нет
// </div>
// </div>
// </div>
// </Modal>
// {/* <button onClick={deleteApartment} className={css.deleteBtn}>Удалить объявление</button> */}
// </div>
