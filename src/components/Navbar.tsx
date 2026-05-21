import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const navLinks = ['Services', 'Projects', 'About Us', 'Contact'];

export default function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Increased px (padding left/right) across different screen sizes for breathing room */}
      <nav className="fixed top-0 inset-x-0 z-50 px-6 sm:px-10 md:px-16 lg:px-24 py-6">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          
          {/* Left: Logo (Outside Pill) */}
          <div className="flex-1 flex items-center justify-start">
            <a href="/" className="block">
              <img 
                src="/Content-LOGO.png" 
                alt="TheContentGang Logo" 
                className="h-10 md:h-24 w-auto object-contain"
              />
            </a>
          </div>

          {/* Middle: Glassmorphism Nav Pill */}
          <div className="hidden md:flex items-center p-1.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            {navLinks.map((item, index) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative px-6 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:text-white"
              >
                {/* Framer Motion sliding hover effect */}
                {hoveredIndex === index && (
                  <motion.div
                    layoutId="nav-hover-pill"
                    className="absolute inset-0 bg-[#e38777]/20 border border-[#e38777]/30 rounded-full -z-10"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item}</span>
              </a>
            ))}
          </div>

          {/* Right: CTA Button (Outside Pill) */}
          <div className="flex-1 flex items-center justify-end gap-4">
            <button className="hidden md:block px-7 py-3 bg-gradient-to-r from-[#D1513B] to-[#e38777] text-white text-sm font-bold rounded-full hover:shadow-[0_0_20px_rgba(209,81,59,0.5)] hover:-translate-y-0.5 transition-all duration-300">
              Start Project
            </button>

            {/* Mobile Menu Toggle (Glassmorphism style) */}
            <button 
              className="md:hidden p-2.5 text-gray-300 hover:text-white bg-white/5 backdrop-blur-xl border border-white/10 rounded-full transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-xl md:hidden flex flex-col items-center justify-center px-6">
          <div className="flex flex-col items-center gap-8 w-full max-w-sm">
            {navLinks.map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(' ', '-')}`} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-3xl font-semibold text-gray-400 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
            <button className="w-full mt-8 px-8 py-4 bg-gradient-to-r from-[#D1513B] to-[#e38777] text-white rounded-full font-bold text-lg shadow-[0_0_20px_rgba(209,81,59,0.3)]">
              Start Project
            </button>
          </div>
        </div>
      )}
    </>
  );
}