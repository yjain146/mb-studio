'use client';

import Navbar from '../components/Navbar';
import CinematicScroll from '../components/CinematicScroll';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [isSeated, setIsSeated] = useState(false);

  useEffect(() => {
    const checkStatus = () => {
      const table = localStorage.getItem('mb_active_table');
      setIsSeated(!!table);
    };
    checkStatus();
    window.addEventListener('storage', checkStatus);
    const interval = setInterval(checkStatus, 1000); 
    return () => {
      window.removeEventListener('storage', checkStatus);
      clearInterval(interval);
    };
  }, []);

  const tabs = [
    {
      title: "Active Aerodynamics",
      headline: "Shapeshifting Bodywork",
      desc: "Active aerodynamic flaps and deployable rear structures dynamically alter the vehicle's drag profile on demand, shifting seamlessly from ultra-low drag straight-line speed to maximum downforce cornering mode.",
      stat: "0.198 Cd"
    },
    {
      title: "Neural Telemetry",
      headline: "YASA Powertrain",
      desc: "Three axial flux motors deliver three times the power density of conventional radial motors. The front booster motor engages only when additional power is required, decoupling when coasting.",
      stat: "1,360 HP"
    },
    {
      title: "Solid-State Cooling",
      headline: "Direct-Cooled Cells",
      desc: "A 114 kWh high-performance battery developed from scratch, featuring direct-cooled cylindrical cells designed to withstand sustained high-speed track running without thermal degradation.",
      stat: "114 kWh"
    }
  ];

  return (
    <main className="min-h-screen bg-[#030303] selection:bg-white/30">
      
      {/* 1. NAVBAR & INTRO SCROLL */}
      <Navbar />
      <CinematicScroll />

      {/* 2. QUICK STATS ROW */}
      <div className="py-24 border-y border-white/10 bg-[#050505]">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16 grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-0 md:divide-x divide-white/10 text-left">
          <div className="flex flex-col md:pr-12">
            <span className="font-mono text-[9px] tracking-[0.3em] text-white/40 uppercase mb-4">Architecture</span>
            <span style={{ fontFamily: 'var(--font-serif)' }} className="text-3xl md:text-4xl text-white">AMG.EA</span>
          </div>
          <div className="flex flex-col md:px-12">
            <span className="font-mono text-[9px] tracking-[0.3em] text-white/40 uppercase mb-4">Peak Output</span>
            <span style={{ fontFamily: 'var(--font-serif)' }} className="text-3xl md:text-4xl text-white">1,360 HP</span>
          </div>
          <div className="flex flex-col md:px-12">
            <span className="font-mono text-[9px] tracking-[0.3em] text-white/40 uppercase mb-4">0-100 KM/H</span>
            <span style={{ fontFamily: 'var(--font-serif)' }} className="text-3xl md:text-4xl text-white">2.9 Sec</span>
          </div>
          <div className="flex flex-col md:pl-12">
            <span className="font-mono text-[9px] tracking-[0.3em] text-white/40 uppercase mb-4">Location</span>
            <span style={{ fontFamily: 'var(--font-serif)' }} className="text-3xl md:text-4xl text-white">DLF Horizon</span>
          </div>
        </div>
      </div>

      {/* 3. ENGINEERING TABS */}
      <section className="py-32 px-8 md:px-16 max-w-[1600px] mx-auto border-b border-white/10">
        <div className="flex gap-4 border-b border-white/10 pb-8 mb-16 overflow-x-auto">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-6 py-3 text-[10px] tracking-[0.2em] font-mono uppercase whitespace-nowrap transition-all duration-300 border ${
                activeTab === idx 
                  ? 'border-white bg-white text-black font-bold' 
                  : 'border-white/10 text-white/40 hover:text-white'
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        <div className="min-h-[250px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12"
            >
              <div className="max-w-xl">
                <h3 style={{ fontFamily: 'var(--font-serif)' }} className="text-5xl md:text-6xl font-light text-white mb-6">
                  {tabs[activeTab].headline}
                </h3>
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/50 leading-relaxed">
                  {tabs[activeTab].desc}
                </p>
              </div>
              <div className="text-6xl md:text-8xl text-white font-light" style={{ fontFamily: 'var(--font-serif)' }}>
                {tabs[activeTab].stat}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 4. PERFORMANCE REDEFINED TABLE */}
      <section className="py-32 px-8 md:px-16 max-w-[1600px] mx-auto border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 text-[9px] tracking-[0.3em] uppercase text-white/60 mb-6">
              Affalterbach Innovation
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)' }} className="text-5xl md:text-7xl font-light text-white mb-8">
              Performance <br/><span className="text-white/50 italic">Redefined</span>
            </h2>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/50 leading-relaxed mb-6">
              Powered by three axial flux motors developed in collaboration with YASA, the Concept AMG GT XX generates an unprecedented combined output of 1,360 horsepower with near-instantaneous torque vectoring.
            </p>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/50 leading-relaxed">
              Encased in a custom 114kWh high performance battery pack featuring direct cell cooling technology, the vehicle maintains elite track performance without thermal throttling.
            </p>
          </div>
          
          <div className="bg-[#050505] border border-white/10 p-10 relative overflow-hidden">
            <h3 className="font-mono text-[9px] tracking-[0.3em] text-white/40 uppercase mb-8 relative z-10">Technical Specifications</h3>
            <div className="space-y-6 relative z-10">
              <div className="flex justify-between border-b border-white/10 pb-6 items-end">
                <span className="font-mono text-[10px] tracking-widest text-white/50 uppercase">Power Output</span>
                <span className="text-xl text-white font-light text-right" style={{ fontFamily: 'var(--font-serif)' }}>1,360 HP</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-6 items-end">
                <span className="font-mono text-[10px] tracking-widest text-white/50 uppercase">Battery Arch.</span>
                <span className="text-xl text-white font-light text-right" style={{ fontFamily: 'var(--font-serif)' }}>114 kWh High-Voltage</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-6 items-end">
                <span className="font-mono text-[10px] tracking-widest text-white/50 uppercase">Top Speed</span>
                <span className="text-xl text-white font-light text-right" style={{ fontFamily: 'var(--font-serif)' }}>360+ KM/H</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-6 items-end">
                <span className="font-mono text-[10px] tracking-widest text-white/50 uppercase">Drag Coefficient</span>
                <span className="text-xl text-white font-light text-right" style={{ fontFamily: 'var(--font-serif)' }}>0.198 Cd</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="font-mono text-[10px] tracking-widest text-white/50 uppercase">Cooling System</span>
                <span className="text-xl text-white font-light text-right" style={{ fontFamily: 'var(--font-serif)' }}>Direct Die Liquid Loop</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. THE RESIDENCY SPACE (Strict 50/50 Split - Spotlight Glow) */}
      <section id="studio" className="relative w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#111111] via-[#030303] to-[#030303] py-32 border-b border-white/10">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16 relative z-10">
          <h2 style={{ fontFamily: 'var(--font-serif)' }} className="text-4xl md:text-6xl font-light text-white mb-16 text-center md:text-left">
            The Residency Space
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Frosted Glass Cafe Card */}
            <div className="p-12 border border-white/10 bg-white/[0.02] backdrop-blur-md flex flex-col h-full hover:bg-white/[0.04] hover:border-white/30 transition-all duration-500 group">
              <h3 className="text-3xl font-light text-white mb-4" style={{ fontFamily: 'var(--font-serif)' }}>Lavonne Café</h3>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40 leading-relaxed flex-grow">
                A curated culinary experience. Available exclusively to seated guests of the Mercedes-Benz studio.
              </p>
              {isSeated && (
                <div className="flex justify-end items-center border-t border-white/10 pt-6 mt-12">
                  <Link href="/culinary" className="text-[10px] text-white uppercase tracking-[0.2em] group-hover:text-white/60 transition-colors">Explore Menu →</Link>
                </div>
              )}
            </div>

            {/* Frosted Glass Merchandise Card */}
            <div className="p-12 border border-white/10 bg-white/[0.02] backdrop-blur-md flex flex-col h-full hover:bg-white/[0.04] hover:border-white/30 transition-all duration-500 group">
              <h3 className="text-3xl font-light text-white mb-4" style={{ fontFamily: 'var(--font-serif)' }}>Merchandise</h3>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40 leading-relaxed flex-grow">
                Exclusive apparel and accessories inspired by the AMG.EA architecture and Mercedes-Benz heritage.
              </p>
              {isSeated && (
                <div className="flex justify-end items-center border-t border-white/10 pt-6 mt-12">
                  <Link href="/lifestyle" className="text-[10px] text-white uppercase tracking-[0.2em] group-hover:text-white/60 transition-colors">View Collection →</Link>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 6. ON-SITE INSTALLATIONS (Faint Grid Background) */}
      <section className="relative w-full bg-[#050505] py-32 border-b border-white/10 overflow-hidden">
        {/* Subtle grid pattern to break the void */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
        
        <div className="max-w-[1600px] mx-auto px-8 md:px-16 relative z-10">
          <h2 style={{ fontFamily: 'var(--font-serif)' }} className="text-4xl md:text-5xl font-light text-white mb-12 text-center md:text-left">On-Site Installations</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 bg-[#020202] border border-white/10 relative overflow-hidden group hover:border-white/20 transition-colors">
              <div className="absolute top-0 left-0 w-1 h-full bg-white/20 group-hover:bg-white/40 transition-colors" />
              <h3 className="text-2xl text-white mb-4" style={{ fontFamily: 'var(--font-serif)' }}>140 Years Heritage Wall</h3>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40 leading-relaxed">
                Experience the complete timeline of Mercedes-Benz history through our physical installation, located entirely within the Lavonne Café.
              </p>
            </div>
            
            <div className="p-10 bg-[#020202] border border-white/10 relative overflow-hidden group hover:border-white/20 transition-colors">
              <div className="absolute top-0 left-0 w-1 h-full bg-white/20 group-hover:bg-white/40 transition-colors" />
              <h3 className="text-2xl text-white mb-4" style={{ fontFamily: 'var(--font-serif)' }}>The AMG Vault</h3>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40 leading-relaxed">
                Test your reflexes at the studio claw machine to win exclusive Mercedes-Benz merchandise. Digital app tokens required to play.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TEST DRIVE FOOTER */}
      <section className="py-32 px-8 md:px-16 bg-[#030303] text-center">
        <h2 style={{ fontFamily: 'var(--font-serif)' }} className="text-4xl md:text-5xl font-light text-white mb-6">Experience Mercedes-Benz</h2>
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/50 max-w-md mx-auto mb-10">
          Book a test drive to experience the current fleet of luxury and performance vehicles.
        </p>
        <a 
          href="https://www.mercedes-benz.co.in/passengercars/test-drive.html?view=BODYTYPE" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block px-10 py-5 border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors"
        >
          Book a Test Drive
        </a>
      </section>
    </main>
  );
}