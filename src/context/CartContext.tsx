import React, { createContext, useContext, useState, ReactNode } from 'react';

// 1. Unified Interface Definitions
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void; // Added for better UX
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// 2. Single CartProvider Declaration
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Function to add or increment items
  const addToCart = (newItem: CartItem) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === newItem.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === newItem.id 
            ? { ...item, quantity: (item.quantity || 1) + 1 } 
            : item
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  // Function to remove or decrement items
  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const existingItem = prev.find(item => item.id === id);
      if (existingItem && existingItem.quantity > 1) {
        return prev.map(item => 
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prev.filter(item => item.id !== id);
    });
  };

  // Calculate total in Pesos (₱)
  const totalPrice = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, // Exposed to the app
        totalPrice, 
        isCartOpen, 
        setIsCartOpen 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// 3. Custom Hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};