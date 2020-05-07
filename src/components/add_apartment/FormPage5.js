import React from 'react'
import css from "./addApartmant.module.css";
import {Field, reduxForm} from "redux-form";
import {InputAdd, SelectAdd, TextareaAdd} from "../forForms/inputs";
import {validate} from './validate';
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";


export const MyMapComponent = withScriptjs(withGoogleMap((props) => {
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

const FormPage5 = props => {
    return (
        <form onSubmit={props.onSubmit} style={{marginTop: '-10px'}}>
            <div style={{marginLeft: '2%'}}>Укажите на карте где находится Ваш дом или квартира*</div>
            <div className={css.modal}>
                <div
                    // style={{display: props.width <= 768 ? props.hide ? 'none' : 'block' : 'block'}}
                >
                    <MyMapComponent
                        marker={props.mark}
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
                                height: `78vh`,
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
                        pushLocation={props.pushLocation}
                    />
                </div>
                <MapForm
                    regions={props.regions}
                    setHide={props.setHide}
                    setMark={props.setMark}
                    question={props.question}/>
                <div></div>
                <div style={{margin: '0 0 25px 0'}} className={css.nextPrevBtn}>
                    <button onClick={() => props.previousPage()} className={css.sendBtn}>Назад</button>
                    <button type={"submit"} className={css.sendBtn}>Далее</button>
                </div>
            </div>
        </form>
    )
}


export const MapForm = props => {
    const regions = [
        {id: '', name: 'Регион'},
        ...props.regions
    ]
    return (
        <form onSubmit={props.onSubmit} className={css.addressWrapper}>
            <div style={{textAlign: 'center'}}>
                {props.question ? <div>
                    Это адрес вашего жилья?
                </div> : null}
            </div>
            <div style={{display: 'none'}}>
                <Field name={'lat'} component={'input'}/>
                <Field name={'lng'} component={'input'}/>
            </div>
            <div>
                <label>Номер дома</label>
                <Field component={InputAdd} placeholder={"Номер дома"} name={'house_number'} type="text"/>
            </div>
            <div>
                <label>Улица</label>
                <Field component={InputAdd} name={'street'} placeholder={"улица"} type="text"/>
            </div>
            <div>
                <label>Город</label>
                <Field component={InputAdd} name={'city'} placeholder={"город"} type="text"/>
            </div>
            <div>
                <label>Регион</label>
                <Field component={SelectAdd} name={'region'} data={regions}/>
            </div>
            <div>
                <label>Страна</label>
                <Field component={InputAdd} name={'country'} placeholder={"Страна"} type="text"/>
            </div>
        </form>
    )
}


export default reduxForm({
    form: 'addApartment',  //Form name is same
    destroyOnUnmount: false,
    validate
})(FormPage5);