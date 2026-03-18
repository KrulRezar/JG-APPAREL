import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Package, LogOut, Settings, CreditCard, Lock as LockIcon, Loader2, Save, ShieldCheck, Mail, CheckCircle2 } from 'lucide-react';
import { auth, db } from '../firebaseConfig';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { onAuthStateChanged, updateProfile, updatePassword, updateEmail } from 'firebase/auth';

interface Order {
  id: string;
  total: number;
  status: string;
  createdAt: any;
  items: any[];
}

type ViewState = 'overview' | 'profile' | 'security';

export function CustomerDashboard() {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<ViewState>('overview');
  const [user, setUser] = useState(auth.currentUser);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalSpent, setTotalSpent] = useState(0);

  // Form States
  const [newName, setNewName] = useState(user?.displayName || '');
  const [newEmail, setNewEmail] = useState(user?.email || '');
  const [newPass, setNewPass] = useState('');
  const [formMsg, setFormMsg] = useState({ text: '', type: '' });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setNewName(currentUser.displayName || '');
        setNewEmail(currentUser.email || '');
        fetchOrders(currentUser.uid);
      } else {
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const fetchOrders = async (uid: string) => {
    try {
      const q = query(collection(db, "orders"), where("customerId", "==", uid), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const fetchedOrders: Order[] = [];
      let spent = 0;
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Order;
        fetchedOrders.push({ ...data, id: doc.id });
        spent += data.total || 0;
      });
      setOrders(fetchedOrders);
      setTotalSpent(spent);
    } catch (error) { console.error(error); } finally { setLoading(false); }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;
    try {
      await updateProfile(auth.currentUser, { displayName: newName });
      setFormMsg({ text: 'Profile updated successfully!', type: 'success' });
    } catch (err) { setFormMsg({ text: 'Update failed. Try logging in again.', type: 'error' }); }
  };

  const handleUpdateSecurity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;
    try {
      if (newEmail !== auth.currentUser.email) await updateEmail(auth.currentUser, newEmail);
      if (newPass) await updatePassword(auth.currentUser, newPass);
      setFormMsg({ text: 'Security credentials updated!', type: 'success' });
      setNewPass('');
    } catch (err) { setFormMsg({ text: 'Re-authentication required for security changes.', type: 'error' }); }
  };

  if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center"><Loader2 className="text-violet-500 animate-spin" size={40} /></div>;

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-violet-600/20 flex items-center justify-center border border-violet-500/30">
                <User className="text-violet-500" size={24} />
              </div>
              <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic">
                {user?.displayName?.split(' ')[0] || 'Customer'} <span className="text-violet-500">Hub</span>
              </h1>
            </div>
            <p className="text-white/40 font-medium uppercase tracking-widest text-[10px]">Account ID: {user?.uid.slice(0, 12)}</p>
          </div>
          <button onClick={() => auth.signOut()} className="flex items-center gap-2 text-red-400/60 hover:text-red-400 transition-colors text-xs font-black uppercase tracking-widest"><LogOut size={18} /> Sign Out</button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            
            {activeView === 'overview' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <DashboardCard icon={<Package className="text-violet-500" />} title="Recent Orders" value={`${orders.length}`} desc="Items in production/shipped" />
                  <DashboardCard icon={<CreditCard className="text-violet-500" />} title="Total Spent" value={`₱${totalSpent.toLocaleString()}`} desc="Lifetime investment" />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-xl">
                  <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-widest italic">Order History</h3>
                  {orders.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead className="text-[10px] text-white/30 uppercase tracking-widest border-b border-white/5">
                          <tr><th className="pb-4">Order ID</th><th className="pb-4">Status</th><th className="pb-4 text-right">Amount</th></tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {orders.map((o) => (
                            <tr key={o.id} className="group">
                              <td className="py-4 text-xs font-mono text-white/60">#{o.id.slice(0, 8)}</td>
                              <td className="py-4"><span className="text-[10px] font-black uppercase tracking-tighter px-2 py-1 rounded-md bg-violet-500/10 text-violet-400 border border-violet-500/20">{o.status}</span></td>
                              <td className="py-4 text-right text-sm font-bold text-white">₱{o.total.toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : <p className="text-white/20 italic text-sm text-center py-10">No orders yet.</p>}
                </div>
              </>
            )}

            {(activeView === 'profile' || activeView === 'security') && (
              <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-violet-500" />
                <button onClick={() => {setActiveView('overview'); setFormMsg({text:'', type:''});}} className="text-violet-400 text-[10px] font-black uppercase tracking-widest mb-6 block hover:underline">← Back to Overview</button>
                
                {activeView === 'profile' ? (
                  <form onSubmit={handleUpdateProfile} className="space-y-6">
                    <h3 className="text-2xl font-black text-white uppercase italic">Edit <span className="text-violet-500">Profile</span></h3>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-white/30 uppercase tracking-widest ml-1">Display Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                        <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 text-white outline-none focus:border-violet-500/50 transition-all" />
                      </div>
                    </div>
                    <button type="submit" className="bg-violet-600 hover:bg-violet-700 text-white font-black py-4 px-8 rounded-2xl uppercase tracking-widest text-xs flex items-center gap-2"><Save size={16} /> Save Changes</button>
                  </form>
                ) : (
                  <form onSubmit={handleUpdateSecurity} className="space-y-6">
                    <h3 className="text-2xl font-black text-white uppercase italic">Security <span className="text-violet-500">Portal</span></h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/30 uppercase tracking-widest ml-1">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                          <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 text-white outline-none focus:border-violet-500/50 transition-all" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/30 uppercase tracking-widest ml-1">New Password (Leave blank to keep current)</label>
                        <div className="relative">
                          <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                          <input type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)} placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 text-white outline-none focus:border-violet-500/50 transition-all" />
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="bg-violet-600 hover:bg-violet-700 text-white font-black py-4 px-8 rounded-2xl uppercase tracking-widest text-xs flex items-center gap-2"><LockIcon size={16} /> Update Credentials</button>
                  </form>
                )}
                {formMsg.text && (
                  <div className={`mt-6 p-4 rounded-xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest ${formMsg.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                    {formMsg.type === 'success' ? <CheckCircle2 size={14} /> : <Loader2 size={14} className="animate-spin" />} {formMsg.text}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 h-fit backdrop-blur-xl">
              <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-widest italic">Navigation</h3>
              <nav className="space-y-4">
                <NavButton active={activeView === 'overview'} onClick={() => setActiveView('overview')} icon={<Package size={16}/>} label="Overview" />
                <NavButton active={activeView === 'profile'} onClick={() => {setActiveView('profile'); setFormMsg({text:'', type:''});}} icon={<Settings size={16}/>} label="Edit Profile" />
                <NavButton active={activeView === 'security'} onClick={() => {setActiveView('security'); setFormMsg({text:'', type:''});}} icon={<LockIcon size={16}/>} label="Security" />
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: any) {
  return (
    <button onClick={onClick} className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all border ${active ? 'bg-violet-600 border-violet-500 text-white shadow-lg shadow-violet-600/20' : 'bg-white/5 border-white/5 text-white/40 hover:text-white hover:bg-white/10'}`}>
      <span className="text-xs font-black uppercase tracking-widest">{label}</span>
      {icon}
    </button>
  );
}

function DashboardCard({ icon, title, value, desc }: any) {
  return (
    <div className="bg-white/5 border border-white/10 p-8 rounded-[3rem] backdrop-blur-xl">
      <div className="flex items-center gap-3 mb-4">{icon} <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">{title}</span></div>
      <h4 className="text-3xl font-black text-white mb-1 italic">{value}</h4>
      <p className="text-white/40 text-[10px] uppercase font-bold tracking-wider">{desc}</p>
    </div>
  );
}