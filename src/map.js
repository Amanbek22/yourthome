import React, {useEffect, useState} from 'react';
import css from './map.module.css'
import {YMaps, Map, Clusterer, Placemark} from 'react-yandex-maps';
import axios from 'axios'
import point from './point.json';

const mapState = {
    center: [41.204380, 74.766098],
    zoom: 7,
    behaviors: ['default', 'scrollZoom'],
};




const getPointOptions = () => {
    return {
        preset: 'islands#violetIcon',

    };
};

const ClustererCreate = () => {
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/todos/1').then(res => console.log(res))
    }, []);

    const [points,setPoints] = useState(point)
    console.log(points)

    const getPointData = index => {
        return {
            balloonContentBody: '<div style="width: 150px;height: 150px" } ><img width="100%" height="100%" src="https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"/> </div>',
            clusterCaption: 'placemark <strong>' + index + '</strong>',
            hintContent: 'Собственный значок метки',
        };
    };



    return (
        <div className={css.wrapper}>
            <YMaps
                query={{load: 'control.ZoomControl'}}>
                <Map

                    onClick={(e) => {
                        let coords = e.get("coords")
                        let items = {
                            type: "Feature",
                            geometry: {
                                type: "Point",
                                coordinates: e.get("coords")
                            }
                        }
                        let arr = {...points};
                        arr.features.push(items);
                        setPoints(arr)
                        axios.get(`https://geocode-maps.yandex.ru/1.x/?apikey=31c920f3-85fb-4a6d-b196-63d2573a2938
                    &format=json&geocode=${coords[0]},${coords[1]}&lang=en-US`)
                            .then(res=>console.log(res))
                    }}

                    width={100 + '%'}
                    height={82 + 'vh'}
                    state={mapState}
                >

                    <Clusterer
                        options={{
                            preset: 'islands#invertedVioletClusterIcons',
                            groupByCoordinates: false,
                            clusterDisableClickZoom: false,
                            clusterHideIconOnBalloonOpen: true,
                            geoObjectHideIconOnBalloonOpen: false,
                        }}
                        properties={{
                            iconContent: 'Я тащусь',
                            hintContent: 'Ну давай уже тащи',
                        }}
                    >
                        {points.features.map((coordinates) =>
                            <Placemark
                                key={Math.random()}
                                geometry={coordinates.geometry}
                                modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                                properties={getPointData(coordinates.id) }
                                options={getPointOptions()}
                                // options={{
                                //     iconLayout: 'default#image',
                                //     iconImageHref: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
                                //     iconImageSize: [30, 42],
                                //     iconImageOffset: [-3, -42]
                                // }}
                            >
                            </Placemark>
                        )}
                    </Clusterer>
                </Map>
            </YMaps>
            <div>
                {
                    points.features.map(item => {
                        return(
                            <div>
                                {item.name}
                            </div>
                        )
                    })
                }
            </div>
        </div>

    )
};

export default ClustererCreate;
