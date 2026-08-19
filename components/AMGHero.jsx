'use client';

import { motion } from 'framer-motion';

export default function AMGHero() {
  return (
    <div className="relative w-full h-screen bg-[#030303] overflow-hidden">
      {/* Background Image from Drive */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: "url('/amg-gt-xx-hero.jpg')" }} 
      />
      
      {/* Gradient overlay to ensure text is readable */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/80 via-black/20 to-[#030303]" />

      <div className="relative z-10 flex flex-col justify-center px-8 h-full md:px-16 max-w-[1600px] mx-auto pt-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          
          {/* Official Specs */}
          <span className="inline-block px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 text-[9px] tracking-[0.3em] uppercase text-white/80 mb-6">
  Over 1,000 kW / 1,360 hp • 900 kW DC Charging
</span>
          
          <h1 style={{ fontFamily: 'var(--font-serif)' }} className="text-6xl md:text-8xl lg:text-9xl font-light text-white mb-2 drop-shadow-2xl">
            Concept <br /> AMG GT XX
          </h1>
          
          {/* Official Positioning Statement */}
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/50 max-w-lg mt-8 leading-relaxed">
            A pioneering technology programme offering a look into a forthcoming four-door series-production sports car from Mercedes-AMG. Three axial flux motors and a high performance battery developed from scratch deliver a revolutionary drive concept and a new dimension of performance.
          </p>

        </motion.div>
        
        {/* New Direct Test Drive Link */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="mt-12">
          <a 
            href="https://www.mercedes-benz.co.in/passengercars/test-drive.html?view=BODYTYPE" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-white text-black text-xs font-bold uppercase tracking-[0.2em] hover:bg-neutral-200 transition-colors"
          >
            Book Test Drive
          </a>
        </motion.div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#030303] to-transparent pointer-events-none" />
    </div>
  );
}