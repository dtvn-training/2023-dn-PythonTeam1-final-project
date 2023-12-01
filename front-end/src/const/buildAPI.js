import axios from "axios";

// config
const buildAPI = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
})
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});


export default buildAPI;