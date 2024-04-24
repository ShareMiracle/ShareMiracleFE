import axios from 'axios';

const requests = axios.create({
    baseURL: '/',
    timeout: 5000    
});

// 拦截器
requests.interceptors.request.use(
    config => {
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