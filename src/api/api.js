import axios from "axios";


const http = axios.create({
    baseURL: "https://yourthomeneobis2.herokuapp.com"
});

export default {
    getApartmentApi: (id) => http.get(`/apartment/${id}`),
    registration: data => http.post("/registration/",data,{
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    }),
    // getHits: () => http.get("/product/hits/"),
    // postData: (url, data) =>
    //     http.post(${url}, data, {
    //         headers: {
    //             Accept: "application/json",
    //             "Content-Type": "application/json"
    //         }
    //     })
};