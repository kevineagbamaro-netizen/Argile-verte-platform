import axios from 'axios';
import { HealthResponse, LikeState, NotificationSummary, Order, OrderRequest, Product, ProductRequest, Review, ShopSettings, User } from '../types';
import { getClientKey } from '../lib/clientKey';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const raw = localStorage.getItem('argile-verte-user');
  if (raw) {
    try {
      const user = JSON.parse(raw) as User;
      if (user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    } catch {
      /* ignore */
    }
  }
  return config;
});

export const api = {
  async checkHealth(): Promise<HealthResponse> {
    const response = await apiClient.get<HealthResponse>('/health');
    return response.data;
  },

  async getProducts(params?: { category?: string; search?: string; featured?: boolean }): Promise<Product[]> {
    const response = await apiClient.get<Product[]>('/products', { params });
    return response.data;
  },

  async getProductById(id: number): Promise<Product> {
    const response = await apiClient.get<Product>(`/products/${id}`);
    return response.data;
  },

  async getReviews(productId: number): Promise<Review[]> {
    const response = await apiClient.get<Review[]>(`/products/${productId}/reviews`);
    return response.data;
  },

  async addReview(productId: number, payload: { authorName: string; rating: number; comment: string }): Promise<Review> {
    const response = await apiClient.post<Review>(`/products/${productId}/reviews`, payload);
    return response.data;
  },

  async getLikes(productId: number): Promise<LikeState> {
    const response = await apiClient.get<LikeState>(`/products/${productId}/likes`, {
      params: { clientKey: getClientKey() },
    });
    return response.data;
  },

  async toggleLike(productId: number): Promise<LikeState> {
    const response = await apiClient.post<LikeState>(`/products/${productId}/likes`, {
      clientKey: getClientKey(),
    });
    return response.data;
  },

  async login(email: string, password: string): Promise<User> {
    const response = await apiClient.post<User>('/auth/login', { email, password });
    return response.data;
  },

  async register(payload: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
  }): Promise<User> {
    const response = await apiClient.post<User>('/auth/register', payload);
    return response.data;
  },

  async createOrder(payload: OrderRequest): Promise<Order> {
    const response = await apiClient.post<Order>('/orders', payload);
    return response.data;
  },

  async getOrder(orderNumber: string): Promise<Order> {
    const response = await apiClient.get<Order>(`/orders/${orderNumber}`);
    return response.data;
  },

  async getAdminProducts(): Promise<Product[]> {
    const response = await apiClient.get<Product[]>('/admin/products');
    return response.data;
  },

  async createProduct(payload: ProductRequest): Promise<Product> {
    const response = await apiClient.post<Product>('/products', payload);
    return response.data;
  },

  async updateProduct(id: number, payload: ProductRequest): Promise<Product> {
    const response = await apiClient.put<Product>(`/admin/products/${id}`, payload);
    return response.data;
  },

  async publishProduct(id: number, published: boolean): Promise<Product> {
    const response = await apiClient.patch<Product>(`/admin/products/${id}/publish`, { published });
    return response.data;
  },

  async getAdminOrders(): Promise<Order[]> {
    const response = await apiClient.get<Order[]>('/admin/orders');
    return response.data;
  },

  async updateOrderStatus(id: number, status: string): Promise<Order> {
    const response = await apiClient.patch<Order>(`/admin/orders/${id}/status`, { status });
    return response.data;
  },

  async setSpotlight(id: number, spotlight: string): Promise<Product> {
    const response = await apiClient.patch<Product>(`/admin/products/${id}/spotlight`, { spotlight });
    return response.data;
  },

  async setCampaign(id: number, campaign: string): Promise<Product> {
    const response = await apiClient.patch<Product>(`/admin/products/${id}/campaign`, { campaign });
    return response.data;
  },

  async getNotifications(): Promise<NotificationSummary> {
    const response = await apiClient.get<NotificationSummary>('/admin/notifications');
    return response.data;
  },

  async markNotificationRead(id: number): Promise<void> {
    await apiClient.patch(`/admin/notifications/${id}/read`);
  },

  async markAllNotificationsRead(): Promise<void> {
    await apiClient.patch('/admin/notifications/read-all');
  },

  async getShop(): Promise<ShopSettings> {
    const response = await apiClient.get<ShopSettings>('/shop');
    return response.data;
  },

  async saveShopSettings(payload: ShopSettings): Promise<ShopSettings> {
    const response = await apiClient.put<ShopSettings>('/admin/shop', payload);
    return response.data;
  },

  async deleteProduct(id: number): Promise<void> {
    await apiClient.delete(`/products/${id}`);
  },
};

export default api;
