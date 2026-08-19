import { create } from 'zustand';

export const useCartStore = create((set) => ({
  culinaryCart: [],
  merchCart: [],
  isCartOpen: false,
  cartView: 'culinary', // 'culinary' or 'merch'

  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  
  // Allows the Cart Drawer to switch tabs
  setCartView: (view) => set({ cartView: view }),

  // Adds item to the correct array based on the 'type' passed
  addToCart: (item, type) => set((state) => {
    const cartName = type === 'culinary' ? 'culinaryCart' : 'merchCart';
    const targetCart = state[cartName];
    const existingItem = targetCart.find((cartItem) => cartItem.id === item.id);
    
    if (existingItem) {
      return {
        [cartName]: targetCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      };
    }
    
    return {
      [cartName]: [...targetCart, { ...item, quantity: 1 }]
    };
  }),

  removeFromCart: (id, type) => set((state) => {
    const cartName = type === 'culinary' ? 'culinaryCart' : 'merchCart';
    return {
      [cartName]: state[cartName].filter((item) => item.id !== id)
    };
  }),

  updateQuantity: (id, newQuantity, type) => set((state) => {
    const cartName = type === 'culinary' ? 'culinaryCart' : 'merchCart';
    
    if (newQuantity < 1) {
      return {
        [cartName]: state[cartName].filter((item) => item.id !== id)
      };
    }
    
    return {
      [cartName]: state[cartName].map((item) => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    };
  })
}));