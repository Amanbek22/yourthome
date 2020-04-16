import React from 'react'
import css from "./addApartmant.module.css";
import {Field, reduxForm} from "redux-form";
import {InputAdd, SelectAdd} from "../forForms/inputs";
import {validate} from './validate';


const FormPage2 = props => {
    return(
        <form onSubmit={props.onSubmit} className={css.infos + ' ' + css.main}>
            <div>
                <label>Цена</label>
                <Field autoFocus={'autoFocus'} placeholder={"Цена"} type="number" name={'price'} component={InputAdd}
                />
            </div>

            <div>
                <label>Количество комнат</label>
                <Field component={SelectAdd} name={'rooms'} data={props.rooms}/>
            </div>
            <div>
                <label>Площадь</label>
                <Field name={'area'} placeholder={"Площадь"} type="number" component={InputAdd}/>
            </div>
            <div>
                <label>Этаж</label>
                <Field name={'floor'} component={InputAdd} placeholder={'Этаж'} type={'number'}/>
            </div>
            <div>
                <label>Жилая площадь</label>
                <Field name={'liveArea'} placeholder={"Площадь"} type="number" component={InputAdd}/>
            </div>
            <div>
                <label>Этажность дома</label>
                <Field name={'floors'} component={InputAdd} type={'number'} placeholder={'Этажность дома'}/>
            </div>
            <div>
                <label>Тип строения</label>
                <Field name={'constractionType'} component={SelectAdd} data={props.constractionType}/>
            </div>
            <div>
                <label>Тип ремонта</label>
                <Field name={'state'} component={SelectAdd} data={props.state}/>
            </div>
            <button className={css.sendBtn}>Далее</button>
        </form>
    )
}

export default reduxForm({
    form: 'addApartment',  //Form name is same
    destroyOnUnmount: false,
    validate
})(FormPage2);