import { motion, AnimatePresence } from 'motion/react';
import { Shirt, Ruler, TruckIcon, CreditCard, ChevronRight, X } from 'lucide-react';
import { useState } from 'react';

const modules = [
  {
    id: 1,
    icon: Shirt,
    title: 'Collar & Neck Engineering',
    description: 'Specializing in reinforced Crew-necks and Ribbed V-necks designed to maintain structural integrity after heavy usage.',
    features: ['Reinforced Ribbing', 'Anti-Sag Stitching', 'Premium Neck Tape'],
    color: '#8B5CF6',
  },
  {
    id: 2,
    icon: Ruler,
    title: 'Precision Size Guide',
    description: 'Refined local sizing standards tailored for the Filipino silhouette. Use our interactive guide to find your perfect fit.',
    features: ['Local Sizing', 'Interactive Chart', 'Fit Comparison'],
    color: '#A78BFA',
    hasAction: true,
  },
  {
    id: 3,
    icon: TruckIcon,
    title: 'Hub-to-Hub Delivery',
    description: 'Optimized logistics from our San Pedro workshop to designated drop-off points for secure and reliable collection.',
    features: ['Secure Hub Storage', 'Drop-off Point Receipt', 'Real-time Tracking'],
    color: '#6D28D9',
  },
];

export function CoreModules() {
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);

  return (
    <section
      id="about"
      // Added snap-start and h-screen back to ensure it catches the scroll
      className="relative h-screen min-h-[800px] py-24 md:py-32 px-4 md:px-8 bg-[#0a0a0a] snap-start"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className="max-w-7xl mx-auto h-full flex flex-col justify-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-5xl md:text-6xl tracking-tight text-white mb-6 font-black uppercase italic">
            Built with <span className="text-[#8B5CF6]">Precision</span>
          </h2>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20">
            <CreditCard size={14} className="text-violet-400" />
            <span className="text-[10px] font-bold text-violet-400 uppercase tracking-widest">
              50% Downpayment available for Bulk Orders
            </span>
          </div>
        </motion.div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative h-full"
            >
              <div className="relative h-full p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl transition-all hover:border-violet-500/30">
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-violet-600/10 border border-violet-500/20">
                    <module.icon className="w-6 h-6 text-violet-400" />
                  </div>

                  <h3 className="text-xl text-white mb-4 font-bold uppercase italic tracking-tight">
                    {module.title}
                  </h3>

                  <p className="text-white/50 mb-8 leading-relaxed text-sm">
                    {module.description}
                  </p>

                  <div className="space-y-3 mb-8">
                    {module.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                        <span className="text-[10px] text-white/40 uppercase font-black tracking-widest">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {module.hasAction && (
                    <button 
                      onClick={() => setIsSizeChartOpen(true)}
                      className="mt-auto flex items-center justify-between w-full p-4 rounded-2xl bg-white/5 hover:bg-violet-600 transition-all text-white group/btn"
                    >
                      <span className="text-xs font-bold uppercase tracking-widest">Open Size Guide</span>
                      <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Size Chart Modal */}
      <AnimatePresence>
        {isSizeChartOpen && (
          <SizeChartModal onClose={() => setIsSizeChartOpen(false)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function SizeChartModal({ onClose }: { onClose: () => void }) {
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');

  // Helper to convert CM to IN and format to 1 decimal place
  const formatVal = (cm: number) => {
    return unit === 'cm' ? cm : (cm / 2.54).toFixed(1);
  };

  const sizeData = [
    { s: 'S', c: 48, l: 68, sl: 20 },
    { s: 'M', c: 51, l: 71, sl: 21 },
    { s: 'L', c: 54, l: 74, sl: 22 },
    { s: 'XL', c: 57, l: 77, sl: 23 },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="relative w-full max-w-2xl bg-[#0f0f0f] border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl"
      >
        <button onClick={onClose} className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors p-2">
          <X size={24} />
        </button>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h2 className="text-3xl font-black text-white uppercase italic mb-2">Size <span className="text-violet-500">Guide</span></h2>
            <p className="text-white/40 text-xs uppercase tracking-widest font-bold">Standard Philippine Dimensions</p>
          </div>

          {/* Unit Toggle Switch */}
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 w-fit">
            <button 
              onClick={() => setUnit('cm')}
              className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${unit === 'cm' ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20' : 'text-white/40 hover:text-white'}`}
            >
              CM
            </button>
            <button 
              onClick={() => setUnit('in')}
              className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${unit === 'in' ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20' : 'text-white/40 hover:text-white'}`}
            >
              IN
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-violet-400 border-b border-white/10 uppercase font-black text-[10px] tracking-widest">
              <tr>
                <th className="py-4">Size</th>
                <th className="py-4 text-center">Chest ({unit})</th>
                <th className="py-4 text-center">Length ({unit})</th>
                <th className="py-4 text-center">Sleeve ({unit})</th>
              </tr>
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

        <div className="mt-10 p-6 rounded-2xl bg-violet-600/10 border border-violet-500/20">
          <p className="text-[10px] text-white/60 leading-relaxed uppercase tracking-widest font-bold">
            💡 <span className="text-white">Measurement Note:</span> Measurements are taken with the garment laying flat. 
            {unit === 'in' ? " Values rounded to nearest decimal." : " Standard CM manufacturing tolerance applies."}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}