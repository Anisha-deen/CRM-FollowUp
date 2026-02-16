import apiClient from './axiosClient';

export const userApi = {
    getAll: async () => {
        const response = await apiClient.get('/users.php');
        return response.data;
    },

    getById: async (userGuid) => {
        const response = await apiClient.get(`/users.php?user_guid=${userGuid}`);
        return response.data;
    },

    create: async (userData) => {
        const response = await apiClient.post('/create.php', userData);
        return response.data;
    },

    update: async (userGuid, userData) => {
        // Backend expects body to contain user_guid or it checks GET param
        // Combining both for safety
        const data = { ...userData, user_guid: userGuid };
        const response = await apiClient.post('/users.php', data); // Using POST as per backend implementation
        return response.data;
    },

    delete: async (userGuid) => {
        const response = await apiClient.delete(`/users.php?user_guid=${userGuid}`);
        return response.data;
    }
};
