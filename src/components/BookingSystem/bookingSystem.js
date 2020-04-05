import React, {useEffect, useReducer, useState} from 'react';
import {withRouter} from "react-router-dom";
import api from "../../api/api";
import {DatePickerInput} from "rc-datepicker";
import css from "./booking.module.css";
import Modal from 'react-awesome-modal';
import {DateRangeInput, START_DATE} from '@datepicker-react/styled'
import {ThemeProvider} from "styled-components";
import {WithNotAuthRedirect} from "../../HOC/AuthRedirect";
import {compose} from "redux";


const initialState = {
    startDate: null,
    endDate: null,
    focusedInput: null
};

function reducer(state, action) {
    switch (action.type) {
        case "focusChange":
            return {...state, focusedInput: action.payload};
        case "dateChange":
            return action.payload;
        default:
            throw new Error();
    }
}


const Booking = props => {
    const [state, dispatch] = useReducer(reducer, initialState);

    let id = props.match.params.id;

    const [visible, setVisible] = useState(false)
    const [orders, setOrders] = useState([])
    const [delId, setDelId] = useState(0)
    useEffect(() => {

        api.getOrders(id)
            .then(res => {
                console.log(res.data)
                setOrders(res.data)
            })
    }, [])
    const change = () => {
        api.creatOrder(props.match.params.id, state.startDate, state.endDate)
            .then(res => {
                window.location.href = `/booking/${id}`
                console.log(res)
            })
    }
    const deleteOrder = () => {
        api.delOrder(id, delId).then(res => {
            console.log(res)
            window.location.href = `/booking/${id}`
        })
    }
    const listOrder = orders.map(item => {
        return (
            <div className={css.listWrapper} key={item.id} >
                <div>
                    <label>C</label>
                    <input
                        disabled={true}
                        value={item.arrival_date}
                    />
                </div>
                <div>
                    <label>До</label>
                    <input
                        disabled={true}
                        value={item.departure_date}
                    />
                    <label>Занято</label>
                </div>
                <div onClick={()=>{
                    setDelId(item.id)
                    setVisible(true)
                }} style={{width: "25px", height: '25px', cursor: 'pointer'}}>
                    <img style={{width: "100%", height: "100%"}} src={'https://image.flaticon.com/icons/svg/1214/1214926.svg'} alt="del"/>
                </div>
            </div>
        )
    })
    const [blocked, setBlocked] = useState([]);
    let arr = [];
    function daysInMonth (month, year) {
        return new Date(year, month + 1 , 0).getDate();
    }
    useEffect(() => {
        orders.map(async item => {
            let adate = new Date(item.arrival_date);
            let dDate = new Date(item.departure_date);
            if (adate.getFullYear() < dDate.getFullYear()){
                for(let i = adate.getFullYear(); i < dDate.getFullYear(); i++){
                    if(adate.getMonth() > dDate.getMonth    ()){
                        for(let i = adate.getMonth(); i < dDate.getMonth() + 12; i++) {
                            let days = daysInMonth(adate.getMonth(), adate.getFullYear())
                            arr.push(new Date(adate));
                            for (let i = adate.getDate(); i < days; i++) {
                                adate.setDate(adate.getDate() + 1);
                                arr.push(new Date(adate));
                            }
                            for (let i = 0; i < dDate.getDate(); i++) {
                                adate.setDate(adate.getDate() + 1);
                                arr.push(new Date(adate));
                            }
                        }
                    }else{
                        arr.push(new Date(adate));
                        for (let i = adate.getDate(); i < dDate.getDate(); i++) {
                            adate.setDate(adate.getDate() + 1)
                            arr.push(new Date(adate))
                        }
                    }
                }
            }else{
                if(adate.getMonth() < dDate.getMonth()){
                    for(let i = adate.getMonth(); i < dDate.getMonth(); i++) {
                        let days = daysInMonth(adate.getMonth(), adate.getFullYear())
                        arr.push(new Date(adate));
                        for (let i = adate.getDate(); i < days; i++) {
                            adate.setDate(adate.getDate() + 1);
                            arr.push(new Date(adate));
                        }
                        for (let i = 0; i < dDate.getDate(); i++) {
                            adate.setDate(adate.getDate() + 1);
                            arr.push(new Date(adate));
                        }
                    }
                }else{
                    arr.push(new Date(adate));
                    for (let i = adate.getDate(); i < dDate.getDate(); i++) {
                        adate.setDate(adate.getDate() + 1);
                        arr.push(new Date(adate))
                    }
                }
            }
            console.log(arr)
            setBlocked(arr)
        })
    }, [orders])
    let width = window.innerWidth;
    return (
        <div className={css.wrapper}>
            <ThemeProvider
                theme={{
                    breakpoints: ["32em", "48em", "64em"],
                    reactDatepicker: {
                        daySize: [36, 40],
                        fontFamily: "system-ui, -apple-system",
                        colors: {
                            accessibility: "#D80249",
                            selectedDay: "#f7518b",
                            selectedDayHover: "#F75D95",
                            primaryColor: "#d8366f",
                        }
                    }
                }}
            >
                <div className={css.dateRangeWrapper}>
                <DateRangeInput
                    onDatesChange={data => dispatch({type: "dateChange", payload: data})}
                    onFocusChange={focusedInput =>
                        dispatch({type: "focusChange", payload: focusedInput})
                    }
                    startDate={state.startDate} // Date or null
                    endDate={state.endDate} // Date or null
                    focusedInput={state.focusedInput}
                    minBookingDate={new Date()}
                    unavailableDates={blocked}
                    vertical={width <= 768}
                    phrases={{startDatePlaceholder: 'Дата заезда', endDatePlaceholder: 'Дата выезда'}}
                />
                </div>
            </ThemeProvider>
            <div className={css.btnWrapper}>
                <button className={css.addOrder} onClick={change}>
                    Добавить
                </button>
            </div>
            <div >
                {listOrder}
            </div>
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
                    <p>Вы действительно хотите удолить этот бронь?</p>
                    <div className={css.btnWrapperDel}>
                        <div className={css.yesBtn} onClick={deleteOrder}>Да</div>
                        <div style={{background: 'red'}} className={css.yesBtn} onClick={() => setVisible(false)}>Нет
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
export default compose(WithNotAuthRedirect, withRouter)(Booking)
