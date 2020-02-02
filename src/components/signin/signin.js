import React from 'react';
import {Link} from "react-router-dom";
import css from './sign.module.css'

const SignIn = props => {
    return (
        <div className={css.mainWrapper}>
            <div className={css.wrapper}>
                <h3>Вход</h3>
                <form className={css.form} action="post">
                    <input placeholder={"Email или телефон*"} type="text"/>
                    <input placeholder={"Пароль*"} type="text"/>
                    <div className={css.remember}>
                        <div>
                            <input  name={"check"} type="checkbox"/>
                            <span >Остатся на сайте</span>
                        </div>
                        <Link to={"/"}>Забыли пароль?</Link>
                    </div>
                    <div className={css.enter}>
                        <Link to={"/sign_up"}>Регистрация</Link>
                        <button>Войти</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignIn;