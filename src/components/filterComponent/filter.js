import React, {useEffect, useReducer, useState} from 'react';
import css from './filter.module.css'
import {Link} from "react-router-dom";
import {DateRangeInput} from "@datepicker-react/styled";
import Cards from "../cards/cards";
import {Creatable} from "react-select";
import dropDown from  '../../img/dropDown.png'

const initialState = {
    startDate: null,
    endDate: null,
    focusedInput: null
};

function reducer(state, action) {
    switch (action.type) {
        case "focusChange":
            return {...state, focusedInput: action.payload};
        case "dateChange":
            return action.payload;
        default:
            throw new Error();
    }
}

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        borderBottom: '1px dotted pink',
        color: '#000',
        padding: 20,
    }),

}


const Filter = props => {
    const [city, setCity] = useState('');
    const [region, setRegion] = useState('');
    const [rooms, setRooms] = useState('');
    const [priceFrom, setPriceFrom] = useState('');
    const [priceTo, setPriceTo] = useState('');
    const [floor, setFloor] = useState('')
    const [construction_type, setConstruction_type] = useState(props.filterData.construction_type)
    const [nearby_objects, setNearby_objects] = useState([])
    const [atHome, setAtHome] = useState([])
    const [moreVisible, setMoreVisible] = useState(false)
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        dispatch({
            type: "dateChange", payload: {
                startDate: props.filterData.dateFrom,
                endDate: props.filterData.dateTo,
                focusedInput: null
            }
        })
    }, [])
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
    return (
        <div className={css.filterWrapper}>
            <div>
                <Cards/>

            </div>
            <div className={css.filterWrapperSecond}>
                <div className={css.inputsWrapper}>
                    <p className={css.bookingDate}>Укажите дату бранирования</p>
                    <div>
                        <div className={css.dateRangeWrapper}>
                            <DateRangeInput
                                onDatesChange={data => dispatch({type: "dateChange", payload: data})}
                                onFocusChange={focusedInput =>
                                    dispatch({type: "focusChange", payload: focusedInput})
                                }
                                startDate={state.startDate} // Date or null
                                endDate={state.endDate} // Date or null
                                focusedInput={state.focusedInput}
                                minBookingDate={new Date()}
                                unavailableDates={[]}
                                vertical={true}
                                phrases={{startDatePlaceholder: 'Дата заезда', endDatePlaceholder: 'Дата выезда'}}
                            />
                        </div>
                    </div>
                    <div className={css.inputs}>
                        <input className={css.inputFilter} placeholder={'Город'} type="text" value={city}
                               onChange={(e) => setCity(e.target.value)}/>
                        <select className={css.inputFilter} value={construction_type}
                                onChange={e => setConstruction_type(e.target.value)} name="price">
                            <option value="">Тип строения</option>
                            {props.app.types
                                ? props.app.types.map(item => <option key={item.id} value={item.id}>{item.type}</option>)
                                : <option value="">Загрузка...</option>
                            }
                        </select>
                    </div>
                    <select value={region} onChange={(e) => setRegion(e.target.value)} name="find_by_region">
                        <option value="">Все регионы</option>
                        <option value="1">Чуй</option>
                        <option value="2">Ош</option>
                        <option value="3">Нарын</option>
                        <option value="4">Талас</option>
                        <option value="5">Иссык-Куль</option>
                        <option value="6">Джалал-Абад</option>
                        <option value="7">Баткен</option>
                    </select>
                    <div className={css.inputs}>
                        <select className={css.inputFilter} value={rooms} onChange={(e) => setRooms(e.target.value)}>
                            <option value="">Количество комнат</option>
                            <option value="1">1 комнат</option>
                            <option value="2">2 комнат</option>
                            <option value="3">3 комнат</option>
                            <option value="4">4 комнат</option>
                            <option value="5">5 комнат</option>
                            <option value="6">6 комнат</option>
                        </select>
                        <input className={css.inputFilter} value={floor} onChange={e => setFloor(e.target.value)} name="floor"
                               placeholder={'Этаж'}/>
                    </div>
                    <div className={css.dateWrapper}>
                        <input value={priceFrom} onChange={e => setPriceFrom(e.target.value)} type="number"
                               placeholder={'Цена от'}/>
                        <input value={priceTo} onChange={e => setPriceTo(e.target.value)} type="number"
                               placeholder={'Цена до'}/>
                    </div>
                    <div className={css.moreDetails} onClick={()=>setMoreVisible(!moreVisible)} >
                        Дополнительно
                        {
                            moreVisible
                                ? <img style={{cursor: 'pointer',marginLeft: '5px', transform: 'rotate(180deg)'}} src={dropDown} alt={' '} />
                                : <img style={{cursor: 'pointer',marginLeft: '5px'}} src={dropDown} alt={' '} />
                        }
                    </div>
                    <div style={{display: moreVisible ? 'block' : 'none'}} >
                        <Creatable
                            placeholder={'Рядом есть'}
                            options={options}
                            value={atHome}
                            onChange={(data) => {
                                setAtHome(data)
                            }}
                            isMulti
                            styles={customStyles}
                        />
                        <br/>
                        <Creatable
                            placeholder={'В доме есть'}
                            options={options}
                            value={nearby_objects}
                            onChange={(data) => {
                                setNearby_objects(data)
                            }}
                            isMulti
                            styles={customStyles}
                        />
                    </div>
                </div>
                <div className={css.moreWrapper}>
                    <div className={css.findButton}>
                        <div className={css.show}>
                            <Link to={"/map"}>Показать на карте</Link>
                        </div>
                        <div className={css.search}>
                            <Link onClick={() => props.setFilterData({
                                city,
                                region,
                                rooms,
                                atHome,
                                nearby_objects,
                                construction_type,
                                dateFrom: state.startDate,
                                dateTo: state.endDate,
                                priceFrom,
                                priceTo,
                                floor
                            })} to="/map">Начать поиск</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Filter;


/*
*
* Рыбалов Арсений Сергеевич
1. 0
2. 1
3. 1
4. 1
5. 0.5
6. 0
7. 0
8. 1
9. 1
10. 0.5
11. 1
12. 1
13. 1
14. 0
15. 0.5
16. 1
17. 1
18. 0
19. 1
20. 0
21. 1
22. 1
23. 0
24. 1
25. 1
26. 0
27. 0.5
====17


Герасько Вадим


1. 1
2. 1
3. 1
4. 0
5. 0.5
6. 0
7. 0
8. 0.5
9. 1
10. 1
11. 1
12. 0
13. 0.5
14. 1
15. 1
16. 1
17. 0.5
18. 0
19. 0
20. 0.5
21. 1
22. 0.5
23. 0
24. 1
25. 1
26. 0
27. 1
====16





*
*
* */