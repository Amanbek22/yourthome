import React from 'react';
import css from './filter.module.css'

const FilterForMap = props =>{

    const onCityChange = e =>{
        // sort by city
        alert(e.target.value)
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
            <select onChange={onCityChange} name="cities" >
                <option value="all">Все Города</option>
                <option value="bishkek">Бишкек</option>
                <option value="osh">Ош</option>
                <option value="talas">Талас</option>
                <option value="naryn">Нарын</option>
            </select>
            <input placeholder={""} type="text"/>
            <select onChange={onApartmentChange} name="type" >
                <option value="all">Все виды жилья</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="yourt">Yourt</option>
            </select>
            <select onChange={onRoomsChange} name="rooms" >
                <option value="all">Количество комнат</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
            <div className={css.impWrapper}>
                <select name="price" >
                    <option value="all">цена от скольки</option>
                    <option value="1500">1500</option>
                    <option value="2000">2000</option>
                </select>
                <select name="more" >
                    <option value="more">more</option>
                    <option value="more">more</option>
                    <option value="more">more</option>
                </select>
            </div>
        </div>
    )
}


export default FilterForMap;