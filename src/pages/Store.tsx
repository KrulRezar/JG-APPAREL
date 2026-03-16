import React from 'react';
import { useCart } from '../context/CartContext';
import { Plus, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

// Inside your Product/Store component
<Helmet>
  <title>Premium Sports Jerseys | JG Apparel</title>
  <meta name="description" content="Shop the latest high-performance sports apparel. Prices starting at ₱1,500." />
  <meta property="og:title" content="JG Apparel - Elite Performance" />
  <meta property="og:image" content="https://jg-apparel.vercel.app/og-image.jpg" />
</Helmet>

const PRODUCTS = [
  { id: '1', name: "Basket-Ball Jersey", price: 2450, category: "Player Jersey", image: "https://res.cloudinary.com/dczcyu7e7/image/upload/v1772340978/1_e4yu5d.jpg" },
  { id: '2', name: "Non-Player Jersey", price: 1850, category: "Non-Player Jersey", image: "https://res.cloudinary.com/dczcyu7e7/image/upload/v1772340979/2.1_f1kyuo.jpg" },
  { id: '3', name: "Badminton Jersey", price: 3200, category: "Player Jersey", image: "https://res.cloudinary.com/dczcyu7e7/image/upload/v1772340979/2.2_xlzczk.jpg" },
  { id: '4', name: "Woman's Volleyball Jersey", price: 2100, category: "Player Jersey", image: "https://res.cloudinary.com/dczcyu7e7/image/upload/v1772340980/2.3_fuaet1.jpg" }
];

export const Store = () => {
  const { addToCart, setIsCartOpen } = useCart();

  const handleAdd = (product: any) => {
    addToCart({ ...product, quantity: 1 });
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto mb-16">
        <h1 className="text-5xl font-black text-white tracking-tighter italic uppercase">
          Jersey Gear <span className="text-violet-500">Store</span>
        </h1>
        <p className="text-white/60 mt-4 max-w-xl border-l-2 border-violet-500/50 pl-4">
          Discover our premium collection of sports apparel, designed for performance and style.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {PRODUCTS.map((product) => (
          <motion.div 
            key={product.id} 
            whileHover={{ y: -8 }}
            className="group bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-md transition-all hover:border-violet-500/50"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="p-6">
              <span className="text-violet-400 text-[10px] font-bold uppercase tracking-[0.2em]">{product.category}</span>
              <h3 className="text-white text-lg font-bold mt-1 line-clamp-1">{product.name}</h3>
              <div className="flex justify-between items-center mt-6">
                <span className="text-xl font-black text-white">₱{product.price.toLocaleString()}</span>
                <button 
                  onClick={() => handleAdd(product)}
                  className="bg-violet-600 hover:bg-violet-500 p-3 rounded-2xl shadow-lg shadow-violet-600/30 transition-all active:scale-90"
                >
                  <Plus className="text-white" size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};