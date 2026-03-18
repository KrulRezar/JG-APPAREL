import { motion, AnimatePresence } from 'motion/react';
import { Shirt, Ruler, TruckIcon, CreditCard, ChevronRight, X, MapPin, PackageCheck,Clock } from 'lucide-react';
import { useState } from 'react';

// --- DATA STRUCTURES ---
const collarTypes = [
  {
    name: 'Pro Crew Neck',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=400',
    specs: 'Heavy-duty 1x1 rib knit with double-needle cover-stitched neck seam.',
    bestFor: 'High-intensity contact sports and daily training.',
    tag: 'Most Popular'
  },
  {
    name: 'Tapered V-Neck',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=400',
    specs: 'Reinforced mitred V-joint to prevent tearing and stretching.',
    bestFor: 'Basketball and sleek, modern streetwear silhouettes.',
    tag: 'Elite Performance'
  },
  {
    name: 'Athletic Polo',
    image: 'https://images.unsplash.com/photo-1626497748470-3623761a6179?auto=format&fit=crop&q=80&w=400',
    specs: 'Fused collar stays with a 3-button reinforced placket.',
    bestFor: 'Coaching staff and corporate athletic wear.',
    tag: 'Premium'
  }
];

const modules = [
  {
    id: 1,
    icon: Shirt,
    title: 'Collar & Neck Engineering',
    description: 'Specializing in reinforced Crew-necks and Ribbed V-necks designed to maintain structural integrity after heavy usage.',
    features: ['Reinforced Ribbing', 'Anti-Sag Stitching', 'Premium Neck Tape'],
    color: '#8B5CF6',
    action: 'view_collars'
  },
  {
    id: 2,
    icon: Ruler,
    title: 'Precision Size Guide',
    description: 'Refined local sizing standards tailored for the Filipino silhouette. Use our interactive guide to find your perfect fit.',
    features: ['Local Sizing', 'Interactive Chart', 'Fit Comparison'],
    color: '#A78BFA',
    action: 'view_sizes'
  },
  {
    id: 3,
    icon: TruckIcon,
    title: 'Hub-to-Hub Delivery',
    description: 'Optimized logistics from our San Pedro workshop to designated drop-off points for secure and reliable collection.',
    features: ['Secure Hub Storage', 'Drop-off Point Receipt', 'Real-time Tracking'],
    color: '#6D28D9',
    action: 'view_delivery'
  },
];

export function CoreModules() {
  const [activeModal, setActiveModal] = useState<'sizes' | 'collars' | 'delivery' | null>(null);

  return (
    <section id="about" className="relative h-screen min-h-[800px] py-24 px-4 md:px-8 bg-[#0a0a0a] snap-start">
      <div className="max-w-7xl mx-auto h-full flex flex-col justify-center">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16 md:mb-20">
          <h2 className="text-5xl md:text-6xl tracking-tight text-white mb-6 font-black uppercase italic">
            Built with <span className="text-[#8B5CF6]">Precision</span>
          </h2>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20">
            <CreditCard size={14} className="text-violet-400" />
            <span className="text-[10px] font-bold text-violet-400 uppercase tracking-widest">50% Downpayment available for Bulk Orders</span>
          </div>
        </motion.div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {modules.map((module, index) => (
            <motion.div key={module.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="group relative h-full">
              <div className="relative h-full p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl transition-all hover:border-violet-500/30">
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-violet-600/10 border border-violet-500/20">
                    <module.icon className="w-6 h-6 text-violet-400" />
                  </div>
                  <h3 className="text-xl text-white mb-4 font-bold uppercase italic tracking-tight">{module.title}</h3>
                  <p className="text-white/50 mb-8 leading-relaxed text-sm">{module.description}</p>
                  <div className="space-y-3 mb-8">
                    {module.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                        <span className="text-[10px] text-white/40 uppercase font-black tracking-widest">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {module.action && (
                    <button 
                      onClick={() => {
                        if (module.action === 'view_sizes') setActiveModal('sizes');
                        else if (module.action === 'view_collars') setActiveModal('collars');
                        else setActiveModal('delivery');
                      }}
                      className="mt-auto flex items-center justify-between w-full p-4 rounded-2xl bg-white/5 hover:bg-violet-600 transition-all text-white group/btn"
                    >
                      <span className="text-xs font-bold uppercase tracking-widest text-left">
                        {module.action === 'view_sizes' ? 'Open Size Guide' : module.action === 'view_collars' ? 'View Specifications' : 'Fulfillment Details'}
                      </span>
                      <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeModal === 'sizes' && <SizeChartModal onClose={() => setActiveModal(null)} />}
        {activeModal === 'collars' && <CollarSpecModal onClose={() => setActiveModal(null)} />}
        {activeModal === 'delivery' && <DeliveryHubModal onClose={() => setActiveModal(null)} />}
      </AnimatePresence>
    </section>
  );
}

// --- NEW COMPONENT: DELIVERY HUB MODAL ---
function DeliveryHubModal({ onClose }: { onClose: () => void }) {
  const steps = [
    {
      icon: <Shirt size={20} />,
      title: "Production San Pedro",
      desc: "Items are crafted and quality-checked at our main workshop in San Pedro."
    },
    {
      icon: <TruckIcon size={20} />,
      title: "Hub Transfer",
      desc: "Batch orders are moved to centralized logistics hubs via secure transit."
    },
    {
      icon: <MapPin size={20} />,
      title: "Drop-off Point",
      desc: "Package arrives at your selected local service point for secure holding."
    },
    {
      icon: <PackageCheck size={20} />,
      title: "Customer Collection",
      desc: "Pick up your gear at your convenience using your unique claim code."
    }
  ];

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4, // Each step appears 0.4s after the previous
      }
    }
  };

  // Animation variants for each step
  const stepVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }} 
        animate={{ scale: 1, y: 0 }} 
        className="relative w-full max-w-2xl bg-[#0f0f0f] border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl overflow-hidden"
      >
        <button onClick={onClose} className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors p-2 z-20">
          <X size={24} />
        </button>

        <div className="mb-10 text-center md:text-left">
          <h2 className="text-3xl font-black text-white uppercase italic mb-2">Hub <span className="text-violet-500">Logistics</span></h2>
          <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold italic">Standard Fulfillment Workflow</p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8 relative"
        >
          {/* Animated Progress Line */}
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: '90%' }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute left-[19px] top-2 w-[2px] bg-gradient-to-b from-violet-600 via-violet-400 to-transparent md:block hidden" 
          />
          
          {steps.map((step, idx) => (
            <motion.div 
              key={idx} 
              variants={stepVariants}
              className="flex gap-6 items-start relative z-10"
            >
              {/* Icon with Pulse Effect */}
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400 shrink-0 relative z-10">
                  {step.icon}
                </div>
                {/* Outer Glow Pulse */}
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-violet-500 rounded-full -z-0"
                />
              </div>

              <div>
                <h4 className="text-white font-bold uppercase tracking-tight text-sm mb-1 italic">{step.title}</h4>
                <p className="text-white/40 text-[11px] leading-relaxed max-w-md uppercase tracking-wider font-medium">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Specs Footer */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="mt-12 grid grid-cols-2 gap-4"
        >
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
            <Clock size={16} className="text-violet-500" />
            <div>
              <span className="text-[8px] font-black text-white/30 uppercase block">Est. Time</span>
              <p className="text-white font-bold text-[10px] uppercase italic">5-7 Business Days</p>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
            <PackageCheck size={16} className="text-violet-500" />
            <div>
              <span className="text-[8px] font-black text-white/30 uppercase block">Security</span>
              <p className="text-white font-bold text-[10px] uppercase italic">QR ID Authentication</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// (CollarSpecModal and SizeChartModal remain the same)
function CollarSpecModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
      <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="relative w-full max-w-4xl bg-[#0f0f0f] border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors p-2 z-20"><X size={24} /></button>
        <div className="mb-12">
          <h2 className="text-3xl font-black text-white uppercase italic mb-2">Collar <span className="text-violet-500">Specs</span></h2>
          <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold">Engineered for durability & comfort</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collarTypes.map((collar, idx) => (
            <div key={idx} className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-violet-500/50 transition-all">
              <div className="h-48 overflow-hidden relative">
                <img src={collar.image} alt={collar.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-violet-600 text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded">{collar.tag}</div>
              </div>
              <div className="p-6">
                <h4 className="text-white font-bold uppercase italic mb-3 tracking-tight">{collar.name}</h4>
                <div className="space-y-4">
                  <div><span className="text-[8px] font-black text-violet-400 uppercase tracking-widest block mb-1">Specifications</span><p className="text-white/60 text-xs leading-relaxed">{collar.specs}</p></div>
                  <div><span className="text-[8px] font-black text-violet-400 uppercase tracking-widest block mb-1">Recommended For</span><p className="text-white/60 text-xs leading-relaxed">{collar.bestFor}</p></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function SizeChartModal({ onClose }: { onClose: () => void }) {
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');
  const formatVal = (cm: number) => unit === 'cm' ? cm : (cm / 2.54).toFixed(1);
  const sizeData = [
    { s: 'S', c: 48, l: 68, sl: 20 },
    { s: 'M', c: 51, l: 71, sl: 21 },
    { s: 'L', c: 54, l: 74, sl: 22 },
    { s: 'XL', c: 57, l: 77, sl: 23 },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="relative w-full max-w-2xl bg-[#0f0f0f] border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl">
        <button onClick={onClose} className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors p-2"><X size={24} /></button>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div><h2 className="text-3xl font-black text-white uppercase italic mb-2">Size <span className="text-violet-500">Guide</span></h2><p className="text-white/40 text-xs uppercase tracking-widest font-bold">Standard Philippine Dimensions</p></div>
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 w-fit">
            <button onClick={() => setUnit('cm')} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${unit === 'cm' ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20' : 'text-white/40 hover:text-white'}`}>CM</button>
            <button onClick={() => setUnit('in')} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${unit === 'in' ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20' : 'text-white/40 hover:text-white'}`}>IN</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-violet-400 border-b border-white/10 uppercase font-black text-[10px] tracking-widest">
              <tr><th className="py-4">Size</th><th className="py-4 text-center">Chest ({unit})</th><th className="py-4 text-center">Length ({unit})</th><th className="py-4 text-center">Sleeve ({unit})</th></tr>
            </thead>
            <tbody className="text-white/70 font-mono">
              {sizeData.map((row) => (
                <tr key={row.s} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className={`py-4 font-black ${row.s === 'M' ? 'text-violet-400' : ''}`}>{row.s}</td>
                  <td className="py-4 text-center">{formatVal(row.c)}</td>
                  <td className="py-4 text-center">{formatVal(row.l)}</td>
                  <td className="py-4 text-center">{formatVal(row.sl)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}