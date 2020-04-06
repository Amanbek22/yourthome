import React, {useState} from 'react';
import {Link, Redirect} from "react-router-dom";
import css from './sign.module.css'
import api from "../../api/api";
import {WithAuthRedirect} from "../../HOC/AuthRedirect";
import {reduxForm} from "redux-form";


const LoginForm = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = e => {
        e.preventDefault()
        api.signIn({
            'username': email,
            'password': password
        }).then(
            res => {
                localStorage.setItem("userData", JSON.stringify(res.data));
                window.location.href="/admin";
                console.log(res)
            },
            error => alert(error)
        )
    }
    return (
        <form onSubmit={signIn} className={css.form}>
            <input required value={email} onChange={(e) => setEmail(e.target.value)} placeholder={"Логин"}
                   type="text"/>
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder={"Пароль*"}
                   type="password"/>
            <div className={css.remember}>
                <div>
                    <input name={"check"} type="checkbox"/>
                    <span>Остатся на сайте</span>
                </div>
                <Link to={"/"}>Забыли пароль?</Link>
            </div>
            <div className={css.enter}>
                <Link to={"/sign_up"}>Регистрация</Link>
                <input type={'submit'} value={'Войти'} />
            </div>
        </form>
    )
}
const Login = reduxForm({form: 'login'})(LoginForm)

const SignIn = props => {
    return (
        <div className={css.mainWrapper}>
            <div className={css.wrapper}>
                <h3>Вход</h3>
                <Login/>
            </div>
        </div>
    )
}

const AuthRedirectComponent = WithAuthRedirect(SignIn)

export default AuthRedirectComponent;