import React, {useEffect, useState} from 'react';
import css from './deteils.module.css'
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
 import api from "../../api/api";


const DeteilsPage = props => {
    const [apartment, setApartment] = useState({});
    const [address, setAddress] = useState({});
    useEffect(() => {
        api.getApartmentApi(props.match.params.id)
            .then(res => {
                setApartment(res.data)
                setAddress(res.data.address)
                console.log(res.data)
            })
    }, [])
    let area = {...apartment.area}
    let phone = {...apartment.contact}
    console.log(apartment)
    return (
        <div className={css.wrapper}>
            <div className={css.slider_block}>
                <Carousel
                    autoPlay
                    showIndicators={false}
                    infiniteLoop={true}
                    width={`90%`}
                    swipeable={true}
                >
                    <div>
                        <img
                            src="https://img.freepik.com/free-vector/vector-illustration-cartoon-interior-orange-home-room-living-room-with-two-soft-armchairs_1441-399.jpg?size=626&ext=jpg"/>
                    </div>
                    <div>
                        <img
                            src="https://media.gettyimages.com/photos/laptop-on-coffee-table-in-a-modern-living-room-of-an-old-country-picture-id900217718?s=612x612"/>
                    </div>
                    <div>
                        <img
                            src="https://yourthomeneobis2.herokuapp.com/media/photos/1a4da06bcdf207407ef4767711eeb20e.jpg"/>
                    </div>
                </Carousel>
            </div>
            <div className={css.moreInfoBlock}>
                <div className={css.priceBlock}>
                    <div>{apartment.description}</div> <div>{apartment.price}$</div>
                </div>
                <div className={css.information}>
                    <div>Информация</div>
                    <div className={css.listInfo}>
                        <div>Камнат: {apartment.room}</div>
                        <div>Общая площадь: {area.total_area}m<sup>2</sup></div>
                        <div>Этаж: {apartment.floor}</div>
                        <div>Тип строение: {apartment.construction_type}</div>
                        <div>Этажность дома: {apartment.floor}</div>
                        <div>Планировка: {apartment.floor}</div>
                        <div>Тип ремонта: {apartment.construction_type}</div> <div></div>
                        <div>Меблирована: {apartment.construction_type}</div> <div></div>
                    </div>
                    <div className={css.listNear}>
                        <div>
                            <div>Рядом есть:</div>
                            <ul>
                                <li>Рестораны кафе</li>
                                <li>Детский сад</li>
                                <li>Стоянка</li>
                                <li>Остановки</li>
                                <li>Супермаркет</li>
                                <li>магазины</li>
                                <li>Парк</li>
                                <li>Зелёная зона</li>
                                <li>Больница</li>
                            </ul>
                        </div>
                        <div>
                            <div>В квартире есть:</div>
                            <ul>
                                <li>Рестораны кафе</li>
                                <li>Детский сад</li>
                                <li>Стоянка</li>
                                <li>Остановки</li>
                                <li>Супермаркет</li>
                                <li>магазины</li>
                                <li>Парк</li>
                                <li>Зелёная зона</li>
                                <li>Больница</li>
                            </ul>
                        </div>
                    </div>
                    <div className={css.descriptionWrapper}>
                        <div>Описание</div>
                        <div>
                            В Новом Роскошном Жилом Комплексе!!!
                            Продается 2- комнатная квартира с общей площадью 70 м2.

                            Преимущества Ж.К:
                            - Качественная Российская входная - металлическая дверь;
                            - Пластиковые рамы imzo premium;
                            - Счётчики;
                            - Видео наблюдение 24/7
                            - Детские площадки во дворе Ж.К
                            - Охраняемая территория.

                            Сдача Объекта август 2020 Год!!!
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        apartment: state.apartment
    }
}
const DeteilsPageContainer = connect(mapStateToProps, {})(DeteilsPage)


let WithRouterDeteilsPage = withRouter(DeteilsPageContainer);


export default WithRouterDeteilsPage;