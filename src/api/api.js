import axios from "axios";


const http = axios.create({
    baseURL: "https://yourthomeneobis2.herokuapp.com"
});

export default {
    getApartmentApi: (id) => http.get(`/apartment/${id}`),
    registration: data => http.post("/registration/", data),
    signIn: data => http.post("/login/", data),
    add: data => http.post(`/add`,data,{
        withCredentials: true,
        headers: {"Authorization": "Bearer " + localStorage.getItem('token')}
    })
};