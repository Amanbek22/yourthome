import React from 'react'
import css from "./addApartmant.module.css";
import {Field, reduxForm} from "redux-form";
import {InputAdd, SelectAdd} from "../forForms/inputs";
import {validate} from './validate';
import {connect} from "react-redux";


const FormPage2 = props => {
    const greaterThan = otherField => (value) => value > otherField ? value : '';
    return(
        <form onSubmit={props.onSubmit} className={css.wrapper}>
            <div style={{display: 'grid',gridTemplateColumns: '1fr 1fr', gridGap: '1em'}}>
                <div className={css.priceCur}>
                    <label>Цена</label>
                    <Field autoFocus={'autoFocus'} normalize={greaterThan(0)} placeholder={"Цена"} type="number" name={'price'} component={InputAdd}
                    />
                </div>
                <div className={css.priceCur}>
                    <label>Валюта</label>
                    <Field normalize={greaterThan(0)} placeholder={"Валюта*"} type="number" name={'currency'} component={SelectAdd} data={props.currency}
                    />
                </div>
            </div>

            <div>
                <label>Количество комнат</label>
                <Field component={SelectAdd} name={'rooms'} data={props.rooms}/>
            </div>
            <div>
                <label>Площадь</label>
                <Field name={'area'}  normalize={greaterThan(0)} placeholder={"Площадь"} type="number" component={InputAdd}/>
            </div>
            <div>
                <label>Этаж</label>
                <Field name={'floor'}  normalize={greaterThan(0)} component={InputAdd} placeholder={'Этаж'} type={'number'}/>
            </div>
            <div>
                <label>Жилая площадь</label>
                <Field name={'liveArea'}  normalize={greaterThan(0)} placeholder={"Площадь"} type="number" component={InputAdd}/>
            </div>
            <div>
                <label>Этажность дома</label>
                <Field name={'storey'}  normalize={greaterThan(0)} component={InputAdd} type={'number'} placeholder={'Этажность дома'}/>
            </div>
            <div>
                <label>Тип строения</label>
                <Field name={'construction_type'} component={SelectAdd} data={props.constractionType}/>
            </div>
            <div>
                <label>Тип ремонта</label>
                <Field name={'state'} component={SelectAdd} data={props.state}/>
            </div>
            <div></div>
            <div className={css.nextPrevBtn}>
                <button onClick={()=>props.previousPage()} className={css.sendBtn}>Назад</button>
                <button type={"submit"} className={css.sendBtn}>Далее</button>
            </div>
        </form>
    )
}

const mapStateToProps = state => {
    return {
        currency: state.app.currency,
        minData: state.form.addApartment.values
    }
}

export default connect(mapStateToProps)(reduxForm({
    form: 'addApartment',  //Form name is same
    destroyOnUnmount: false,
    validate
})(FormPage2));