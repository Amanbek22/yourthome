import React from 'react';
import {Link} from "react-router-dom";
import img from '../../img/room.png'
import css from './card.module.css'

const Card = props =>{
    return (
        <Link to={props.src}>
            <div className={css.imgWrapper}>
                <img src={img} alt="apartment"/>
                <span className={css.price}>{props.price}y.e</span>
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
                        г. Ташкент, Мирзо-Улугбекский район, ул. Мевазар
                    </div>
                </div>
            </div>
        </Link>
    )
}
export default Card;