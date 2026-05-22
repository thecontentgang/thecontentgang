"use client";

import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  Store, 
  ChevronRight, 
  ChevronLeft,
  LineChart,
  LayoutTemplate,
  ExternalLink,
  Users,
  Eye,
  TrendingUp,
  Calendar,
  CreditCard,
  Target,
  Wrench,
  ImageIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { brandsData, type BrandCaseStudy, type ContentData, type LeadsData, type WebsiteData } from "./brandsData";

// --- Custom Instagram SVG Icon ---
const InstagramIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
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
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

// --- Safe Image Component (object-contain) ---
const SafeImage = ({ 
  src, 
  fallbackSrc, 
  alt, 
  className,
}: { 
  src?: string; 
  fallbackSrc?: string; 
  alt: string; 
  className?: string;
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleError = () => {
    if (!hasError) setHasError(true);
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const displaySrc = hasError && fallbackSrc ? fallbackSrc : src;

  if (!displaySrc && !fallbackSrc) {
    return (
      <div className={`${className} bg-[#0a0a0a] flex items-center justify-center`}>
        <ImageIcon className="w-8 h-8 text-gray-700" />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#0a0a0a] ${className || ''}`}>
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-[#0a0a0a] animate-pulse" />
      )}
      <img 
        src={displaySrc || fallbackSrc} 
        alt={alt} 
        className={`w-full h-full object-contain transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onError={handleError}
        onLoad={handleLoad}
      />
    </div>
  );
};

// --- Safe Logo Component ---
const SafeLogo = ({ 
  logoImage, 
  logoFallback, 
  logoText, 
  brandName 
}: { 
  logoImage?: string; 
  logoFallback?: string; 
  logoText: string; 
  brandName: string;
}) => {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const logoSrc = imgError && logoFallback ? logoFallback : logoImage;

  if (!logoSrc) {
    return (
      <span className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500">
        {logoText}
      </span>
    );
  }

  return (
    <div className="relative w-full h-full">
      {!imgLoaded && !imgError && (
        <span className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 absolute inset-0 flex items-center justify-center">
          {logoText}
        </span>
      )}
      <img 
        src={logoSrc} 
        alt={`${brandName} logo`}
        className={`w-full h-full object-contain p-1 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ mixBlendMode: 'screen' }}
        onLoad={() => setImgLoaded(true)}
        onError={() => { if (!imgError) setImgError(true); }}
      />
      {imgError && !logoFallback && (
        <span className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 absolute inset-0 flex items-center justify-center">
          {logoText}
        </span>
      )}
    </div>
  );
};

// --- Mobile Carousel ---
const MobileCarousel = ({ brand }: { brand: BrandCaseStudy }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides: Array<{
    id: string;
    img: string;
    fallbackImg?: string;
    label: string;
    linkUrl?: string;
  }> = [];
  
  if (brand.contentData) {
    slides.push({
      id: "content",
      img: brand.contentData.image,
      fallbackImg: brand.contentData.fallbackImage,
      label: "Content & Social",
      linkUrl: brand.contentData.instagramUrl,
    });
  }
  if (brand.leadsData) {
    slides.push({
      id: "leads",
      img: brand.leadsData.image,
      fallbackImg: brand.leadsData.fallbackImage,
      label: "Ads & Performance",
    });
  }
  if (brand.websiteData) {
    slides.push({
      id: "website",
      img: brand.websiteData.image,
      fallbackImg: brand.websiteData.fallbackImage,
      label: "Website",
      linkUrl: brand.websiteData.websiteLink,
    });
  }

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) return null;

  const currentSlide = slides[currentIndex];

  return (
    <div className="relative w-full aspect-[16/9] bg-[#0a0a0a] overflow-hidden group">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-[#0a0a0a]"
        >
          <div 
            className="w-full h-full cursor-pointer"
            onClick={() => {
              if (currentSlide.linkUrl) {
                window.open(currentSlide.linkUrl, '_blank');
              }
            }}
          >
            <SafeImage 
              src={currentSlide.img} 
              fallbackSrc={currentSlide.fallbackImg}
              alt={currentSlide.label} 
              className="w-full h-full" 
            />
            {currentSlide.linkUrl && (
              <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md rounded-full p-1.5">
                <ExternalLink className="w-3.5 h-3.5 text-white" />
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
              <span className="text-white text-sm font-medium">{currentSlide.label}</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {slides.length > 1 && (
        <>
          <button 
            onClick={(e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev + 1) % slides.length); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-4 h-4 text-white" />
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                className={`h-1 rounded-full transition-all ${
                  currentIndex === idx ? "w-5 bg-white" : "w-1.5 bg-white/40"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// --- Stat Badge ---
const StatBadge = ({ 
  icon: Icon, 
  value, 
  label,
  colorClass = "text-[#D1513B]"
}: { 
  icon: React.ComponentType<{ className?: string }>; 
  value: string; 
  label: string;
  colorClass?: string;
}) => (
  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
    <Icon className={`w-3.5 h-3.5 ${colorClass}`} />
    <span className="text-white font-bold text-sm">{value}</span>
    <span className="text-gray-500 text-xs">{label}</span>
  </div>
);

// --- Content Stats ---
const ContentStats = ({ data }: { data: ContentData }) => (
  <div className="space-y-2.5">
    <div className="flex items-center gap-2">
      <InstagramIcon className="w-4 h-4 text-[#D1513B]" />
      <h4 className="text-white font-semibold text-sm">Content & Social Media</h4>
    </div>
    <p className="text-gray-400 text-sm leading-relaxed">{data.description}</p>
    <div className="flex flex-wrap gap-2">
      <StatBadge icon={Users} value={data.followersGained} label="Followers" />
      <StatBadge icon={Eye} value={data.views} label="Views" />
    </div>
    {data.instagramUrl && (
      <a href={data.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-[#D1513B] hover:text-[#e38777] transition-colors font-medium">
        <InstagramIcon className="w-3.5 h-3.5" />
        View Profile
      </a>
    )}
  </div>
);

// --- Leads Stats ---
const LeadsStats = ({ data }: { data: LeadsData }) => (
  <div className="space-y-2.5">
    <div className="flex items-center gap-2">
      <LineChart className="w-4 h-4 text-[#D1513B]" />
      <h4 className="text-white font-semibold text-sm">Performance Marketing</h4>
    </div>
    <p className="text-gray-400 text-sm leading-relaxed">{data.description}</p>
    <div className="grid grid-cols-2 gap-2">
      <StatBadge icon={Target} value={data.leadsGenerated} label="Leads" />
      <StatBadge icon={TrendingUp} value={data.converted} label="Converted" colorClass="text-emerald-400" />
      <StatBadge icon={Calendar} value={`${data.months}m`} label="Duration" />
      <StatBadge icon={CreditCard} value={data.revenue} label="Revenue" colorClass="text-emerald-400" />
    </div>
  </div>
);

// --- Website Stats ---
const WebsiteStats = ({ data }: { data: WebsiteData }) => (
  <div className="space-y-2.5">
    <div className="flex items-center gap-2">
      <LayoutTemplate className="w-4 h-4 text-[#D1513B]" />
      <h4 className="text-white font-semibold text-sm">Website Development</h4>
    </div>
    <p className="text-gray-400 text-sm leading-relaxed">{data.description}</p>
    <div className="flex flex-wrap gap-1.5">
      {data.features.map((feature, idx) => (
        <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/[0.03] border border-white/[0.06] rounded-full text-xs font-medium text-gray-300">
          <Wrench className="w-3 h-3 text-[#D1513B]" />
          {feature}
        </span>
      ))}
    </div>
    {data.websiteLink && (
      <a href={data.websiteLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-[#D1513B] hover:text-[#e38777] transition-colors font-medium">
        <ExternalLink className="w-3.5 h-3.5" />
        Visit Website
      </a>
    )}
  </div>
);

export default function CaseStudiesSection() {
  return (
    <section id="work" className="relative w-full bg-[#050505] text-white py-16 sm:py-20 lg:py-24 overflow-hidden max-w-[100vw]">
      
      <div className="absolute top-0 right-0 w-[400px] sm:w-[600px] lg:w-[800px] h-[400px] sm:h-[600px] lg:h-[800px] bg-[#D1513B]/5 blur-[120px] sm:blur-[150px] rounded-full pointer-events-none" />
      
      {/* HEADER */}
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8 lg:px-12 mb-12 sm:mb-14 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 rounded-full border border-[#D1513B]/20 bg-[#D1513B]/5 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D1513B] animate-pulse"></span>
          <span className="text-xs sm:text-sm font-semibold tracking-widest text-[#D1513B] uppercase">
            Client Success Stories
          </span>
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-4">
          Growth that <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D1513B] to-[#e38777]">speaks.</span>
        </h2>
        <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto font-light">
          We engineer complete digital ecosystems designed to dominate your market.
        </p>
      </div>

      {/* CASE STUDIES CARDS */}
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8 lg:px-12 flex flex-col gap-6 sm:gap-8 relative z-10 w-full">
        {brandsData.map((brand, index) => (
          <motion.div
            key={brand.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="group relative flex flex-col lg:flex-row w-full bg-[#0a0a0a] border border-white/[0.08] rounded-2xl overflow-hidden transition-all duration-400 hover:border-[#D1513B]/20"
          >
            {/* CONTENT SECTION */}
            <div className="w-full lg:w-[55%] p-5 sm:p-6 lg:p-7 flex flex-col bg-[#0a0a0a]">
              
              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-transparent flex items-center justify-center shrink-0 overflow-hidden relative border border-white/[0.06]">
                  <SafeLogo 
                    logoImage={brand.logoImage}
                    logoFallback={brand.logoFallback}
                    logoText={brand.logoText}
                    brandName={brand.brandName}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight truncate">
                    {brand.brandName}
                  </h3>
                  {(brand.contentData as ContentData)?.instagramHandle && (
                    <a
                      href={`https://instagram.com/${(brand.contentData as ContentData).instagramHandle.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-0.5 text-xs text-gray-400 hover:text-[#D1513B] transition-colors"
                    >
                      <InstagramIcon className="w-3 h-3" />
                      <span>{(brand.contentData as ContentData).instagramHandle}</span>
                    </a>
                  )}
                </div>
                {/* Service Pills */}
                <div className="hidden sm:flex gap-1.5 shrink-0">
                  {brand.services.includes("content") && (
                    <span className="px-2.5 py-1 bg-[#D1513B]/10 border border-[#D1513B]/20 rounded-md text-[10px] font-semibold text-[#e38777]">Content</span>
                  )}
                  {brand.services.includes("leads") && (
                    <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-md text-[10px] font-semibold text-emerald-400">Leads</span>
                  )}
                  {brand.services.includes("website") && (
                    <span className="px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 rounded-md text-[10px] font-semibold text-blue-400">Web</span>
                  )}
                </div>
              </div>

              {/* Service Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {brand.contentData && <ContentStats data={brand.contentData as ContentData} />}
                {brand.leadsData && <LeadsStats data={brand.leadsData as LeadsData} />}
                {brand.websiteData && <WebsiteStats data={brand.websiteData as WebsiteData} />}
              </div>

              {/* Mobile Service Pills */}
              <div className="flex sm:hidden gap-1.5 mt-4 pt-4 border-t border-white/[0.06]">
                {brand.services.includes("content") && (
                  <span className="px-2.5 py-1 bg-[#D1513B]/10 border border-[#D1513B]/20 rounded-md text-[10px] font-semibold text-[#e38777]">Content</span>
                )}
                {brand.services.includes("leads") && (
                  <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-md text-[10px] font-semibold text-emerald-400">Leads</span>
                )}
                {brand.services.includes("website") && (
                  <span className="px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 rounded-md text-[10px] font-semibold text-blue-400">Web</span>
                )}
              </div>
            </div>

            {/* IMAGES SECTION */}
            <div className="w-full lg:w-[45%] border-t lg:border-t-0 lg:border-l border-white/[0.06] bg-[#0a0a0a]">
              {/* Mobile Carousel */}
              <div className="lg:hidden">
                <MobileCarousel brand={brand} />
              </div>
              
              {/* Desktop Image Grid - All images use object-contain */}
              <div className="hidden lg:grid grid-cols-1 h-full">
                <div className="grid grid-cols-2 grid-rows-2 gap-px bg-white/[0.06] h-full min-h-[280px]">
                  {brand.contentData && (
                    <a 
                      href={brand.contentData.instagramUrl || '#'} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="relative overflow-hidden group/img col-span-2 bg-[#0a0a0a] p-4"
                    >
                      <img 
                        src={brand.contentData.image}
                        alt="Content"
                        className="w-full h-full object-contain group-hover/img:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/10 transition-all flex items-center justify-center">
                        <ExternalLink className="w-5 h-5 text-white opacity-0 group-hover/img:opacity-100 transition-opacity" />
                      </div>
                      <span className="absolute bottom-2 left-2 text-white text-xs font-medium bg-black/50 px-2 py-0.5 rounded-full">Content & Social</span>
                    </a>
                  )}
                  {brand.leadsData && (
                    <div className="relative overflow-hidden group/img bg-[#0a0a0a] p-3">
                      <img 
                        src={brand.leadsData.image}
                        alt="Leads"
                        className="w-full h-full object-contain group-hover/img:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute bottom-2 left-2 text-white text-xs font-medium bg-black/50 px-2 py-0.5 rounded-full">Ads</span>
                    </div>
                  )}
                  {brand.websiteData && (
                    <a 
                      href={brand.websiteData.websiteLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="relative overflow-hidden group/img bg-[#0a0a0a] p-3"
                    >
                      <img 
                        src={brand.websiteData.image}
                        alt="Website"
                        className="w-full h-full object-contain group-hover/img:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/10 transition-all flex items-center justify-center">
                        <ExternalLink className="w-4 h-4 text-white opacity-0 group-hover/img:opacity-100 transition-opacity" />
                      </div>
                      <span className="absolute bottom-2 left-2 text-white text-xs font-medium bg-black/50 px-2 py-0.5 rounded-full">Website</span>
                    </a>
                  )}
                  {/* Fill empty spots */}
                  {!brand.leadsData && brand.websiteData && (
                    <div className="bg-[#0a0a0a] flex items-center justify-center">
                      <span className="text-gray-700 text-xs">No data</span>
                    </div>
                  )}
                  {brand.leadsData && !brand.websiteData && (
                    <div className="bg-[#0a0a0a] flex items-center justify-center">
                      <span className="text-gray-700 text-xs">No data</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="max-w-[900px] mx-auto px-5 sm:px-8 mt-14 sm:mt-16 relative z-10">
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent border border-white/[0.08] flex flex-col sm:flex-row items-center gap-4 justify-center text-center sm:text-left mb-8">
          <div className="w-10 h-10 rounded-full bg-[#D1513B]/10 flex items-center justify-center shrink-0">
            <Store className="w-5 h-5 text-[#D1513B]" />
          </div>
          <div>
            <h4 className="text-white font-bold text-base mb-1">And many more industries...</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              We provide tailored digital solutions for all types of businesses including <strong className="text-gray-200">Shopping Malls, Home Theaters, Jewellery Shops, and Skincare Brands</strong>.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-5">
            Ready to become our next success story?
          </h3>
          <button className="group relative px-8 py-3.5 bg-gradient-to-r from-[#D1513B] to-[#e38777] text-white rounded-full font-bold text-base hover:shadow-[0_0_25px_rgba(209,81,59,0.4)] transition-all duration-300 flex items-center gap-2">
            Get a Free Growth Audit
            <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}