import React from 'react'
import css from "./addApartmant.module.css";
import {Field, reduxForm} from "redux-form";
import {Creatable} from "react-select";
import {validate} from './validate';

const Sel = props => {
    let {placeholder, options} = props
    return (
        <>
            <Creatable
                placeholder={placeholder}
                options={options}
                {...props}
                onChange={(data) => {
                    let arr = []
                    data.map(item => {
                        arr.push(item.value)
                    })
                    props.setDetails(arr)
                }}
            />
        </>
    )
}

const FormPage3 = props => {
    return(
        <form onSubmit={props.onSubmit} className={css.main + ' ' + css.details}>
            <Field setDetails={props.setDetails} name={'details'} component={Sel} options={props.options} isClearable
                   isMulti autoFocus={'autoFocus'}
                   placeholder={'Детали...'}/>
            <button className={css.sendBtn}>Далее</button>
        </form>
    )
}

export default reduxForm({
    form: 'addApartment',  //Form name is same
    destroyOnUnmount: false,
    validate
})(FormPage3);