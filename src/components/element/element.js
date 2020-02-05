import  React from 'react';
import css from './element.module.css'
import {Link} from "react-router-dom";

const Element = props =>{
    return (
        <Link to={"/" + props.linkId} className={css.wrapper}>
            <div className={css.imgWrapper}>
                <img src={props.img} alt="Room img"/>
            </div>
            <div className={css.optionsWrapper}>
                <div className={css.forSale}>{props.forSale}</div>
                <div className={css.address}>{props.address}</div>
                <div className={css.optionWrapper}>
                    <div>Площадь: {props.area}</div>
                    <div>Комнат: {props.room}</div>
                    <div>Этаж: {props.floor}</div>
                </div>
                <div>
                    Добавлено {props.addetDate}
                </div>
            </div>
        </Link>
    )
}


export default Element;