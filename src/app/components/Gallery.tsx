import { motion } from 'motion/react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { useState } from 'react';

const galleryItems = [
  {
    id: 1,
    image: 'https://scontent.fmnl16-1.fna.fbcdn.net/v/t39.30808-6/572268175_122161777592758737_5572591119586026330_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeEupjofbg5JnSlS591tTcurjGobOPiAlTmMahs4-ICVOR-wfUJ7WHPhzQm-lFPMKIRKqY3io_zt9lnG0bCM2u7M&_nc_ohc=axUIGLFPMvcQ7kNvwHEt3Hv&_nc_oc=Adl5w_mUSsmqMaSQ0dc0uf3ExWgJ0tE10x9NbOpZc99w8IUcLUz7fjHAODz6OEPcN9w&_nc_zt=23&_nc_ht=scontent.fmnl16-1.fna&_nc_gid=dPe4PAuqpuNIvFMj90zACw&oh=00_Afuts3ueoIZqQGKqAI1JTd8zG3jHj78EuYiAHcltVfcHZA&oe=69A252B4',
    name: 'Custom Esports jerseys',
    price: 3999,
  },
  {
    id: 2,
    image: 'https://scontent.fmnl16-1.fna.fbcdn.net/v/t39.30808-6/568628570_122160814262758737_8532058488864381824_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeG1fAXtJLSIkY4EG4jyjwVwylLW2zWEnwLKUtbbNYSfAvwVEZV724GUSa4AWiptrYwaVIAJMBtWOmeBv9xw03X6&_nc_ohc=HLauiW8rLw8Q7kNvwGdqOIP&_nc_oc=AdnsxmAHneDMVx56iYqJFNSpuJBvDUxGuipEupZ-E-RGE0kYfjDQdbapyu98G5XoE0M&_nc_zt=23&_nc_ht=scontent.fmnl16-1.fna&_nc_gid=Hv1icwFXzXHFYN-KZt3iDg&oh=00_AfvjCkisQkzDRwl1Wlg2-myM5a5PIT162QaJoqHuYvZ7rg&oe=69A24734',
    name: '𝐏𝐡𝐢𝐥𝐢𝐩𝐩𝐢𝐧𝐞 𝐒𝐩𝐨𝐫𝐭𝐬 𝐂𝐨𝐦𝐦𝐢𝐬𝐬𝐢𝐨𝐧 𝐕𝐨𝐥𝐥𝐞𝐲𝐛𝐚𝐥𝐥 𝐉𝐞𝐫𝐬𝐞𝐲 ',
    price: 7499,
  },
  {
    id: 3,
    image: 'https://scontent.fmnl16-1.fna.fbcdn.net/v/t39.30808-6/559381439_122159506304758737_4382151731362729854_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeGPOMkLC_3i0-SEy60hp3BCqtQxRlatTWSq1DFGVq1NZCHo_rUPUxFFXnahk4ociS8qZMJUeRklRcvYxbtBmpwX&_nc_ohc=HqjvntiidKMQ7kNvwGB42kx&_nc_oc=AdlCR35_CvQqLVjMQeLAJ4b_jmN_9Pnp913LT2q_5bvE3kYagSVIKLQ-8M2mm46NAV4&_nc_zt=23&_nc_ht=scontent.fmnl16-1.fna&_nc_gid=4XNX8RbfMnGkzATR1-SKsA&oh=00_AfuLTJyMxNpdv3zvlXZZGokOBmNQ4lEHAKLkJbFBgyXzaw&oe=69A23D61',
    name: 'Volleyball jersey & Shorts',
    price: 1899,
  },
  {
    id: 4,
    image: 'https://scontent.fmnl16-1.fna.fbcdn.net/v/t39.30808-6/558297932_122158326626758737_7244078401004129426_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeG4jBWEA9nqxLGFaZT-vlOVsUF10h2aN86xQXXSHZo3zrFbXbmJTO67hHJbCK8og89V1fcPgKKkM0VXLJ7roW3f&_nc_ohc=sHL0sp0fIo8Q7kNvwEl1YXj&_nc_oc=AdmcVNI_E_4H4wpvW4UEQORSTlUQLwZ4Va5RZBPRSUGsOqFX5nla7JTDB9TawOG4FSA&_nc_zt=23&_nc_ht=scontent.fmnl16-1.fna&_nc_gid=exiKAhKYeMFn8ZHMxGJwWQ&oh=00_AfsCn0rz1mt8iO-_pnhzqzbV_dNGGKif66BxJKf8oOLGHQ&oe=69A232C4',
    name: '𝐜𝐮𝐬𝐭𝐨𝐦 𝐛𝐚𝐬𝐤𝐞𝐭𝐛𝐚𝐥𝐥 𝐮𝐧𝐢𝐟𝐨𝐫𝐦𝐬',
    price: 12999,
  },
  {
    id: 5,
    image: 'https://scontent.fmnl16-1.fna.fbcdn.net/v/t39.30808-6/641494516_122180613320758737_4082049292236928284_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeFob2ZVT_Pnn5PxgVGj5XfAETjBoxTJEasROMGjFMkRqyg_GEYBpaKlIBccXGm6MYnV9fLc3bv61r7hhmmA0cTO&_nc_ohc=_MY-FrHIQVEQ7kNvwF7q1zt&_nc_oc=Adn6tMa4IvLiTPWJ1y1J7KXQMyfrkZQtVSTLjUwJLm3WpbB_Z9TwgAU3qRlF6xE5X8Y&_nc_zt=23&_nc_ht=scontent.fmnl16-1.fna&_nc_gid=AdYfiA7bfnIbGgIW08K5gw&oh=00_AfvuFDa6VHPx2zeELnlrBeAQzlPgRqH8uNNsTRW7dtMNbQ&oe=69A24269',
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