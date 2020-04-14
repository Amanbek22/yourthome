import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router-dom";
import api from "../../api/api";
import axios from "axios";
import css from './change.module.css'
import Modal from 'react-awesome-modal';
import {WithNotAuthRedirect} from "../../HOC/AuthRedirect";
import {compose} from "redux";


const Change = props => {
    const [description, setDescription] = useState();
    const [title, setTitle] = useState();
    const [rooms, setRooms] = useState();
    const [floor, setFloor] = useState();
    const [price, setPrice] = useState();
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState()
    useEffect(() => {

        api.getApartmentApi(props.match.params.id)
            .then(res => {
                console.log(res.data)
                setData(res.data)
                setDescription(res.data.description)
                setTitle(res.data.title)
                setRooms(res.data.room)
                setPrice(res.data.price)
                setFloor(res.data.floor)
            })
    }, []);
    const send = () => {
        let formData = {
            "id": 1,
            "type": data.apartmentType,
            "room": data.rooms,
            "floor": data.floor,
            "area": {
                "id": 1,
                "total_area": Number(data.area),
                "living_area": Number(data.liveArea)
            },
            "series": 1,
            "construction_type": data.constractionType,
            "state": 1,
            "detail": {
                "id": 1,
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
                "region": data.region,
                "city": 1,
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
        let token = JSON.parse(localStorage.getItem('newToken'));
        axios.patch(`https://yourthomemaster.herokuapp.com/apartment/${props.match.params.id}/`,
            {
                "title": title,
                'description': description,
                'price': price,
                'room': rooms,
                'floor': floor,
            }
            // formData
            , {
                headers: {
                    "Authorization": "Bearer " + token.access
                }
            })
            .then(
                res => {
                    console.log(res);
                    window.location.href = '/admin'
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
        <div className={css.wrapper}>
            <div>
                <label>Загаловок</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div>
                <label>Описание</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
            </div>
            <div>
                <label>Количество комнат</label>
                <input type="text" value={rooms} onChange={(e) => setRooms(e.target.value)}/>
            </div>
            {/*<input type="text" value={area} onChange={(e)=>setArea(e.target.value)}/>*/}
            <div>
                <label>Цена</label>
                <input type="text" value={price} onChange={(e) => setPrice(e.target.value)}/>
            </div>
            <div>
                <label>Этаж</label>
                <input type="text" value={floor} onChange={(e) => setFloor(e.target.value)}/>
            </div>
            <button className={css.deleteBtn} onClick={() => setVisible(true)}>
                Change
            </button>
            <Modal
                visible={visible}
                width="400"
                height="300"
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
                    <p>Вы действительно хотите изменить это объявление?</p>
                    <div className={css.btnWrapperDel}>
                        <div className={css.yesBtn} onClick={send}>
                            Да
                        </div>
                        <div style={{background: 'red'}} className={css.yesBtn} onClick={() => setVisible(false)}>Нет
                        </div>
                    </div>
                </div>
            </Modal>
            {/* <button onClick={deleteApartment} className={css.deleteBtn}>Удалить объявление</button> */}
        </div>
    )
}


export default compose(WithNotAuthRedirect, withRouter)(Change)

