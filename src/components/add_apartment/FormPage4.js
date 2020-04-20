import React from 'react'
import css from "./addApartmant.module.css";
import {Field, reduxForm} from "redux-form";
import {TextareaAdd} from "../forForms/inputs";
import {validate} from './validate';

const FormPage4 = props => {
    return (
        <form onSubmit={props.onSubmit} className={css.wrapper}>
            <div>
                <label>Описание</label>
                <Field autoFocus={'autoFocus'} component={TextareaAdd} name={'description'}
                       placeholder={"Описание...."}/>
            </div>
            <div className={css.description}>Напишете краткое описание</div>
            <div></div>
            <div className={css.nextPrevBtn}>
                <button onClick={() => props.previousPage()} className={css.sendBtn}>Назад</button>
                <button className={css.sendBtn}>Далее</button>
            </div>
        </form>
    )
}

export default reduxForm({
    form: 'addApartment',  //Form name is same
    destroyOnUnmount: false,
    validate
})(FormPage4);