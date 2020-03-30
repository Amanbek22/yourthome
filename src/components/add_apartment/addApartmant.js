import React, {useState} from 'react';
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";
import css from "./addApartmant.module.css";
import axios from "axios";
import api from "../../api/api";
import {setApartment} from '../../redux/googleMap_reducer';
import marker from "../../img/marker6.png";
import marker2 from "../../img/marker10.png";
import Modal from 'react-awesome-modal'
// import roomsImg from '../../img/room.png'

const MyMapComponent = withScriptjs(withGoogleMap((props) => {
        console.log(props)
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


const AddApartment = props => {
    const [headline, setHeadline] = useState();
    const [rooms, setRooms] = useState();
    const [area, setArea] = useState();
    const [livArea, setLivArea] = useState();
    const [floor, setFloor] = useState();
    const [floors, setFloors] = useState();
    const [latLng, setLatLng] = useState([]);
    const [constractionType, setConstractionType] = useState();
    const [num, setNum] = useState(null);
    const [street, setStreet] = useState();
    const [city, setCity] = useState();
    const [country, setCountry] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [images, setImages] = useState(null);
    const [internet, setInternet] = useState(false);
    const [furniture, setFurniture] = useState(false)
    const [elevator, setElevator] = useState(false)
    const [gas, setGas] = useState(false)
    const [phone, setPhone] = useState(false)
    const [security, setSecurity] = useState(false)
    const [parcking, setParcking] = useState(false)
    const [apartmentType, setApartmentType] = useState()
    const [regions, setRegions] = useState(0)
    const [mark, setMark] = useState([])
    const [btnState, setBtnState] = useState(false)
    const [visible, setVisible] = useState(false);
    const [question, setQuestion] = useState(false);
    let address = {};
    const pushLocation = async e => {
        let latlng = [e.latLng.lat(), e.latLng.lng()];
        setLatLng(latlng)
        setMark(latlng)
        console.log(mark)
        let newurl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latlng[0]}&lon=${latlng[1]}&accept-language=ru`
        //let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng[0]},${latlng[1]}&key=AIzaSyC31ZdDwrrTeMu4oaL5m5q4m6gCqAGkIKM`
        await axios.get(newurl)
            .then(res => {
                let address_1 = res.data.address;
                address = address_1;
                console.log(address_1)
                setNum(address_1.house_number)
                setStreet(address_1.road)
                setCity(address_1.city ? address_1.city : address_1.town)
                setCountry(address_1.country)
                setQuestion(true)
            })
    }
    const sendData = (e) => {
        e.preventDefault();
        if (latLng.length > 0) {
            setBtnState(true)
            let preview_image = new FormData();
            preview_image.append("preview_image", images);
            // data.forEach((value, key) => {
            //     data[key] = value;
            // });
            let formData = {
                "id": 1,
                "type": apartmentType,
                "room": rooms,
                "floor": floor,
                "area": {
                    "id": 1,
                    "total_area": Number(area),
                    "living_area": Number(livArea)
                },
                "series": 1,
                "construction_type": constractionType,
                "state": 1,
                "detail": {
                    "id": 1,
                    "furniture": furniture,
                    "heat": false,
                    "gas": gas,
                    "electricity": true,
                    "internet": internet,
                    "phone": phone,
                    "elevator": elevator,
                    "security": security,
                    "parking": parcking
                },
                "location": {
                    "id": 1,
                    "country": 1,
                    "region": regions,
                    "city": city === 'Бишкек' ? 1 : 2,
                    "district": 1,
                    "street": street,
                    "house_number": num,
                    "latitude": latLng[0],
                    "longitude": latLng[1]
                },
                "rental_period": 1,
                "price": Number(price),
                "currency": 1,
                "preview_image": null,
                "description": description,
                "pub_date": "2020-03-04T15:54:31.822777+06:00",
                "images": [],
                "contact": {
                    "id": 1,
                    "role": 1,
                    "phone": "0554151520",
                    "name": "A",
                    "surname": "A"
                },
                "owner": 2,
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
                        setBtnState(false)
                    }
                )
        }
    }

    return (
        <div className={css.wrapper}>

            <div id={"formID"}>
                <form onSubmit={sendData} className={css.formWrapper}>
                    <h2 className={css.h2}>Подать объявление </h2>
                    <div className={css.main}>
                        <div>
                            <label>Заголовок*</label>
                            <input
                                required
                                value={headline}
                                onChange={e => setHeadline(e.target.value)}
                                placeholder={"Заголовок*"}
                                type="text" className={css.inputs}
                            />
                        </div>
                        <div>
                            <label>Тип недвижемости</label>
                            <select className={css.selects} required value={apartmentType}
                                    onChange={e => setApartmentType(e.target.value)}>
                                <option value={''}>Тип недвижемости</option>
                                <option value={1}>Квартира</option>
                                <option value={2}>Дом</option>
                            </select>
                        </div>
                    </div>
                    <div className={css.infos + ' ' + css.main}>
                        <div>
                            <label>Цена</label>
                            <input required value={price} onChange={(e) => setPrice(e.target.value)}
                                   placeholder={"Цена"}
                                   type="text" className={css.inputs}/>
                        </div>

                        <div>
                            <label>Количества комнат</label>
                            <select className={css.selects} required value={rooms}
                                    onChange={(e) => setRooms(e.target.value)}>
                                <option value={''}>Количества комнат</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                            </select>
                        </div>
                        <div>
                            <label>Площадь</label>
                            <input required value={area} onChange={(e) => setArea(e.target.value)}
                                   placeholder={"Площадь"}
                                   type="text" className={css.inputs}/>
                        </div>


                        <div>
                            <label>Этаж</label>
                            <select className={css.selects} required value={floor}
                                    onChange={e => setFloor(e.target.value)}>
                                <option value={''}>Этаж</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                                <option value={9}>9</option>
                                <option value={10}>10</option>
                                <option value={11}>11</option>
                                <option value={12}>12</option>
                                <option value={13}>13</option>
                                <option value={14}>14</option>
                                <option value={15}>15</option>
                                <option value={16}>16</option>
                                <option value={17}>17</option>
                                <option value={18}>18</option>
                                <option value={19}>19</option>
                                <option value={20}>20</option>
                            </select>
                        </div>
                        <div>
                            <label>Жилая площадь</label>
                            <input required value={livArea} onChange={(e) => setLivArea(e.target.value)}
                                   placeholder={"Площадь"}
                                   type="text" className={css.inputs}/>
                        </div>
                        <div>
                            <label>Этажность дома</label>
                            <select className={css.selects} required value={floors}
                                    onChange={e => setFloors(e.target.value)}>
                                <option value={''}>Этажность дома</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                                <option value={9}>9</option>
                                <option value={10}>10</option>
                                <option value={11}>11</option>
                                <option value={12}>12</option>
                                <option value={13}>13</option>
                                <option value={14}>14</option>
                                <option value={15}>15</option>
                                <option value={16}>16</option>
                                <option value={17}>17</option>
                                <option value={18}>18</option>
                                <option value={19}>19</option>
                                <option value={20}>20</option>
                            </select>
                        </div>
                        <div>
                            <label>Тип строения</label>
                            <select className={css.selects} required value={constractionType}
                                    onChange={(e) => setConstractionType(e.target.value)}>
                                <option value={''}>Тип строения</option>
                                <option value={1}>Кирпичный</option>
                                <option value={2}>Панельный</option>
                            </select>
                        </div>
                        {/*<div>*/}
                        {/*<label>Тип ремонта</label>*/}
                        {/*<select className={css.selects} required value={rooms}*/}
                        {/*onChange={(e) => setRooms(e.target.value)}>*/}
                        {/*<option value={''}>Тип ремонта</option>*/}
                        {/*<option value={1}>Евро ремонт</option>*/}
                        {/*<option value={2}>Панельный</option>*/}
                        {/*</select>*/}
                        {/*</div>*/}
                    </div>
                    <div className={css.main + ' ' + css.details}>
                        <div>
                            <label>
                                <input checked={internet} onChange={e => setInternet(e.target.checked)}
                                       type="checkbox"/>
                                Интернет
                            </label>
                        </div>
                        <div>
                            <label>
                                <input checked={furniture} onChange={e => setFurniture(e.target.checked)}
                                       type="checkbox"/>
                                Мебель
                            </label>
                        </div>
                        <div>
                            <label>
                                <input checked={elevator} onChange={e => setElevator(e.target.checked)}
                                       type="checkbox"/>
                                Лифт
                            </label>
                        </div>
                        <div>
                            <label>
                                <input checked={phone} onChange={e => setPhone(e.target.checked)} type="checkbox"/>
                                Телефон
                            </label>
                        </div>
                        <div>
                            <label>
                                <input checked={security} onChange={e => setSecurity(e.target.checked)}
                                       type="checkbox"/>
                                Охрана
                            </label>
                        </div>
                        <div>
                            <label>
                                <input checked={parcking} onChange={e => setParcking(e.target.checked)}
                                       type="checkbox"/>
                                Парковка
                            </label>
                        </div>
                    </div>
                    <div className={css.main}>
                        <div>
                            <label>Описание</label>
                            <textarea
                                required
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                placeholder={"Описание...."}
                                className={css.inputs}
                                style={{height: "150px", fontSize: "16px", padding: "0 5px"}}
                            />
                        </div>
                        {/*<div>*/}
                        {/*<label>Тип недвижемости</label>*/}
                        {/*<select className={css.selects} required value={apartmentType}*/}
                        {/*onChange={e => setApartmentType(e.target.value)}>*/}
                        {/*<option value={''}>Тип недвижемости</option>*/}
                        {/*<option value={1}>Квартира</option>*/}
                        {/*<option value={2}>Дом</option>*/}
                        {/*</select>*/}
                        {/*</div>*/}
                    </div>
                    <input onClick={() => setVisible(true)} disabled={btnState} className={css.sendBtn}
                           value={'Далее'}/>
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
                            }} href="javascript:void(0);" onClick={() => setVisible(false)}>
                                <img style={{width: 100 + '%', height: 100 + '%'}}
                                     src="https://image.flaticon.com/icons/svg/1828/1828774.svg" alt="x"/>
                            </a>
                            <h3 className={css.mainText}>Выберите место расположение вашего жилья.</h3>
                            <div>
                                <MyMapComponent
                                    marker={mark}
                                    googleMapURL="
                            https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyC31ZdDwrrTeMu4oaL5m5q4m6gCqAGkIKM
                            "
                                    loadingElement={<div
                                        style={{
                                            height: `100%`,
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
                                            top: `10%`,
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
                            <div className={css.addressWrapper}>
                                <div style={{textAlign: 'center'}}>
                                    {question ? <div>
                                        Это адресс вашего жилья?
                                    </div> : null}
                                </div>

                                <div>
                                    <label>Number of house</label>
                                    <input required value={num} placeholder={"Номер дома"} type="text"
                                           className={css.inputs} onChange={e => setNum(e.target.value)}/>
                                </div>
                                <div>
                                    <label>Street</label>
                                    <input required value={street} placeholder={"улица"} type="text"
                                           className={css.inputs} onChange={e => setStreet(e.target.value)}/>
                                </div>
                                <div>
                                    <label>City</label>
                                    <input required value={city} placeholder={"город"} type="text"
                                           className={css.inputs} onChange={e => setCity(e.target.value)}/>
                                </div>
                                <div>
                                    <label>Country</label>
                                    <input required value={country} placeholder={"Страна"} type="text"
                                           className={css.inputs} onChange={e => setCountry(e.target.value)}/>
                                </div>
                                <div>
                                    <label>Регион</label>
                                    <select required className={css.selects} value={regions}
                                            onChange={(e) => setRegions(e.target.value)}>
                                        <option value={''}>Регион</option>
                                        <option value={1}>Чуй</option>
                                        <option value={6}>Ош</option>
                                        <option value={7}>Нарын</option>
                                        <option value={8}>Талас</option>
                                        <option value={9}>Иссык-Куль</option>
                                        <option value={10}>Джалал-Абад</option>
                                        <option value={11}>Баткен</option>
                                    </select>
                                </div>
                                {
                                    question ?
                                        <div>
                                            <div style={{fontSize: "13px"}}>Если ваш адресс указен не правильно вы
                                                можете исправить в ручную.
                                            </div>
                                            <div style={{display: "flex"}}>
                                                <input style={{width: "100px"}} type="submit" value={'Да'}
                                                       className={css.sendBtn}/>
                                                {/*<input style={{width: "100px", background: 'red'}} type="submit"*/}
                                                       {/*value={'Нет'} className={css.sendBtn}/>*/}
                                            </div>
                                        </div>
                                        : null
                                }
                            </div>
                        </div>
                    </Modal>
                </form>
            </div>
        </div>
    )
}
export default AddApartment;



