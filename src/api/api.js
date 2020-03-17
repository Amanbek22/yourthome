import axios from "axios";


const http = axios.create({
    baseURL: "https://yourthomeneobis2.herokuapp.com"
});
export default {
    getApartments: ()=>http.get(`/apartments`),
    getApartmentApi: (id) => http.get(`/apartment/${id}`),
    registration: data => http.post("/registration/", data),
    signIn: data => http.post("/login/", data),
    add: data => {
        let token = JSON.parse(localStorage.getItem('userData'));
        return http.post(`/add/`, data, {
            withCredentials: true,
            headers: {"Authorization": "Bearer " + token.token}
        })
    }
};