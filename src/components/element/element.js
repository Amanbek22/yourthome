import React from 'react';
import css from './element.module.css'
import {Link} from "react-router-dom";
import roomsImg from '../../img/room.png'


const Element = props => {
    console.log(props.img)

    return (
        <div className={css.wrapper}>
            <Link to={"/" + props.url}>
                <div className={css.imgWrapper}>
                    <img src={props.img === null ? roomsImg : props.img} alt="Room img"/>
                </div>
                <div className={css.optionsWrapper}>
                    <div className={css.forSale}>{props.forSale}</div>
                    <div className={css.address}>{props.house_number} {props.street} {props.city}</div>
                    <div className={css.optionWrapper}>
                        <div>Площадь: {props.area}</div>
                        <div>Комнат: {props.room}</div>
                        <div>Этаж: {props.floor}</div>
                    </div>
                    <div>
                        Цена: {props.price}
                    </div>
                </div>
            </Link>
            <div className={css.btnWrapper}>
                <Link to={"/more-info"} className={css.moreBtnWrapper}>
                    <button>Подробнее</button>
                </Link>
            </div>
        </div>
    )
}


export default Element;