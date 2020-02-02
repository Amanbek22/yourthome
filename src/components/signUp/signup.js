import React from 'react';
//import {Link} from "react-router-dom";
import css from './signup.module.css'

const SignUp = props => {
    return (
        <div className={css.mainWrapper}>
            <div className={css.wrapper}>
                <h3>Регистрация</h3>
                <form className={css.form} action="post">
                    <input placeholder={"Email или телефон*"} type="text"/>
                    <input placeholder={"Имя*"} type="text"/>
                    <input placeholder={"Фамилия*"} type="text"/>
                    <input placeholder={"Телефон*"} type="text"/>
                    <input placeholder={"Email"} type="text"/>
                    <input placeholder={"Пароль*"} type="text"/>
                    <div className={css.remember}>
                        <div>
                            <input  name={"check"} type="checkbox"/>
                            <span >Принимаю политику и Условия пользования сайтом</span>
                        </div>
                    </div>
                    <div className={css.enter}>
                        <button>Войти</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp;