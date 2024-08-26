import axios from "axios";

export const apiBase = axios.create({
    baseURL: "https://project-ecomm-dashboard.vercel.app/api"
    // baseURL: "http://localhost:3001/api"
})