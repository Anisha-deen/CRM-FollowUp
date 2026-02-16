import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost/PHP/CRM/CRM-backend',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to add the JWT token to the headers
apiClient.interceptors.request.use(
    (config) => {
        const savedUser = localStorage.getItem('crm_user');
        if (savedUser) {
            const user = JSON.parse(savedUser);
            if (user && user.token) {
                config.headers.Authorization = `Bearer ${user.token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;
