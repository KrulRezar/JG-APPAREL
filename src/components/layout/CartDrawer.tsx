import { useCart } from '../../context/CartContext';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig'; // Import your firebase auth

export const CartDrawer = () => {
  const { cart, totalPrice, isCartOpen, setIsCartOpen, addToCart } = useCart();
  const navigate = useNavigate();

  // Firebase-reliable check: check if a user is currently signed in
  const currentUser = auth.currentUser;
  const isAuthenticated = !!currentUser || !!localStorage.getItem('customer_token');

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
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] transition-opacity duration-500"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      {/* Sidebar Panel */}
      <div className={`fixed right-0 top-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-[70] p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-[cubic-bezier(0.32,0,0.67,0)] ${
        isCartOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-violet-500" size={20} />
            <h2 className="text-xl font-black text-white uppercase tracking-tighter italic">Your Bag</h2>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="group p-2 hover:bg-white/5 rounded-full transition-all"
          >
            <X className="text-white/40 group-hover:text-white transition-colors" size={24} />
          </button>
        </div>
        
        {/* Scrollable Items List */}
        <div className="space-y-8 overflow-y-auto max-h-[calc(100vh-280px)] pr-4 custom-scrollbar">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 opacity-20">
              <ShoppingBag size={48} className="mb-4" />
              <p className="text-sm font-bold uppercase tracking-widest text-center">Empty</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center group">
                <div className="flex flex-col">
                  <h3 className="text-white font-bold text-sm uppercase tracking-wide group-hover:text-violet-400 transition-colors">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-4 mt-1">
                    <p className="text-white/30 text-[10px] font-black uppercase tracking-widest">
                      Qty: {item.quantity}
                    </p>
                    <span className="text-violet-500/50 text-[10px]">•</span>
                    <span className="text-white font-mono text-xs">
                      ₱{(item.price * (item.quantity || 1)).toLocaleString()}
                    </span>
                  </div>
                </div>
                
                {/* Optional: Add a Remove/Trash icon here later */}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 w-full p-8 bg-[#0a0a0a] border-t border-white/5">
          <div className="flex justify-between items-end mb-8">
            <div className="flex flex-col">
              <span className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em] mb-1">Subtotal</span>
              <span className="text-white/40 text-xs italic">Shipping calculated at checkout</span>
            </div>
            <span className="text-violet-500 font-black text-3xl tracking-tighter font-mono">
              ₱{totalPrice.toLocaleString()}
            </span>
          </div>
          
          <button 
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className="group relative w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-20 disabled:cursor-not-allowed text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all shadow-[0_0_40px_rgba(139,92,246,0.2)] active:scale-[0.98]"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isAuthenticated ? 'Initiate Checkout' : 'Login to Order'}
            </span>
          </button>
          
          <p className="text-center text-[9px] text-white/20 mt-6 uppercase font-bold tracking-[0.3em]">
            Secured by JG Digital Systems
          </p>
        </div>
      </div>
    </>
  );
};