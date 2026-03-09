import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Settings, 
  TrendingUp, 
  LogOut, 
  Plus, 
  Edit3, 
  Trash2 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/'); // Redirect to public landing page
  };

  return (
    <div className="fixed inset-0 bg-[#060606] flex text-white font-sans overflow-hidden z-[100]">
      {/* Sidebar - Isolated from public Navbar */}
      <aside className="w-72 border-r border-white/5 bg-[#0a0a0a] p-8 flex flex-col">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-violet-600 rounded-xl shadow-lg shadow-violet-600/20 flex items-center justify-center">
            <LayoutDashboard size={20} />
          </div>
          <div>
            <span className="block font-black text-xl tracking-tighter leading-none">COMMAND</span>
            <span className="text-[10px] text-violet-400 font-bold tracking-[0.3em] uppercase">Center</span>
          </div>
        </div>

        <nav className="space-y-2 flex-grow">
          <NavItem 
            icon={<LayoutDashboard size={18}/>} 
            label="Overview" 
            active={activeTab === 'Overview'} 
            onClick={() => setActiveTab('Overview')} 
          />
          <NavItem 
            icon={<Package size={18}/>} 
            label="Products" 
            active={activeTab === 'Products'} 
            onClick={() => setActiveTab('Products')} 
          />
          <NavItem icon={<Users size={18}/>} label="Customers" />
          <NavItem icon={<TrendingUp size={18}/>} label="Analytics" />
        </nav>

        <div className="pt-6 border-t border-white/5 space-y-2">
          <NavItem icon={<Settings size={18}/>} label="Settings" />
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all text-red-400/60 hover:text-red-400 hover:bg-red-400/5 uppercase text-[10px] font-black tracking-widest"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Panel */}
      <main className="flex-1 p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'Overview' ? (
            <OverviewSection />
          ) : (
            <ProductManagementSection />
          )}
        </div>
      </main>
    </div>
  );
};

/* --- SUB-SECTIONS --- */

const OverviewSection = () => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
    <header className="mb-12">
      <h1 className="text-4xl font-black uppercase tracking-tighter">Business <span className="text-violet-500">Pulse</span></h1>
      <p className="text-white/40 mt-1">Real-time statistics for JG Apparel [cite: 2026-02-23]</p>
    </header>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <StatCard title="Total Revenue" value="₱428,900" trend="+14.2%" />
      <StatCard title="Total Orders" value="156" trend="+8.1%" />
      <StatCard title="Active Visitors" value="1,204" trend="+22.5%" />
    </div>

    <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-xl">
      <h3 className="text-xl font-bold mb-8">Live Transactions</h3>
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex justify-between items-center py-4 border-b border-white/5 last:border-0">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-violet-600/10 flex items-center justify-center text-violet-500 font-bold">
                #{i}
              </div>
              <div>
                <p className="font-bold">Order ID #829{i}</p>
                <p className="text-white/40 text-xs italic">Processing Payment...</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-violet-400">₱2,450</p>
              <p className="text-[10px] text-white/30 uppercase tracking-widest font-black">Success</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ProductManagementSection = () => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
    <header className="mb-12 flex justify-between items-end">
      <div>
        <h1 className="text-4xl font-black uppercase tracking-tighter">Inventory <span className="text-violet-500">Manager</span></h1>
        <p className="text-white/40 mt-1">Update your sports apparel collection [cite: 2026-02-23]</p>
      </div>
      <button className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 px-6 py-3 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-violet-600/20">
        <Plus size={18} /> Add New Item
      </button>
    </header>

    <div className="grid grid-cols-1 gap-4">
      {['Elite Performance Jersey', 'Vanguard Shorts', 'Stealth Windbreaker'].map((name, i) => (
        <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center justify-between group hover:border-violet-500/30 transition-colors">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-zinc-800 rounded-xl overflow-hidden">
              <div className="w-full h-full bg-violet-600/20 flex items-center justify-center text-violet-500 font-bold italic">IMG</div>
            </div>
            <div>
              <h4 className="font-bold text-lg">{name}</h4>
              <p className="text-violet-400 font-mono">₱{i + 1},500.00</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"><Edit3 size={18} /></button>
            <button className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-colors"><Trash2 size={18} /></button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* --- UI COMPONENTS --- */

const NavItem = ({ icon, label, active = false, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
      active 
        ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20' 
        : 'text-white/40 hover:text-white hover:bg-white/5'
    }`}
  >
    {icon} 
    <span className="text-[10px] font-black uppercase tracking-[0.2em]">{label}</span>
  </button>
);

const StatCard = ({ title, value, trend }: any) => (
  <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-md relative overflow-hidden group">
    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-violet-600/5 blur-3xl rounded-full group-hover:bg-violet-600/10 transition-colors" />
    <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.2em] mb-2">{title}</p>
    <div className="flex items-baseline gap-3">
      <h4 className="text-3xl font-black tracking-tighter">{value}</h4>
      <span className="text-emerald-400 text-[10px] font-black">{trend}</span>
    </div>
  </div>
);