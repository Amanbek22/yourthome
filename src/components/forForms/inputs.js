import React from 'react';
import css from './inputs.module.css'

export const Input = ({input, type, placeholder, name, meta: {touched, error, warning}}) => {
    return (
        <div>
            <input required className={`${css.inp} ${touched && error ? css.error : touched && css.inp2}`} {...input} placeholder={placeholder}
                   type={type}/>
            {touched && ((error && <span className={css.errorSpan}>{error}</span>))}
        </div>
    )
}

export const InputAdd = ({autoFocus, input, min, type, placeholder, name, meta: {touched, error, warning}}) => {
    return (
        <>
            <input autoFocus={autoFocus} className={`${css.inputs} ${touched && error ? css.error : !touched && !error ? css.inp2 : touched && css.inp2}`} {...input} placeholder={placeholder}
                   type={type} min={'0'} required/>
            {/*{touched && ((error && <span className={css.errorSpan}>{error}</span>))}*/}
        </>
    )
}

export const SelectAdd = ({input,data, type, placeholder, name, meta: {touched, error, warning}}) => {
    return (
        <>
            <select className={`${css.selects} ${touched && error ? css.error : !touched && !error ? css.inp2 : touched && css.inp2}`} {...input} required>
                {
                    data ? data.map(item => <option key={item.id} value={item.id} > {item.type ? item.type : item.name}  </option>) : <option>загрузка...</option>
                }
            </select>
            {/*{touched && ((error && <span className={css.errorSpan}>{error}</span>))}*/}
        </>
    )
}

export const TextareaAdd = ({input, type, placeholder, autoFocus, name, meta: {touched, error, warning}}) => {
    return (
        <>
            <textarea className={`${css.inputs} ${touched && error ? css.error : touched && css.inp2}`} {...input} placeholder={placeholder}
                      style={{height: "150px", fontSize: "16px", padding: "0 5px"}}
                      required autoFocus={autoFocus}/>
            {/*{touched && ((error && <span className={css.errorSpan}>{error}</span>))}*/}
        </>
    )
}