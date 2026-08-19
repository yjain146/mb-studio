'use client';

import { motion } from 'framer-motion';

export default function NardoRecord() {
  const records = [
    { label: 'Distance Covered', value: '40,075 km', sub: 'Circumference of the Earth' },
    { label: 'Time Taken', value: '7d 13h 24m 07s', sub: 'Continuous running' },
    { label: '24-Hour Record', value: '5,479 km', sub: '+1,500 km over previous benchmark' },
    { label: 'Running Speed', value: '300 km/h', sub: 'Sustained' },
    { label: 'Average Per Day', value: '> 5,300 km', sub: 'Across two vehicles' },
    { label: 'Avg Charging Power', value: '~ 850 kW', sub: 'During pit stops' },
  ];

  return (
    <section className="relative w-full bg-[#050505] text-white py-32 px-8 md:px-16 border-t border-white/10">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          className="mb-20"
        >
          <span className="inline-block px-3 py-1 bg-white/5 backdrop-blur-md border border-white/10 text-[9px] tracking-[0.3em] uppercase text-white/60 mb-6">
            Nardò Technical Center, Italy • 25 August 2025
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)' }} className="text-5xl md:text-7xl font-light mb-6">
            Record Run.
          </h2>
          <p className="font-mono text-xs tracking-widest uppercase text-white/50 max-w-2xl leading-relaxed">
            The run continues a Mercedes-Benz tradition — the C111 set diesel and petrol records at the same circuit in the 1970s and 1980s, and the GT XX carries the same Sunset Beam Orange finish as a deliberate reference.
          </p>
        </motion.div>

        {/* Telemetry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {records.map((record, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#050505] p-8 md:p-12"
            >
              <h4 className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-4">
                {record.label}
              </h4>
              <p className="font-mono text-2xl md:text-3xl text-white mb-2">
                {record.value}
              </p>
              <p className="text-[9px] tracking-widest uppercase text-white/30">
                {record.sub}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}