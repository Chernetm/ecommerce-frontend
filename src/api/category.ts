import { api } from './client';
import { Category } from '@/types';

export const categoryApi = {
    getAll: async (): Promise<Category[]> => {
        const response = await api.get('/categories/');
        // Backend returns wrapped response { success: true, data: [...] }
        return response.data.data;
    },
    getById: async (id: string): Promise<Category> => {
        const response = await api.get(`/categories/${id}`);
        return response.data.data;
    },
    create: async (data: Partial<Category>): Promise<Category> => {
        const response = await api.post('/categories/', data);
        return response.data.data;
    },
    update: async (id: string, data: Partial<Category>): Promise<Category> => {
        const response = await api.put(`/categories/${id}`, data);
        return response.data.data;
    },
    delete: async (id: string): Promise<void> => {
        await api.delete(`/categories/${id}`);
    },
};
