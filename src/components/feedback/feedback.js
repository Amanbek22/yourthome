import React from 'react'
import css from './feedback.module.css'


const Feedback = props => {
    return (
        <div className={css.mainWrapper}>
            <div className={css.wrapper}>
                <div>
                    <h2>О проекте</h2>
                    <div style={{marginTop: '20px'}}>
                        YourtHome.kg был запущен в 2020 году и с тех пор стал одним из
                        крупнейших порталов по аренде недвижемости. Доступ к объявлениям
                        находится в открытом доступе.
                    </div>
                </div>
                <div className={css.contacts}>
                    <div>Контакты</div>
                    <a href={'#'} style={{color: 'blue'}}>neobis@neobis.kg</a>
                    <div>Номер: +996708626798</div>
                </div>
            </div>
            <div style={{textAlign: 'center', marginTop: '50px'}}>
                <h2 style={{marginBottom: '50px'}}>Баг или опечатка?</h2>
                Если у вас есть идеи, как улучшить содержимое сайта, пожалуйста, напишите в нашу почту.
            </div>
        </div>
    )
}


export default Feedback