import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden snap-start"
      style={{ scrollSnapAlign: 'start' }}
    >
      {/* Floating Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-20 left-20 w-96 h-96 rounded-full bg-[#8B5CF6]/20 blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-20 right-20 w-[500px] h-[500px] rounded-full bg-[#6D28D9]/20 blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, -60, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 left-1/2 w-80 h-80 rounded-full bg-[#A78BFA]/15 blur-[100px]"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-24 md:py-32 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Text Content */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 mb-8"
          >
            <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
            <span className="text-sm text-[#A78BFA]">Limited Collection 2026</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-6xl md:text-7xl lg:text-8xl tracking-tight mb-6 text-white"
            style={{ lineHeight: '1.1' }}
          >
            Redefine
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA]">
              Your Style
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-white/60 mb-8 leading-relaxed max-w-lg"
          >
            Experience boutique apparel crafted with precision. Where modern minimalism meets
            sophisticated design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <button className="group px-8 py-4 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white transition-all hover:scale-105 shadow-xl shadow-[#8B5CF6]/30 flex items-center gap-2">
              Explore Collection
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all backdrop-blur-sm border border-white/10">
              View Lookbook
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/10"
          >
            <div>
              <div className="text-3xl text-white mb-1">15+</div>
              <div className="text-sm text-white/50">Premium Items</div>
            </div>
            <div>
              <div className="text-3xl text-white mb-1">24/7</div>
              <div className="text-sm text-white/50">Support</div>
            </div>
            <div>
              <div className="text-3xl text-white mb-1">11k+</div>
              <div className="text-sm text-white/50">Happy Clients</div>
            </div>
          </motion.div>
        </div>

        {/* Floating Apparel Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative"
        >
          <motion.div
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#8B5CF6]/40 to-[#6D28D9]/40 blur-[80px] scale-105" />
            
            {/* Image */}
            <div className="relative rounded-3xl overflow-hidden border border-[#8B5CF6]/30 shadow-2xl">
              <img
                src="https://scontent.fmnl16-1.fna.fbcdn.net/v/t39.30808-6/641494516_122180613320758737_4082049292236928284_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeFob2ZVT_Pnn5PxgVGj5XfAETjBoxTJEasROMGjFMkRqyg_GEYBpaKlIBccXGm6MYnV9fLc3bv61r7hhmmA0cTO&_nc_ohc=_MY-FrHIQVEQ7kNvwF7q1zt&_nc_oc=Adn6tMa4IvLiTPWJ1y1J7KXQMyfrkZQtVSTLjUwJLm3WpbB_Z9TwgAU3qRlF6xE5X8Y&_nc_zt=23&_nc_ht=scontent.fmnl16-1.fna&_nc_gid=AdYfiA7bfnIbGgIW08K5gw&oh=00_AfvuFDa6VHPx2zeELnlrBeAQzlPgRqH8uNNsTRW7dtMNbQ&oe=69A24269"
                alt="Featured Apparel"
                className="w-full h-auto aspect-square object-cover"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/60 via-transparent to-transparent" />
            </div>

            {/* Floating Tag */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute -right-4 top-1/4 px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
            >
              <div className="text-sm text-white/60">Starting at</div>
              <div className="text-2xl text-white">₱3,999</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}