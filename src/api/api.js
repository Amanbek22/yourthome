import axios from "axios";


const http = axios.create({
    baseURL: "https://yourthomeneobis2.herokuapp.com"
});
export default {
    getApartments: () => http.get(`/apartments/?location__region=1sh&location__city=2&type=1&room=3&floor=4&construction_type=2&state=2&detail__internet=2&detail__furniture=1`),
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
};
