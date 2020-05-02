import React from 'react'
import css from './preloader.module.css'

const Preloader = props => {
    return (
        <section className={css.wrapper}>
            <div className={css.spinner}>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
            </div>
        </section>
    )
}


export default Preloader;