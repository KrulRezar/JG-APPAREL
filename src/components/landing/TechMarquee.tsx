import { motion } from 'motion/react';

const partners = [
  'Premium Cotton',
  'Sustainable Fabrics',
  'Italian Leather',
  'Japanese Denim',
  'Merino Wool',
  'Organic Linen',
  'Tech Fabrics',
  'Recycled Materials',
];

export function TechMarquee() {
  return (
    <div className="relative py-16 overflow-hidden">
      {/* Gradient Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0F172A] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0F172A] to-transparent z-10" />

      {/* Marquee */}
      <div className="flex">
        <motion.div
          animate={{
            x: [0, -1920],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="flex gap-16 shrink-0"
        >
          {[...partners, ...partners, ...partners].map((partner, index) => (
            <div
              key={index}
              className="text-2xl tracking-wider text-white/30 whitespace-nowrap hover:text-[#8B5CF6] transition-colors cursor-default"
            >
              {partner}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
