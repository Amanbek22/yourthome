import React, {useEffect, useState} from 'react'
import css from './cards.module.css'
import Card from "../card/card";
import api from "../../api/api";
import { Link } from 'react-router-dom';

const Cards = props =>{
    const [apartments,setApartments] = useState([]);
    useEffect(()=>{
        api.getApartments({}).then(res=>{
            setApartments(res.data);
        })
    },[]);
    let apartment;
    if (apartments.length > 0) {
        let i = 0;
        apartment = apartments.reverse().map((item) => {
            i++;
            if (i >= 16){
                return null
            }
            console.log(item)
            return <Card
                id={item.id}
                key={i}
                img={item.apartment_image[0] ? item.apartment_image[0].image : null}
                city={item.location.city}
                street={item.location.street}
                price={item.price}
                rooms={item.room}
                floor={item.floor}
                area={item.area.total_area}
            />
        })
    }
    return(
        <div className={css.cardsWrapper}>
            <div >
                <div>
                    <h3 className={css.whereBuy}>Новые объявления</h3>
                    <div className={css.cardWrapper}>
                        {apartment}
                    </div>
                    <div className={css.moreWrapper}>
                        <button  className={css.more}>
                            <Link to="/map">
                                Просмотреть все
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cards;