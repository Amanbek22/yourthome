import React from 'react';
import css from './element.module.css'
import {Link} from "react-router-dom";
import roomsImg from '../../img/room.png'

const Element = props => {
    return (
        <div className={css.wrapper}>
            <Link  to={`/more-info/${props.id}`}>
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
                        Цена: {props.price}
                    </div>
                </div>
            </Link>
            {props.changeBtn ? <div className={css.btnWrapper}>
                <Link to={`/change-apartment/${props.id}`} className={css.moreBtnWrapper}>
                    <button>Изменить</button>
                </Link>
            </div>: null}
        </div>
    )
}


export default Element;