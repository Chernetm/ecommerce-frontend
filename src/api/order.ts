import { api } from './client';
import { Order } from '@/types';

export const orderApi = {
    getAll: async (): Promise<Order[]> => {
        const response = await api.get('/orders/');
        return response.data.data;
    },
    getById: async (id: string): Promise<Order> => {
        const response = await api.get(`/orders/${id}`);
        return response.data.data;
    },
    create: async (offerData: any): Promise<Order> => {
        const response = await api.post('/orders/', offerData);
        return response.data.data;
    },
    updateStatus: async (id: string, status: string): Promise<Order> => {
        const response = await api.put(`/orders/${id}/status`, { status });
        return response.data.data;
    },
};
