import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router-dom";
import api from "../../api/api";
import axios from "axios";
import css from './addPhote.module.css'


const Add = props => {
    let id = props.match.params.id;
    const [img0, setImg0] = useState('');
    const [img, setImg] = useState('');
    const [img1, setImg1] = useState('');
    const [img2, setImg2] = useState('');
    const [img4, setImg4] = useState(null);
    const [img5, setImg5] = useState(null);
    const [img6, setImg6] = useState(null);

    const [block0, setBlock0] = useState('block')
    const [block, setBlock] = useState('block')
    const [block1, setBlock1] = useState('block')
    const [block2, setBlock2] = useState('block')
    const [block4, setBlock4] = useState('block')
    const [block5, setBlock5] = useState('block')
    const [block6, setBlock6] = useState('block')
    const [btn, setBtn] = useState(true)
    useEffect(() => {
        api.getApartmentApi(id).then(res => {
            console.log(res)
        })
        if(block0 === 'none' && block === 'none' && block1 === 'none' && block2 === 'none'){
            setBtn(false)
        }
    }, []);

    const addPhoto = (e) => {
        e.preventDefault();
        const preview_image = new FormData();
        preview_image.append('image', img0, img0.name);
        preview_image.append('image', img, img.name);
        preview_image.append('image', img2, img2.name);
        preview_image.append('image', img1, img1.name);
        // preview_image.append('image', img4);
        // preview_image.append('image', img5);
        // preview_image.append('image', img6);
        // api.addPhoto(id,preview_image).then(res => {
        //     console.log(res)
        //     alert('Added')
        // })
        let token = JSON.parse(localStorage.getItem('newToken'));
        axios.post(`https://yourthomeneobis2.herokuapp.com/own-apartments/${id}/photo/`,
            preview_image,
            {
                headers: {
                    "Authorization": "Bearer " + token.access
                }
            }).then(res => {
            console.log(res)
            alert("Added!!!")
        })
    }
    return (
        <div className={css.wrapper}>
            <h2>Добавьте фотографии вашего жилья!</h2>
            <form onSubmit={addPhoto}>
                <div className={css.mainFileWrapper}>
                    <label className={css.inpWrapper}>
                        <input onChange={(e) => {
                            setBlock0('none')
                            setImg0(e.target.files[0])
                        }}
                               accept="image/*" type="file" className={css.chooseFile} required
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
                                   accept="image/*" type="file" className={css.chooseFile} required
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
                                   accept="image/*" type="file" className={css.chooseFile} required
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
                                   accept="image/*" type="file" className={css.chooseFile} required
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
                <input  type="submit" value={"Отправить"}/>
            </form>
        </div>
    )
}


const AddPhoto = withRouter(Add);

export default AddPhoto;