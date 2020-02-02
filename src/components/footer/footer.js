import React from 'react';
import rectangle from '../../img/Rectangle.png'
import css from './footer.module.css'

const Footer = props =>{
    return (
        <div className={css.wrapper}>
            <div className={css.firstWrapper}>
                <div>
                    <div>
                        <img src={rectangle} alt=""/>
                    </div>
                    <h3>YourtHome</h3>

                </div>
                <div>
                    <h3>Пользователям</h3>
                    <div className={css.options}>
                        <div>О нас</div>
                        <div>Помощь</div>
                        <div>Условия пользования сайтом</div>
                        <div>Добавить объявление</div>
                    </div>
                </div>
                <div>
                    <h3>Профессионалам</h3>
                    <div className={css.options}>
                        <div>Личный кабинет</div>
                        <div>Регистрация</div>
                    </div>
                </div>
                <div>
                    <h3>Контактная информация</h3>
                    <div className={css.options}>
                        <div>ООО “ГОСКОМГЕОЛОГИЯ”
                            г. Ташкент, Мирзо-Улугбекийски
                            район, ул. Олимлар дом 64
                        </div>
                        <div>
                            Тел.: +998 99 966-96-96
                            Эл.Почта: info@yourthome
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;