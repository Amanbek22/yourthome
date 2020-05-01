import axios from "axios";


const http = axios.create({
    baseURL: "https://yourthomemaster.herokuapp.com"
});

const dateFounder = data => {
    let year, month, day;
    year = data.getFullYear();
    month = data.getMonth() + 1;
    day = data.getDate();
    if (month <= 9) {
        month = '0' + month
    }
    if (day <= 9) {
        day = '0' + day
    }
    return year + '-' + month + '-' + day;
}

export default {
    getApartments: (data) => {
        let {
            region, city, dateFrom,
            dateTo, rooms, floor,
            priceFrom, priceTo,
            apartmentType, details, construction_type,
            atHome,nearby_objects
        } = data;
        let objects_in_apartment = `${atHome ? atHome.map(item => item.value) : ''}`
        let nearbyObjects = `${nearby_objects ? nearby_objects.map(item => item.value) : ''}`
        let fromDate = '', toDate = '';
        if (dateFrom !== undefined && dateFrom !== null && dateFrom !== 'Invalid date' && dateFrom !== '') {
            fromDate = dateFounder(dateFrom);
        }
        if (dateTo !== undefined && dateTo !== null && dateTo !== 'Invalid date' && dateTo !== '') {
            toDate = dateFounder(dateTo)
        }
        return http.get(`/apartments/?location__region=${!region ? '' : region}&location__city=${!city ? '' : city}&location__district=${''}&type=${!construction_type ? '' : construction_type}&room=${!rooms ? '' : rooms}&floor=${!floor ? '' : floor}&construction_type=${!apartmentType ? '' : apartmentType}&state=${''}&min_price=${!priceFrom ? '' : priceFrom}&max_price=${!priceTo ? '' : priceTo}&currency=${''}&arrival_date=${fromDate}&departure_date=${toDate}&min_area=${''}&max_area=${''}&rental_period=${''}&objects_in_apartment=${!objects_in_apartment ? '' : objects_in_apartment}&nearby_objects=${!nearbyObjects ? '' : nearbyObjects}`)
        // &detail__internet=${details ? details.includes('internet') ? true : '' : ''}&detail__furniture=${details ? details.includes('furniture') ? true : '' : ''}&detail__heat=${details ? details.includes('heat') ? true : '' : ''}&detail__gas=${details ? details.includes('gas') ? true : '' : ''}&detail__phone=${details ? details.includes('phone') ? true : '' : ''}&detail__parking=${details ? details.includes('parking') ? true : '' : ''}&detail__elevator=${details ? details.includes('elevator') ? true : '' : ''}&detail__security=${details ? details.includes('security') ? true : '' : ''}`)
    },
    getApartmentApi: id => http.get(`/apartment/${id}`),
    getOwnApartmentApi: id => {
        let token = JSON.parse(localStorage.getItem('newToken'));
        return http.get(`/apartment/${id}`,{
            headers: {
                "Authorization": "Bearer " + token.access
            }
        })
    },
    registration: data => http.post("/registration/", data),
    signIn: data => http.post("/api/token/", data),
    signInWithRefresh: () => {
        let token = JSON.parse(localStorage.getItem('userData'));
        return http.post('/api/token/refresh/', {
            "refresh": token.refresh
        })
    },
    add: data => {
        let token = JSON.parse(localStorage.getItem('newToken'));
        return http.post(`/add/`, data, {
            headers: {
                "Authorization": "Bearer " + token.access
            }
        })
    },
    deleteApartment: data => {
        let token = JSON.parse(localStorage.getItem('newToken'));
        return http.delete(`/apartment/${data}`, {
            headers: {
                "Authorization": "Bearer " + token.access
            }
        })
    },
    getOwnApartments: data => {
        let token = JSON.parse(localStorage.getItem('newToken'));
        return http.get('/own-apartments/', {
            headers: {
                "Authorization": "Bearer " + token.access
            }
        })
    },
    sendComment: (id, data) => {
        let token = JSON.parse(localStorage.getItem('newToken'));
        return http.post(`/apartment/${id}/comments/`, {'name_of_publication': data, 'text_of_publication': data}, {
            headers: {
                "Authorization": "Bearer " + token.access
            }
        })
    },
    getOrders: (id) => {
        let token = JSON.parse(localStorage.getItem('newToken'));
        return http.get(`/own-apartments/${id}/booking/`, {
            headers: {
                "Authorization": "Bearer " + token.access
            }
        })
    },
    creatOrder: (id, arrival_date, departure_date) => {
        let token = JSON.parse(localStorage.getItem('newToken'));
        let fromDate = '', toDate = '';
        if (arrival_date !== undefined && arrival_date !== null && arrival_date !== 'Invalid date' && arrival_date !== '') {
            fromDate = dateFounder(arrival_date)
        }
        if (departure_date !== undefined && departure_date !== null && departure_date !== 'Invalid date' && departure_date !== '') {
            toDate = dateFounder(departure_date)
        }
        return http.post(`/own-apartments/${id}/booking/`, {'arrival_date': fromDate, 'departure_date': toDate}, {
            headers: {
                "Authorization": "Bearer " + token.access
            }
        })
    },
    delOrder: (id, orderId) => {
        let token = JSON.parse(localStorage.getItem('newToken'));
        return http.delete(`/own-apartments/${id}/booking/${orderId}`, {
            headers: {
                "Authorization": "Bearer " + token.access
            }
        })
    },
    addPhoto: (id, preview_image) => {
        let token = JSON.parse(localStorage.getItem('newToken'));
        return http.post(`/own-apartments/${id}/upload/`, preview_image, {
            headers: {
                "Authorization": "Bearer " + token.access
            }
        })
    },
    deletePhoto: (id, photoId) => {
        let token = JSON.parse(localStorage.getItem('newToken'));
        return http.delete(`/own-apartments/${id}/upload/${photoId}`, {
            headers: {
                "Authorization": "Bearer " + token.access
            }
        })
    },
    changeApartment: (id, data) => {
        let token = JSON.parse(localStorage.getItem('newToken'));
        return http.patch(`/apartment/${id}`, data, {
            headers: {
                "Authorization": "Bearer " + token.access,
            }
        })
    },
    nearApartment: (id) => http.get(`/near/${id}`),
    getConstructionType: () => http.get(`/front-constructions/`),
    getTypes: () => http.get(`/front-types/`),
    getRegions: () => http.get(`/front-regions/`),
    getSeries: () => http.get(`/front-series/`),
    getState: () => http.get(`/front-states/`),
    getCurrency: () => http.get(`/front-currency/`),
};
