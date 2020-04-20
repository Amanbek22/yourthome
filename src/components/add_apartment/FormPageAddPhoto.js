import React from 'react'
import css from "./addApartmant.module.css";
import {Field, reduxForm} from "redux-form";
import {validate} from './validate';



const FormPageAddPhoto = props => {
    return(
        <form onSubmit={props.onSubmit} className={css.main + ' ' + css.details}>
            {/*<Field setDetails={props.setDetails} name={'details'} component={Sel} options={props.options} isClearable*/}
                   {/*isMulti autoFocus={'autoFocus'}*/}
                   {/*placeholder={'Детали...'}/>*/}
            {/*<button className={css.sendBtn}>Далее</button>*/}
        </form>
    )
}

export default reduxForm({
    form: 'addApartment',  //Form name is same
    destroyOnUnmount: false,
    validate
})(FormPageAddPhoto);