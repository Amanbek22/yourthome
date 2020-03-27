import axios from "axios";


const http = axios.create({
    baseURL: "https://yourthomeneobis2.herokuapp.com"
});
export default {
    getApartments: (city,rooms,floor,priceFrom,priceTo,apartmentType,internet,furniture,dateFrom, dateTo,gas,phone,elevator, security,parcking) => {
        let year,month,day,yearTo,monthTo,dayTo;
        let fromDate = '';
        let toDate = '';
        if(dateFrom !== undefined && dateFrom !== null && dateFrom !== 'Invalid date' && dateFrom !== ''){
            year = dateFrom.getFullYear();
            month = dateFrom.getMonth() + 1;
            day = dateFrom.getDate();
            if(month <= 9) {
                month = '0' + month
            }
            if(day <= 9) {
                day = '0' + day
            }
            fromDate = year + '-' + month + '-' + day;
        }
        if(dateTo !== undefined && dateTo!== null && dateTo !== 'Invalid date' && dateTo !== '' ){
            yearTo = dateTo.getFullYear();
            monthTo = dateTo.getMonth() + 1;
            dayTo = dateTo.getDate();
            if(monthTo <= 9) {
                monthTo = '0' + monthTo
            }
            if(dayTo <= 9) {
                dayTo = '0' + dayTo
            }
            toDate = yearTo + '-' + monthTo + '-' + dayTo;
        }
        return http.get(`/apartments/?location__region=${!city?'':city}&location__city=${''}&location__district=${''}&type=${''}&room=${!rooms?'':rooms}&floor=${!floor?'': floor}&construction_type=${!apartmentType?'':apartmentType}&state=${''}&min_price=${!priceFrom?'':priceFrom}&max_price=${!priceTo?'':priceTo}&currency=${''}&arrival_date=${fromDate}&departure_date=${toDate}&min_area=${''}&max_area=${''}&rental_period=${''}&detail__internet=${!internet?'':internet}&detail__furniture=${!furniture?'':furniture}&detail__heat=${''}&detail__gas=${!gas?'':gas}&detail__phone=${!phone?'':phone}&detail__parking=${!parcking?'':parcking}&detail__elevator=${!elevator?'':elevator}&detail__security=${!security?'':security}`)
    },
    getApartmentApi: (id) => http.get(`/apartment/${id}`),
    registration: data => http.post("/registration/", data),
    signIn: data => http.post("/api/token/", data),
    signInWithRefresh: () => {
        let token = JSON.parse(localStorage.getItem('userData'));
        return http.post('/api/token/refresh/',{
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
        return http.delete(`/apartment/${data}`,{
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
    sendComment: (id,data) => {
        let token = JSON.parse(localStorage.getItem('newToken'));
        return http.post(`/apartment/${id}/comments/`,{'name_of_publication': data,'text_of_publication': data},{
            headers: {
                "Authorization": "Bearer " + token.access
            }
        })
    },
    getOrders: (id)=> {
        let token = JSON.parse(localStorage.getItem('newToken'));
        return http.get(`/own-apartments/${id}/booking/`,{
            headers: {
                "Authorization": "Bearer " + token.access
            }
        })
    },
    creatOrder: (id,arrival_date,departure_date) => {
        let token = JSON.parse(localStorage.getItem('newToken'));
        let year,month,day,yearTo,monthTo,dayTo;
        let fromDate = '';
        let toDate = '';
        if(arrival_date !== undefined && arrival_date !== null && arrival_date !== 'Invalid date' && arrival_date !== ''){
            year = arrival_date.getFullYear();
            month = arrival_date.getMonth() + 1;
            day = arrival_date.getDate();
            if(month <= 9) {
                month = '0' + month
            }
            if(day <= 9) {
                day = '0' + day
            }
            fromDate = year + '-' + month + '-' + day;
        }
        if(departure_date !== undefined && departure_date!== null && departure_date !== 'Invalid date' && departure_date !== '' ){
            yearTo = departure_date.getFullYear();
            monthTo = departure_date.getMonth() + 1;
            dayTo = departure_date.getDate();
            if(monthTo <= 9) {
                monthTo = '0' + monthTo
            }
            if(dayTo <= 9) {
                dayTo = '0' + dayTo
            }
            toDate = yearTo + '-' + monthTo + '-' + dayTo;
        }
        return http.post(`/own-apartments/${id}/booking/`,{'arrival_date': fromDate,'departure_date': toDate},{
            headers: {
                "Authorization": "Bearer " + token.access
            }
        })
    },
    delOrder: (id,orderId) => {
        let token = JSON.parse(localStorage.getItem('newToken'));
        return http.delete(`/own-apartments/${id}/booking/${orderId}`,{
            headers: {
                "Authorization": "Bearer " + token.access
            }
        })
    }
};
