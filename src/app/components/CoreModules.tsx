import { motion } from 'motion/react';
import { Shirt, Ruler, TruckIcon } from 'lucide-react';

const modules = [
  {
    id: 1,
    icon: Shirt,
    title: 'Artisanal Quality',
    description: 'Each piece is hand-checked for stitching perfection and fabric durability before it ever leaves our floor.',
    features: ['Premium Fabrics', 'Double-Stitched', 'Hand-Inspected'],
    color: '#8B5CF6',
  },
  {
    id: 2,
    icon: Ruler,
    title: 'Tailored Fit',
    description: 'Traditional sizing refined through years of local feedback to ensure a silhouette that feels custom-made.',
    features: ['Local Sizing', 'Comfort-First', 'Classic Cut'],
    color: '#A78BFA',
  },
  {
    id: 3,
    icon: TruckIcon,
    title: 'Reliable Delivery',
    description: 'Full visibility on your purchase from our San Pedro workshop to your doorstep with real-time updates.',
    features: ['Secure Handling', '₱ Cash on Delivery', 'Easy Returns'],
    color: '#6D28D9',
  },
];

export function CoreModules() {
  return (
    <section
      id="modules"
      className="relative min-h-screen py-24 md:py-32 px-4 md:px-8 snap-start bg-[#0F172A]"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header - Shifted from "Intelligence" to "Craft" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
          id="about"
        >
          <h2 className="text-5xl md:text-6xl tracking-tight text-white mb-6 font-bold">
            Built with <span className="text-[#8B5CF6]">Purpose</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Combining traditional Filipino craftsmanship with modern reliability.
          </p>
        </motion.div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative h-full p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm overflow-hidden">
                {/* Subtle Glow */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${module.color}15, transparent 70%)`,
                  }}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                    style={{
                      background: `linear-gradient(135deg, ${module.color}20, ${module.color}05)`,
                      border: `1px solid ${module.color}30`,
                    }}
                  >
                    <module.icon className="w-8 h-8" style={{ color: module.color }} />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl text-white mb-4 tracking-tight font-semibold">
                    {module.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/60 mb-6 leading-relaxed text-sm">
                    {module.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3 pt-6 border-t border-white/5">
                    {module.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div
                          className="w-1 h-1 rounded-full"
                          style={{ backgroundColor: module.color }}
                        />
                        <span className="text-xs text-white/50 uppercase tracking-widest">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech-Minimalist Border Effect */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    border: `1px solid ${module.color}40`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}