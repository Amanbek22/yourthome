import axios from "axios";


const http = axios.create({
    baseURL: "https://yourthomeneobis2.herokuapp.com"
});
export default {
    getApartments: (city,rooms,floor,priceFrom,priceTo,apartmentType,internet,furniture) => http.get(`/apartments/?location__region=${!city?'':city}&location__city=&type=&room=${!rooms?'':rooms}&floor=${!floor?'':floor}&construction_type=${!apartmentType?'':apartmentType}&state=&detail__internet=${!internet?'':internet}&detail__furniture=${!furniture?'':furniture}&min_price=${!priceFrom?'':priceFrom}&max_price=${!priceTo?'':priceTo}&currency=&arrival_date=&departure_date=`),
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
    }
};
