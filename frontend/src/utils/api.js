import axios from 'axios';

const API = axios.create({
    // Logic: If on your laptop, use localhost. If on the web, use Vercel.
    baseURL: window.location.hostname === 'localhost' 
        ? 'http://localhost:5000/api' 
        : 'https://logo-resizer-six.vercel.app/api' 
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
});

export default API;