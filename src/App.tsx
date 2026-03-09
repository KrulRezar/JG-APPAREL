import React, { ReactNode, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';

// Layout Components
import { Navbar } from './components/layout/Navbar';
import { CartDrawer } from './components/layout/CartDrawer';

// Pages
import LandingPage from './pages/LandingPage'; 
import { Store } from './pages/Store';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { CustomerLogin } from './pages/CustomerLogin';
import { CustomerRegister } from './pages/CustomerRegister';
import { Checkout } from './pages/Checkout';
import { CustomerDashboard } from './pages/CustomerDashboard';

interface LandingLayoutProps {
  children: ReactNode;
}

/* --- SECURITY HELPERS --- */

// Admin check remains local-storage based for your secret portal
const isAdminAuthenticated = () => !!localStorage.getItem('admin_token');

// Lockout Logic: 5 tries, 2-hour cooldown
const checkAdminLockout = () => {
  const attempts = Number(localStorage.getItem('admin_attempts') || 0);
  const lockUntil = Number(localStorage.getItem('admin_lockout_until') || 0);
  const now = Date.now();

  if (lockUntil > now) {
    const remainingMinutes = Math.ceil((lockUntil - now) / 60000);
    return { isLocked: true, remainingMinutes };
  }
  
  if (attempts >= 5) {
    localStorage.setItem('admin_attempts', '0');
  }
  
  return { isLocked: false, remainingMinutes: 0 };
};

/* --- LAYOUT WRAPPERS --- */

// Wrapper to hide Navbar/Cart on Admin pages
const SiteLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/system-portal');

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen font-sans selection:bg-violet-500/30">
      {!isAdminPath && <Navbar />}
      {!isAdminPath && <CartDrawer />}
      {children}
    </div>
  );
};

const LandingLayout = ({ children }: LandingLayoutProps) => (
  <div 
    className="h-screen overflow-y-scroll" 
    style={{ scrollSnapType: 'y mandatory' }}
  >
    {children}
  </div>
);

/* --- MAIN APP COMPONENT --- */

export default function App() {
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [customerUser, setCustomerUser] = useState<any>(null);
  const { isLocked, remainingMinutes } = checkAdminLockout();

  // Listen for Firebase Auth changes to handle persistence
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCustomerUser(user);
      if (user) {
        user.getIdToken().then(token => localStorage.setItem('customer_token', token));
      } else {
        localStorage.removeItem('customer_token');
      }
      setIsAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Prevent routing logic from running until we know the auth state
  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin" />
      </div>
    );
  }

  const isCustomerAuth = !!customerUser || !!localStorage.getItem('customer_token');

  return (
    <Router>
      <SiteLayout>
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={
            <LandingLayout>
              <LandingPage />
            </LandingLayout>
          } />

          {/* Customer Public Routes */}
          <Route path="/shop" element={<Store />} />
          <Route path="/login" element={<CustomerLogin />} />
          <Route path="/register" element={<CustomerRegister />} />
          
          {/* Customer Protected Routes */}
          <Route 
            path="/dashboard"  
            element={isCustomerAuth ? <CustomerDashboard /> : <Navigate to="/login" replace />} 
          />
          
          <Route 
            path="/checkout" 
            element={isCustomerAuth ? <Checkout /> : <Navigate to="/login" replace />} 
          />
          
          {/* SECRET ADMIN GATEWAY */}
          <Route 
            path="/system-portal-gate" 
            element={
              isLocked ? (
                <div className="flex items-center justify-center min-h-screen p-4">
                  <div className="max-w-md w-full p-10 bg-white/5 border border-red-500/20 rounded-[2.5rem] text-center backdrop-blur-2xl">
                    <h2 className="text-red-400 font-black text-2xl mb-2 uppercase tracking-tighter italic">System Locked</h2>
                    <p className="text-white/60 text-sm leading-relaxed">
                      Security protocol active. Too many failed attempts detected. <br />
                      Access restored in <span className="text-white font-bold">{remainingMinutes} minutes</span>.
                    </p>
                  </div>
                </div>
              ) : <AdminLogin />
            } 
          />

          {/* SECRET ADMIN DASHBOARD */}
          <Route 
            path="/system-portal-dashboard" 
            element={
              isAdminAuthenticated() ? <AdminDashboard /> : <Navigate to="/system-portal-gate" replace />
            } 
          />

          {/* Global Fallback: Sends unknown paths to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </SiteLayout>
    </Router>
  );
}