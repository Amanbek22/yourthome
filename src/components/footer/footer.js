import React from 'react';
import rectangle from '../../img/Rectangle.png'
import css from './footer.module.css'
import {Link} from "react-router-dom";

const Footer = props =>{
    return (
        <div className={css.wrapper}>
            <div className={css.firstWrapper}>
                <div>
                    <img src={rectangle} alt=""/>
                </div>
                <h2>YourtHome</h2>
            </div>
            <div className={css.links}>
                <Link to={'/about-us'}>О нас</Link>
                <Link to={'#'}>Обратная связь</Link>
                <Link to={'/add-apartment'}>Как добавить объявление?</Link>
                <Link to={'#'}>Помощь по сайту</Link>
            </div>
        </div>
    )
}

export default Footer;