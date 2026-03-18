import React, { useState, useEffect } from 'react';
import { ShoppingBag, Plus, Minus, Search, Filter, Loader2, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { db } from '../firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';

// Categories for your brand
const CATEGORIES = ['All', 'Jersey', 'Shorts', 'Full Set', 'Accessories'];

export function Store() {
  const { cart, addToCart, removeFromCart } = useCart();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  // Firebase Fetching Logic
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const productsRef = collection(db, 'products');
        // If category is not 'All', filter the Firestore query
        const q = activeCategory === 'All' 
          ? productsRef 
          : query(productsRef, where('category', '==', activeCategory));
        
        const querySnapshot = await getDocs(q);
        const items = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(items);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory]);

  // Helper to get item quantity from cart
  const getItemQuantity = (id: string) => {
    const item = cart.find(i => i.id === id);
    return item ? item.quantity : 0;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* --- CATEGORY & FILTER BAR --- */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                  activeCategory === cat 
                  ? 'bg-violet-600 border-violet-500 text-white shadow-lg shadow-violet-600/20' 
                  : 'bg-white/5 border-white/10 text-white/40 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
            <input 
              type="text" 
              placeholder="Search Gear..." 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white text-xs outline-none focus:border-violet-500/50 transition-all"
            />
          </div>
        </header>

        {/* --- PRODUCT GRID --- */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="text-violet-500 animate-spin mb-4" size={40} />
            <p className="text-white/20 text-[10px] font-black uppercase tracking-widest italic">Syncing Inventory...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => {
              const qty = getItemQuantity(product.id);
              
              return (
                <div key={product.id} className="group relative bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden hover:border-violet-500/30 transition-all flex flex-col">
                  {/* Image Area */}
                  <div className="aspect-[4/5] overflow-hidden relative">
                    <img 
                      src={product.image || 'https://via.placeholder.com/400x500?text=JG+Apparel'} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
                      <Star className="text-yellow-500 fill-yellow-500" size={10} />
                      <span className="text-[10px] font-black text-white">4.9</span>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                      <span className="text-[8px] font-black text-violet-400 uppercase tracking-[0.2em]">{product.category}</span>
                      <h3 className="text-lg font-bold text-white uppercase italic tracking-tight truncate">{product.name}</h3>
                      <p className="text-white/60 font-mono text-sm">₱{product.price.toLocaleString()}</p>
                    </div>

                    {/* --- IN-CARD QUANTITY TOGGLE --- */}
                    <div className="mt-auto">
                      {qty === 0 ? (
                        <button 
                          onClick={() => addToCart(product)}
                          className="w-full bg-white text-black font-black py-3.5 rounded-2xl uppercase text-[10px] tracking-widest hover:bg-violet-600 hover:text-white transition-all flex items-center justify-center gap-2"
                        >
                          <Plus size={14} /> Add to Bag
                        </button>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => removeFromCart(product.id)}
                            className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-red-500/20 hover:border-red-500/30 transition-all"
                          >
                            <Minus size={16} />
                          </button>
                          <div className="flex-grow h-12 rounded-xl bg-violet-600 flex items-center justify-center text-white font-black">
                            {qty}
                          </div>
                          <button 
                            onClick={() => addToCart(product)}
                            className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-green-500/20 hover:border-green-500/30 transition-all"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}