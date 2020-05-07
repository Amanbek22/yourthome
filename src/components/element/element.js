import React, {useEffect, useRef, useState} from 'react';
import css from './element.module.css'
import {Link} from "react-router-dom";
import roomsImg from '../../img/room.png'




function useOuterClick(callback) {
    const innerRef = useRef();
    const callbackRef = useRef();

    // set current callback in ref, before second useEffect uses it
    useEffect(() => { // useEffect wrapper to be safe for concurrent mode
        callbackRef.current = callback;
    });

    useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);

        // read most recent callback and innerRef dom node from refs
        function handleClick(e) {
            if (
                innerRef.current &&
                callbackRef.current &&
                !innerRef.current.contains(e.target)
            ) {
                callbackRef.current(e);
            }
        }
    }, []); // no need for callback + innerRef dep

    return innerRef; // return ref; client can omit `useRef`
}


const Element = props => {
    const [visible, setVisible] = useState(false)
    let dropDown;
    if (visible) {
        dropDown = <div onClick={()=> setVisible(true)} className={css.showedClickable}>
            <div>
                <Link to={`/change-apartment/${props.id}`}>Изменить контент</Link>
            </div>
            <div>
                <Link to={`/booking/${props.id}`}>Изменить дату бронирования</Link>
            </div>
            <div style={{cursor: 'pointer'}} onClick={()=> {
                    props.setVisible(true)
                    props.setDelApartment(props.id)
                }}
            >Удалить</div>
        </div>
    } else {
        dropDown = undefined
    }
    const innerRef = useOuterClick(e => {
        setVisible(false)
    });
    return (
        <div className={css.wrapper} >
            <Link to={`/more-info/${props.id}`}>
                <div className={css.imgWrapper}>
                    <img src={props.img === null ? roomsImg : props.img} alt="Room img"/>
                </div>
                <div className={css.optionsWrapper}>
                    <div className={css.forSale}>{props.forSale}</div>
                    <div className={css.address}>{props.house_number} {props.street}</div>
                    <pre className={css.optionWrapper}>
                        <div>Площадь: {props.area}</div>
                        <div>Комнат: {props.room}</div>
                        <div>Этаж: {props.floor}</div>
                    </pre>
                    <div>
                        Цена: {props.price} $ <span> || </span> {props.priceSom} сом
                    </div>
                </div>
            </Link>
            {props.changeBtn ?
                <div ref={innerRef}>
                    <div onBlur={()=>alert('hello')} onClick={() => setVisible(true)} className={css.btnWrapper}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    {dropDown}
                </div>
                : null}
        </div>
    )
}

export default Element;