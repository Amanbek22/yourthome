import React from 'react';
import { YMaps, Map, Clusterer, Placemark } from 'react-yandex-maps';

import points from './point.json';

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

const ClustererCreate = () =>
    <YMaps>
        <Map
            onClick={(e)=>{
                alert(e.get("coords"))
            }}
            width={100 + '%'}
            height={100 + 'vh'}
            state={mapState}
        >
            <Clusterer
                options={{
                    preset: 'islands#invertedVioletClusterIcons',
                    groupByCoordinates: false,
                    clusterDisableClickZoom: true,
                    clusterHideIconOnBalloonOpen: false,
                    geoObjectHideIconOnBalloonOpen: false,
                }}
            >
                {points.features.map((coordinates) =>
                    <Placemark
                        onClick={() =>alert(coordinates.geometry.coordinates)}
                        key={coordinates.id}
                        geometry={ coordinates.geometry }
                        properties={getPointData(coordinates.id)}
                        options={getPointOptions()}
                    />
                )}
            </Clusterer>
        </Map>
    </YMaps>;

export default ClustererCreate;
