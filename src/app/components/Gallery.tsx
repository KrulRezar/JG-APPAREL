import { motion } from 'motion/react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { useState } from 'react';

const galleryItems = [
  {
    id: 1,
    image: 'https://res.cloudinary.com/dczcyu7e7/image/upload/v1772340978/1_e4yu5d.jpg',
    name: 'Custom Esports jerseys',
    price: 3999,
  },
  {
    id: 2,
    image: 'https://res.cloudinary.com/dczcyu7e7/image/upload/v1772340979/2.1_f1kyuo.jpg',
    name: '𝐏𝐡𝐢𝐥𝐢𝐩𝐩𝐢𝐧𝐞 𝐒𝐩𝐨𝐫𝐭𝐬 𝐂𝐨𝐦𝐦𝐢𝐬𝐬𝐢𝐨𝐧 𝐕𝐨𝐥𝐥𝐞𝐲𝐛𝐚𝐥𝐥 𝐉𝐞𝐫𝐬𝐞𝐲 ',
    price: 7499,
  },
  {
    id: 3,
    image: 'https://res.cloudinary.com/dczcyu7e7/image/upload/v1772340979/2.2_xlzczk.jpg',
    name: 'Volleyball jersey & Shorts',
    price: 1899,
  },
  {
    id: 4,
    image: 'https://res.cloudinary.com/dczcyu7e7/image/upload/v1772340980/2.3_fuaet1.jpg',
    name: '𝐜𝐮𝐬𝐭𝐨𝐦 𝐛𝐚𝐬𝐤𝐞𝐭𝐛𝐚𝐥𝐥 𝐮𝐧𝐢𝐟𝐨𝐫𝐦𝐬',
    price: 12999,
  },
  {
    id: 5,
    image: 'https://res.cloudinary.com/dczcyu7e7/image/upload/v1772340981/2.4_wbv5pk.jpg',
    name: 'Custom Jersey',
    price: 4599,
  },
];

export function Gallery() {
  return (
    <section
      id="gallery"
      className="relative min-h-screen py-24 md:py-32 px-4 md:px-8 snap-start"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl tracking-tight text-white mb-6">
            Featured <span className="text-[#8B5CF6]">Collection</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Carefully curated pieces that blend timeless design with modern aesthetics
          </p>
        </motion.div>

        {/* Masonry Gallery */}
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
          className="masonry-gallery"
        >
          <Masonry gutter="24px">
            {galleryItems.map((item, index) => (
              <GalleryCard key={item.id} item={item} index={index} />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </section>
  );
}

function GalleryCard({ item, index }: { item: typeof galleryItems[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const handleTouch = () => {
    setIsTouched(!isTouched);
  };

  const showOverlay = isHovered || isTouched;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleTouch}
      className="relative group cursor-pointer overflow-hidden rounded-2xl border border-white/10"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <motion.img
          src={item.image}
          alt={item.name}
          className="w-full h-auto object-cover"
          animate={{
            scale: showOverlay ? 1.05 : 1,
          }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/40 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: showOverlay ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Price Tag - Appears on Hover/Touch */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: showOverlay ? 1 : 0,
          y: showOverlay ? 0 : 20,
        }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-6 left-6 right-6"
      >
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-white/60 mb-1">Premium</div>
              <div className="text-xl text-white">{item.name}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-[#8B5CF6] mb-1">Price</div>
              <div className="text-2xl text-white">
                ₱{item.price.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Hover Border Glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-[#8B5CF6]/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: showOverlay ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: 'none' }}
      />
    </motion.div>
  );
}