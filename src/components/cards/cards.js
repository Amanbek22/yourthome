import React, {useEffect, useState} from 'react'
import css from './cards.module.css'
import Card from "../card/card";
import api from "../../api/api";
import { Link } from 'react-router-dom';
import Preloader from "../preloader/Preloader";

const Cards = props =>{
    const [apartments,setApartments] = useState([]);
    const [pending, setPending] = useState(false)
    useEffect(()=>{
        api.getApartments({}).then(res=>{
            setApartments(res.data.reverse());
            setPending(true)
        })
    },[]);
    let apartment;
    if (apartments.length > 0) {
        let i = 0;

        apartment = apartments.map((item) => {
            i++;
            if (i >= 16){
                return null
            }
            return <Card
                id={item.id}
                key={i}
                img={item.apartment_image[0] ? item.apartment_image[0].image : null}
                city={item.location.city}
                street={item.location.street}
                houseNumber={item.location.house_number}
                price={item.price}
                rooms={item.room}
                floor={item.floor}
                area={item.area.total_area}
                title={item.title}
                userName={item.owner}
            />
        })
    }
    if(!pending){
        return <Preloader />
    }
    return(
        <div className={css.cardsWrapper}>
            <div >
                <div>
                    {/*<h3 className={css.whereBuy}>Новые объявления</h3>*/}
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