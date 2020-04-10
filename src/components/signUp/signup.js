import React, {useState} from 'react';
//import {Link} from "react-router-dom";
import css from './signup.module.css'
import axios from "axios";
import api from "../../api/api";
import {Redirect, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {WithAuthRedirect} from "../../HOC/AuthRedirect";

const SignUp = props => {
    console.log(props)
    const [username,setUserName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [phone,setPhone] = useState("");
    const [name,setName] = useState("");
    const [surname,setSurname] = useState("");
    const signUp = (e) =>{
        e.preventDefault()
        api.registration({
            'email': email,
            'username': username,
            'password': password,
            'phone': phone,
            'name': name,
            'surname': surname
        })
            .then(
                (response)=>{
                    console.log(response);
                    if (response.status === 201) {
                        alert('Поздровляем вас, вы зарегистрировались и можете войти в систему!')
                        props.history.push('/sign-in')
                    }else {
                        return 0
                    }
                    // localStorage.setItem("userData", JSON.stringify(response.data));
                    // window.location.href="/sign-in"
                },
                (error)=>{
                    console.log(error)
                    alert("Попробуйте заново зарегитрироватся! C другим логином")
                }
            )
    }
    return (
        <div className={css.mainWrapper}>
            <div className={css.wrapper}>
                <h3>Регистрация</h3>
                <form onSubmit={signUp}>
                    <input required value={username} onChange={e=>setUserName(e.target.value)} placeholder={"Логин"} type="text"/>
                    <input required value={name} onChange={e=>setName(e.target.value)} placeholder={"Имя*"} type="text"/>
                    <input required value={surname} onChange={e=>setSurname(e.target.value)} placeholder={"Фамилия*"} type="text"/>
                    <input required value={phone} onChange={e=>setPhone(e.target.value)} placeholder={"Телефон*"} type="text"/>
                    <input required value={email} onChange={e=>setEmail(e.target.value)} placeholder={"Email"} type="email"/>
                    <input required value={password} onChange={e=>setPassword(e.target.value)} placeholder={"Пароль*"} type="password"/>
                    <div className={css.remember}>
                        <div>
                            <input   name={"check"} type="checkbox"/>
                            <span >Принимаю политику и Условия пользования сайтом</span>
                        </div>
                    </div>
                    <div className={css.enter}>
                        <input type={'submit'} value={'Регистрация'}/>
                    </div>
                </form>
            </div>
        </div>
    )
}



const AuthRedirectComponent = WithAuthRedirect(SignUp)

export default withRouter(AuthRedirectComponent);