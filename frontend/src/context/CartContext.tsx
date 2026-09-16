import React, { createContext, useContext, useMemo, useState } from 'react';
import { CartItem, Product } from '../types';

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  total: number;
  addItem: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeItem: (productId: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);
const STORAGE_KEY = 'argile-verte-cart';

function readCart(): CartItem[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as CartItem[];
  } catch {
    return [];
  }
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(readCart);

  const persist = (next: CartItem[]) => {
    setItems(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const value = useMemo<CartContextValue>(() => {
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const total = items.reduce((sum, item) => sum + Number(item.product.price) * item.quantity, 0);

    return {
      items,
      itemCount,
      total,
      addItem: (product, quantity = 1) => {
        const existing = items.find((item) => item.product.id === product.id);
        if (existing) {
          persist(
            items.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock || item.quantity + quantity) }
                : item
            )
          );
          return;
        }
        persist([...items, { product, quantity }]);
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          persist(items.filter((item) => item.product.id !== productId));
          return;
        }
        persist(
          items.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
        );
      },
      removeItem: (productId) => persist(items.filter((item) => item.product.id !== productId)),
      clear: () => persist([]),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
