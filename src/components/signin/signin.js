import React, {useState} from 'react';
import {Link, Redirect} from "react-router-dom";
import css from './sign.module.css'
import api from "../../api/api";
import {WithAuthRedirect} from "../../HOC/AuthRedirect";
import {reduxForm, Field} from "redux-form";
import {Input} from "../forForms/inputs";

const validate = values => {
    const errors = {}
    if (!values.login) {
        errors.login = 'Введите логин'
    }else if(values.login.length > 0 ){
        errors.login = undefined
    }
    if (!values.password) {
        errors.password = 'Введите пароль'
    }else if(values.password.length > 0 ){
        errors.password = undefined
    }
    return errors
}

const LoginForm = props => {
    console.log(props)
    return (
        <form onSubmit={props.handleSubmit} className={css.form}>
            <Field name={'login'} placeholder={"Логин*"} component={Input} type={'text'} />
            <Field name={'password'} placeholder={"Пароль*"} component={Input} type={'password'}/>
            <div className={css.remember}>
                <div>
                    <Field name={"check"} type="checkbox" component={'input'}/>
                    <span>Остатся на сайте</span>
                </div>
                {/*<Link to={"/"}>Забыли пароль?</Link>*/}
                <div></div>
            </div>
            <div className={css.enter}>
                <Link to={"/sign-up"}>Регистрация</Link>
                {/*<Field component={'input'} type={'submit'} value={'Войти'}/>*/}
                <button disabled={props.submitting}>Войти</button>
            </div>
        </form>
    )
}
const Login = reduxForm({form: 'login',validate })(LoginForm)

const SignIn = props => {
    const signIn = data => {
        console.log(data)
        api.signIn({
            'username': data.login,
            'password': data.password
        }).then(
            res => {
                localStorage.setItem("userData", JSON.stringify(res.data));
                window.location.href="/admin";
                console.log(res)
            },
            error => {
                alert(error)
            }
        )
    }
    return (
        <div className={css.mainWrapper}>
            <div className={css.wrapper}>
                <h3>Вход</h3>
                <Login onSubmit={signIn}/>
            </div>
        </div>
    )
}

const AuthRedirectComponent = WithAuthRedirect(SignIn)

export default AuthRedirectComponent;