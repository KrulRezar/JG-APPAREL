import React from 'react';
import { useCart } from '../context/CartContext';
import { Plus, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

const PRODUCTS = [
  { id: '1', name: "Aero-Tech Performance Jersey", price: 2450, category: "Pro Series", image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=600" },
  { id: '2', name: "Vanguard Compression Shorts", price: 1850, category: "Training", image: "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=600" },
  { id: '3', name: "Stealth Windbreaker", price: 3200, category: "Outerwear", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600" },
  { id: '4', name: "Apex Training Joggers", price: 2100, category: "Essentials", image: "https://images.unsplash.com/photo-1552664110-ad30427b2438?q=80&w=600" }
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
          JG <span className="text-violet-500">Store</span>
        </h1>
        <p className="text-white/60 mt-4 max-w-xl border-l-2 border-violet-500/50 pl-4">
          High-performance gear for the modern athlete. Prices in ₱.
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