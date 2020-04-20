import React, {useState} from 'react';
import css from './filter.module.css'
import {DatePickerInput} from "rc-datepicker";
import {connect} from "react-redux";
import {setFilterData} from '../../redux/filterReducer'
import Select from "react-select";


const FilterMap = props =>{
    const [city,setCity] = useState(props.filterData.city);
    const [apartmentType, setApartmentType] = useState(props.filterData.type)
    const [construction_type, setConstruction_type] = useState(props.filterData.construction_type)
    const [rooms,setRooms] = useState(props.filterData.rooms)
    const [floor,setFloor] = useState('')
    const [floors,setFloors] = useState('')
    const [dateFrom,setDateFrom] = useState(props.filterData.dateFrom);
    const [dateTo,setDateTo] = useState(props.filterData.dateTo);
    const [priceFrom,setPriceFrom] = useState(props.filterData.priceFrom)
    const [priceTo,setPriceTo] = useState(props.filterData.priceTo)
    const onDataChange = (jsDate,dateString) => setDateFrom(jsDate)
    const onDataToChange = (jsDate,dateString) => setDateTo(jsDate)
    const [details, setDetails] = useState([])
    const filter = () =>{
        props.setItem(city,'')
        props.setFilterData(
            {city,rooms,floor,dateFrom,dateTo,priceFrom,priceTo,apartmentType,construction_type, details}
            )
    }
    let width = window.innerWidth;
    const widthFilter = () => {
        if (width < 768){
            props.setOpenMap(!props.openMap)
        }
    }
    const options = [
        {value: 'internet', label: 'Интернет'},
        {value: 'gas', label: 'Газ'},
        {value: 'heat', label: 'Отопление'},
        {value: 'phone', label: 'Телефон'},
        {value: 'electricity', label: 'Электричество'},
        {value: 'furniture', label: 'Мебель'},
        {value: 'elevator', label: 'Лифт'},
        {value: 'security', label: 'Охрана'},
        {value: 'parking', label: 'Парковка'},
    ]
    return(
        <div className={css.wrapper}>
            <div className={css.filterWrapper}>
                <h2>Фильтр данных</h2>
                <button onClick={()=>{
                    filter()
                    widthFilter()
                } }>Применить</button>
            </div>
            <select value={city} onChange={e=>{setCity(e.target.value)}} name="cities" >
                <option value="">Все Регионы</option>
                <option value="1">Чуй</option>
                <option value="2">Ош</option>
                <option value="3">Нарын</option>
                <option value="4">Талас</option>
                <option value="5">Иссык-Куль</option>
                <option value="6">Джалал-Абад</option>
                <option value="7">Баткен</option>
            </select>
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
                    {props.app.types
                        ? props.app.types.map(item => <option value={item.id}>{item.type}</option> )
                        : <option value="">Загрузка...</option>
                    }
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
                <input value={floor} onChange={e=>setFloor(e.target.value)} name="floor" placeholder={'Этаж'} />
                <input value={floors} onChange={e=>setFloors(e.target.value)} name="floor" placeholder={'Этажность домв'} />
            </div>
            <div className={css.impWrapper}>
                <select name="price" value={apartmentType} onChange={e => setApartmentType(e.target.value)} >
                    <option value="">Тип недвижемость</option>
                    <option value={1}>Квартира</option>
                    <option value={2}>Дом</option>
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
                <h4>Детали</h4>
                <Select placeholder={'Детальная фильтрация...'} autoFocus onChange={(data) => {
                    let arr = []
                    data.map(item => {
                        arr.push(item.value)
                    })
                    setDetails(arr)
                }} options={options} isMulti  />
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return{
        filterData: state.filterData,
        app: state.app
    }
}

const FilterForMap = connect(mapStateToProps,{setFilterData})(FilterMap);


export default FilterForMap;