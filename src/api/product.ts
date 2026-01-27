import { api } from './client';
import { Product, ProductListResponse } from '@/types';

export const productApi = {
    getAll: async (params?: any): Promise<ProductListResponse> => {
        const response = await api.get('/products', { params });
        return response.data.data;
    },
    getById: async (id: number): Promise<Product> => {
        const response = await api.get(`/products/${id}`);
        return response.data.data;   // <-- return only product
    },

    create: async (data: Partial<Product>): Promise<Product> => {
        const response = await api.post('/products/', data);
        return response.data;
    },
    update: async (id: number, data: Partial<Product>): Promise<Product> => {
        const response = await api.put(`/products/${id}`, data);
        return response.data;
    },
    delete: async (id: number): Promise<void> => {
        await api.delete(`/products/${id}`);
    },
};
