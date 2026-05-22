import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = ['Services', 'CaseStudies', 'About Us', 'Contact'];

export default function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNavPill, setShowNavPill] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Detect hero section scroll
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.85;

      if (window.scrollY > heroHeight) {
        setShowNavPill(true);
      } else {
        setShowNavPill(false);
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
     <nav
  className={`
    fixed top-0 inset-x-0 z-50
    px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24
    py-4 md:py-2
    max-w-[100vw]
    transition-all duration-500
    ${
      showNavPill
        ? "bg-black/30 backdrop-blur-xl "
        : "bg-transparent border-b border-transparent"
    }
  `}
>
        <div className="max-w-[1600px] mx-auto flex items-center justify-between w-full">

          {/* Left: Logo */}
          <div className="flex-1 flex items-center justify-start">
            <a href="/" className="block">
              <img
                src="/Content-LOGO.png"
                alt="TheContentGang Logo"
                className="
                  h-18
                  sm:h-20
                  md:h-20
                  lg:h-24
                  w-auto
                  object-contain
                  transition-all
                  duration-300
                "
              />
            </a>
          </div>

          {/* Middle: Nav Pill */}
          <AnimatePresence>
            {showNavPill && (
              <motion.div
                initial={{ opacity: 0, y: -30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.9 }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  hidden
                  md:flex
                  items-center
                  p-1.5
                  bg-white/5
                  backdrop-blur-xl
                  border
                  border-white/10
                  rounded-full
                  shadow-[0_8px_32px_rgba(0,0,0,0.4)]
                "
              >
                {navLinks.map((item, index) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(/\s+/g, "-").toLowerCase()}`}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="
      relative
      px-4
      lg:px-6
      py-2
      lg:py-2.5
      text-xs
      lg:text-sm
      font-medium
      text-gray-300
      transition-colors
      hover:text-white
    "
                  >
                    {/* Hover Pill */}
                    {hoveredIndex === index && (
                      <motion.div
                        layoutId="nav-hover-pill"
                        className="
          absolute
          inset-0
          bg-[#e38777]/20
          border
          border-[#e38777]/30
          rounded-full
          -z-10
        "
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}

                    <span className="relative z-10">{item}</span>
                  </a>
                ))}


              </motion.div>
            )}
          </AnimatePresence>

          {/* Right Section */}
          <div className="flex-1 flex items-center justify-end gap-2 sm:gap-4">
            <button
              className="
                hidden
                md:block
                px-5
                lg:px-7
                py-2.5
                lg:py-3
                bg-gradient-to-r
                from-[#D1513B]
                to-[#e38777]
                text-white
                text-xs
                lg:text-sm
                font-bold
                rounded-full
                hover:shadow-[0_0_20px_rgba(209,81,59,0.5)]
                hover:-translate-y-0.5
                transition-all
                duration-300
              "
            >
              Start Project
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="
                md:hidden
                p-2.5
                text-gray-300
                hover:text-white
                bg-white/5
                backdrop-blur-xl
                border
                border-white/10
                rounded-full
                transition-colors
              "
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="
              fixed
              inset-0
              z-40
              bg-black/95
              backdrop-blur-xl
              md:hidden
              flex
              flex-col
              items-center
              justify-center
              w-full
              max-w-[100vw]
              overflow-hidden
            "
          >
            {/* BIGGER MOBILE LOGO */}
            <motion.img
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              src="/Content-LOGO.png"
              alt="Logo"
              className="
                h-20
                sm:h-24
                w-auto
                object-contain
                mb-12
              "
            />

            <div className="flex flex-col items-center gap-6 sm:gap-8 w-full max-w-sm px-6">
              {navLinks.map((item, index) => (
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="
                    text-2xl
                    sm:text-3xl
                    font-semibold
                    text-gray-400
                    hover:text-white
                    transition-colors
                  "
                >
                  {item}
                </motion.a>
              ))}

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="
                  w-full
                  mt-6
                  sm:mt-8
                  px-6
                  sm:px-8
                  py-3
                  sm:py-4
                  bg-gradient-to-r
                  from-[#D1513B]
                  to-[#e38777]
                  text-white
                  rounded-full
                  font-bold
                  text-base
                  sm:text-lg
                  shadow-[0_0_20px_rgba(209,81,59,0.3)]
                "
              >
                Start Project
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}