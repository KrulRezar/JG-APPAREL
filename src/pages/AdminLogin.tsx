import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Lock, User, AlertCircle } from 'lucide-react';

export const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem('admin_token') === 'true') {
      navigate('/system-portal-dashboard');
    }
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Secure Credential Check
    // In production, this would be an API call
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('admin_token', 'true');
      localStorage.setItem('admin_attempts', '0');
      setError('');
      // Success: Navigate to the dashboard
      navigate('/system-portal-dashboard');
    } else {
      // 2. Failure Logic & Attempt Tracking
      const currentAttempts = Number(localStorage.getItem('admin_attempts') || 0) + 1;
      localStorage.setItem('admin_attempts', currentAttempts.toString());

      if (currentAttempts >= 5) {
        // 3. 2-Hour Cooldown (7,200,000ms)
        const cooldownTime = Date.now() + 7200000;
        localStorage.setItem('admin_lockout_until', cooldownTime.toString());
        // Trigger page refresh to let App.tsx handle the lockout view
        window.location.reload();
      } else {
        setError(`Access Denied. ${5 - currentAttempts} attempts remaining.`);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#060606] px-4 font-sans">
      <div className="max-w-md w-full p-10 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl relative overflow-hidden">
        {/* Decorative Glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-violet-600/10 blur-[80px] rounded-full" />
        
        <div className="relative z-10">
          <div className="flex flex-col items-center mb-10">
            <div className="w-20 h-20 bg-violet-600/10 rounded-3xl flex items-center justify-center mb-6 border border-violet-500/20 shadow-[0_0_40px_rgba(139,92,246,0.1)]">
              <ShieldAlert className="text-violet-500" size={40} />
            </div>
            <h1 className="text-3xl font-black uppercase tracking-tighter text-white">System Gate</h1>
            <p className="text-white/30 text-[10px] mt-2 font-bold uppercase tracking-[0.4em]">Internal Security Protocol</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input 
                  type="text" 
                  autoComplete="off"
                  placeholder="IDENTIFIER"
                  className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/10 text-sm focus:outline-none focus:border-violet-500/50 transition-all uppercase tracking-widest"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input 
                  type="password" 
                  placeholder="SECURITY KEY"
                  className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/10 text-sm focus:outline-none focus:border-violet-500/50 transition-all tracking-widest"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            
            {error && (
              <div className="flex items-center justify-center gap-2 text-red-400 bg-red-400/5 border border-red-400/10 py-3 rounded-xl">
                <AlertCircle size={14} />
                <p className="text-[10px] font-bold uppercase tracking-widest">{error}</p>
              </div>
            )}

            <button className="w-full bg-violet-600 hover:bg-violet-500 text-white font-black py-4 rounded-2xl mt-4 shadow-[0_0_30px_rgba(139,92,246,0.2)] transition-all uppercase tracking-[0.2em] active:scale-[0.98]">
              Initiate Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};