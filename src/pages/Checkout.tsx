import React from 'react';
import { useCart } from '../context/CartContext';
import { CreditCard, MapPin, ShieldCheck } from 'lucide-react';

export function Checkout() {
  const { cart, totalPrice } = useCart();

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left: Shipping & Payment Info */}
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-6 flex items-center gap-2">
              <MapPin className="text-violet-500" /> Delivery Details
            </h2>
            <div className="space-y-4">
              <input type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-violet-500 outline-none" />
              <input type="text" placeholder="Shipping Address" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-violet-500 outline-none" />
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-6 flex items-center gap-2">
              <CreditCard className="text-violet-500" /> Payment Method
            </h2>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
              <span className="text-white/60 font-bold">GCash / PayMaya</span>
              <div className="w-4 h-4 rounded-full border-2 border-violet-500 bg-violet-500 shadow-[0_0_10px_#8b5cf6]" />
            </div>
          </section>
        </div>

        {/* Right: Order Summary */}
        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-xl h-fit sticky top-32">
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-8 italic">Order Summary</h2>
          
          <div className="space-y-4 mb-8">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-white/60">{item.name} x{item.quantity}</span>
                <span className="text-white font-mono">₱{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-6 space-y-2">
            <div className="flex justify-between text-white/40 text-xs uppercase tracking-widest font-bold">
              <span>Subtotal</span>
              <span>₱{totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-white/40 text-xs uppercase tracking-widest font-bold pb-4">
              <span>Shipping</span>
              <span className="text-emerald-400">FREE</span>
            </div>
            <div className="flex justify-between items-end border-t border-white/10 pt-6">
              <span className="text-white font-black uppercase text-xl">Total</span>
              <span className="text-violet-400 font-black text-3xl font-mono">₱{totalPrice.toLocaleString()}</span>
            </div>
          </div>

          <button className="w-full bg-violet-600 hover:bg-violet-500 text-white font-black py-5 rounded-2xl mt-10 transition-all shadow-[0_0_30px_rgba(139,92,246,0.3)] uppercase tracking-widest text-sm flex items-center justify-center gap-2">
            <ShieldCheck size={20} />
            Confirm Order (₱)
          </button>
        </div>

      </div>
    </div>
  );
}