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

/* --- UTILITY COMPONENTS --- */
import { seedProducts } from './components/utils/seeder'; // adjust path

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

/* --- SECURITY HELPERS --- */

const isAdminAuthenticated = () => !!localStorage.getItem('admin_token');

const checkAdminLockout = () => {
  const attempts = Number(localStorage.getItem('admin_attempts') || 0);
  const lockUntil = Number(localStorage.getItem('admin_lockout_until') || 0);
  const now = Date.now();

  if (lockUntil > now) {
    const remainingMinutes = Math.ceil((lockUntil - now) / 60000);
    return { isLocked: true, remainingMinutes };
  }
  return { isLocked: false, remainingMinutes: 0 };
};

// Fixed with React.ReactNode for broader compatibility
const ProtectedRoute = ({ 
  children, 
  isAllowed, 
  redirectTo = "/login" 
}: { 
  children: React.ReactNode, 
  isAllowed: boolean, 
  redirectTo?: string 
}) => {
  return isAllowed ? children : <Navigate to={redirectTo} replace />;
};

/* --- LAYOUT WRAPPERS --- */

const SiteLayout = ({ children, user }: { children: ReactNode, user: any }) => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/system-portal');

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen font-sans selection:bg-violet-500/30">
      {!isAdminPath && <Navbar user={user} />}
      {!isAdminPath && <CartDrawer />}
      {children}
    </div>
  );
};

const LandingLayout = ({ children }: { children: ReactNode }) => (
  <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
    {children}
  </div>
);

/* --- MAIN APP COMPONENT --- */

export default function App() {
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [customerUser, setCustomerUser] = useState<any>(null);
  const { isLocked, remainingMinutes } = checkAdminLockout();
  useEffect(() => {
    // UNCOMMENT THE LINE BELOW TO RUN ONCE
  seedProducts(); 
  }, []);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Logic: Only consider "Authenticated" if verified OR Google user
      if (user && (user.emailVerified || user.providerData[0]?.providerId === 'google.com')) {
        setCustomerUser(user);
        user.getIdToken().then(token => localStorage.setItem('customer_token', token));
      } else {
        setCustomerUser(null);
        localStorage.removeItem('customer_token');
      }
      setIsAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin" />
      </div>
    );
  }

  const isCustomerAuth = !!customerUser;

  return (
    <Router>
      <ScrollToTop />
      <SiteLayout user={customerUser}>
        <Routes>
          <Route path="/" element={<LandingLayout><LandingPage /></LandingLayout>} />
          <Route path="/shop" element={<Store />} />
          <Route path="/login" element={<CustomerLogin />} />
          <Route path="/register" element={<CustomerRegister />} />
          
          <Route 
            path="/dashboard"  
            element={
              <ProtectedRoute isAllowed={isCustomerAuth}>
                <CustomerDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/checkout" 
            element={
              <ProtectedRoute isAllowed={isCustomerAuth}>
                <Checkout />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/system-portal-gate" 
            element={
              isLocked ? (
                <div className="flex items-center justify-center min-h-screen p-4 text-center">
                   <h2 className="text-red-400 font-bold uppercase italic">System Locked: {remainingMinutes}m</h2>
                </div>
              ) : <AdminLogin />
            } 
          />

          <Route 
            path="/system-portal-dashboard" 
            element={
              <ProtectedRoute isAllowed={isAdminAuthenticated()} redirectTo="/system-portal-gate">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </SiteLayout>
    </Router>
  );
}