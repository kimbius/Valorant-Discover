import axios from 'axios';

export const api = axios.create({
    baseURL: "https://vlrggapi.vercel.app/"
})

export const api2 = axios.create({
    baseURL: "https://vlrgg.cyclic.app/api/"
})