import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router-dom";
import api from "../../api/api";
import axios from "axios";
import css from './addPhote.module.css'
import {WithNotAuthRedirect} from "../../HOC/AuthRedirect";
import {compose} from "redux";
import FormPage3 from "../add_apartment/addApartmant";


const Add = props => {
    let id = props.match.params.id;
    const [img0, setImg0] = useState('');
    const [img, setImg] = useState('');
    const [img1, setImg1] = useState('');
    const [img2, setImg2] = useState('');
    const [img4, setImg4] = useState('');
    const [img5, setImg5] = useState('');
    const [img6, setImg6] = useState('');
    const [dis, setDis] = useState(false);
    const [block0, setBlock0] = useState('block')
    const [block, setBlock] = useState('block')
    const [block1, setBlock1] = useState('block')
    const [block2, setBlock2] = useState('block')
    const [block4, setBlock4] = useState('block')
    const [block5, setBlock5] = useState('block')
    const [block6, setBlock6] = useState('block')
    const [btn, setBtn] = useState(true)
    useEffect(() => {
        if(block0 === 'none' && block === 'none' && block1 === 'none' && block2 === 'none'){
            setBtn(false)
        }
    }, []);

    const addPhoto = (e) => {
        e.preventDefault();
        setDis(true)
        const preview_image = new FormData();
        let i = 1;
        img0.map(item => {
            preview_image.append(`image` + i, item)
            i++
        })
        preview_image.append('image101', img);
        preview_image.append('image105', img2);
        preview_image.append('image106', img1);
        preview_image.append('image107', img4);
        preview_image.append('image108', img5);
        preview_image.append('image117', img6);
        // api.addPhoto(id,preview_image).then(res => {
        //     props.history.push('/admin')
        // })
        // preview_image.forEach((value, key) => {
        //     preview_image[key] = value;
        // });
        props.setPictures(preview_image)
        props.onSubmit()
    }
    let width = window.innerWidth;
    return (
        <div className={css.wrapper}>
            <h2>Добавьте фотографии вашего жилья!</h2>
            <form onSubmit={addPhoto}>
                <div className={css.mainFileWrapper}>
                    <label className={css.inpWrapper}>
                        <input onChange={(e) => {
                            setBlock0('none')
                            const arr = Array.from(e.target.files)
                            setImg0(arr)
                            console.log(arr)
                        }}
                               accept="image/*" type="file" className={css.chooseFile} required
                               multiple={width <= 768}
                        />
                        <img style={{display: block0 === 'block' ? 'none' : 'block'}}
                             src="https://image.flaticon.com/icons/svg/190/190411.svg" alt="Done"/>
                        <img style={{display: block0}} src="https://image.flaticon.com/icons/svg/1665/1665731.svg"
                             alt="+"/>
                    </label>
                </div>
                <div className={css.filesWrapper}>
                    <div className={css.fileWrapper}>
                        <label className={css.inpWrapper}>
                            <input onChange={(e) => {
                                setBlock('none')
                                setImg(e.target.files[0])
                            }}
                                   accept="image/*" type="file" className={css.chooseFile}
                            />
                            <img style={{display: block === 'block' ? 'none' : 'block'}}
                                 src="https://image.flaticon.com/icons/svg/190/190411.svg" alt="Done"/>
                            <img style={{display: block}} src="https://image.flaticon.com/icons/svg/1665/1665731.svg"
                                 alt="+"/>
                        </label>
                    </div>
                    <div className={css.fileWrapper}>
                        <label className={css.inpWrapper}>
                            <input onChange={(e) => {
                                setBlock1('none')
                                setImg1(e.target.files[0])
                            }}
                                   accept="image/*" type="file" className={css.chooseFile}
                            />
                            <img style={{display: block1 === 'block' ? 'none' : 'block'}}
                                 src="https://image.flaticon.com/icons/svg/190/190411.svg" alt="Done"/>
                            <img style={{display: block1}} src="https://image.flaticon.com/icons/svg/1665/1665731.svg"
                                 alt="+"/>
                        </label>
                    </div>
                    <div className={css.fileWrapper}>
                        <label className={css.inpWrapper}>
                            <input onChange={(e) => {
                                setBlock2('none')
                                setImg2(e.target.files[0])
                            }}
                                   accept="image/*" type="file" className={css.chooseFile}
                            />
                            <img style={{display: block2 === 'block' ? 'none' : 'block'}}
                                 src="https://image.flaticon.com/icons/svg/190/190411.svg" alt="Done"/>
                            <img style={{display: block2}} src="https://image.flaticon.com/icons/svg/1665/1665731.svg"
                                 alt="+"/>
                        </label>
                    </div>
                    <div className={css.fileWrapper}>
                        <label className={css.inpWrapper}>
                            <input onChange={(e) => {
                                setBlock4('none')
                                setImg4(e.target.files[0])
                            }}
                                   accept="image/*" type="file" className={css.chooseFile}
                            />
                            <img style={{display: block4 === 'block' ? 'none' : 'block'}}
                                 src="https://image.flaticon.com/icons/svg/190/190411.svg" alt="Done"/>
                            <img style={{display: block4}} src="https://image.flaticon.com/icons/svg/1665/1665731.svg"
                                 alt="+"/>
                        </label>
                    </div>
                    <div className={css.fileWrapper}>
                        <label className={css.inpWrapper}>
                            <input onChange={(e) => {
                                setBlock5('none')
                                setImg5(e.target.files[0])
                            }}
                                   accept="image/*" type="file" className={css.chooseFile}
                            />
                            <img style={{display: block5 === 'block' ? 'none' : 'block'}}
                                 src="https://image.flaticon.com/icons/svg/190/190411.svg" alt="Done"/>
                            <img style={{display: block5}} src="https://image.flaticon.com/icons/svg/1665/1665731.svg"
                                 alt="+"/>
                        </label>
                    </div>
                    <div className={css.fileWrapper}>
                        <label className={css.inpWrapper}>
                            <input onChange={(e) => {
                                setBlock6('none')
                                setImg6(e.target.files[0])
                            }}
                                   accept="image/*" type="file" className={css.chooseFile}
                            />
                            <img style={{display: block6 === 'block' ? 'none' : 'block'}}
                                 src="https://image.flaticon.com/icons/svg/190/190411.svg" alt="Done"/>
                            <img style={{display: block6}} src="https://image.flaticon.com/icons/svg/1665/1665731.svg"
                                 alt="+"/>
                        </label>
                    </div>
                </div>
                <input disabled={dis} type="submit" value={"Отправить"}/>
            </form>
        </div>
    )
}


export default compose( withRouter)(Add)