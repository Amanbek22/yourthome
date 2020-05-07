import React from 'react'
import css from './aboute.module.css'


const About = props => {
    return (
        <div className={css.wrapper}>
            <div className={css.title}>
                <h2>О нас</h2>
            </div>
            <div className={css.contentWrapper}>
                <div className={css.textWrapper}>
                    YourtHome—online площадка для размещения, поиска и аренды жилья по всей территории Кыргызской
                    Республики. Пользователи YourtHome имеют возможность сдавать свою квартиру/частный дом
                    заинтересованным потенциальным арендаторам.
                    Ключевой целью YourtHome является предоставить удобную в использовании онлайн площадку для
                    установления контакта между двумя основными пользователями:
                    арендатором
                    арендодателем
                </div>
                <div className={css.imageWrapper}>
                    <img src="https://t8f8b3g9.stackpathcdn.com/wp-content/uploads/2019/07/communication-improves-as-part-of-benefits-of-working-as-a-team-1.png" alt="Picture"/>
                </div>
            </div>
            <div>
                <div className={css.title}>
                    <div>Компании с которыми мы сотрудничаем</div>
                </div>
                <div className={css.logoWrapper}>
                    <div className={css.logos}>
                        <img src="https://dwglogo.com/wp-content/uploads/2016/03/1920px_Coca_Cola_logo.png" alt="coca cola"/>
                    </div>
                    <div className={css.logos}>
                        <img src="https://1130090172.rsc.cdn77.org/data/images/full/13862/toyota.jpg" alt="coca cola"/>
                    </div>
                    <div className={css.logos}>
                        <img src="https://images.spasibovsem.ru/catalog/original/operator-sotovoj-svyazi-bilajn-tula-otzyvy-1469559295.png" alt="coca cola"/>
                    </div>

                    <div className={css.logos}>
                        <img src="https://turbologo.ru/blog/wp-content/uploads/2020/02/Yandex-logo-678x381.png" alt="coca cola"/>
                    </div>
                    <div className={css.logos}>
                        <img src="https://pngimg.com/uploads/google/google_PNG19638.png" alt="coca cola"/>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default About;