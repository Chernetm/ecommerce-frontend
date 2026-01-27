import { api } from './client';
import { CartResponse } from '@/types';

export const cartApi = {
    get: async (): Promise<CartResponse> => {
        const response = await api.get('/cart/');
        // Backend returns wrapped response { success: true, data: { ... } }
        return response.data.data;
    },
    add: async (productId: number, quantity: number = 1): Promise<void> => {
        await api.post('/cart/', { productId, quantity });
    },
    update: async (productId: number, quantity: number): Promise<void> => {
        await api.put(`/cart/${productId}`, { quantity });
    },
    remove: async (productId: number): Promise<void> => {
        await api.delete(`/cart/${productId}`);
    },
    clear: async (): Promise<void> => {
        await api.delete('/cart/');
    },
};
