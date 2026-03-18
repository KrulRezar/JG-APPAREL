import { useCart } from '../../context/CartContext';
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig';
import { motion, AnimatePresence } from 'framer-motion';

export const CartDrawer = () => {
  const { cart, totalPrice, isCartOpen, setIsCartOpen, addToCart, removeFromCart } = useCart();
  const navigate = useNavigate();

  // Use Firebase Auth state directly for the check
  const isAuthenticated = !!auth.currentUser || !!localStorage.getItem('customer_token');

  const handleCheckout = () => {
    setIsCartOpen(false);
    if (isAuthenticated) {
      navigate('/checkout');
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      {/* Background Overlay */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60]"
            onClick={() => setIsCartOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Panel */}
      <div className={`fixed right-0 top-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-[70] flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-[cubic-bezier(0.32,0,0.67,0)] ${
        isCartOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        {/* Header */}
        <div className="p-8 pb-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center">
              <ShoppingBag className="text-violet-500" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-black text-white uppercase tracking-tighter italic">Your Bag</h2>
              <p className="text-[9px] text-white/30 uppercase font-bold tracking-[0.2em]">{cart.length} Unique Items</p>
            </div>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="group p-2 hover:bg-white/5 rounded-full transition-all"
          >
            <X className="text-white/40 group-hover:text-white transition-colors" size={24} />
          </button>
        </div>
        
        {/* Scrollable Items List */}
        <div className="flex-grow overflow-y-auto p-8 pt-4 space-y-6 custom-scrollbar">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center opacity-20 py-20">
              <ShoppingBag size={64} className="mb-4 stroke-[1px]" />
              <p className="text-xs font-black uppercase tracking-[0.3em] text-center">Your bag is empty</p>
              <button 
                onClick={() => { setIsCartOpen(false); navigate('/shop'); }}
                className="mt-6 text-violet-400 text-[10px] font-black uppercase tracking-widest hover:underline"
              >
                Browse Collection
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="group relative flex gap-4 p-4 rounded-[1.5rem] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
                {/* Item Image Placeholder (Optional but looks pro) */}
                <div className="w-20 h-20 rounded-xl bg-white/5 overflow-hidden shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>

                <div className="flex-grow flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <h3 className="text-white font-bold text-[11px] uppercase tracking-wider italic leading-tight max-w-[150px]">
                      {item.name}
                    </h3>
                    <span className="text-white font-mono text-sm font-bold">
                      ₱{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-1 bg-black/40 rounded-lg p-1 border border-white/5">
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 hover:text-violet-400 text-white/40 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-[10px] font-black text-white px-2 min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => addToCart(item)}
                        className="p-1 hover:text-violet-400 text-white/40 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Quick Remove */}
                    <button 
                      onClick={() => removeFromCart(item.id)} // If logic is to remove 1, use a separate 'clearFromCart' if you have it
                      className="text-white/10 hover:text-red-500/50 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-8 bg-[#0a0a0a] border-t border-white/10">
          <div className="flex justify-between items-end mb-8 px-2">
            <div className="flex flex-col">
              <span className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em] mb-1">Total Amount</span>
              <span className="text-white/40 text-[9px] uppercase font-bold tracking-widest">Taxes & Shipping included</span>
            </div>
            <span className="text-violet-500 font-black text-3xl tracking-tighter font-mono">
              ₱{totalPrice.toLocaleString()}
            </span>
          </div>
          
          <button 
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className="group w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-20 disabled:grayscale text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all shadow-[0_20px_40px_rgba(139,92,246,0.2)] active:scale-[0.98] overflow-hidden"
          >
            <div className="relative z-10 flex items-center justify-center gap-3">
              {isAuthenticated ? 'Proceed to Checkout' : 'Login to Complete Order'}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
          
          <p className="text-center text-[8px] text-white/20 mt-6 uppercase font-black tracking-[0.4em]">
            Official JG Apparel Portal
          </p>
        </div>
      </div>
    </>
  );
};