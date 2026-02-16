import apiClient from './axiosClient';

export const roleApi = {
    getAll: async () => {
        const response = await apiClient.get('/roles.php');
        return response.data;
    },

    create: async (roleData) => {
        const response = await apiClient.post('/roles.php', roleData);
        return response.data;
    },

    update: async (roleGuid, roleData) => {
        const data = { ...roleData, role_guid: roleGuid };
        const response = await apiClient.post('/roles.php', data);
        return response.data;
    },

    delete: async (roleGuid) => {
        // Backend expects role_guid as GET param for DELETE
        const response = await apiClient.delete(`/roles.php?role_guid=${roleGuid}`);
        return response.data;
    }
};
