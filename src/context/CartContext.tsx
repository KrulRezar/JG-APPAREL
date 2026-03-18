import React, { createContext, useContext, useState, ReactNode } from 'react';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe (Replace with your actual Publishable Key)
const stripePromise = loadStripe('pk_test_your_key_here');

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void; // Added to fix Checkout error
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  processStripeCheckout: () => Promise<void>; // Added Stripe Helper
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

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
    
  };

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

  const totalPrice = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  // Essential for after-purchase cleanup
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart'); // If you use persistence
  };

  // --- STRIPE CHECKOUT LOGIC ---
  const processStripeCheckout = async () => {
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe failed to initialize.");

      // In production, you fetch the Session ID from your backend/Firebase Function
      // const response = await fetch('/api/create-checkout-session', { method: 'POST', body: JSON.stringify({ items: cart }) });
      // const session = await response.json();

      // Redirect to Stripe Hosted Checkout
      // const result = await stripe.redirectToCheckout({ sessionId: session.id });

      // if (result.error) {
      //   console.error(result.error.message);
      //   throw new Error(result.error.message);
      // }

      console.log("Stripe Session Created for total:", totalPrice);
    } catch (error: any) {
      console.error("Stripe Checkout Error:", error.message);
      throw error; // Re-throw so the UI can catch it
    }
  };

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        clearCart,
        totalPrice, 
        isCartOpen, 
        setIsCartOpen,
        processStripeCheckout
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};