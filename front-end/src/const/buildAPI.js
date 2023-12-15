import axios from "axios";

// config
const buildAPI =
    axios.create({
        baseURL: 'http://127.0.0.1:8000/'
    })
buildAPI.interceptors.request.use(config => (
    {
        ...config,
        headers: { Authorization: `Bearer ${window.localStorage.getItem("access_token")}` }
    }
)
)

export default buildAPI;