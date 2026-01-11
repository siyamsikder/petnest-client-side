import axios from 'axios';
import API_BASE_URL from '../config/api';

const axiosSecure = axios.create({
    baseURL: API_BASE_URL,
});

// Request interceptor to add authorization header for every secure call
axiosSecure.interceptors.request.use(function (config) {
    const token = localStorage.getItem('access-token');
    if (token) {
        config.headers.authorization = `Bearer ${token}`;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

// Intercepts 401 and 403 status
axiosSecure.interceptors.response.use(function (response) {
    return response;
}, async (error) => {
    const status = error.response ? error.response.status : null;
    if (status === 401 || status === 403) {
        // Handle logout or token expiration if needed
    }
    return Promise.reject(error);
});

export default axiosSecure;
