import React from 'react';
import css from './signup.module.css'
import api from "../../api/api";
import {withRouter} from "react-router-dom";
import {WithAuthRedirect} from "../../HOC/AuthRedirect";
import {Field, reduxForm, stopSubmit} from "redux-form";
import {Input} from "../forForms/inputs";
import {connect} from "react-redux";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
const validate = values => {
    const errors = {}
    if (!values.username) {
        errors.username = 'Введите логин'
    } else if (values.username.length > 0) {
        errors.username = undefined
    }
    if (!values.password) {
        errors.password = 'Введите пароль'
    } else if (values.password.length < 8) {
        errors.password = 'Пароль должен состоять минимум из 8 символов'
    } else if (values.password.length > 0) {
        errors.password = undefined
    }
    if (!values.name) {
        errors.name = 'Введите имя'
    } else if (values.name.length > 0) {
        errors.name = undefined
    }
    if (!values.surname) {
        errors.surname = 'Введите фамилию'
    } else if (values.surname.length > 0) {
        errors.surname = undefined
    }
    if (!values.phone) {
        errors.phone = 'Введите номер'
    } else if (values.phone.length < 6) {
        errors.phone = 'Введите номер полностью'
    } else if (values.phone.length > 0) {
        errors.phone = undefined
    }
    if (!values.email) {
        errors.email = 'Введите почту'
    } else if (values.email.length > 0) {
        errors.email = undefined
    }
    return errors
}
const Phone = ({input: {value, onChange}}) => {
    return (
        <PhoneInput
            country={'kg'}
            placeholder="Enter phone number"
            value={value}
            onChange={phone => onChange(phone)}
        />
    )
}

const SignForm = props => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field name={'username'} component={Input} placeholder={"Логин"} type="text"/>
            <Field name={'name'} component={Input} placeholder={"Имя*"} type="text"/>
            <Field name={'surname'} component={Input} placeholder={"Фамилия*"} type="text"/>
            <div className={css.phone}>
                <Field name={'phone'} component={Phone}/>
            </div>
            <Field name={'email'} component={Input} placeholder={"Email"} type="email"/>
            <Field name={'password'} component={Input} placeholder={"Пароль*"} type="password"/>

            <div className={css.remember}>
                <Field component={'input'} name={"check"} type="checkbox"/>
                <span>Принимаю политику и Условия пользования сайтом</span>
            </div>
            <div className={css.enter}>
                <button>Регистрация</button>
            </div>
            {
                props.error && <div className={css.someError}>
                    {props.error}
                </div>
            }
        </form>
    )
}

const SignUpForm = reduxForm({form: 'signUp', validate})(SignForm)

const SignUp = props => {
    const signUp = (data) => {
        api.registration({
            'email': data.email,
            'username': data.username,
            'password': data.password,
            'phone': data.phone,
            'name': data.name,
            'surname': data.surname
        })
            .then(
                (response) => {
                    console.log(response.data);
                    if (response.status === 201) {
                        alert('Поздровляем вас, вы зарегистрировались и можете войти в систему!')
                        props.history.push('/sign-in')
                    } else {
                        return 0
                    }
                },
                (error) => {
                    props.stopSubmit('signUp', {_error: "Пользователь с таким login'ом уже существует"})
                }
            )
    }
    return (
        <div className={css.mainWrapper}>
            <div className={css.wrapper}>
                <h3>Регистрация</h3>
                <SignUpForm onSubmit={signUp}/>
            </div>
        </div>
    )
}

const AuthRedirectComponent = WithAuthRedirect(SignUp)

export default connect(null, {stopSubmit})(withRouter(AuthRedirectComponent));