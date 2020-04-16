import React from 'react'
import css from "./addApartmant.module.css";
import {Field, reduxForm} from "redux-form";
import {TextareaAdd} from "../forForms/inputs";
import {validate} from './validate';

const FormPage4 = props => {
    return(
        <form onSubmit={props.onSubmit} className={css.main}>
            <div>
                <label>Описание</label>
                <Field autoFocus={'autoFocus'} component={TextareaAdd} name={'description'} placeholder={"Описание...."}/>
            </div>
            <button className={css.sendBtn}>Далее</button>
        </form>
    )
}

export default reduxForm({
    form: 'addApartment',  //Form name is same
    destroyOnUnmount: false,
    validate
})(FormPage4);