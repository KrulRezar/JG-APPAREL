import React from 'react';
import { useNavigate } from 'react-router-dom';
// Alias 'Lock' to 'LockIcon' to avoid conflict with built-in global types
import { User, Package, LogOut, Settings, CreditCard, Lock as LockIcon } from 'lucide-react';
import { auth } from '../firebaseConfig';

export function CustomerDashboard() {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem('customer_token');
      navigate('/');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-violet-600/20 flex items-center justify-center border border-violet-500/30">
                <User className="text-violet-500" size={24} />
              </div>
              <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic">
                {user?.displayName || 'Customer'} <span className="text-violet-500">Hub</span>
              </h1>
            </div>
            <p className="text-white/40 font-medium uppercase tracking-widest text-[10px]">
              Account ID: {user?.uid.slice(0, 8)}
            </p>
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-400/60 hover:text-red-400 transition-colors text-xs font-black uppercase tracking-widest"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Stats */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <DashboardCard 
              icon={<Package className="text-violet-500" />} 
              title="Recent Orders" 
              value="0 Orders" 
              desc="No active shipments" 
            />
            <DashboardCard 
              icon={<CreditCard className="text-violet-500" />} 
              title="Total Spent" 
              value="₱0.00" 
              desc="Lifetime investment" 
            />

            {/* Recent Activity Table */}
            <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-xl">
              <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-widest">Order History</h3>
              <div className="text-center py-10">
                <p className="text-white/20 italic text-sm">You haven't placed any orders yet.</p>
                <button 
                  onClick={() => navigate('/shop')}
                  className="mt-4 text-violet-400 text-xs font-black uppercase tracking-widest hover:text-violet-300"
                >
                  Browse the Store
                </button>
              </div>
            </div>
          </div>

          {/* Account Settings Sidebar */}
          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 h-fit">
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-widest">Settings</h3>
            <nav className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all">
                <span className="text-sm font-bold uppercase tracking-widest">Edit Profile</span>
                <Settings size={16} />
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all">
                <span className="text-sm font-bold uppercase tracking-widest">Security</span>
                <LockIcon size={16} /> {/* Updated to LockIcon */}
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ icon, title, value, desc }: any) {
  return (
    <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-xl transition-all hover:border-violet-500/30">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">{title}</span>
      </div>
      <h4 className="text-3xl font-black text-white mb-1">{value}</h4>
      <p className="text-white/40 text-xs">{desc}</p>
    </div>
  );
}