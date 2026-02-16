import apiClient from './axiosClient';

export const authApi = {
    login: async (username, password) => {
        // The backend login.php endpoint
        const response = await apiClient.post('/login.php', {
            username,
            password
        });
        return response.data;
    },

    // For when you implement logout on backend, or just local cleanup
    logout: () => {
        localStorage.removeItem('crm_user');
    }
};
