import React from 'react';
import css from './filter.module.css'

const FilterForMap = props =>{

    const onCityChange = e =>{
        // sort by city
        props.setItem(e.target.value , "a")
    }
    const onApartmentChange = e =>{
        // sort by property
        alert(e.target.value)
    }
    const onRoomsChange = e =>{
        // sort by rooms
        alert(e.target.value)
    }
    return(
        <div className={css.wrapper}>
            <div className={css.filterWrapper}>
                <h2>Фильтр данных</h2>
                <button>Применить</button>
            </div>
            <select onChange={onCityChange} name="cities" >
                <option value="all">Все Города</option>
                <option value="bishkek">Бишкек</option>
                <option value="osh">Ош</option>
                <option value="naryn">Нарын</option>
                <option value="talas">Талас</option>
                <option value="issyk-kul">Иссык-Куль</option>
                <option value="djalal-abad">Джалал-Абад</option>
                <option value="batken">Баткен</option>
            </select>
            <input placeholder={"Дата вьезда и выезда"} type="text"/>
            <div className={css.impWrapper}>
                <select name="price" >
                    <option value="all">Тип жилья</option>
                    <option value="1500">Квартира</option>
                    <option value="2000">Дом</option>
                </select>
                <select name="more" >
                    <option value="more">Кличество комнат</option>
                    <option value="more">1</option>
                    <option value="more">2</option>
                    <option value="more">3</option>
                    <option value="more">4</option>
                    <option value="more">5</option>
                    <option value="more">6</option>
                </select>
            </div>
            <div className={css.impWrapper}>
                <select name="price" >
                    <option value="all">Этаж</option>
                    <option value="1500">1</option>
                    <option value="2000">2</option>
                    <option value="2000">3</option>
                    <option value="2000">4</option>
                    <option value="2000">5</option>
                    <option value="2000">6</option>
                    <option value="2000">7</option>
                    <option value="2000">8</option>
                    <option value="2000">9</option>
                    <option value="2000">10</option>
                    <option value="2000">11</option>
                    <option value="2000">12</option>
                    <option value="2000">13</option>
                    <option value="2000">14</option>
                    <option value="2000">15</option>
                    <option value="2000">16</option>
                    <option value="2000">17</option>
                    <option value="2000">18</option>
                    <option value="2000">19</option>
                    <option value="2000">20</option>
                </select>
                <select name="more" >
                    <option value="all">Этажность дома</option>
                    <option value="1500">1</option>
                    <option value="2000">2</option>
                    <option value="2000">3</option>
                    <option value="2000">4</option>
                    <option value="2000">5</option>
                    <option value="2000">6</option>
                    <option value="2000">7</option>
                    <option value="2000">8</option>
                    <option value="2000">9</option>
                    <option value="2000">10</option>
                    <option value="2000">11</option>
                    <option value="2000">12</option>
                    <option value="2000">13</option>
                    <option value="2000">14</option>
                    <option value="2000">15</option>
                    <option value="2000">16</option>
                    <option value="2000">17</option>
                    <option value="2000">18</option>
                    <option value="2000">19</option>
                    <option value="2000">20</option>
                </select>
            </div>
            <div className={css.impWrapper}>
                <select name="price" >
                    <option value="all">Тип строения</option>
                    <option value="1500">Квартира</option>
                    <option value="2000">Дом</option>
                    {/*<option value="2000">Комерчиская невижемость</option>*/}
                </select>
                <select name="more" >
                    <option value="more">Мебелироан</option>
                    <option value="more">Да</option>
                    <option value="more">Нет</option>
                </select>
            </div>

            <div className={css.impWrapper}>
                <input placeholder={"Цена от"} type="text"/>
                <input placeholder={"Цена до"} type="text"/>
            </div>
            <div className={css.detailsWrapper}>
                <h4>В квартире есть</h4>
                <div className={css.details}>
                    <div>
                        <input type="checkbox"/><label>Интернет</label>
                    </div>
                    <div>
                        <input type="checkbox"/><label>Кабельное ТВ</label>
                    </div>
                    <div>
                        <input type="checkbox"/><label>Холодильник</label>
                    </div>
                    <div>
                        <input type="checkbox"/><label>Телефон</label>
                    </div>
                    <div>
                        <input type="checkbox"/><label>Балкон</label>
                    </div>
                    <div>
                        <input type="checkbox"/><label>Телевизор</label>
                    </div>
                    <div>
                        <input type="checkbox"/><label>Кондиционер</label>
                    </div>
                    <div>
                        <input type="checkbox"/><label>Кухня</label>
                    </div>
                    <div>
                        <input type="checkbox"/><label>Стиральная машина</label>
                    </div>

                </div>
            </div>
            <div className={css.detailsWrapper}>
                <h4>В квартире есть</h4>
                <div className={css.details}>
                    <div>
                        <input type="checkbox"/><label>Интернет</label>
                    </div>
                    <div>
                        <input type="checkbox"/><label>Кабельное ТВ</label>
                    </div>
                    <div>
                        <input type="checkbox"/><label>Холодильник</label>
                    </div>
                    <div>
                        <input type="checkbox"/><label>Телефон</label>
                    </div>
                    <div>
                        <input type="checkbox"/><label>Балкон</label>
                    </div>
                    <div>
                        <input type="checkbox"/><label>Телевизор</label>
                    </div>
                    <div>
                        <input type="checkbox"/><label>Кондиционер</label>
                    </div>
                    <div>
                        <input type="checkbox"/><label>Кухня</label>
                    </div>
                    <div>
                        <input type="checkbox"/><label>Стиральная машина</label>
                    </div>

                </div>
            </div>
        </div>
    )
}


export default FilterForMap;