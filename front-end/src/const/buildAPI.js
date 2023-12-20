import axios from "axios";

// config
const buildAPI =
    axios.create({
        baseURL: process.env.REACT_APP_API_ENDPOINT
    })
buildAPI.interceptors.request.use(config => (
    {
        ...config,
        headers: { Authorization: `Bearer ${window.localStorage.getItem("access_token")}` }
    }
)
)

export default buildAPI;