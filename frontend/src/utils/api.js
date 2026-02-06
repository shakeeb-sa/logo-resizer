import axios from 'axios';

const API = axios.create({
    baseURL: window.location.hostname === 'localhost' 
        ? 'http://localhost:5000/api' 
        : 'https://logo-resizer-pro.vercel.app/api' // Update with your actual URL later
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
});

export default API;