import React, {useState} from 'react';
import {Link} from "react-router-dom";
import imgg from '../../img/room.png'
import css from './card.module.css'


const Card = props => {
    let {city, street, houseNumber, price, id, img, title, userName} = props
    const [hover, setHover] = useState(false)
    return (
        <div className={css.wrapper} onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <div
                style={{
                    transition: 'display 1s ease-out',
                    display: hover ? 'none' : 'block',
                }}
            >
                <Link to={`more-info/${id}`}>
                    <div className={css.imgWrapper}>
                        <img src={!img ? imgg : img} alt=" "/>
                    </div>
                    <div className={css.description}>
                        <div style={{marginBottom: '8px'}}>Цена: {price}$</div>
                        <div className={css.title}>{title}</div>
                    </div>
                    <div></div>
                    <div className={css.userName}>{userName}</div>
                </Link>
            </div>
            <div style={{
                transition: 'display 1s ease-out',
                display: hover ? 'block' : 'none',
            }} className={css.hovered}>
                <div className={css.hoveredTitle}>
                    {title}
                </div>
                <div className={css.hoveredTitle}>
                    {price} $
                </div>
                <div className={css.address}>
                    <div>Город: {city}</div>
                    <div>Улица: {street}</div>
                    <div>Дом: {houseNumber}</div>
                </div>
                <div className={css.moreBtn}>
                    <Link to={`/more-info/${id}`}>Подробнее</Link>
                </div>
            </div>
        </div>
    )
}
export default Card;

