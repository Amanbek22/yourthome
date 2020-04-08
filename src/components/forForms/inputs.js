import React from 'react';
import css from './inputs.module.css'

export const Input = ({input, type, placeholder, name, meta: {touched, error, warning}}) => {
    return (
        <div>
            <input className={`${css.inp} ${touched && error ? css.error : touched && css.inp2}`} {...input} placeholder={placeholder}
                   type={type}/>
            {touched && ((error && <span className={css.errorSpan}>{error}</span>))}
        </div>
    )
}

export const InputAdd = ({input, type, placeholder, name, meta: {touched, error, warning}}) => {
    return (
        <>
            <input className={`${css.inputs} ${touched && error ? css.error : touched && css.inp2}`} {...input} placeholder={placeholder}
                   type={type} required/>
            {/*{touched && ((error && <span className={css.errorSpan}>{error}</span>))}*/}
        </>
    )
}

export const SelectAdd = ({input,data, type, placeholder, name, meta: {touched, error, warning}}) => {
    return (
        <>
            <select className={`${css.selects} ${touched && error ? css.error : touched && css.inp2}`} {...input} required>
                {
                    data.map(item => <option key={item.text} value={item.text} > {item.value} </option>)
                }
            </select>
            {/*{touched && ((error && <span className={css.errorSpan}>{error}</span>))}*/}
        </>
    )
}

export const TextareaAdd = ({input, type, placeholder, name, meta: {touched, error, warning}}) => {
    return (
        <>
            <textarea className={`${css.inputs} ${touched && error ? css.error : touched && css.inp2}`} {...input} placeholder={placeholder}
                      style={{height: "150px", fontSize: "16px", padding: "0 5px"}}
                      required/>
            {/*{touched && ((error && <span className={css.errorSpan}>{error}</span>))}*/}
        </>
    )
}