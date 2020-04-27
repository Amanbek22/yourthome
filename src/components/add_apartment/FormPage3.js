import React, {useEffect} from 'react'
import css from "./addApartmant.module.css";
import {Field, reduxForm} from "redux-form";
import {Creatable} from "react-select";
import {validate} from './validate';

export const Sel = props => {
    let {placeholder, options} = props

    useEffect(()=>{
        props.setDetails(props.input.value)
    })

    let values
    if(props.input.value) {
        let arr = [...props.input.value]
        values = arr.map(item => {
            return {
                value: item,
                label: item
            }
        })
        // props.setDetails(val)
    }

    return (
        <>
            <Creatable
                placeholder={placeholder}
                options={options}
                {...props}
                value={values}
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
            <Field setDetails={props.setNearHome} name={'nearHome'} component={Sel} options={props.options} isClearable
                   isMulti autoFocus={'autoFocus'}
                   placeholder={'Рядом есть...'}/>
            <Field setDetails={props.setAtHome} name={'atHome'} component={Sel} options={props.options} isClearable
                   isMulti
                   placeholder={'Дома есть...'}/>
                   <div></div>
                   <div className={css.nextPrevBtn}>
                       <button onClick={()=>props.previousPage()} className={css.sendBtn}>Назад</button>
                       <button className={css.sendBtn}>Далее</button>
                   </div>
        </form>
    )
}

export default reduxForm({
    form: 'addApartment',  //Form name is same
    destroyOnUnmount: false,
    validate
})(FormPage3);