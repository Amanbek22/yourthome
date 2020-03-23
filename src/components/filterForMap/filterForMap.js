import React, {useState} from 'react';
import css from './filter.module.css'
import {DatePickerInput} from "rc-datepicker";
import {connect} from "react-redux";
import {setFilterData} from '../../redux/filterReducer'


const FilterMap = props =>{
    const [cities,setCities] = useState(props.filterData.city);
    const [typeApartment, setTypeApartment] = useState('all')
    const [rooms,setRooms] = useState(props.filterData.rooms )
    const [floor,setFloor] = useState('all')
    const [date,setDate] = useState(new Date());
    const [todate,setTodate] = useState(new Date());
    const [priceFrom,setPriceFrom] = useState(props.filterData.priceFrom)
    const [priceTo,setPriceTo] = useState(props.filterData.priceTo)
    

    const onCityChange = e =>{
        // sort by city
        setCities(e.target.value)
        props.setItem(e.target.value)
    }
    const onApartmentChange = e =>{
        // sort by property
        alert(e.target.value)
    }
    const onRoomsChange = e =>{
        // sort by rooms
        alert(e.target.value)
    }
    const onDataChange = (jsDate,dateString) => {
        console.log(jsDate,dateString)
    }
    return(
        <div className={css.wrapper}>
            <div className={css.filterWrapper}>
                <h2>Фильтр данных</h2>
                <button >Применить</button>
            </div>
            <select value={cities} name="cities" >
                <option value="all">Все Города</option>
                <option value="Бишкек">Бишкек</option>
                <option value="Ош">Ош</option>
                <option value="Нарын">Нарын</option>
                <option value="Талас">Талас</option>
                <option value="Иссык-Куль">Иссык-Куль</option>
                <option value="Джалал-Абад">Джалал-Абад</option>
                <option value="Баткен">Баткен</option>
            </select>
            {/*<input placeholder={"Дата вьезда и выезда"} type="text"/>*/}
            <div className={css.dataWrapper}>
                <DatePickerInput
                    placeholder={'От какого числа занято'}
                    onChange={onDataChange}
                    value={date}
                    className='my-custom-datepicker-component'
                    onHide={()=>0}
                    showOnInputClick={true}
                />
                <DatePickerInput
                    placeholder={'От какого числа занято'}
                    onChange={onDataChange}
                    value={todate}
                    className='my-custom-datepicker-component'
                    onHide={()=>0}
                    showOnInputClick={true}
                    // style={{ margin: 50+'px' }}
                />
            </div>
            <div className={css.impWrapper}>
                <select value={typeApartment} onChange={e=>setTypeApartment(e.target.value)} name="price" >
                    <option value="all">Тип жилья</option>
                    <option value="Квартира">Квартира</option>
                    <option value="Дом">Дом</option>
                </select>
                <select value={rooms} onChange={e=>setRooms(e.target.value)} name="more" >
                    <option value="all">Количество комнат</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>
            </div>
            <div className={css.impWrapper}>
                <select value={floor} onChange={e=>setFloor(e.target.value)} name="floor" >
                    <option value="all">Этаж</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
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
                    <option value="">Тип строения</option>
                    <option value="Кирпичный">Кирпичный</option>
                    <option value="Панельный">Панельный</option>
                    {/*<option value="2000">Комерчиская невижемость</option>*/}
                </select>
                <select name="more" >
                    <option value="more">Мебелирван</option>
                    <option value="more">Да</option>
                    <option value="more">Нет</option>
                </select>
            </div>

            <div className={css.impWrapper}>
                <input value={priceFrom} onChange={e=>setPriceFrom(e.target.valu)} placeholder={"Цена от"} type="text"/>
                <input value={priceTo} onChange={e=>setPriceTo(e.target.valu)} placeholder={"Цена до"} type="text"/>
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



const mapStateToProps = state => {
    return{
        filterData: state.filterData
    }
}

const FilterForMap = connect(mapStateToProps,{setFilterData})(FilterMap);


export default FilterForMap;