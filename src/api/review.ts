import { api } from './client';
import { Review, CreateReviewRequest } from '@/types';

export const reviewApi = {
    create: async (data: CreateReviewRequest): Promise<Review> => {
        const response = await api.post('/reviews/', data);
        return response.data;
    },
    getByProductId: async (productId: number): Promise<Review[]> => {
        // Assuming backend has an endpoint for this, typically GET /reviews/?productId=X or /products/:id with reviews
        // Based on router.go: reviews := private.Group("/reviews"); GET /:id (GetReviewByID).
        // It seems there isn't a direct "Get Reviews By Product" public endpoint in the router snippet provided earlier.
        // productHandler.GetProductByID might return reviews included in ProductResponse?
        // Let's assume for now we might need to fetch them or the product endpoint returns them.
        // Checking product.go: ProductResponse has `Reviews []Review`. 
        // So we don't need a separate API call here if we load product details.
        // But if we want to delete/update:
        return [];
    },
    delete: async (id: number): Promise<void> => {
        await api.delete(`/reviews/${id}`);
    },
};
