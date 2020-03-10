import React, {useState} from 'react';
//import {Link} from "react-router-dom";
import css from './signup.module.css'
import axios from "axios";
import api from "../../api/api";

const SignUp = props => {
    const [username,setUserName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [phone,setPhone] = useState("");
    const [name,setName] = useState("");
    const [surname,setSurname] = useState("");
    const signUp = () =>{

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
                    alert("You did it")
                    console.log(response)
                    localStorage.setItem("userData", JSON.stringify(response.data));
                    window.location.href="/add-apartment"
                },
                (error)=>{
                    alert("God daamn you couldn't signUp")
                }

            )
    }
    return (
        <div className={css.mainWrapper}>
            <div className={css.wrapper}>
                <h3>Регистрация</h3>
                <div>
                    <input value={username} onChange={e=>setUserName(e.target.value)} placeholder={"Логин"} type="text"/>
                    <input value={name} onChange={e=>setName(e.target.value)} placeholder={"Имя*"} type="text"/>
                    <input value={surname} onChange={e=>setSurname(e.target.value)} placeholder={"Фамилия*"} type="text"/>
                    <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder={"Телефон*"} type="text"/>
                    <input required value={email} onChange={e=>setEmail(e.target.value)} placeholder={"Email"} type="email"/>
                    <input value={password} onChange={e=>setPassword(e.target.value)} placeholder={"Пароль*"} type="password"/>
                    <div className={css.remember}>
                        <div>
                            <input  name={"check"} type="checkbox"/>
                            <span >Принимаю политику и Условия пользования сайтом</span>
                        </div>
                    </div>
                    <div className={css.enter}>
                        <button onClick={signUp}>Регистрация</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;