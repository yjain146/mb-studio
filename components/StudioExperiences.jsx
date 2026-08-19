'use client';

import { motion } from 'framer-motion';

export default function StudioExperiences() {
  return (
    <section className="relative w-full bg-[#030303] text-white py-32 border-t border-white/10 overflow-hidden">
      
      <div className="max-w-[1200px] mx-auto px-8 md:px-16">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          className="mb-20 text-center md:text-left"
        >
          <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 text-[9px] tracking-[0.3em] uppercase text-white/60 mb-6">
            On-Site Installations
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)' }} className="text-4xl md:text-6xl font-light">
            The Residency Experiences.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Heritage Wall */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-12 border border-white/10 bg-[#0a0a0a] hover:bg-[#0c0c0c] transition-colors group relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <h3 className="text-2xl font-light text-white mb-4" style={{ fontFamily: 'var(--font-serif)' }}>The Heritage Wall</h3>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40 leading-relaxed mb-8">
              1886 — Present. From the Benz Patent-Motorwagen to the AMG GT XX. Experience the complete 140-year timeline of Mercedes-Benz innovation through our physical installation, located within the Lavonne Café.
            </p>
            <span className="text-[8px] tracking-widest text-white/30 uppercase font-bold border border-white/10 px-3 py-1">Cafe Exclusive</span>
          </motion.div>

          {/* The Claw Machine */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-12 border border-white/10 bg-[#0a0a0a] hover:bg-[#0c0c0c] transition-colors group relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <h3 className="text-2xl font-light text-white mb-4" style={{ fontFamily: 'var(--font-serif)' }}>The AMG Vault</h3>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40 leading-relaxed mb-8">
              Precision engineering meets gameplay. Test your reflexes at the studio claw machine to win exclusive, limited-edition Mercedes-Benz merchandise and apparel directly on-site.
            </p>
            <span className="text-[8px] tracking-widest text-white/30 uppercase font-bold border border-white/10 px-3 py-1">App Tokens Required</span>
          </motion.div>

        </div>
      </div>
    </section>
  );
}