import axios from "axios";

export const apiBase = axios.create({
    baseURL: "https://project-ecomm-dashboard.vercel.app/api"
})