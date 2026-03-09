import { motion } from 'motion/react';
import { ShoppingBag, Instagram, Facebook, Mail, Shield, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const footerLinks = {
    Shop: ['New Arrivals', 'Best Sellers', 'Collections', 'Gift Cards'],
    Company: ['About Us', 'Careers', 'Press', 'Contact'],
    Support: ['Help Center', 'Shipping', 'Returns', 'Size Guide'],
    Legal: ['Privacy', 'Terms', 'Cookies', 'Accessibility'],
  };

  return (
    <footer
      id="footer"
      className="relative py-16 md:py-20 px-4 md:px-8 border-t border-white/10 snap-start bg-[#0F172A]"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Brand & Location Column (Span 4) */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl tracking-tight text-white uppercase font-bold">JG APPAREL</span>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-3 text-white/60">
                <MapPin className="w-5 h-5 text-[#8B5CF6] shrink-0 mt-1" />
                <p className="text-sm leading-relaxed">
                  3rd Flr. San Luis St., Brgy. Landayan,<br /> 
                  San Pedro, Laguna, Philippines
                </p>
              </div>

              {/* Map Embed Container */}
              <div className="w-full h-48 rounded-xl overflow-hidden border border-white/10 grayscale-[0.5] contrast-[1.2] opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-500">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3864.846545293418!2d121.053805!3d14.366657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d192902636c7%3A0x289641997c272c74!2sSan%20Luis%20St%2C%20San%20Pedro%2C%20Laguna!5e0!3m2!1sen!2sph!4v1710000000000!5m2!1sen!2sph" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              {/* Social & Contact Links */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="tel:0288086647"
                  className="h-10 px-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center gap-2 transition-colors group"
                >
                  <Phone className="w-4 h-4 text-white/60 group-hover:text-[#8B5CF6] transition-colors" />
                  <span className="text-sm text-white/60 group-hover:text-white transition-colors">(02) 8808 6647</span>
                </a>
                <div className="flex gap-2">
                  <a href="https://www.instagram.com/jhuulss/" target="_blank" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors group">
                    <Instagram className="w-5 h-5 text-white/60 group-hover:text-[#8B5CF6] transition-colors" />
                  </a>
                  <a href="https://www.facebook.com/profile.php?id=61572762121416" target="_blank" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors group">
                    <Facebook className="w-5 h-5 text-white/60 group-hover:text-[#8B5CF6] transition-colors" />
                  </a>
                  <a href="mailto: comhecsportswear@gmail.com" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors group">
                    <Mail className="w-5 h-5 text-white/60 group-hover:text-[#8B5CF6] transition-colors" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Spacer for Desktop */}
          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Link Columns (Span 7) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:col-span-7">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-white mb-4 text-sm font-semibold uppercase tracking-widest">{category}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-white/40 hover:text-[#8B5CF6] transition-colors text-sm">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-xs text-white/30 tracking-widest uppercase">
            © 2026 JG Apparel. All rights reserved.
          </div>

          <motion.a
            href="https://com-hec-sportswear-pdb6.vercel.app/"
            whileHover={{ y: -2 }}
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B5CF6]/10 hover:bg-[#8B5CF6]/20 border border-[#8B5CF6]/30 transition-all"
          >
            <Shield className="w-4 h-4 text-[#8B5CF6]" />
            <span className="text-xs font-bold text-white/80 group-hover:text-white uppercase tracking-tighter">
              Admin Portal
            </span>
          </motion.a>
        </div>
      </div>
    </footer>
  );
}