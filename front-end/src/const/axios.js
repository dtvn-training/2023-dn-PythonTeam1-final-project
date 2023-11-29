import axios from "axios";
import { getUserFromLocalStorage } from "./localStorage";

// config
const customFetch = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
})

customFetch.interceptors.request.use((config) => {
    const user = getUserFromLocalStorage();
    if (user) {
        config.headers['Authorization'] = `Bearer ${user.token}`
    }
    return config;
})

customFetch.interceptors.response.use(
    response => { return response; },
    error => {
        if (error.response && 401 === error.response.status) {
            let savedToken = window.localStorage.getItem("access_token");
            if (savedToken !== null) {
                localStorage.removeItem("user");
                localStorage.removeItem("access_token");
                window.location.reload();
            }

        }
        return Promise.reject(error);
    }
);

export default customFetch;