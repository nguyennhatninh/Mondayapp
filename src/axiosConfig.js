import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER}`,
});

let isRefreshing = false;
let refreshSubscribers = [];

const onRefreshed = (accessToken) => {
    refreshSubscribers.map((callback) => callback(accessToken));
    refreshSubscribers = [];
};

const addRefreshSubscriber = (callback) => {
    refreshSubscribers.push(callback);
};

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        if (config.url.includes('refresh') || config.url.includes('logout')) {
            const refreshToken = localStorage.getItem('refreshToken');
            config.headers.Authorization = `Bearer ${refreshToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    async (e) => {
        const { config, response } = e;
        const refreshToken = localStorage.getItem('refreshToken');
        if (response && response.status === 401 && !config._retry && refreshToken) {
            if (isRefreshing) {
                return new Promise((resolve) => {
                    addRefreshSubscriber((accessToken) => {
                        config.headers.Authorization = `Bearer ${accessToken}`;
                        resolve(axiosInstance(config));
                    });
                });
            }

            config._retry = true;
            isRefreshing = true;

            try {
                const { data } = await axios.post(`${process.env.REACT_APP_SERVER}/auth/refresh`, { refreshToken });
                localStorage.setItem('accessToken', data.data.accessToken);
                localStorage.setItem('refreshToken', data.data.refreshToken);
                axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.data.accessToken}`;
                isRefreshing = false;

                onRefreshed(data.data.accessToken);
                return axiosInstance(config);
            } catch (err) {
                isRefreshing = false;
                return Promise.reject(err);
            }
        }
        return Promise.reject(e);
    },
);

export default axiosInstance;
