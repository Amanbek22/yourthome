import React, {useEffect, useState} from 'react'
import css from './cards.module.css'
import Card from "../card/card";
import api from "../../api/api";

const Cards = props =>{
    const [apartments,setApartments] = useState([]);
    const [rev,setRev]  = useState([]);
    useEffect(()=>{
        api.getApartments().then(res=>{
            setApartments(res.data);
            setRev(res.data.reverse());
        })
    },[]);
    let apartment;
    let revApartment;
    if (apartments.length > 0) {
        let i = 0;
        apartment = apartments.map((item) => {
            i++;
            if (i >= 6){
                return null
            }
            return <Card id={item.id} key={i} city={item.location.city} street={item.location.street} price={item.price}/>
        })
        let a = 0;
        revApartment = rev.map((item) => {
            a++;
            if (a >= 6){
                return null
            }
            return <Card
                key={item.id}
                id={item.id}
                city={item.location.city}
                street={item.location.street}
                price={item.price}
            />
        })
    }

    return(
        <div className={css.cardsWrapper}>
            <div >
                <div>
                    <h3 className={css.whereBuy}>Приобрести квартиру на
                        вторичном рынке</h3>
                    <div className={css.cardWrapper}>
                        {apartment}
                    </div>
                    <div className={css.moreWrapper}>
                        <button className={css.more}>Просмотреть все</button>
                    </div>
                </div>
            </div>
            <div>
                <h3 className={css.whereBuy}>Приобрести квартиру в новостройках</h3>
                <div className={css.cardWrapper}>
                    {revApartment}
                </div>
                <div className={css.moreWrapper}>
                    <button className={css.more}>Просмотреть все</button>
                </div>
            </div>
        </div>
    )
}

export default Cards;