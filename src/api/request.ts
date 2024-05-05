import axios from 'axios';

const requests = axios.create({
    baseURL: '/',
    timeout: 5000    
});

// 拦截器
requests.interceptors.request.use(
    config => {
        const authorization = localStorage.getItem('Authorization');
        if (authorization) {
            config.headers['Authorization'] = authorization;
        }
        return config;
    }
);

requests.interceptors.response.use(
    res => {
        return res;
    },
    () => {
        return new Error('fail to get response');
    }
);

export default requests;