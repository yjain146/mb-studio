'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TechTabs() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      id: "01",
      title: "Active Aerodynamics",
      headline: "Shapeshifting Bodywork.",
      desc: "Featuring 21-inch aero wheels with five movable aeroblades, the Concept AMG GT XX dynamically alters its drag profile on demand, shifting seamlessly from ultra-low drag straight-line speed to maximum downforce cornering mode.",
      stat: "0.198",
      statLabel: "Drag Coefficient (Cd)"
    },
    {
      id: "02",
      title: "Axial Flux Motors",
      headline: "YASA Powertrain.",
      desc: "Three axial flux motors deliver three times the power density of conventional radial motors. The front booster motor engages only when additional power is required, decoupling when coasting to preserve efficiency.",
      stat: "1,360",
      statLabel: "Peak Horsepower"
    },
    {
      id: "03",
      title: "Advanced Cooling",
      headline: "Direct-Cooled Cells.",
      desc: "A 114 kWh high-performance battery developed from scratch, featuring direct-cooled cylindrical cells designed to withstand sustained high-speed track running without thermal degradation.",
      stat: "400",
      statLabel: "KM Range in 5 Mins"
    }
  ];

  return (
    <section className="relative bg-[#030303] text-white py-32 overflow-hidden border-t border-white/10">
      
      {/* Subtle Engineering Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-8 md:px-16 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Column: Vertical Navigation */}
          <div className="lg:w-1/3 flex flex-col gap-4">
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/40 mb-8 border-b border-white/10 pb-4">
              System Telemetry
            </span>
            
            {tabs.map((tab, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`relative flex items-center gap-6 p-6 text-left transition-all duration-500 border ${
                  activeTab === idx 
                    ? 'border-white/30 bg-white/5' 
                    : 'border-transparent hover:bg-white/5'
                }`}
              >
                <span className={`font-mono text-sm ${activeTab === idx ? 'text-white' : 'text-white/30'}`}>
                  {tab.id}
                </span>
                <span className={`text-xs tracking-[0.2em] uppercase ${activeTab === idx ? 'text-white font-bold' : 'text-white/50'}`}>
                  {tab.title}
                </span>
                
                {/* Active Indicator Line */}
                {activeTab === idx && (
                  <motion.div 
                    layoutId="activeSideTab"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Right Column: Dynamic Content Display */}
          <div className="lg:w-2/3 min-h-[400px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full bg-[#0a0a0a] border border-white/10 p-10 md:p-16 relative shadow-2xl"
              >
                {/* Decorative Tech Corners */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/40" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/40" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/40" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/40" />

                <div className="flex flex-col md:flex-row gap-12 items-start md:items-center">
                  <div className="flex-1">
                    <h3 style={{ fontFamily: 'var(--font-serif)' }} className="text-4xl md:text-5xl font-light mb-6 leading-tight">
                      {tabs[activeTab].headline}
                    </h3>
                    <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/50 leading-relaxed max-w-md">
                      {tabs[activeTab].desc}
                    </p>
                  </div>

                  <div className="flex flex-col items-start md:items-end md:text-right border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-12 w-full md:w-auto">
                    <span className="font-mono text-5xl md:text-7xl text-white mb-3 tracking-tighter">
                      {tabs[activeTab].stat}
                    </span>
                    <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-white/40 max-w-[150px]">
                      {tabs[activeTab].statLabel}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}