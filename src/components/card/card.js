import React from 'react';
import {Link} from "react-router-dom";
import img from '../../img/room.png'
import css from './card.module.css'

const Card = props =>{
    return (
        <Link to={props.src}>
            <div className={css.imgWrapper}>
                <img src={img} alt="apartment"/>
            </div>
        </Link>
    )
}
export default Card;