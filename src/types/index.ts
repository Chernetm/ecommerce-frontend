export interface User {
    uid: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    phone?: string;
    address?: string;
}

export interface Review {
    id: number;
    productId: number;
    userId: string;
    rating: number;
    title: string;
    comment: string;
    verifiedPurchase: boolean;
    createdAt: string;
}

export interface CreateReviewRequest {
    productId: number;
    rating: number;
    title: string;
    comment: string;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
    image?: string;
    parentId?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    compareAtPrice?: number;
    categoryId: string;
    sellerId: string;
    images?: string; // JSON string or comma-separated
    stock: number;
    sku?: string;
    status?: string;
    featured?: boolean;
    rating?: number;
    reviewCount?: number;
    tags?: string;
    specifications?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface ProductListResponse {
    products: Product[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}

export interface CartItem {
    id: number;
    quantity: number;
    product: Product;
}

export interface CartResponse {
    items: CartItem[];
    subtotal: number;
    itemCount: number;
}

export interface OrderItem {
    id: number;
    productId: number;
    name: string;
    price: number;
    quantity: number;
}

export interface Order {
    id: string;
    userId: string;
    status: string;
    paymentMethod: string;
    paymentStatus: string;
    subtotal: number;
    tax: number;
    shipping: number;
    total: number;
    shippingAddr: string;
    createdAt: string;
    items: OrderItem[];
}
