import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router-dom";
import css from './addPhote.module.css'
import {compose} from "redux";
import plus from '../../img/plus.png'
import done from '../../img/done.png'
import deleteImg from '../../img/del.png'

export const FileUpdate = props => {
    let {setimg, image} = props;
    const [block, setBlock] = useState('block')
    const [url, setUrl] = useState('')
    const [hovered, setHovered] = useState(false)
    const [name, setName] = useState('')
    const [checkName, setCheckName] = useState('')
    useEffect(()=>{
        if(image) {
            setUrl(image.image)
            setBlock('none')
            setName(image.image)
        }
    }, [image])
    return (
        <div className={css.fileWrapper}
             style={{
                 background: `url(${url}) center center no-repeat`,
                 backgroundSize: url.length > 0 ? 'cover' : null
             }}>
            <label  className={css.inpWrapper}>
                <input
                    onChange={(e) => {
                        setBlock('none')
                        const arr = Array.from(e.target.files)
                        setimg([...props.img, ...arr])
                        let reader = new FileReader();
                        if (e.target.files.length > 0) {
                            if (checkName === '') {
                                reader.readAsDataURL(e.target.files[0])
                                setName(e.target.files[0].name)
                            } else {
                                if (e.target.files[0].name === checkName) {
                                    setCheckName('')
                                    return 0
                                } else {
                                    reader.readAsDataURL(e.target.files[0])
                                    setName(e.target.files[0].name)
                                }
                            }
                        } else {
                            setBlock('block')
                        }
                        reader.onload = (e) => setUrl(e.target.result)
                    }}
                    accept="image/*" type="file" className={css.chooseFile}

                />
                <img style={{display: block}}
                     src={plus}
                     alt="+"/>
            </label>
            <img style={{display: block === 'block' ? 'none' : 'block'}}
                 src={hovered ? deleteImg : done}
                 onMouseOver={() => setHovered(!hovered)}
                 onMouseOut={() => setHovered(!hovered)}
                 onClick={() => {
                     let images = [...props.img]
                     let arr = images.filter(item => {
                         return item.name || item.image !== name
                     })
                     setCheckName(name)
                     setUrl('')
                     setBlock('block')
                     setimg(arr)
                 }}
                 alt="Done"/>
        </div>
    )
}

const Add = props => {
    let id = props.match.params.id;
    const [dis, setDis] = useState(false);
    const addPhoto = (e) => {
        e.preventDefault();
        const preview_image = new FormData();
        let i = 1;
        if (props.img.length > 0) {
            props.img.map(item => {
                preview_image.append(`image` + i, item)
                i++
            })
        }
        // preview_image.forEach((value, key) => {
        //     preview_image[key] = value;
        // });
        props.setPictures(preview_image)
        props.onSubmit()
    }
    let width = window.innerWidth;
    return (
        <div className={css.wrapper}>
            {/*<h2>Добавьте фотографии вашего жилья!</h2>*/}
            <form onSubmit={addPhoto}>
                <div className={css.files}>
                    <FileUpdate multiple={width <= 768} required img={props.img} setimg={props.setImg}/>
                    <FileUpdate img={props.img} setimg={props.setImg}/>
                    <FileUpdate img={props.img} setimg={props.setImg}/>
                    <FileUpdate img={props.img} setimg={props.setImg}/>
                    <FileUpdate img={props.img} setimg={props.setImg}/>
                </div>
                <div>Загрузите хотя-бы одну фотографию</div>
                <div className={css.files}>
                    <FileUpdate img={props.img} setimg={props.setImg}/>
                    <FileUpdate img={props.img} setimg={props.setImg}/>
                    <FileUpdate img={props.img} setimg={props.setImg}/>
                    <FileUpdate img={props.img} setimg={props.setImg}/>
                    <FileUpdate img={props.img} setimg={props.setImg}/>
                </div>
                <div></div>
                <div></div>
                <div className={css.btns}>
                    <input onClick={() => props.previousPage()} type="button" value={"Назад"}/>
                    <input disabled={dis} type="submit" value={"Далее"}/>
                </div>
            </form>
        </div>
    )
}


export default compose(withRouter)(Add)