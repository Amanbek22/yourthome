import React, {useEffect, useState} from 'react'
import css from './cards.module.css'
import Card from "../card/card";
import api from "../../api/api";
import Preloader from "../preloader/Preloader";
import axios from "axios";

const Cards = props => {

    const [apartments, setApartments] = useState([]);
    const [pending, setPending] = useState(false)
    const [apartmentsPending, setApartmentsPending] = useState(false)
    const [next, setNext] = useState(null)
    console.log(apartments)
    console.log(apartmentsPending)
    console.log(next)
    useEffect(() => {
        api.getFrontApartments().then(res => {
            console.log(res.data)
            setNext(`${res.data.next}`)
            setApartments([...apartments, ...res.data.results]);
            setPending(true)
        })

    }, []);
    useEffect(() => {
        window.addEventListener('scroll', trackScrolling);
        return () => {
            window.removeEventListener('scroll', trackScrolling);
        }
    }, [next, apartments, apartmentsPending])


    const nextPages = () => {
        axios.get(next).then(res => {
                setNext(res.data.next)
                if(res.data.results){
                    setApartments([...apartments, ...res.data.results]);
                }
                setApartmentsPending(false)
            },
            error => {
                setApartmentsPending(false)
                console.log(error)
            })
    }
    const isBottom = (el) => {
        return el.getBoundingClientRect().bottom - 1 <= window.innerHeight;
    }

    function trackScrolling() {
        const wrappedElement = document.getElementById('root');
        if (isBottom(wrappedElement)) {
            if (!apartmentsPending) {
                if(!next) {
                    setApartmentsPending(true)
                    nextPages()
                }
            }
            // document.removeEventListener('scroll', trackScrolling);
        }
    };

    let apartment;
    if (apartments.length > 0) {
        apartment = apartments.map((item) => {
            return <Card
                id={item.id}
                key={item.id}
                img={item.preview_photo.image}
                city={item.location.city}
                street={item.location.street}
                houseNumber={item.location.house_number}
                price={ item.currency === '$' ? item.price : item.another_price}
                priceSom={item.currency === '$' ? item.another_price : item.price}
                // rooms={item.room}
                // floor={item.floor}
                // area={item.area.total_area}
                title={item.title}
                userName={item.owner}
            />
        })
    }

    if (!pending) {
        return <Preloader/>
    }

    return (
        <div className={css.cardsWrapper}>
            <div>
                <div>
                    {/*<h3 className={css.whereBuy}>Новые объявления</h3>*/}
                    <div className={css.cardWrapper}>
                        {apartment}
                    </div>

                    {
                        !apartmentsPending ? '' : <Preloader/>
                    }
                    {/*<div className={css.moreWrapper}>*/}
                    {/*<button  className={css.more} onClick={()=> nextPages()}>*/}
                    {/*Загрузить ещё*/}
                    {/*</button>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    )
}

export default Cards;