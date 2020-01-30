import React, {useEffect, useState} from 'react';
import {YMaps, Map, Clusterer, Placemark, ObjectManager, ZoomControl} from 'react-yandex-maps';
import axios from 'axios'
import point from './point.json';

const mapState = {
    center: [41.204380, 74.766098],
    zoom: 7,
    behaviors: ['default', 'scrollZoom'],
};


const getPointData = index => {
    return {
        balloonContentBody: 'placemark <strong>balloon ' + index + '</strong>',
        clusterCaption: 'placemark <strong>' + index + '</strong>',
    };
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
    return (
        <YMaps query={{load: 'control.ZoomControl'}}>
            <Map
                onClick={(e) => {
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
                }}
                width={70 + '%'}
                height={70 + 'vh'}
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
                >
                    {points.features.map((coordinates) =>
                        <Placemark
                            //onClick={() =>console.log(coordinates.geometry.coordinates)}
                            key={Math.random()}
                            geometry={coordinates.geometry}
                            modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                            properties={getPointData(coordinates.id)}
                            options={getPointOptions()}
                        />
                    )}
                </Clusterer>
            </Map>
        </YMaps>)
};

export default ClustererCreate;
