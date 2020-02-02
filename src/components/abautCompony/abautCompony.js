import React from 'react';
import css from './abautCompony.module.css'
import abautImg from '../../img/abautus.png';

const Abaut = props => {
    return (
        <div className={css.wrapper}>
            <div className={css.textWrapper}>
                <h3>Немного о проекте </h3>
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Neque convallis a cras
                    semper auctor neque. In cursus turpis massa tincidunt dui ut ornare lectus sit.
                    Pellentesque massa placerat duis ultricies lacus sed turpis. Eget nullam non nisi
                    est sit amet facilisis magna. Euismod elementum nisi quis eleifend quam adipiscing
                    vitae proin. Scelerisque felis imperdiet proin fermentum leo vel orci porta non.
                    Neque convallis a cras semper auctor neque vitae. Varius quam quisque id diam vel.
                    Nibh tellus molestie nunc non. Orci porta non pulvinar neque laoreet suspendisse
                    interdum consectetur. Augue lacus viverra vitae congue eu consequat ac felis donec.
                    Facilisis gravida neque convallis a cras semper auctor neque vitae.
                </div>
            </div>
            <div className={css.imgWrapper}>
                <img src={abautImg} alt="IMG"/>
            </div>
        </div>
    )
}
export default Abaut;