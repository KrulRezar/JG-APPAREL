import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth'; 
import { auth } from '../firebaseConfig';

export function CustomerLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      localStorage.setItem('customer_token', await user.getIdToken());
      navigate('/shop');
    } catch (err: any) {
      if (err.code === 'auth/invalid-credential') {
        setError('Incorrect email or password.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Try again later.');
      } else {
        setError('Authentication failed. Please check your connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4 font-sans selection:bg-violet-500/30">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/10 blur-[120px] rounded-full" />

      <div className="relative w-full max-w-md p-10 rounded-[2.5rem] backdrop-blur-2xl bg-white/5 border border-white/10 shadow-2xl">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter italic">
            CUSTOMER <span className="text-violet-500">LOGIN</span>
          </h1>
          <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em]">
            Sign in to manage your orders
          </p>
        </header>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 text-[10px] font-black uppercase tracking-widest animate-pulse">
            <AlertCircle size={14} />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/10" />
              <input
                type="email"
                required
                className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/5 focus:outline-none focus:border-violet-500/50 transition-all text-sm"
                placeholder="customer@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/10" />
              <input
                type="password"
                required
                className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/5 focus:outline-none focus:border-violet-500/50 transition-all text-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white font-black py-5 rounded-2xl shadow-xl shadow-violet-600/20 transition-all active:scale-[0.98] uppercase tracking-[0.2em] flex items-center justify-center gap-2 group"
          >
            {loading ? 'Verifying...' : 'Sign In'}
            {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-white/5 text-center">
          <button 
            onClick={() => navigate('/register')}
            className="text-white/30 text-[10px] font-black uppercase tracking-widest hover:text-violet-400 transition-colors"
          >
            No account? <span className="text-white">Create one now</span>
          </button>
        </div>
      </div>
    </div>
  );
}