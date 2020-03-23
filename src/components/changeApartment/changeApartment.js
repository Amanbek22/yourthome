import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router-dom";
import api from "../../api/api";
import axios from "axios";
import css from './change.module.css'


const Change = props => {
    const [description,setDescription] = useState();
    const [rooms, setRooms] = useState();
    const [floor, setFloor] = useState();
    const [price, setPrice] = useState();
    useEffect(()=>{
        api.getApartmentApi(props.match.params.id)
            .then(res=>{
                console.log(res)
                setDescription(res.data.description)
                setRooms(res.data.room)
                setPrice(res.data.price)
                setFloor(res.data.floor)
            })
    },[]);
    const send = () =>{
        let token = JSON.parse(localStorage.getItem('newToken'));
        axios.patch(`https://yourthomeneobis2.herokuapp.com/apartment/${props.match.params.id}/`,{
            'description': description,
            'price': price,
            'room': rooms,
            'floor': floor
        },{
            headers: {
                "Authorization": "Bearer " + token.access
            }
        })
            .then(res=>{
                console.log(res);
                alert('you changed an apartment');
                window.location.href = '/admin'
            })
    }
    const deleteApartment = () =>{
        api.deleteApartment(props.match.params.id).then(res=>{
            window.location.href = '/admin'
        })
    }
    return(
        <div>
            <div>
                <label>Загаловок</label>
                <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)}/>
            </div>
            <div>
                <label>Количество комнат</label>
                <input type="text" placeholder={'rooms'} value={rooms} onChange={(e)=>setRooms(e.target.value)}/>
            </div>
            {/*<input type="text" value={area} onChange={(e)=>setArea(e.target.value)}/>*/}
            <div>
                <label>Цена</label>
                <input type="text" value={price} onChange={(e)=>setPrice(e.target.value)}/>
            </div>
            <div>
                <label>Этаж</label>
                <input type="text" value={floor} onChange={(e)=>setFloor(e.target.value)}/>
            </div>
            {/*<input type="text" value={data} />*/}
            <div>
                <button onClick={send}>
                    Change
                </button>
            </div>
            <button onClick={deleteApartment} className={css.deleteBtn}>Удалить объявление</button>
        </div>
    )
}


const ChangeApartment = withRouter(Change)

export default ChangeApartment;