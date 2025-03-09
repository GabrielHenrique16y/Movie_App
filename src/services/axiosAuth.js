import axios from 'axios';

export default axios.create({
    baseURL: 'https://movie-api-pied-pi.vercel.app/',
    withCredentials: true,
});
