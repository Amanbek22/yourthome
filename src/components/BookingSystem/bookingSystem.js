import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router-dom";
import api from "../../api/api";
import {DatePickerInput} from "rc-datepicker";
import css from "./booking.module.css";
import Modal from 'react-awesome-modal';





const Booking = props => {
    let id = props.match.params.id;
    const [date, setDate] = useState()
    const [arivelDate, setArivelDate] = useState()
    const [dateFrom,setDateFrom] = useState();
    const [dateTo,setDateTo] = useState();
    const onDataChange = (jsDate,dateString) => setArivelDate(jsDate);
    const onDataToChange = (jsDate,dateString) => setDate(jsDate);
    const [visible, setVisible] = useState(false)
    const [orders, setOrders] = useState([])
    const [delId, setDelId] = useState(0)

    useEffect(()=>{
        api.getOrders(id)
            .then(res => {
                console.log(res.data)
                setOrders(res.data)
            } )
    },[])
    const change = () => {
        api.creatOrder(props.match.params.id,arivelDate,date)
            .then(res=>{
                window.location.href = `/booking/${id}`
                console.log(res)
            })
    }
    const deleteOrder = () => {
        api.delOrder(id,delId).then(res => {
            console.log(res)
            window.location.href = `/booking/${id}`
        })
    }
    const listOrder = orders.map(item => {
        return(
            <div className={css.listWrapper} key={item.id} onDoubleClick={()=>{
                setDelId(item.id)
                setVisible(true)
            }}>
                <div>
                    <label>От</label>
                    <DatePickerInput
                        disabled={true}
                        // placeholder={'От какого числа занято'}
                        // onChange={onDataChange}
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
        )
    })
    return (
        <div className={css.wrapper}>
            {/*<div>*/}
                {/*<label>Дата заезда</label>*/}
                {/*<input type="date" value={arivelDate} onChange={e=>setArivelDate(e.target.value)} />*/}
            {/*</div>*/}
            {/*<div>*/}
                {/*<label>Дата выезда</label>*/}
                {/*<input type="date" value={date} onChange={e=>setDate(e.target.value)} />*/}
            {/*</div>*/}
            <label>От</label>
            <DatePickerInput
                placeholder={'От какого числа занято'}
                onChange={onDataChange}
                value={dateFrom}
                className='my-custom-datepicker-component'
                onHide={()=>0}
                showOnInputClick={true}
                minDate={new Date()}
                onClear={()=> setDateFrom('')}
            />
            <label>До</label>
            <DatePickerInput
                placeholder={'От какого числа занято'}
                onChange={onDataToChange}
                value={dateTo}
                className='my-custom-datepicker-component'
                onHide={()=>0}
                minDate={new Date()}
                showOnInputClick={true}
                onClear={()=>setDateTo('')}
            />
            <div className={css.btnWrapper}>
                <button className={css.addOrder} onClick={change}>
                    Добавить
                </button>
            </div>
            <div>
                {listOrder}
            </div>
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
                <p>Вы действительно хотите удолить этот бронь?</p>
                <div className={css.btnWrapperDel}>
                    <div className={css.yesBtn} onClick={deleteOrder} >Да</div>
                    <div style={{background: 'red'}} className={css.yesBtn} onClick={()=>setVisible(false)}>Нет</div>
                </div>
            </div>
        </Modal>
        </div>
    )
}

const BookingSystem = withRouter(Booking)


export default BookingSystem;