'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCartStore } from '../../store/useCartStore';

export default function LifestylePage() {
  const addToCart = useCartStore((state) => state.addToCart);
  const [isSeated, setIsSeated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [addedItems, setAddedItems] = useState({});

  useEffect(() => {
    const table = localStorage.getItem('mb_active_table');
    if (table) setIsSeated(true);
    setIsLoading(false);
  }, []);

  // Visual feedback handler
  const handleAddToCart = (item) => {
    addToCart(item, 'lifestyle');
    setAddedItems((prev) => ({ ...prev, [item.id]: true }));
    
    // Reset button after 2 seconds
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [item.id]: false }));
    }, 2000);
  };

  const collections = [
    { id: "m1", name: "AMG Stealth Hoodie", desc: "Heavyweight French terry, matte black logo", price: 8500, status: "In Stock", image: "/placeholder-merch.jpg" },
    { id: "m2", name: "Studio Series Cap", desc: "Structured 6-panel, laser-cut ventilation", price: 3200, status: "Low Stock", image: "/placeholder-merch.jpg" },
    { id: "m3", name: "Avenue Canvas Tote", desc: "Heavy-duty cotton, custom graphic print integration", price: 2400, status: "In Stock", image: "/placeholder-merch.jpg" },
    { id: "m4", name: "Avenue Monogram Tee", desc: "Supima cotton, seamless tubular body construction", price: 4500, status: "In Stock", image: "/placeholder-merch.jpg" },
    { id: "m5", name: "GT XX Weekend Duffel", desc: "Water-resistant canvas, seatbelt-grade straps", price: 14000, status: "Pre-order", image: "/placeholder-merch.jpg" },
    { id: "m6", name: "Affalterbach Keyring", desc: "Machined aluminum, matte finish", price: 1800, status: "In Stock", image: "/placeholder-merch.jpg" }
  ];

  if (isLoading) return <div className="min-h-screen bg-[#030303]"></div>;

  if (!isSeated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#030303] px-8">
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/50 mb-4">Access Denied</span>
        <h1 className="text-3xl md:text-5xl font-light text-white mb-6 text-center" style={{ fontFamily: 'var(--font-serif)' }}>
          Concierge Key Required
        </h1>
        <p className="font-mono text-xs text-white/40 tracking-widest uppercase text-center max-w-md mb-10 leading-relaxed">
          The Merchandise Collection is exclusively available to seated guests. Please see the host desk to unlock your session.
        </p>
        <a href="/" className="px-8 py-4 border border-white/20 text-white text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
          Return to Studio
        </a>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-32 pb-32 px-8 md:px-16 max-w-[1600px] mx-auto bg-[#030303]">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-24 text-center">
        <span className="px-3 py-1 bg-white/5 border border-white/10 text-[9px] tracking-[0.3em] uppercase text-white/50 mb-6 inline-block">Exclusive Merchandise</span>
        <h1 style={{ fontFamily: 'var(--font-serif)' }} className="text-5xl md:text-7xl font-light text-white mb-6">The Collection.</h1>
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40 max-w-2xl mx-auto leading-relaxed">
          Bespoke apparel and accessories inspired by the AMG.EA architecture and Mercedes-Benz heritage.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
        {collections.map((item, idx) => (
          <motion.div 
            key={item.id} 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }} 
            className="group flex flex-col h-full"
          >
            <div className="relative aspect-[4/5] bg-[#0a0a0a] border border-white/10 overflow-hidden mb-6 group-hover:border-white/30 transition-colors">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${item.image})` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
              <div className="absolute top-4 right-4 z-20">
                <span className={`px-3 py-1 text-[8px] tracking-[0.2em] uppercase backdrop-blur-md border ${item.status === 'In Stock' ? 'bg-white/5 border-white/10 text-white/70' : item.status === 'Low Stock' ? 'bg-orange-500/10 border-orange-500/30 text-orange-400' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'}`}>
                  {item.status}
                </span>
              </div>
            </div>

            <div className="flex flex-col flex-grow">
              <h3 style={{ fontFamily: 'var(--font-serif)' }} className="text-2xl text-white mb-3">{item.name}</h3>
              <p className="font-mono text-[9px] tracking-[0.15em] text-white/40 uppercase leading-relaxed mb-6 flex-grow">
                {item.desc}
              </p>
              
              <div className="flex justify-between items-end border-t border-white/10 pt-4 mt-auto">
                <span className="font-mono text-sm tracking-widest text-white/90">₹ {item.price.toLocaleString('en-IN')}</span>
                
                {/* Interactive Button */}
                <button 
                  onClick={() => handleAddToCart(item)} 
                  disabled={addedItems[item.id]}
                  className={`px-5 py-2.5 text-[9px] font-bold uppercase tracking-[0.2em] transition-all duration-300 border ${
                    addedItems[item.id] 
                      ? 'bg-[#050505] text-emerald-400 border-emerald-500/50 cursor-default' 
                      : 'bg-white text-black border-transparent hover:bg-neutral-300 cursor-pointer'
                  }`}
                >
                  {addedItems[item.id] ? 'Added' : 'Add to Cart'}
                </button>

              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}