import axios from "axios";

const BaseUrl = axios.create({
    baseURL: "http://localhost:9000/api/auth",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

BaseUrl.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default BaseUrl;