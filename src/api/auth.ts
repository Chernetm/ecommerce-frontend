import { api } from './client';
import { User } from '@/types';

export const authApi = {
    login: async (email: string, password: string): Promise<{ token: string; user: User }> => {
        const response = await api.post('/login', { email, password });
        return response.data;
    },
    register: async (data: any): Promise<{ token: string; user: User }> => {
        const response = await api.post('/auth/register', data);
        return response.data;
    },
    getProfile: async (): Promise<User> => {
        const response = await api.get('/user/profile');
        return response.data;
    },
};
