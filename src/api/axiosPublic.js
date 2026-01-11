import axios from 'axios';

const axiosPublic = axios.create({
    baseURL: 'https://petnest-one.vercel.app', // Using existing backend for now as per project context
});

export default axiosPublic;
