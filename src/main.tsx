import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CartProvider } from './context/CartContext'; // Import your provider
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Wrap App here so CartDrawer inside App can access the context */}
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);