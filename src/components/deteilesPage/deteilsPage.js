import React, {useEffect, useState} from 'react';
import css from './deteils.module.css'
import {connect} from "react-redux";
import axios from 'axios';

const DeteilsPage = props =>{
    const [apartment,setApartment] = useState({})
    const [address,setAddress] = useState({})
    console.log(apartment.address)
    useEffect(()=>{
        axios.get(`https://yourthomeneobis2.herokuapp.com/apartment/${props.apartment.apartment}`)
            .then(res=>{
                setApartment(res.data)
                setAddress(res.data.address)
                console.log(res.data)
            })
    },[])
    return (
        <div className={css.wrapper}>
            <div>Описание: {apartment.description}</div>
            <div>Количество комнат: {apartment.room}</div>
            <div>Этаж: {apartment.floor}</div>
            <div>Цена: {apartment.price}</div>
            <div>Город: {address.city}</div>
        </div>
    )
}


const mapStateToProps = state =>{
    return{
        apartment: state.apartment
    }
}

const DeteilsPageContainer = connect(mapStateToProps)(DeteilsPage)

export  default DeteilsPageContainer;