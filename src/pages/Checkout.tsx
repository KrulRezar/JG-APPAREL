import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { CreditCard, MapPin, ShieldCheck, Loader2, ArrowLeft, X, CheckCircle2, AlertCircle, Timer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';

type CheckoutStatus = 'idle' | 'confirming' | 'processing' | 'success' | 'error';

export function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  
  // States
  const [status, setStatus] = useState<CheckoutStatus>('idle');
  const [countdown, setCountdown] = useState(5);
  const [address, setAddress] = useState('');
  const [fullName, setFullName] = useState(auth.currentUser?.displayName || '');
  const [phone, setPhone] = useState('');

  // Handle the initial "Confirm" click
  const triggerConfirmation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address || !phone) {
      alert("Please fill in all delivery details.");
      return;
    }
    setStatus('confirming');
    setCountdown(5);
  };

  // The Countdown Timer Logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (status === 'confirming' && countdown > 0) {
      timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
    } else if (status === 'confirming' && countdown === 0) {
      processPayment();
    }
    return () => clearTimeout(timer);
  }, [status, countdown]);

  const processPayment = async () => {
    setStatus('processing');

    try {
      const orderData = {
        customerId: auth.currentUser?.uid,
        customerName: fullName,
        customerEmail: auth.currentUser?.email,
        address: address,
        phone: phone,
        items: cart,
        total: totalPrice,
        status: 'pending_payment',
        createdAt: serverTimestamp(),
        paymentMethod: 'stripe_gateway'
      };

      await addDoc(collection(db, "orders"), orderData);
      
      // Simulate Stripe Success
      setTimeout(() => {
        setStatus('success');
        clearCart();
      }, 2000);

    } catch (error) {
      console.error("Order Error:", error);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 px-4 md:px-8 selection:bg-violet-500/30">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Form Section */}
        <form onSubmit={triggerConfirmation} className="space-y-8">
          <section>
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-6 flex items-center gap-2 italic">
              <MapPin className="text-violet-500" /> Delivery Details
            </h2>
            <div className="space-y-4">
              <input type="text" required placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-violet-500 outline-none transition-all" />
              <input type="tel" required placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-violet-500 outline-none transition-all" />
              <textarea required placeholder="Full Shipping Address" rows={3} value={address} onChange={(e) => setAddress(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-violet-500 outline-none transition-all resize-none" />
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-6 flex items-center gap-2 italic">
              <CreditCard className="text-violet-500" /> Payment Method
            </h2>
            <div className="p-6 rounded-2xl bg-violet-600/10 border border-violet-500/30 flex items-center justify-between">
              <span className="text-white font-bold uppercase text-xs tracking-widest">Secure Stripe Gateway</span>
              <div className="w-5 h-5 rounded-full border-2 border-violet-500 bg-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.6)] flex items-center justify-center">
                 <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
            </div>
          </section>
        </form>

        {/* Summary Card */}
        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-xl h-fit sticky top-32">
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-8 italic">Order <span className="text-violet-500">Summary</span></h2>
          <div className="space-y-4 mb-8">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center text-sm">
                <span className="text-white font-bold uppercase tracking-tight italic">{item.name} x{item.quantity}</span>
                <span className="text-white font-mono">₱{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-6">
            <div className="flex justify-between items-end">
              <span className="text-white font-black uppercase text-xl italic">Grand Total</span>
              <span className="text-violet-400 font-black text-3xl font-mono">₱{totalPrice.toLocaleString()}</span>
            </div>
          </div>
          <button onClick={triggerConfirmation} className="w-full bg-violet-600 hover:bg-violet-500 text-white font-black py-5 rounded-2xl mt-10 transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
            <ShieldCheck size={20} /> Place Secure Order
          </button>
        </div>
      </div>

      {/* --- CHECKOUT OVERLAY MODAL --- */}
      <AnimatePresence>
        {status !== 'idle' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="relative w-full max-w-md bg-[#0f0f0f] border border-white/10 rounded-[3rem] p-10 text-center shadow-2xl">
              
              {/* 1. COUNTDOWN STATE */}
              {status === 'confirming' && (
                <div className="space-y-6">
                  <div className="w-20 h-20 bg-violet-500/10 border border-violet-500/20 rounded-full flex items-center justify-center mx-auto relative">
                    <Timer className="text-violet-500 animate-pulse" size={32} />
                    <span className="absolute -top-1 -right-1 bg-violet-600 text-white text-xs font-black w-7 h-7 rounded-full flex items-center justify-center border-2 border-[#0f0f0f]">
                      {countdown}
                    </span>
                  </div>
                  <h3 className="text-white font-black uppercase italic text-xl tracking-tighter">Finalizing Order...</h3>
                  <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest leading-relaxed">
                    Preparing secure payment gateway. You can still cancel this action now.
                  </p>
                  <button onClick={() => setStatus('idle')} className="w-full py-4 border border-white/10 rounded-2xl text-white/40 hover:text-white hover:bg-white/5 transition-all text-[10px] font-black uppercase tracking-widest">
                    Cancel and Edit
                  </button>
                </div>
              )}

              {/* 2. PROCESSING STATE */}
              {status === 'processing' && (
                <div className="space-y-6 py-10">
                  <Loader2 className="text-violet-500 animate-spin mx-auto" size={48} />
                  <h3 className="text-white font-black uppercase italic text-xl tracking-tighter">Processing...</h3>
                  <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest">DO NOT REFRESH THIS PAGE</p>
                </div>
              )}

              {/* 3. SUCCESS STATE */}
              {status === 'success' && (
                <div className="space-y-6">
                  <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="text-green-500" size={40} />
                  </div>
                  <h3 className="text-white font-black uppercase italic text-xl tracking-tighter">Order <span className="text-green-500">Secured</span></h3>
                  <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest leading-relaxed">
                    Check your email for the receipt. Your gear is now in production!
                  </p>
                  <button onClick={() => navigate('/dashboard')} className="w-full py-4 bg-green-600 rounded-2xl text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-green-600/20">
                    View My Dashboard
                  </button>
                </div>
              )}

              {/* 4. ERROR STATE */}
              {status === 'error' && (
                <div className="space-y-6">
                  <div className="w-20 h-20 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto">
                    <AlertCircle className="text-red-500" size={40} />
                  </div>
                  <h3 className="text-white font-black uppercase italic text-xl tracking-tighter">Payment Failed</h3>
                  <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest leading-relaxed">
                    We couldn't process your payment. Please check your balance or try again.
                  </p>
                  <button onClick={() => setStatus('idle')} className="w-full py-4 bg-red-600 rounded-2xl text-white text-[10px] font-black uppercase tracking-widest">
                    Try Again
                  </button>
                </div>
              )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}