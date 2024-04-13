import axios from "axios";

axios.defaults.baseURL =
    import.meta.env.VITE_APP_API_URL + "/api";
axios.defaults.headers.common["Content-Type"] = "application/json";


export default axios;