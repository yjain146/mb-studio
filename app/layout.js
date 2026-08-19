import './globals.css';
import Navbar from '../components/Navbar';
import CartDrawer from '../components/CartDrawer';

export const metadata = {
  title: 'Mercedes-Benz Studio | Delhi NCR',
  description: 'An exclusive residency featuring the Concept AMG GT XX, Lavonne Culinary, and bespoke lifestyle collections.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#030303] text-[#f4f4f2] selection:bg-white/20 selection:text-white min-h-screen flex flex-col">
        <Navbar />
        <CartDrawer />
        {children}
      </body>
    </html>
  );
}