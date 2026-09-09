import axios from 'axios';
import { HealthResponse, Product, User } from '../types';

// En développement, Vite proxifie les requêtes commençant par /api vers http://localhost:8080
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  // Vérification de l'état du backend Spring Boot
  async checkHealth(): Promise<HealthResponse> {
    const response = await apiClient.get<HealthResponse>('/health');
    return response.data;
  },

  // Gestion des produits
  async getProducts(params?: { category?: string; search?: string; featured?: boolean }): Promise<Product[]> {
    const response = await apiClient.get<Product[]>('/products', { params });
    return response.data;
  },

  async getProductById(id: number): Promise<Product> {
    const response = await apiClient.get<Product>(`/products/${id}`);
    return response.data;
  },

  async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    const response = await apiClient.post<Product>('/products', product);
    return response.data;
  },

  // Gestion des utilisateurs
  async getUsers(): Promise<User[]> {
    const response = await apiClient.get<User[]>('/users');
    return response.data;
  },
};

export default api;
