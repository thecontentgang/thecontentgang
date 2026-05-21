import { 
  ArrowUpRight, 
  Globe, 
  TrendingUp, 
  CheckCircle2, 
  Pen,
  MousePointerClick,
  Store
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect, useRef } from "react";

// IMPORT YOUR DATA AND TYPES HERE:
import { brandsData, type ServiceType } from "./brandsData"; 

// --- CUSTOM INSTAGRAM SVG ICON ---
const InstagramIcon = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function CaseStudiesSection() {
  const [activeTab, setActiveTab] = useState<ServiceType>("content");
  const [scrolled, setScrolled] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      // getBoundingClientRect().top = distance from viewport top to section top.
      // When negative, we've scrolled past the section's top edge.
      // Shrink after 80px into the section; expand back the moment it's < 80px.
      const sectionTop = sectionRef.current.getBoundingClientRect().top;
      setScrolled(sectionTop < -80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // run on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const tabs = [
    { id: "content", label: "Content & Social", icon: Pen },
    { id: "leads", label: "Lead Generation", icon: TrendingUp },
    { id: "website", label: "Web & SEO", icon: Globe },
  ] as const;

  const filteredBrands = brandsData.filter((brand) => brand.services.includes(activeTab));

  return (
    <section ref={sectionRef} id="work" className="relative w-full bg-[#050505] text-white selection:bg-[#e38777] selection:text-white overflow-clip">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#D1513B]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[400px] bg-[#e38777]/5 blur-[150px] rounded-full pointer-events-none" />

      {/* --- STICKY HEADER & TABS --- */}
      <div
        className="sticky top-0 z-50 w-full bg-[#050505]/90 backdrop-blur-2xl border-b border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
        style={{
          paddingTop: scrolled ? "10px" : "48px",
          paddingBottom: scrolled ? "10px" : "24px",
          transition: "padding 0.4s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div className="max-w-[1200px] mx-auto px-4 flex flex-col items-center justify-center text-center">
          
          {/* Badge — hides when scrolled */}
          <div
            style={{
              maxHeight: scrolled ? "0px" : "48px",
              opacity: scrolled ? 0 : 1,
              marginBottom: scrolled ? "0px" : "16px",
              overflow: "hidden",
              transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease, margin-bottom 0.4s ease",
            }}
          >
            <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
              <span className="text-[10px] sm:text-xs font-medium tracking-widest text-gray-300 uppercase">
                Brand Success Stories
              </span>
            </div>
          </div>

          {/* Headline — shrinks font + margin when scrolled */}
          <h2
            style={{
              fontSize: scrolled ? "clamp(1.1rem, 3vw, 1.5rem)" : "clamp(1.75rem, 5vw, 3.75rem)",
              marginBottom: scrolled ? "10px" : "24px",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              transition: "font-size 0.4s cubic-bezier(0.4,0,0.2,1), margin-bottom 0.4s ease",
            }}
          >
            Real Results.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D1513B] to-[#e38777]">
              Proven ROI.
            </span>
          </h2>

          {/* Tab Pill Bar — shrinks slightly when scrolled */}
          <div
            className="flex flex-wrap justify-center items-center p-1.5 bg-white/5 border border-white/10 rounded-full"
            style={{
              transform: scrolled ? "scale(0.88)" : "scale(1)",
              transformOrigin: "center top",
              transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as ServiceType)}
                  className={`relative flex items-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm md:text-base font-semibold transition-all duration-300 ${
                    isActive ? "text-white" : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-tab"
                      className="absolute inset-0 bg-gradient-to-r from-[#D1513B] to-[#e38777] rounded-full shadow-[0_0_15px_rgba(209,81,59,0.4)]"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* --- SCROLLING CONTENT AREA --- */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 pt-12 pb-24 md:pb-32">
        
        <div className="flex flex-col gap-10 lg:gap-14">
          <AnimatePresence mode="popLayout">
            {filteredBrands.map((brand) => {
              const currentData = 
                activeTab === "content" ? brand.contentData : 
                activeTab === "leads" ? brand.leadsData : 
                brand.websiteData;

              if (!currentData) return null;

              return (
                <motion.div
                  key={`${brand.id}-${activeTab}`}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
                  className="group flex flex-col md:flex-row w-full h-[680px] md:h-[460px] bg-[#0a0a0a] border border-white/10 rounded-[2rem] overflow-hidden hover:border-[#e38777]/50 transition-colors duration-500 shadow-xl hover:shadow-[0_0_40px_rgba(209,81,59,0.12)]"
                >
                  
                  <div className="relative w-full md:w-5/12 h-[260px] md:h-full bg-zinc-900 shrink-0 overflow-hidden">
                    <img 
                      src={currentData.image} 
                      alt={`${brand.brandName} - ${activeTab}`}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent opacity-90" />
                    <div className="absolute top-5 left-5 md:top-8 md:left-8 w-12 h-12 md:w-14 md:h-14 bg-black/60 backdrop-blur-md rounded-xl md:rounded-2xl border border-white/20 flex items-center justify-center shadow-2xl">
                      <span className="text-base md:text-lg font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400">
                        {brand.logoText}
                      </span>
                    </div>
                  </div>

                  <div className="w-full h-[420px] md:h-full md:w-7/12 p-6 sm:p-8 lg:p-10 flex flex-col flex-1 overflow-hidden">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-4 lg:mb-6 shrink-0">
                      {brand.brandName}
                    </h3>
                    <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 font-light line-clamp-3 shrink-0">
                      {currentData.description}
                    </p>

                    <div className="mt-auto shrink-0">
                      
                      {activeTab === "content" && brand.contentData && (
                        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 sm:p-6">
                          <div className="flex items-center justify-between mb-4 sm:mb-6">
                            <a href="#" className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-[#e38777] hover:text-[#ffc5bc] transition-colors group/link">
                              <InstagramIcon className="w-4 h-4" />
                              <span className="font-semibold underline decoration-[#e38777]/30 underline-offset-4 group-hover/link:decoration-[#ffc5bc] truncate max-w-[200px] sm:max-w-none">
                                {brand.contentData.instagramHandle}
                              </span>
                              <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                            </a>
                          </div>
                          <div className="flex gap-6 sm:gap-8 items-end">
                            <div>
                              <p className="text-2xl sm:text-3xl font-black text-white">{brand.contentData.followersGained}</p>
                              <p className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wider mt-1">Followers Gained</p>
                            </div>
                            <div>
                              <p className="text-2xl sm:text-3xl font-black text-white">{brand.contentData.views}</p>
                              <p className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wider mt-1">Total Views</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === "leads" && brand.leadsData && (
                        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 sm:p-6">
                          <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-4 sm:gap-y-6 gap-x-4">
                            <div>
                              <p className="text-2xl sm:text-3xl font-black text-white">{brand.leadsData.leadsGenerated}</p>
                              <p className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wider mt-1">Leads ({brand.leadsData.months} Mo.)</p>
                            </div>
                            <div>
                              <p className="text-2xl sm:text-3xl font-black text-white">{brand.leadsData.converted}</p>
                              <p className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wider mt-1">Converted</p>
                            </div>
                            <div className="col-span-2 lg:col-span-1 lg:border-l lg:border-white/10 lg:pl-6 pt-2 lg:pt-0 border-t border-white/10 lg:border-t-0">
                              <p className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                                {brand.leadsData.revenue}
                              </p>
                              <p className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wider mt-1">Revenue</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === "website" && brand.websiteData && (
                        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 sm:p-6">
                          <div className="mb-4 sm:mb-5">
                            <span className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-300 text-[10px] sm:text-xs font-bold rounded-lg">
                              <MousePointerClick className="w-3.5 h-3.5 shrink-0" />
                              <span className="truncate">Beautiful {brand.websiteData.pages} Pages Website</span>
                            </span>
                          </div>
                          <ul className="grid grid-cols-1 gap-2.5 sm:gap-3">
                            {brand.websiteData.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2.5 sm:gap-3">
                                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 shrink-0 mt-0.5" />
                                <span className="text-xs sm:text-sm text-gray-300 font-medium line-clamp-1 sm:line-clamp-none">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* --- NOTE BANNER --- */}
        <div className="mt-16 p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row items-center gap-4 justify-center text-center sm:text-left">
          <div className="w-12 h-12 rounded-full bg-[#D1513B]/10 flex items-center justify-center shrink-0">
            <Store className="w-6 h-6 text-[#D1513B]" />
          </div>
          <div>
            <h4 className="text-white font-bold text-lg mb-1">And many more industries...</h4>
            <p className="text-gray-400 text-sm">
              Note: We provide tailored digital solutions for all types of businesses including <strong className="text-gray-200 font-medium">Shopping Malls, Home Theaters, Jewellery Shops, and Skincare Brands</strong>.
            </p>
          </div>
        </div>

        {/* --- BOTTOM CTA --- */}
        <div className="mt-20 flex flex-col items-center justify-center text-center">
          <p className="text-gray-400 text-lg mb-6 font-light">
            Ready to become our next success story?
          </p>
          <button className="group relative px-8 py-4 bg-gradient-to-r from-[#D1513B] to-[#e38777] text-white rounded-full font-bold text-lg hover:shadow-[0_0_30px_rgba(209,81,59,0.4)] transition-all duration-300 flex items-center gap-3">
            Get a Free Growth Audit
            <ArrowUpRight className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}