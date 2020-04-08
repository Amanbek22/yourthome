import React, {useState} from 'react';
import css from './filter.module.css'
import {DatePickerInput} from "rc-datepicker";
import {connect} from "react-redux";
import {setFilterData} from '../../redux/filterReducer'


const FilterMap = props =>{
    const [city,setCity] = useState(props.filterData.city);
    const [apartmentType, setApartmentType] = useState(props.filterData.type)
    const [construction_type, setConstruction_type] = useState(props.filterData.construction_type)
    const [rooms,setRooms] = useState(props.filterData.rooms)
    const [floor,setFloor] = useState('')
    const [dateFrom,setDateFrom] = useState(props.filterData.dateFrom);
    const [dateTo,setDateTo] = useState(props.filterData.dateTo);
    const [priceFrom,setPriceFrom] = useState(props.filterData.priceFrom)
    const [priceTo,setPriceTo] = useState(props.filterData.priceTo)
    const [internet, setInternet] = useState(props.filterData.internet)
    const [furniture, setFurniture] = useState(props.filterData.furniture)
    const [gas, setGas] = useState(props.filterData.gas)
    const [phone, setPhone] = useState(props.filterData.phone)
    const [elevator, setElevator] = useState(props.filterData.elevator)
    const [security, setSecurity] = useState(props.filterData.security)
    const [parcking, setParcking ] = useState(props.filterData.parcking)
    const onDataChange = (jsDate,dateString) => setDateFrom(jsDate)
    const onDataToChange = (jsDate,dateString) => setDateTo(jsDate)
    const filter = () =>{
        props.setItem(city,'')
        props.setFilterData(
            {city,rooms,floor,dateFrom,dateTo,priceFrom,priceTo,apartmentType,internet,furniture,gas,phone,elevator,security,parcking,construction_type}
            )
    }
    let width = window.innerWidth;
    const widthFilter = () => {
        if (width < 768){
            props.setOpenMap(!props.openMap)
        }
    }
    return(
        <div className={css.wrapper}>
            <div className={css.filterWrapper}>
                <h2>Фильтр данных</h2>
                <button onClick={()=>{
                    filter()
                    widthFilter()
                } }>Применить</button>
            </div>
            <select value={city} onChange={e=>{
                // props.setItem(e.target.value,'')
                setCity(e.target.value)
            }} name="cities" >
                <option value="">Все Регионы</option>
                <option value="1">Чуй</option>
                <option value="2">Ош</option>
                <option value="3">Нарын</option>
                <option value="4">Талас</option>
                <option value="5">Иссык-Куль</option>
                <option value="6">Джалал-Абад</option>
                <option value="7">Баткен</option>
            </select>
            {/*<input placeholder={"Дата вьезда и выезда"} type="text"/>*/}
            <div className={css.dataWrapper}>
                <label>
                    Дата заезда
                <DatePickerInput
                    onChange={onDataChange}
                    value={ dateFrom}
                    className='my-custom-datepicker-component'
                    onHide={()=>0}
                    showOnInputClick={true}
                    onClear={()=>setDateFrom('')}
                    minDate={new Date()}
                    placeholder={'placeholder'}
                />
                </label>
                <label>
                    Дата выезда
                <DatePickerInput
                    onChange={onDataToChange}
                    value={dateTo}
                    className='my-custom-datepicker-component'
                    onHide={()=>0}
                    showOnInputClick={true}
                    onClear={()=>setDateTo('')}
                    minDate={new Date()}
                    placeholder={'От какого числа занято'}
                    // style={{ margin: 50+'px' }}
                />
                </label>
            </div>
            <div className={css.impWrapper}>
                <select value={construction_type} onChange={e=>setConstruction_type(e.target.value)} name="price" >
                    <option value="">Тип строения</option>
                    <option value={1}>Панельный</option>
                    <option value={2}>Кирпичный</option>
                </select>
                <select value={rooms} onChange={e=>setRooms(e.target.value)} name="more" >
                    <option value="">Количество комнат</option>
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
                    <option value="">Этаж</option>
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
                <select name="price" value={apartmentType} onChange={e => setApartmentType(e.target.value)} >
                    <option value="">Тип недвижемость</option>
                    <option value={1}>Квартира</option>
                    <option value={2}>Дом</option>
                    {/*<option value="2000">Комерчиская невижемость</option>*/}
                </select>
                <select name="more" >
                    <option value="more">Мебелирван</option>
                    <option value="more">Да</option>
                    <option value="more">Нет</option>
                </select>
            </div>

            <div className={`${css.impWrapper}  ${css.priceWrapper}`}>
                <input value={priceFrom} onChange={e=>setPriceFrom(e.target.value)} placeholder={"Цена от"} type="number"/>
                <input value={priceTo} onChange={e=>setPriceTo(e.target.value)} placeholder={"Цена до"} type="number"/>
            </div>
            <div className={css.detailsWrapper}>
                <h4>В квартире есть</h4>
                <div className={css.details}>
                    <div>
                        <input type="checkbox" checked={internet} onChange={e => setInternet(e.target.checked)} /><label>Интернет</label>
                    </div>
                    <div>
                        <input type="checkbox" checked={furniture} onChange={e=> setFurniture(e.target.checked)}/><label>Мебелирован</label>
                    </div>
                    <div>
                        <input type="checkbox" checked={gas} onChange={e=>setGas(e.target.checked)} /><label>Газ</label>
                    </div>
                    <div>
                        <input type="checkbox" checked={phone} onChange={e=>setPhone(e.target.checked)} /><label>Телефон</label>
                    </div>
                    <div>
                        <input type="checkbox" checked={elevator} onChange={e=>setElevator(e.target.checked)} /><label>Лифт</label>
                    </div>
                </div>
            </div>
            <div className={css.detailsWrapper}>
                <h4>Рядом есть</h4>
                <div className={css.details}>
                    <div>
                        <input type="checkbox" checked={security} onChange={e=>setSecurity(e.target.checked)}/>
                        <label>Охрана</label>
                    </div>
                    <div>
                        <input type="checkbox" checked={parcking} onChange={e=>setParcking(e.target.checked)}/>
                        <label>Парковка</label>
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