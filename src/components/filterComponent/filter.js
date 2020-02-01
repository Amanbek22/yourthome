import React from 'react';
import css from './filter.module.css'
import {Link} from "react-router-dom";

const Filter = props =>{
    return (
        <div className={css.filterWrapper}>
            <div className={css.filterWrapperSecond}>
                <div className={css.links}>
                    <Link to="/">Продажа</Link>
                    <Link to="/">Аренда</Link>
                    <Link to="/">Новостройка</Link>
                </div>
                <div className={css.inputsWrapper}>
                    <input type="text"/>
                    <input type="text"/>
                    <input type="text"/>
                    <input type="text"/>
                </div>
                <div className={css.moreWrapper}>
                    <div className={css.moreSettings}>
                        {/*<img src="../../img/moreSettings.png" alt="settings"/>*/}
                        <p>Дополнительные параметры</p>
                    </div>
                    <div className={css.findButton}>
                        <span>
                            <Link to={"/map"} >Показать на карте</Link>
                        </span>
                        <Link to="/map">Начать поиск</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Filter;