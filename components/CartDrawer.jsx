'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../store/useCartStore';

export default function CartDrawer() {
  const { 
    culinaryCart, 
    merchCart, 
    isCartOpen, 
    toggleCart, 
    cartView, 
    setCartView, 
    removeFromCart, 
    updateQuantity 
  } = useCartStore();

  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');

  // Determine which cart is currently active in the UI
  const activeCart = cartView === 'culinary' ? culinaryCart : merchCart;

  const getNumericPrice = (price) => {
    if (typeof price === 'string') {
      return Number(price.replace(/[^0-9.-]+/g, ""));
    }
    return price || 0;
  };

  // Math applies ONLY to the currently viewed cart
  const subtotal = activeCart.reduce((acc, item) => {
    const cleanPrice = getNumericPrice(item.price);
    const qty = Number(item.quantity) || 1;
    return acc + (cleanPrice * qty);
  }, 0);

  const discountAmount = subtotal * discount;
  const finalTotal = subtotal - discountAmount;

  const handleApplyCoupon = () => {
    const code = couponCode.toUpperCase();
    if (code === 'AMG10' && cartView === 'merch') {
      setDiscount(0.10);
      setCouponMessage('10% Merchandise Discount Applied');
    } else if (code === 'LAVONNE' && cartView === 'culinary') {
      setDiscount(0.15);
      setCouponMessage('15% Culinary Discount Applied');
    } else {
      setDiscount(0);
      setCouponMessage('Invalid or Inapplicable Code');
    }
  };

  // Reset coupon if user switches tabs
  const handleTabSwitch = (tab) => {
    setCartView(tab);
    setCouponCode('');
    setDiscount(0);
    setCouponMessage('');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={toggleCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          <motion.div 
            initial={{ x: '100%' }} 
            animate={{ x: 0 }} 
            exit={{ x: '100%' }} 
            transition={{ type: 'tween', duration: 0.4 }}
            className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-[#050505] border-l border-white/10 z-50 flex flex-col shadow-2xl"
          >
            {/* Header & Tabs */}
            <div className="pt-8 px-8 border-b border-white/10 bg-[#0a0a0a]">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-light text-white" style={{ fontFamily: 'var(--font-serif)' }}>Your Order</h2>
                <button onClick={toggleCart} className="text-white/50 hover:text-white transition-colors text-2xl font-light">
                  &times;
                </button>
              </div>
              
              <div className="flex gap-6">
                <button 
                  onClick={() => handleTabSwitch('culinary')}
                  className={`pb-4 text-[10px] tracking-[0.2em] uppercase font-mono transition-colors relative ${cartView === 'culinary' ? 'text-white' : 'text-white/40'}`}
                >
                  Lavonne Café
                  {cartView === 'culinary' && <motion.div layoutId="cartTab" className="absolute bottom-0 left-0 w-full h-px bg-white" />}
                </button>
                <button 
                  onClick={() => handleTabSwitch('merch')}
                  className={`pb-4 text-[10px] tracking-[0.2em] uppercase font-mono transition-colors relative ${cartView === 'merch' ? 'text-white' : 'text-white/40'}`}
                >
                  Merchandise
                  {cartView === 'merch' && <motion.div layoutId="cartTab" className="absolute bottom-0 left-0 w-full h-px bg-white" />}
                </button>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {activeCart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                  <p className="font-mono text-[10px] tracking-widest uppercase text-white">
                    Your {cartView === 'culinary' ? 'café order' : 'merchandise cart'} is empty
                  </p>
                </div>
              ) : (
                activeCart.map((item) => {
                  const cleanPrice = getNumericPrice(item.price);
                  return (
                    <div key={item.id} className="flex gap-4 items-center">
                      <div className="w-20 h-20 bg-white/5 border border-white/10 bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} />
                      <div className="flex-1">
                        <h4 className="text-sm text-white mb-1">{item.name}</h4>
                        <p className="font-mono text-[10px] text-white/50 mb-3">₹ {cleanPrice.toLocaleString('en-IN')}</p>
                        <div className="flex items-center gap-3">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1, cartView)} className="w-6 h-6 border border-white/20 flex items-center justify-center text-white/70 hover:bg-white/10">-</button>
                          <span className="font-mono text-[10px] text-white w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1, cartView)} className="w-6 h-6 border border-white/20 flex items-center justify-center text-white/70 hover:bg-white/10">+</button>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.id, cartView)} className="text-[10px] tracking-widest uppercase text-white/30 hover:text-red-400 transition-colors">
                        Remove
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {/* Checkout Area */}
            {activeCart.length > 0 && (
              <div className="p-8 border-t border-white/10 bg-[#0a0a0a]">
                <div className="mb-6">
                  <div className="flex gap-2 mb-2">
                    <input 
                      type="text" 
                      placeholder="ENTER CODE" 
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 bg-transparent border border-white/20 px-4 py-3 text-[10px] font-mono text-white tracking-[0.2em] uppercase focus:outline-none focus:border-white/50 transition-colors"
                    />
                    <button onClick={handleApplyCoupon} className="px-6 border border-white/20 text-white text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                      Apply
                    </button>
                  </div>
                  {couponMessage && (
                    <p className={`text-[9px] font-mono tracking-widest uppercase ${discount > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {couponMessage}
                    </p>
                  )}
                </div>

                <div className="space-y-3 mb-8 font-mono text-[10px] tracking-widest uppercase">
                  <div className="flex justify-between text-white/50">
                    <span>Subtotal</span>
                    <span>₹ {subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Discount</span>
                      <span>- ₹ {discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-white text-sm pt-4 border-t border-white/10">
                    <span>Total</span>
                    <span>₹ {finalTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <button className="w-full py-5 bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-neutral-300 transition-colors">
                  Checkout {cartView === 'culinary' ? 'Café' : 'Merch'}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}