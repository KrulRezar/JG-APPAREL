import { ShoppingBag, LogIn, Menu, X, Home, User, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { auth } from '../../firebaseConfig';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setIsCartOpen, cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // Unified check for customer login status
  const isCustomerLoggedIn = !!localStorage.getItem('customer_token');

  const handleNavigation = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { targetId: id } });
    } else {
      scrollToSection(id);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      // Clear Firebase session and local storage
      await auth.signOut();
      localStorage.removeItem('customer_token');
      navigate('/login');
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="rounded-2xl px-4 md:px-6 py-4 backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between">
              
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg md:text-xl font-bold tracking-tight text-white uppercase italic">JG Apparel</span>
              </Link>

              {/* Desktop Nav Links */}
              <div className="hidden lg:flex items-center gap-8">
                <button onClick={() => handleNavigation('about')} className="text-white/70 hover:text-white transition-colors text-sm uppercase font-bold tracking-widest">About</button>
                <button onClick={() => handleNavigation('gallery')} className="text-white/70 hover:text-white transition-colors text-sm uppercase font-bold tracking-widest">Gallery</button>
                <Link to="/shop" className="text-white/70 hover:text-white transition-colors text-sm uppercase font-bold tracking-widest">Shop</Link>
              </div>

              {/* Right Side Icons */}
              <div className="flex items-center gap-3">
                {/* Customer Profile/Login Icon (Desktop) */}
                <Link 
                  to={isCustomerLoggedIn ? "/dashboard" : "/login"} 
                  className="hidden lg:flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-white/70 hover:text-white group"
                  title={isCustomerLoggedIn ? "Dashboard" : "Login"}
                >
                  {isCustomerLoggedIn ? (
                    <LayoutDashboard className="w-5 h-5 group-hover:text-violet-400 transition-colors" />
                  ) : (
                    <User className="w-5 h-5" />
                  )}
                </Link>

                {/* Cart Toggle */}
                <button 
                  onClick={() => setIsCartOpen(true)}
                  className="relative w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                >
                  <ShoppingBag className="w-5 h-5 text-white" />
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-violet-600 text-[10px] font-black rounded-full flex items-center justify-center border-2 border-[#0a0a0a]">
                      {cart.length}
                    </span>
                  )}
                </button>

                {/* Mobile Menu Toggle */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors"
                >
                  {isMobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-4 right-4 z-40 lg:hidden"
          >
            <div className="rounded-2xl p-6 backdrop-blur-xl bg-[#0a0a0a]/90 border border-white/10 shadow-2xl flex flex-col gap-4">
              <button onClick={() => handleNavigation('about')} className="text-left text-white/70 py-2 uppercase text-xs font-black tracking-[0.2em]">About</button>
              <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="text-white/70 py-2 uppercase text-xs font-black tracking-[0.2em]">Store</Link>
              
              {/* Customer Dashboard / Login logic in Mobile Menu */}
              {isCustomerLoggedIn ? (
                <>
                  <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-left text-white/70 py-2 uppercase text-xs font-black tracking-[0.2em] flex items-center gap-2">
                    <LayoutDashboard className="w-4 h-4 text-violet-400" /> Dashboard
                  </Link>
                  <button onClick={handleLogout} className="text-left text-red-400 py-2 uppercase text-xs font-black tracking-[0.2em] flex items-center gap-2">
                    <LogIn className="w-4 h-4 rotate-180" /> Logout
                  </button>
                </>
              ) : (
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-left text-white/70 py-2 uppercase text-xs font-black tracking-[0.2em] flex items-center gap-2">
                  <LogIn className="w-4 h-4" /> Customer Login
                </Link>
              )}

              <div className="pt-4 border-t border-white/10">
                <button 
                  onClick={() => { setIsMobileMenuOpen(false); setIsCartOpen(true); }}
                  className="w-full px-6 py-4 rounded-xl bg-violet-600 text-white font-black uppercase text-xs tracking-widest shadow-lg shadow-violet-600/20"
                >
                  View Bag (₱)
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}