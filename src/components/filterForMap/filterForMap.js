import React from 'react';
import css from './filter.module.css'

const FilterForMap = props =>{
    return(
        <form className={css.wrapper}>
            <select name="cityes" >
                <option value="Kyrgyzstan">Kyrgyzstan</option>
                <option value="Russion">Russion</option>
                <option value="Russion">Russion</option>
            </select>
            <input placeholder={"Введите адрес или выберите из списка "} type="text"/>
            <select name="type" >
                <option value="Appartment">Appartment</option>
                <option value="Appartment">Appartment</option>
                <option value="Appartment">Appartment</option>
            </select>
            <select name="rooms" >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
            <div className={css.impWrapper}>
                <select name="price" >
                    <option value="1500">1500</option>
                </select>
                <select name="more" >
                    <option value="more">more</option>
                </select>
                <input className={css.btn} value={"Поиск"} onClick={()=>{
                    alert("Hey it's just a test")
                }} type="button"/>
            </div>
        </form>
    )
}


export default FilterForMap;