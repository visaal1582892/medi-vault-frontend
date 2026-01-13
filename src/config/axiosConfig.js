import axios from "axios";
import { isEmpty } from "../utils/validator";

const api = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true
});

api.interceptors.request.use(
    (config) => {
        if (config.method === "get") {
            config.headers = {
                ...config.headers,
                "Cache-Control": "no-cache",
                Pragma: "no-cache",
            };
        }
        const token = localStorage.getItem("loginToken");
        if (!isEmpty(token)) {
            config.headers.Authorization = `JWT ${token}`;
        }

        return config;
    },
    (error) => {
        console.log(error);
    }
);

export default api;