export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  stock: number;
  featured: boolean;
  averageRating: number;
  reviewCount: number;
  createdAt?: string;
}

export interface Review {
  id: number;
  authorName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type UserRole = 'ROLE_USER' | 'ROLE_ADMIN';

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role: UserRole;
  token: string;
}

export interface OrderItemDTO {
  productId: number;
  productName: string;
  unitPrice: number;
  quantity: number;
}

export interface OrderRequest {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryAddress: string;
  city: string;
  notes?: string;
  paymentMethod: string;
  totalAmount: number;
  items: OrderItemDTO[];
}

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: number;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryAddress: string;
  city?: string;
  paymentMethod: string;
  totalAmount: number;
  status: string;
  items: OrderItem[];
  createdAt: string;
}
