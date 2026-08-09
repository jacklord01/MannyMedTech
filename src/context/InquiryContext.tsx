"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/data/products';

export interface InquiryItem {
  product: Product;
  quantity: number;
  notes?: string;
}

interface InquiryContextType {
  items: InquiryItem[];
  isCartOpen: boolean;
  addItem: (product: Product, quantity?: number, notes?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateNotes: (productId: string, notes: string) => void;
  clearCart: () => void;
  toggleCartOpen: () => void;
  setCartOpen: (isOpen: boolean) => void;
}

const InquiryContext = createContext<InquiryContextType | undefined>(undefined);

export const InquiryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<InquiryItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    setIsMounted(true);
    try {
      const savedItems = localStorage.getItem('manny_inquiry_cart');
      if (savedItems) {
        setItems(JSON.parse(savedItems));
      }
    } catch (e) {
      console.error("Failed to load inquiry cart from localStorage", e);
    }
  }, []);

  // Sync cart with localStorage when items change
  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem('manny_inquiry_cart', JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save inquiry cart to localStorage", e);
    }
  }, [items, isMounted]);

  const addItem = (product: Product, quantity = 1, notes = "") => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(item => item.product.id === product.id);
      
      if (existingItemIndex > -1) {
        // Update existing item
        const newItems = [...prevItems];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity,
          notes: notes || newItems[existingItemIndex].notes
        };
        return newItems;
      }
      
      // Add new item
      return [...prevItems, { product, quantity, notes }];
    });
    
    // Automatically open the cart drawer so the user sees feedback
    setIsCartOpen(true);
  };

  const removeItem = (productId: string) => {
    setItems((prevItems) => prevItems.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prevItems) =>
      prevItems.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const updateNotes = (productId: string, notes: string) => {
    setItems((prevItems) =>
      prevItems.map(item =>
        item.product.id === productId ? { ...item, notes } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('manny_inquiry_cart');
  };

  const toggleCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  };

  const setCartOpen = (isOpen: boolean) => {
    setIsCartOpen(isOpen);
  };

  return (
    <InquiryContext.Provider
      value={{
        items,
        isCartOpen,
        addItem,
        removeItem,
        updateQuantity,
        updateNotes,
        clearCart,
        toggleCartOpen,
        setCartOpen
      }}
    >
      {children}
    </InquiryContext.Provider>
  );
};

export const useInquiry = () => {
  const context = useContext(InquiryContext);
  if (context === undefined) {
    throw new Error('useInquiry must be used within an InquiryProvider');
  }
  return context;
};
