import axios from 'axios';

const api = axios.create({

    baseURL: "https://smallbiggrowth.onrender.com/api/v1",
    withCredentials: true,

});

export const googleAuth = (code) => api.get(`/auth/google?code=${code}`);