import React, {useEffect, useReducer, useState} from 'react';
import {withRouter} from "react-router-dom";
import api from "../../api/api";
import css from "./booking.module.css";
import Modal from 'react-awesome-modal';
import {DateRangeInput} from '@datepicker-react/styled'
import {ThemeProvider} from "styled-components";
import {WithNotAuthRedirect} from "../../HOC/AuthRedirect";
import {compose} from "redux";
import pencil from '../../img/pencil.png'
import trash from '../../img/trash.png'

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


const Orders = props => {
    console.log(props)
    const [changeDate, setChangeDate] = useState(false)
    const [arrivalDate, setArrivalDate] = useState(props.arrival_date)
    const [departureDate, setDepartureDate] = useState(props.departure_date)
    const sendChangeDate = (e) => {
        e.preventDefault()
        setChangeDate(false)
        api.changeBooking(props.apartmentId, props.id, {
            'arrival_date': arrivalDate,
            'departure_date': departureDate
        })
    }
    let data = new Date()
    let year, month, day;
    year = data.getFullYear();
    month = data.getMonth() + 1;
    day = data.getDate();
    if (month <= 9) {
        month = '0' + month
    }
    if (day <= 9) {
        day = '0' + day
    }
    let today = year + '-' + month + '-' + day;
    console.log(today)
    return (
        <form onSubmit={sendChangeDate} className={css.listWrapper}>
            <div>
                От
                {
                    changeDate
                        ? <input required className={css.changeInput} type="date"
                                 min={today} max={departureDate} value={arrivalDate}
                                 onChange={(e) => setArrivalDate(e.target.value)} />
                        : <input disabled={true} value={arrivalDate}/>
                }
            </div>
            <div>
                До
                {
                    changeDate
                        ?
                        <input required className={css.changeInput} type="date" min={arrivalDate} value={departureDate}
                               onChange={(e) => setDepartureDate(e.target.value)}/>
                        : < input disabled={true} value={departureDate}/>
                }
            </div>
            <div className={css.btnsWrapper}>
                {
                    !changeDate
                        ? <div onClick={() => {
                            setChangeDate(true)
                        }} style={{width: "25px", height: '25px', cursor: 'pointer', margin: 'auto 1% auto 0',}}>
                            <img src={pencil} alt="del"/>
                        </div>
                        : <button className={css.saveBtn}>
                            <img src="https://image.flaticon.com/icons/svg/390/390973.svg" alt="save"/>
                        </button>
                }

                <div onClick={() => {
                    props.setDelId(props.id)
                    props.setVisible(true)
                }} style={{width: "25px", height: '25px', cursor: 'pointer', margin: 'auto 1% auto 15px',}}>
                    <img src={trash} alt="del"/>
                </div>
            </div>
        </form>
    )
}


const Booking = props => {
    const [state, dispatch] = useReducer(reducer, initialState);
    let id = props.match.params.id;

    const [visible, setVisible] = useState(false)
    const [orders, setOrders] = useState([])
    const [delId, setDelId] = useState(0)
    const [blocked, setBlocked] = useState([]);

    useEffect(() => {

        api.getOrders(id)
            .then(res => {
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
    let arr = [];
    const listOrder = orders.map(item => {
        return <Orders
            key={item.id}
            id={item.id}
            apartmentId={id}
            arrival_date={item.arrival_date}
            departure_date={item.departure_date}
            setDelId={setDelId}
            setVisible={setVisible}
            blocked={blocked}
        />
    })

    function daysInMonth(month, year) {
        return new Date(year, month + 1, 0).getDate();
    }

    useEffect(() => {
        orders.map(async item => {
            let adate = new Date(item.arrival_date);
            let dDate = new Date(item.departure_date);
            if (adate.getFullYear() < dDate.getFullYear()) {
                for (let i = adate.getFullYear(); i < dDate.getFullYear(); i++) {
                    if (adate.getMonth() > dDate.getMonth()) {
                        for (let i = adate.getMonth(); i < dDate.getMonth() + 12; i++) {
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
                    } else {
                        arr.push(new Date(adate));
                        for (let i = adate.getDate(); i < dDate.getDate(); i++) {
                            adate.setDate(adate.getDate() + 1)
                            arr.push(new Date(adate))
                        }
                    }
                }
            } else {
                if (adate.getMonth() < dDate.getMonth()) {
                    for (let i = adate.getMonth(); i < dDate.getMonth(); i++) {
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
                } else {
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
                            accessibility: "#57C325",
                            selectedDay: "#4dc33c",
                            selectedDayHover: "#7fc314",
                            primaryColor: "#57C325",
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
            <div>
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
                    }} onClick={() => setVisible(false)}>
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
