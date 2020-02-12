import React from 'react'
import css from './mainPage.module.css'
import {Link} from "react-router-dom";

const MainPage = props =>{
    return(
        <div className={css.wrapper}>
            <div className={css.mainText}>
                <h3>Кто вы?!</h3>
            </div>
            
            <div className={css.btnWrapper}>
                <Link to={"/map"}>Арендатор</Link>
                <Link to={"/sign_up"}>Арендодатель</Link>
            </div>
        </div>
    )
}


export default MainPage;