'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string; // unique cart line id
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  variantId?: string;
  variantName?: string;
  addonIds?: string[];
  addonNames?: string[];
  imageUrl?: string;
  isVeg: boolean;
  specialNotes?: string;
}

interface CartContextType {
  items: CartItem[];
  branchId: string;
  setBranchId: (id: string) => void;
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  subTotal: number;
  taxAmount: number; // 5% GST
  totalAmount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [branchId, setBranchId] = useState<string>('');

  useEffect(() => {
    const saved = localStorage.getItem('kb360_cart');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {}
    }
    const savedBranch = localStorage.getItem('kb360_branch');
    if (savedBranch) {
      setBranchId(savedBranch);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('kb360_cart', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (branchId) localStorage.setItem('kb360_branch', branchId);
  }, [branchId]);

  const addItem = (newItem: Omit<CartItem, 'id'>) => {
    const id = `${newItem.menuItemId}_${newItem.variantId || 'reg'}_${(newItem.addonIds || []).sort().join('-')}`;
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + newItem.quantity } : i));
      }
      return [...prev, { ...newItem, id }];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      removeItem(id);
    } else {
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)));
    }
  };

  const clearCart = () => setItems([]);

  const subTotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const taxAmount = Math.round(subTotal * 0.05 * 100) / 100;
  const totalAmount = Math.round((subTotal + taxAmount) * 100) / 100;

  return (
    <CartContext.Provider
      value={{
        items,
        branchId,
        setBranchId,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        subTotal,
        taxAmount,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
