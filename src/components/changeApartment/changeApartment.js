import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router-dom";
import api from "../../api/api";
import axios from "axios";
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
import {FileUpdate} from "../addPhoto/addPhoto";
import Preloader from "../preloader/Preloader";


const AddPhoto = props => {
    let {loadetImages} = props;
    let idApartment = props.match.params.id
    const [firstImg, setFirstImg] = useState(false)
    useEffect(()=>{
        if(!loadetImages[0]){
            setFirstImg(true)
        }
    })
    const onDelete = id => {
        if(loadetImages[0].id === id){
            setFirstImg(true)
        }
        api.deletePhoto(idApartment, id)
            .then(res => {
                console.log(res)
            })
    }
    console.log(!loadetImages[0])
    return (
        <div>
            <div className={css.files}>
                <FileUpdate required={firstImg} onDelete={onDelete} image={loadetImages[0]} img={props.images} setimg={props.setImages}/>
                <FileUpdate onDelete={onDelete} image={loadetImages[1]} img={props.images} setimg={props.setImages}/>
                <FileUpdate onDelete={onDelete} image={loadetImages[2]} img={props.images} setimg={props.setImages}/>
            </div>
            <div className={css.files}>
                <FileUpdate onDelete={onDelete} image={loadetImages[3]} img={props.images} setimg={props.setImages}/>
                <FileUpdate onDelete={onDelete} image={loadetImages[4]} img={props.images} setimg={props.setImages}/>
                <FileUpdate onDelete={onDelete} image={loadetImages[5]} img={props.images} setimg={props.setImages}/>
            </div>
        </div>
    )
}

const AddPhotoWithId = withRouter(AddPhoto)

const Form = props => {
    console.log(props)
    const [mark, setMark] = useState([])
    const [question, setQuestion] = useState(false);
    const [hide, setHide] = useState(false)
    const [loadetImages, setLoadetImages] = useState([])
    let width = window.innerWidth;
    useEffect(() => {
        api.getOwnApartmentApi(props.id)
            .then(res => {
                props.initializePost({
                    ...res.data,
                    total_area: res.data.area.total_area,
                    living_area: res.data.area.living_area
                })
                setMark([res.data.location.latitude, res.data.location.longitude])
                props.setImages(res.data.apartment_image)
                setLoadetImages(res.data.apartment_image)
                props.setPending(false)
            })
    }, [])
    //Находение местоположение по долготе и широте
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
        {id: '', type: 'Тип недвижимости'},
        ...props.app.types
    ]
    const state = [
        {id: '', name: 'Состояния ремонта'},
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
    const country = [
        { id: '', type: 'Страна' },
        ...props.app.country
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
    if(props.pending) {
        return <Preloader />
    }
    const submit = (e) =>{
        e.preventDefault()
        props.handleSubmit()
    }
    return (
        <form onSubmit={submit} style={{marginTop: '20px'}} className={css.formWrapper}>
            <div className={css.main}>
                <div>
                    <label>Заголовок*</label>
                    <Field name={'title'} placeholder={"Заголовок*"}
                           type="text" component={InputAdd}/>
                </div>
                <div>
                    <label>Тип недвижимости</label>
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

                <div/>

                <div>
                    <label>Площадь</label>
                    <Field name={'total_area'} placeholder={"Площадь"} type="number" component={InputAdd}/>
                </div>
                <div>
                    <label>Этаж</label>
                    <Field name={'floor'} component={InputAdd} placeholder={'Этаж'} type={'number'}/>
                </div>
                <div/>
                <div>
                    <label>Жилая площадь</label>
                    <Field name={'living_area'} placeholder={"Площадь"} type="number" component={InputAdd}/>
                </div>
                <div>
                    <label>Этажность дома</label>
                    <Field name={'storey'} component={InputAdd} type={'number'} placeholder={'Этажность дома'}/>
                </div>
                <div/>

                <div>
                    <label>Тип строения</label>
                    <Field name={'construction_type'} component={SelectAdd}
                           data={constractionType}
                    />
                </div>
                <div>
                    <label>Состояния ремонта</label>
                    <Field name={'state'} component={SelectAdd}
                           data={state}
                    />
                </div>
            </div>
            <div className={css.main + ' ' + css.details}>
                <Field
                    setDetails={props.setAtHome}
                    name={'objects_in_apartment'}
                    component={Sel} options={options} isMulti
                    placeholder={'В квартире есть...'}
                />
                <Field
                    setDetails={props.setNearHome}
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
                <div>
                    <AddPhotoWithId loadetImages={loadetImages} images={props.images} setImages={props.setImages}/>
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
                        <Field name={'location.latitude'} component={'input'}/>
                        <Field name={'location.longitude'} component={'input'}/>
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
                        <Field component={SelectAdd} name={'location.country'} data={country}/>
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
            dispatch(change('changeApartment', 'location.latitude', lat));
        },
        setLng: function (lng) {
            dispatch(change('changeApartment', 'location.longitude', lng));
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
    const [images, setImages] = useState([]);
    const [pending, setPending] = useState(true)

    const send = (data) => {
        setPending(true)
        const preview_image = new FormData();
        let i = 1;
        if (images.length) {
            images.map(item => {
                preview_image.append(`image` + i, item);
                i++
            })
        }
        preview_image.forEach((value, key) => {
            preview_image[key] = value;
        });
        console.log(data)

        let formData = {
            "title": data.title,
            "type": data.type,
            "room": data.room,
            "floor": data.floor,
            "storey": data.storey,
            "area": {
                "total_area": data.total_area,
                "living_area": data.living_area
            },
            "series": 1,
            "construction_type": data.construction_type,
            "state": data.state,
            "location": {
                "country": data.location.country,
                "region": data.location.region,
                "city": data.location.city,
                "district": 1,
                "street": data.location.street,
                "house_number": data.location.house_number,
                "latitude": data.location.latitude,
                "longitude": data.location.longitude
            },
            // "apartment_image": preview_image,
            "price": Number(data.price),
            "nearby_objects": data.nearby_objects,
            "objects_in_apartment": data.objects_in_apartment,
            "currency": Number(data.currency),
            "description": data.description,
        }
        console.log(formData)
        let token = JSON.parse(localStorage.getItem('newToken'));
        axios.patch(`https://yourthomemaster.herokuapp.com/apartment/${props.match.params.id}/`,formData,
        // api.changeApartment(props.match.params.id, formData)
            {
                headers: {
                    "Authorization": "Bearer " + token.access
                }
            }
        )
            .then(
                res => {
                    console.log(res);
                    api.addPhoto(props.match.params.id, preview_image).then(res => {
                        console.log(res)
                        props.history.push('/admin')
                    })
                },
                error => alert(error)
            )

    }

    return (
        <div>
            <FormChange images={images}
                        setImages={setImages}
                        app={props.app}
                        onSubmit={send}
                        pending={pending}
                        setPending={setPending}
                        id={props.match.params.id}/>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        app: state.app
    }
}
export default compose(WithNotAuthRedirect, withRouter, connect(mapStateToProps, {}))(Change)
