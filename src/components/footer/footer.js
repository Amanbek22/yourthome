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
                <Link to={'/feedback'}>Обратная связь</Link>
                <Link to={'/add-apartment'}>Как добавить объявление?</Link>
                <a href={'https://neobis.kg/'} target={'_blank'} rel="noopener noreferrer" >Neobis</a>
            </div>
        </div>
    )
}

export default Footer;