import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Package, LogOut, Settings, CreditCard, Lock as LockIcon, Loader2 } from 'lucide-react';
import { auth, db } from '../firebaseConfig'; // Added db
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

// Types for your Order data
interface Order {
  id: string;
  total: number;
  status: string;
  createdAt: any;
  items: any[];
}

export function CustomerDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(auth.currentUser);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    // 1. Listen for auth state to handle refreshes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchOrders(currentUser.uid);
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // 2. Fetch Orders from Firestore
  const fetchOrders = async (uid: string) => {
    try {
      const ordersRef = collection(db, "orders");
      // Query orders where customerId matches the logged-in user
      const q = query(
        ordersRef, 
        where("customerId", "==", uid),
        orderBy("createdAt", "desc")
      );

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
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem('customer_token');
      navigate('/');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <Loader2 className="text-violet-500 animate-spin" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 px-4 md:px-8 selection:bg-violet-500/30">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-violet-600/5 blur-[120px] rounded-full -z-10" />
      
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
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
            <p className="text-white/40 font-medium uppercase tracking-widest text-[10px]">
              Account ID: {user?.uid.slice(0, 12)}
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
              value={`${orders.length} Orders`} 
              desc={orders.length > 0 ? "Items in production/shipped" : "No active shipments"} 
            />
            <DashboardCard 
              icon={<CreditCard className="text-violet-500" />} 
              title="Total Spent" 
              value={`₱${totalSpent.toLocaleString()}`} 
              desc="Lifetime investment" 
            />

            {/* Order History Table */}
            <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-xl">
              <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-widest italic">Order History</h3>
              
              {orders.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="text-[10px] text-white/30 uppercase tracking-widest border-b border-white/5">
                      <tr>
                        <th className="pb-4">Order ID</th>
                        <th className="pb-4">Status</th>
                        <th className="pb-4 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {orders.map((order) => (
                        <tr key={order.id} className="group">
                          <td className="py-4 text-xs font-mono text-white/60">#{order.id.slice(0, 8)}</td>
                          <td className="py-4">
                            <span className="text-[10px] font-black uppercase tracking-tighter px-2 py-1 rounded-md bg-violet-500/10 text-violet-400 border border-violet-500/20">
                              {order.status || 'Processing'}
                            </span>
                          </td>
                          <td className="py-4 text-right text-sm font-bold text-white">₱{order.total.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-white/20 italic text-sm">You haven't placed any orders yet.</p>
                  <button 
                    onClick={() => navigate('/shop')}
                    className="mt-4 text-violet-400 text-xs font-black uppercase tracking-widest hover:text-violet-300"
                  >
                    Browse the Store
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Account Settings Sidebar */}
          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 h-fit">
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-widest italic">Settings</h3>
            <nav className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all">
                <span className="text-xs font-bold uppercase tracking-widest">Edit Profile</span>
                <Settings size={16} />
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all">
                <span className="text-xs font-bold uppercase tracking-widest">Security</span>
                <LockIcon size={16} />
              </button>
            </nav>
            
            <div className="mt-10 p-6 rounded-2xl bg-violet-600/5 border border-violet-500/10">
              <p className="text-[10px] text-white/40 leading-relaxed uppercase font-bold tracking-wider">
                Member Since <br />
                <span className="text-white/80">{user?.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}</span>
              </p>
            </div>
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
      <h4 className="text-3xl font-black text-white mb-1 tracking-tighter italic">{value}</h4>
      <p className="text-white/40 text-[10px] uppercase font-bold tracking-wider">{desc}</p>
    </div>
  );
}