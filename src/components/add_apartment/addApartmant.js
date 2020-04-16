import React, {useState} from 'react';
import css from "./addApartmant.module.css";
import axios from "axios";
import api from "../../api/api";
import {connect} from "react-redux";
import {WithNotAuthRedirect} from "../../HOC/AuthRedirect";
import {reduxForm, change} from "redux-form";
import TitleForm from "./titleForm";
import FormPage2 from "./formPage2";
import FormPage3 from "./FormPage3";
import FormPage4 from "./FormPage4";
import FormPage5 from "./FormPage5";
import {validate} from './validate';
import {withRouter} from "react-router-dom";




const AddApartmentForm = props => {
    const [mark, setMark] = useState([])
    const [question, setQuestion] = useState(false);
    const [hide, setHide] = useState(false)
    const [page, setPage] = useState(1)
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
        {id: '', name: 'Тип ремонта'},
        ...props.app.state
    ]
    const nextPage = () => {
        setPage(page + 1)
    }
    const prevPage = () => {
        setPage(page - 1)
    }
    return (
        <div className={css.formWrapper}>
            {page === 1 && <TitleForm onSubmit={nextPage} data={data} />}
            {page === 2 && <FormPage2 previousPage={prevPage} onSubmit={nextPage} rooms={rooms} state={state} constractionType={constractionType} />}
            {page === 3 && <FormPage3 previousPage={prevPage} onSubmit={nextPage} setDetails={props.setDetails} options={options} />}
            {page === 4 && <FormPage4 previousPage={prevPage} onSubmit={nextPage}  />}
            {page === 5 && <FormPage5 previousPage={prevPage} onSubmit={props.handleSubmit}
                                      regions={props.app.regions}
                                      setHide={setHide}
                                      hide={hide}
                                      setMark={setMark}
                                      width={width}
                                      question={question}
                                      mark={mark}
                                      pushLocation={pushLocation}
            />}
        </div>
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
            "tags": data.details,
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
                "phone": '0708626798',
                "name": 'Admin',
                "surname": 'Adminov'
            },
            "comments": [],
            "orders": []
        }
        api.add(formData)
            .then(
                (response) => {
                    console.log(response)
                    props.history.push(`/addPhoto/${response.data.id}`)
                },
                (error) => {
                    console.log(error)
                    alert(error)
                }
            )
    }
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

export default withRouter(AddApartmentConnect);
