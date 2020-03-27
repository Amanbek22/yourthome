import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router-dom";
import api from "../../api/api";
import axios from "axios";
import css from './change.module.css'
import Modal from 'react-awesome-modal';



const Change = props => {
    const [description,setDescription] = useState();
    const [rooms, setRooms] = useState();
    const [floor, setFloor] = useState();
    const [price, setPrice] = useState();
    const [visible,setVisible] = useState(false);

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
            .then(
                res=>{
                    console.log(res);
                    window.location.href = '/admin'
                },
                error=>alert(error)
            )
            
    }
    // const deleteApartment = () =>{
    //     api.deleteApartment(props.match.params.id).then(res=>{
    //         window.location.href = '/admin'
    //     })
    // }
    return(
        <div className={css.wrapper}>
            <div>
                <label>Загаловок</label>
                <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)}/>
            </div>
            <div>
                <label>Количество комнат</label>
                <input type="text"  value={rooms} onChange={(e)=>setRooms(e.target.value)}/>
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
                <button className={css.deleteBtn} onClick={()=>setVisible(true)}>
                    Change
                </button>
                <Modal
                visible={visible}
                width="400"
                height="300"
                effect="fadeInDown"
                onClickAway={()=>setVisible(false)}
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
                        <img style={{width: 100 + '%', height: 100 + '%'}} src="https://image.flaticon.com/icons/svg/1828/1828774.svg" alt="x"/>
                    </a>
                    <p>Вы действительно хотите изменить это объявление?</p>
                    <div className={css.btnWrapperDel}>
                        <div className={css.yesBtn} onClick={send}>Да</div>
                        <div style={{background: 'red'}} className={css.yesBtn} onClick={()=>setVisible(false)}>Нет</div>
                    </div>
                </div>
            </Modal>
            {/* <button onClick={deleteApartment} className={css.deleteBtn}>Удалить объявление</button> */}
        </div>
    )
}


const ChangeApartment = withRouter(Change)

export default ChangeApartment;