import React from 'react'
import css from "./addApartmant.module.css";
import {Field, reduxForm} from "redux-form";
import {InputAdd, SelectAdd} from "../forForms/inputs";
import {validate} from './validate';


const TitleForm = props => {
    return(
        <form onSubmit={props.onSubmit} className={css.main}>
            <div>
                <label>Заголовок*</label>
                <Field autoFocus={'autoFocus'} name={'headline'} placeholder={"Заголовок*"}
                       type="text"  component={InputAdd}/>
            </div>
            <div>
                <label>Тип недвижемости</label>
                <Field name={'apartmentType'} component={SelectAdd} data={props.data} valueField={'value'}
                       textField={'text'}/>
            </div>
            <button className={css.sendBtn}>Далее</button>
        </form>
    )
}

export default reduxForm({
    form: 'addApartment',  //Form name is same
    destroyOnUnmount: false,
    validate
})(TitleForm);