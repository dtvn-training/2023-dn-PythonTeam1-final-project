import axios from "axios";

// config
const buildAPI =
    axios.create({
        baseURL: 'https://everest-api-e7x5.onrender.com/'
    })
buildAPI.interceptors.request.use(config => (
    {
        ...config,
        headers: { Authorization: `Bearer ${window.localStorage.getItem("access_token")}` }
    }
)
)

export default buildAPI;