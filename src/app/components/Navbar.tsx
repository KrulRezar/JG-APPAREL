import { ShoppingBag, LogIn, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
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
          <div
            className="rounded-2xl px-4 md:px-6 py-4 backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl"
            style={{
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg md:text-xl tracking-tight text-white">JG Apparel</span>
              </div>

              {/* Desktop Nav Links */}
              <div className="hidden lg:flex items-center gap-8">
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection('gallery')}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Gallery
                </button>
                <button
                  onClick={() => scrollToSection('modules')}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Contacts
                </button>
                <button
                  onClick={() => scrollToSection('footer')}
                  className="text-white/70 hover:text-white transition-colors flex items-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  Admin Login
                </button>
              </div>

              {/* Right Side */}
              <div className="flex items-center gap-4">
                {/* CTA Button */}
                <button
                  onClick={() => scrollToSection('gallery')}
                  className="hidden sm:block px-6 py-2.5 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] text-white transition-all hover:scale-105 shadow-lg shadow-[#8B5CF6]/30"
                >
                  Shop Now
                </button>

                {/* Mobile Menu Toggle */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors"
                >
                  {isMobileMenuOpen ? (
                    <X className="w-5 h-5 text-white" />
                  ) : (
                    <Menu className="w-5 h-5 text-white" />
                  )}
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
            transition={{ duration: 0.3 }}
            className="fixed top-24 left-4 right-4 z-40 lg:hidden"
          >
            <div className="rounded-2xl p-6 backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl">
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-left text-white/70 hover:text-white transition-colors py-2"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection('gallery')}
                  className="text-left text-white/70 hover:text-white transition-colors py-2"
                >
                  Gallery
                </button>
                <button
                  onClick={() => scrollToSection('footer')}
                  className="text-left text-white/70 hover:text-white transition-colors py-2"
                >
                  Contacts
                </button>
                <button
                  onClick={() => scrollToSection('footer')}
                  className="text-left text-white/70 hover:text-white transition-colors py-2 flex items-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  Admin Login
                </button>
                <div className="pt-4 border-t border-white/10">
                  <button
                    onClick={() => scrollToSection('gallery')}
                    className="w-full px-6 py-3 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] text-white transition-all shadow-lg shadow-[#8B5CF6]/30"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
