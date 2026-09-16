export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  stock: number;
  featured: boolean;
  published?: boolean;
  averageRating: number;
  reviewCount: number;
  likeCount?: number;
  campaign?: string;
  spotlight?: string;
  compareAtPrice?: number | null;
  createdAt?: string;
}

export interface Review {
  id: number;
  authorName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface LikeState {
  productId: number;
  likeCount: number;
  liked: boolean;
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
  totalAmount?: number;
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
  notes?: string;
  items: OrderItem[];
  createdAt: string;
}

export interface AdminNotification {
  id: number;
  type: string;
  title: string;
  message: string;
  link?: string;
  read: boolean;
  createdAt: string;
}

export interface NotificationSummary {
  unread: number;
  items: AdminNotification[];
}

export interface ShopSettings {
  id?: number;
  shopName: string;
  tagline?: string;
  navbarTagline?: string;
  phone?: string;
  email?: string;
  address?: string;
  whatsappNumber: string;
  floozNumber: string;
  mixxNumber: string;
  heroEyebrow?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroImageUrl?: string;
  bienfaitsEyebrow?: string;
  bienfaitsTitle?: string;
  bienfaitsIntro?: string;
  bienfait1Title?: string;
  bienfait1Text?: string;
  bienfait2Title?: string;
  bienfait2Text?: string;
  bienfait3Title?: string;
  bienfait3Text?: string;
  footerBlurb?: string;
}

export interface ProductRequest {
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  stock: number;
  featured: boolean;
  published: boolean;
  campaign?: string;
  spotlight?: string;
  compareAtPrice?: number | null;
}

export interface HealthResponse {
  status: string;
  service?: string;
  timestamp?: string;
}
