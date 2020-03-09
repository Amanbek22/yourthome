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
                    {apartment.price} Сом/
                    <small>mo</small>
                    <br/>

                </div>
                <div>
                    INFORMATION, FEEDBACK AND OTHER INFO
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