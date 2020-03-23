import React from 'react';
import {Link} from "react-router-dom";
import img from '../../img/room.png'
import css from './card.module.css'

const Card = props =>{
    let {city,street,price,id} = props
    return (
        <Link to={`more-info/${id}`}>
            <div className={css.imgWrapper}>
                <img src={img} alt="apartment"/>
                <span className={css.price}>{price}y.e</span>
                <div className={css.hoverEffect}>
                    <div className={css.options}>
                        <div>
                            3
                            <div>rooms</div>
                        </div>
                        <div>
                            120
                            <div>m2</div>
                        </div>
                        <div>
                            2/5
                            <div>floor</div>
                        </div>
                    </div>
                    <div className={css.addres}>
                        {city}, {street}
                    </div>
                </div>
            </div>
        </Link>
    )
}
export default Card;