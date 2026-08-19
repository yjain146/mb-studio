'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function CinematicScroll() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // THE "PEEL AWAY" STACK METHOD
  // We use strict 4-point arrays so the opacity locks at 0 and never reverts.
  const bg1Opacity = useTransform(scrollYProgress, [0, 0.25, 0.35, 1], [1, 1, 0, 0]);
  const bg2Opacity = useTransform(scrollYProgress, [0, 0.60, 0.70, 1], [1, 1, 0, 0]);

  return (
    <div ref={containerRef} className="relative bg-[#030303]">
      
      {/* STICKY BACKGROUND STACK - Using dvh prevents mobile scroll crashes */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden pointer-events-none bg-black">
        
        {/* Base Layer: Image 3 (Stays permanently at opacity 1) */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/amg-seq-3.jpg" 
            alt="AMG GT XX Vision" 
            fill 
            priority
            className="object-cover"
          />
        </div>
        
        {/* Middle Layer: Image 2 (Fades out to reveal Image 3) */}
        <motion.div style={{ opacity: bg2Opacity }} className="absolute inset-0 z-10 will-change-opacity">
          <Image 
            src="/amg-seq-2.jpg" 
            alt="AMG GT XX Record Run" 
            fill 
            priority
            className="object-cover"
          />
        </motion.div>
        
        {/* Top Layer: Image 1 (Fades out to reveal Image 2) */}
        <motion.div style={{ opacity: bg1Opacity }} className="absolute inset-0 z-20 will-change-opacity">
          <Image 
            src="/amg-seq-1.jpg" 
            alt="Concept AMG GT XX" 
            fill 
            priority
            className="object-cover"
          />
        </motion.div>
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 z-30 bg-gradient-to-b from-black/90 via-black/40 to-[#030303]" />
      </div>

      {/* NATURAL SCROLLING TEXT BLOCKS */}
      <div className="relative z-40 -mt-[100dvh]">
        
        {/* Screen 1 */}
        <div className="h-[100dvh] flex flex-col justify-center px-8 md:px-16 max-w-[1600px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="inline-block px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 text-[9px] tracking-[0.3em] uppercase text-white mb-6">
              Over 1,000 kW / 1,360 hp • 900 kW DC Charging
            </span>
            <h1 style={{ fontFamily: 'var(--font-serif)' }} className="text-6xl md:text-8xl lg:text-9xl font-light text-white mb-4 drop-shadow-2xl">
              Concept <br /> AMG GT XX
            </h1>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/70 max-w-lg mt-6 leading-relaxed bg-black/20 p-4 backdrop-blur-sm border border-white/5">
              A pioneering technology programme offering a look into a forthcoming four-door series-production sports car from Mercedes-AMG.
            </p>
          </motion.div>
        </div>

        {/* Screen 2 */}
        <div className="h-[100dvh] flex flex-col justify-center px-8 md:px-16 max-w-[1600px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ amount: 0.5 }}>
            <h2 style={{ fontFamily: 'var(--font-serif)' }} className="text-5xl md:text-7xl font-light text-white mb-6">Record Run.</h2>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/70 max-w-xl mb-12">
              Nardò Technical Center, Italy. 40,075 km covered in 7 days, 13 hours, and 24 minutes.
            </p>
            <div className="flex gap-12">
              <div>
                <p className="text-[10px] text-white/50 tracking-widest uppercase mb-1">Distance</p>
                <p className="text-3xl text-white font-mono">40,075 km</p>
              </div>
              <div>
                <p className="text-[10px] text-white/50 tracking-widest uppercase mb-1">Avg Speed</p>
                <p className="text-3xl text-white font-mono">300 km/h</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Screen 3 */}
        <div className="h-[150dvh] flex flex-col justify-start pt-[30dvh] px-8 md:px-16 max-w-[1600px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ amount: 0.3 }}>
            <h2 style={{ fontFamily: 'var(--font-serif)' }} className="text-5xl md:text-7xl font-light text-white mb-6">A Vision in Orange.</h2>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/70 max-w-xl mb-12 leading-relaxed">
              Designed by Matthias Schenker, the striking Sunset Beam Orange finish is a deliberate homage to the legendary Mercedes-Benz C111 experimental vehicles of the 1970s.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl bg-black/60 p-8 backdrop-blur-md border border-white/10">
              <div className="border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-4">
                <p className="text-[9px] text-white/50 tracking-widest uppercase">Manufacturing</p>
                <p className="text-xl text-white font-mono mt-1">Marienfelde, Berlin</p>
              </div>
              <div>
                <p className="text-[9px] text-white/50 tracking-widest uppercase">Engineering</p>
                <p className="text-xl text-white font-mono mt-1">35 World Firsts</p>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
