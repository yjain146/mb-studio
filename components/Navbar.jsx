'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../store/useCartStore';

export default function Navbar() {
  const [isSeated, setIsSeated] = useState(false);
  const [activeTable, setActiveTable] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableInput, setTableInput] = useState('');
  const [pinInput, setPinInput] = useState('');
  const [error, setError] = useState('');

  const { toggleCart, culinaryCart, merchCart } = useCartStore();
  const cartItemCount = 
    (culinaryCart || []).reduce((total, item) => total + (item.quantity || 1), 0) + 
    (merchCart || []).reduce((total, item) => total + (item.quantity || 1), 0);

  useEffect(() => {
    const sessionTable = localStorage.getItem('mb_active_table');
    if (sessionTable) {
      setIsSeated(true);
      setActiveTable(sessionTable);
    }
  }, []);

  const handleVerify = (e) => {
    e.preventDefault();
    if (pinInput === '1926' && tableInput.trim() !== '') {
      const table = tableInput.toUpperCase().trim();
      localStorage.setItem('mb_active_table', table);
      setIsSeated(true);
      setActiveTable(table);
      setIsModalOpen(false);
      setError('');
    } else {
      setError('Invalid Concierge PIN or Table');
    }
  };

  const handleEndSession = () => {
    localStorage.removeItem('mb_active_table');
    setIsSeated(false);
    setActiveTable('');
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-40 flex items-center justify-between px-8 py-6 bg-[#030303]/70 backdrop-blur-2xl border-b border-white/5 transition-all">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-[10px] font-medium tracking-[0.2em]">MB</div>
          <span className="text-[10px] tracking-[0.3em] font-light uppercase text-white/90 hidden sm:block">Studio Delhi NCR</span>
        </div>

        <div className="hidden lg:flex items-center gap-10 text-[10px] tracking-[0.25em] uppercase text-white/50">
          <Link href="/#studio" className="hover:text-white transition-colors">The Residency</Link>
          <Link href="/#amg" className="hover:text-white transition-colors">AMG GT XX</Link>
          
          <a 
            href="https://www.mercedes-benz.co.in/passengercars/test-drive.html?view=BODYTYPE" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Test Drive
          </a>

          {isSeated && (
            <>
              <span className="w-px h-4 bg-white/20 block"></span>
              <Link href="/culinary" className="text-white hover:text-white/70 transition-colors">The Café</Link>
              <Link href="/lifestyle" className="text-white hover:text-white/70 transition-colors">Merchandise</Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-6">
          {isSeated && (
            <button onClick={toggleCart} className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors relative">
              Cart {cartItemCount > 0 && `(${cartItemCount})`}
            </button>
          )}
          <button 
            onClick={() => isSeated ? handleEndSession() : setIsModalOpen(true)}
            className="flex items-center gap-4 px-5 py-2.5 bg-[#0a0a0a] border border-white/10 rounded-full hover:border-white/30 transition-all shadow-lg group"
          >
            <div className="flex flex-col text-right">
              <span className="text-[8px] tracking-[0.2em] uppercase text-white/50 mb-0.5">Access Status</span>
              <span className={`text-[10px] font-mono tracking-widest uppercase transition-colors ${isSeated ? 'text-emerald-400' : 'text-white'}`}>
                {isSeated ? `Table ${activeTable}` : 'Visitor'}
              </span>
            </div>
            <div className={`w-2 h-2 rounded-full ${isSeated ? 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]' : 'bg-white/30 group-hover:bg-white/80'}`} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer" />
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="relative w-full max-w-lg bg-[#050505] border border-white/10 shadow-2xl p-12">
              <h2 style={{ fontFamily: 'var(--font-serif)' }} className="text-4xl text-center text-white mb-2">Concierge Key</h2>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/50 text-center mb-10">Host verification required</p>
              
              <form onSubmit={handleVerify} className="space-y-6">
                <input type="text" placeholder="TABLE (e.g. G-04)" value={tableInput} onChange={(e) => setTableInput(e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 px-5 py-4 text-sm text-white font-mono uppercase tracking-widest outline-none focus:border-white/50" />
                <input type="password" placeholder="PIN (1926)" maxLength={4} value={pinInput} onChange={(e) => setPinInput(e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 px-5 py-4 text-xl text-white font-mono tracking-[0.5em] outline-none focus:border-white/50" />
                {error && <p className="text-red-400 text-[10px] tracking-widest uppercase text-center">{error}</p>}
                <button type="submit" className="w-full py-5 bg-white text-black text-[11px] tracking-[0.25em] font-bold uppercase hover:bg-gray-200 transition-all mt-4">Unlock Lounge</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}