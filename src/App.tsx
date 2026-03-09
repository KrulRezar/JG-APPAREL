import React, { ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Layout Components
import { Navbar } from './components/layout/Navbar';
import { CartDrawer } from './components/layout/CartDrawer';

// Pages
import LandingPage from './pages/LandingPage'; 
import { Store } from './pages/Store';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { CustomerLogin } from './pages/CustomerLogin';
import { CustomerRegister } from './pages/CustomerRegister'; // Added Registration Page
import { Checkout} from './pages/Checkout';
import { CustomerDashboard } from './pages/CustomerDashboard';

interface LandingLayoutProps {
  children: ReactNode;
}

// Security Helpers
const isAdminAuthenticated = () => !!localStorage.getItem('admin_token');
const isCustomerAuthenticated = () => !!localStorage.getItem('customer_token');

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

// Wrapper to hide Navbar/Cart on Admin pages
const SiteLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  // Hide UI for all paths starting with /system-portal
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

export default function App() {
  const { isLocked, remainingMinutes } = checkAdminLockout();

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

          {/* Customer Routes */}
          <Route path="/shop" element={<Store />} />
          <Route path="/login" element={<CustomerLogin />} />
          <Route path="/register" element={<CustomerRegister />} /> {/* Added Register Route */}
          <Route path="/dashboard"  element={isCustomerAuthenticated() ? <CustomerDashboard /> : <Navigate to="/login" replace />} />
          
          {/* Protected Checkout Route */}
          <Route 
            path="/checkout" 
            element={
              isCustomerAuthenticated() ? <Checkout /> : <Navigate to="/login" replace />
            } 
          />
          
          {/* SECRET ADMIN ROUTES */}
          <Route 
            path="/system-portal-gate" 
            element={
              isLocked ? (
                <div className="flex items-center justify-center min-h-screen">
                  <div className="p-10 bg-white/5 border border-red-500/20 rounded-[2rem] text-center backdrop-blur-2xl">
                    <h2 className="text-red-400 font-black text-2xl mb-2 uppercase tracking-tighter">System Locked</h2>
                    <p className="text-white/60 text-sm">Too many failed attempts. Try again in {remainingMinutes} minutes.</p>
                  </div>
                </div>
              ) : <AdminLogin />
            } 
          />

          <Route 
            path="/system-portal-dashboard" 
            element={
              isAdminAuthenticated() ? <AdminDashboard /> : <Navigate to="/system-portal-gate" />
            } 
          />

          {/* Fallback to Home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </SiteLayout>
    </Router>
  );
}