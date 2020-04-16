import React from 'react';
import {Link} from "react-router-dom";
import imgg from '../../img/room.png'
import css from './card.module.css'

const Card = props =>{
    let {city,street,price,id,rooms,area,floor,img} = props
    return (
        <div className={css.wrapper}>
        <Link to={`more-info/${id}`}>
            <div className={css.imgWrapper}>
                <img src={!img ? imgg: img}  alt="apartment"/>
            </div>
            <div>
                <div>{price}$</div>
                <div>Продаю квартиру1/3/5 ...</div>
            </div>
            <div>UserName</div>
        </Link>
        </div>
    )
}
export default Card;



{/*<div className={css.imgWrapper}>*/}
    {/*<img src={!img ? imgg: img} alt="apartment"/>*/}
    {/*<span className={css.price}>{price}$</span>*/}
    {/*<div className={css.hoverEffect}>*/}
        {/*<div className={css.options}>*/}
            {/*<div>*/}
                {/*{rooms}-Комнат*/}
            {/*</div>*/}
            {/*<div>*/}
                {/*{area}m2*/}
            {/*</div>*/}
            {/*<div>*/}
                {/*{floor}-Этаж*/}
            {/*</div>*/}
        {/*</div>*/}
        {/*<div className={css.addres}>*/}
            {/*{city}, {street}*/}
        {/*</div>*/}
    {/*</div>*/}
{/*</div>*/}
{/*<div>*/}
{/*<div>*/}
{/*500*/}
{/*</div>*/}
{/*<div>*/}
    {/*Продаю квартиру1/3/5 ...*/}
{/*</div>*/}
{/*</div>*/}