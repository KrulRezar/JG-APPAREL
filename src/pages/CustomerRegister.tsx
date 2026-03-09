import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, AlertCircle, ArrowRight } from 'lucide-react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export function CustomerRegister() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match.');
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      // Set the display name for the customer
      await updateProfile(userCredential.user, { displayName: formData.name });
      
      localStorage.setItem('customer_token', await userCredential.user.getIdToken());
      navigate('/shop');
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered.');
      } else {
        setError('Registration failed. Try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4 font-sans">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/10 blur-[120px] rounded-full" />

      <div className="relative w-full max-w-md p-10 rounded-[2.5rem] backdrop-blur-2xl bg-white/5 border border-white/10 shadow-2xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter italic">
            CREATE <span className="text-violet-500">ACCOUNT</span>
          </h1>
          <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em]">Join JG Apparel</p>
        </header>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 text-[10px] font-black uppercase tracking-widest">
            <AlertCircle size={14} />
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/10" />
              <input
                type="text"
                required
                className="w-full bg-black/40 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-white/5 focus:outline-none focus:border-violet-500/50 transition-all text-sm"
                placeholder="Juana Dela Cruz"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/10" />
              <input
                type="email"
                required
                className="w-full bg-black/40 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-white/5 focus:outline-none focus:border-violet-500/50 transition-all text-sm"
                placeholder="customer@email.com"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/10" />
              <input
                type="password"
                required
                className="w-full bg-black/40 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-violet-500/50 transition-all text-sm"
                placeholder="••••••••"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] ml-1">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/10" />
              <input
                type="password"
                required
                className="w-full bg-black/40 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-violet-500/50 transition-all text-sm"
                placeholder="••••••••"
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white font-black py-4 rounded-2xl mt-4 transition-all active:scale-[0.98] uppercase tracking-[0.2em] flex items-center justify-center gap-2 group"
          >
            {loading ? 'Creating...' : 'Register Now'}
            {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <button 
            onClick={() => navigate('/login')}
            className="text-white/30 text-[10px] font-black uppercase tracking-widest hover:text-violet-400 transition-colors"
          >
            Already a member? <span className="text-white">Sign In</span>
          </button>
        </div>
      </div>
    </div>
  );
}