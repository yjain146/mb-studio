'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCartStore } from '../../store/useCartStore';

export default function CulinaryPage() {
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
    addToCart(item, 'culinary');
    setAddedItems((prev) => ({ ...prev, [item.id]: true }));
    
    // Reset button after 2 seconds
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [item.id]: false }));
    }, 2000);
  };

  const menuCategories = [
    {
      title: "Signature Pâtisseries",
      items: [
        { id: "c1", name: "Signature Chocolate & Coffee Cake", desc: "Layered decadent chocolate cake with a chocolate cream and a light chocolate mousse — finished with a Mercedes-inspired metallic lacquer.", price: 650, image: "/cafe-choc-cake.jpg" },
        { id: "c2", name: "Hazelnut Caramel Choux", desc: "A choux filled with hazelnut caramel cream and crunchy hazelnut praline, layered with soft caramel, topped with hazelnut caramel mousse and a hazelnut cookie crumb.", price: 550, image: "/cafe-choux.jpg" },
        { id: "c3", name: "Cookies & Cream", desc: "Dark chocolate cake with a cookies-and-cream cremeux, dark chocolate crémeux, and a vanilla white chocolate mousse.", price: 600, image: "/cafe-cookies-cream.jpg" },
        { id: "c4", name: "Raspberry Cheesecake", desc: "Raspberry cheesecake built on textures of fresh berry and silky cheesecake, set on a crunchy shortbread base.", price: 700, image: "/cafe-cheesecake.jpg" },
        { id: "c5", name: "Opera, Redefined", desc: "Layers of coffee and chocolate opera sponge, encased in a coffee milk chocolate mousse.", price: 650, image: "/cafe-opera.jpg" },
        { id: "c6", name: "AMG Brake Disc", desc: "Glossy red chocolate shell with vanilla cream mousse, wild berry confit, berry crémeux, and soft sponge — crafted in the form of an AMG brake disc and finished with fresh berries and cream.", price: 850, image: "/cafe-amg-disc.jpg" },
        { id: "c7", name: "Tropical Tart", desc: "Flavours and textures of coconut and tropical fruit confit, with a tropical crémeux, coconut sponge, and a light coconut mousse.", price: 600, image: "/cafe-tart.jpg" }
      ]
    },
    {
      title: "Artisan Bakes",
      items: [
        { id: "b1", name: "Butter Croissant", desc: "Laminated to order, all-butter dough — shattering layers, a golden crackle crust, and a soft honeycomb crumb.", price: 350, image: "/placeholder-bake.jpg" },
        { id: "b2", name: "Pain au Chocolat", desc: "The same all-butter lamination folded around dual batons of dark chocolate, baked deep gold.", price: 400, image: "/placeholder-bake.jpg" },
        { id: "b3", name: "Cinnamon Roll", desc: "Soft laminated dough rolled with a citrus-spiced cinnamon and raisin filling, finished with a light glaze.", price: 450, image: "/placeholder-bake.jpg" },
        { id: "b4", name: "Brown Butter Hazelnut Cookie", desc: "A thick, chewy cookie built on nutty brown butter, studded with toasted hazelnuts for a rich, caramelised finish.", price: 300, image: "/placeholder-bake.jpg" },
        { id: "b5", name: "Macadamia Caramel Cookie", desc: "Buttery cookie loaded with roasted macadamia and pockets of soft caramel for a gooey centre and crisp edge.", price: 350, image: "/placeholder-bake.jpg" },
        { id: "b6", name: "Forest Mushroom Danish", desc: "Flaky lamination layered with a wild mushroom duxelles, thyme, and gruyère — a savoury trio of mushroom flavour in every bite.", price: 450, image: "/placeholder-bake.jpg" },
        { id: "b7", name: "Ham & Gruyère Danish", desc: "Buttery Danish pastry filled with smoked ham and melted gruyère, baked until deeply golden and blistered.", price: 500, image: "/placeholder-bake.jpg" },
        { id: "b8", name: "Banana Milk Chocolate Tea Cake", desc: "Moist banana tea cake glazed in milk chocolate ganache, finished with a banana chip crunch.", price: 400, image: "/placeholder-bake.jpg" }
      ]
    },
    {
      title: "Beverages",
      items: [
        { id: "bev1", name: "Signature Hot Chocolate", desc: "Signature Lavonne hot chocolate served with marshmallow.", price: 450, image: "/placeholder-bev.jpg" },
        { id: "bev2", name: "Matcha Series", desc: "Choice of Matcha Berry Latte or Vanilla Oat Matcha.", price: 500, image: "/placeholder-bev.jpg" },
        { id: "bev3", name: "Classic Coffee", desc: "Choice of Americano, Cappuccino, or Cafe Latte.", price: 350, image: "/placeholder-bev.jpg" },
        { id: "bev4", name: "Cold Coffee Series", desc: "Choice of Hazelnut Cold Coffee or Vietnamese Iced Coffee.", price: 400, image: "/placeholder-bev.jpg" }
      ]
    }
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
          The Lavonne Café menu is exclusively available to seated guests. Please see the host desk to unlock your session.
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
        <span className="px-3 py-1 bg-white/5 border border-white/10 text-[9px] tracking-[0.3em] uppercase text-white/50 mb-6 inline-block">Lavonne Café</span>
        <h1 style={{ fontFamily: 'var(--font-serif)' }} className="text-5xl md:text-7xl font-light text-white mb-6">Precision Engineering,<br/>Reimagined in Pâtisserie.</h1> 
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40 max-w-2xl mx-auto leading-relaxed">
          Each creation carries a signature Mercedes-Benz touch. Sculpted lines, metallic lacquers, and a restrained luxury palette.
        </p>
      </motion.div>

      <div className="space-y-32">
        {menuCategories.map((category, catIdx) => (
          <div key={catIdx}>
            <div className="border-b border-white/10 pb-6 mb-16">
              <h2 style={{ fontFamily: 'var(--font-serif)' }} className="text-3xl md:text-4xl font-light text-white">
                {category.title}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
              {category.items.map((item, idx) => (
                <motion.div 
                  key={item.id} 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }} 
                  className="group flex flex-col h-full"
                >
                  <div className="relative aspect-[4/3] bg-[#0a0a0a] border border-white/10 overflow-hidden mb-6 group-hover:border-white/30 transition-colors">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${item.image})` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
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
                        {addedItems[item.id] ? 'Added' : 'Add to Order'}
                      </button>

                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}