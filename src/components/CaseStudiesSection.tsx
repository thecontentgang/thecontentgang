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
  Play,
  ImageIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { brandsData, type BrandCaseStudy, type ContentData, type LeadsData, type WebsiteData } from "./brandsData";
import ReelModal from "./ReelModal";

// --- Custom Instagram SVG Icon Component ---
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

// --- Safe Image Component with Fallback ---
const SafeImage = ({ 
  src, 
  fallbackSrc, 
  alt, 
  className,
  onLoad,
  onError 
}: { 
  src?: string; 
  fallbackSrc?: string; 
  alt: string; 
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Use useMemo to derive state from props instead of setState in effect
  const currentSrc = React.useMemo(() => src, [src]);
  
  // Update state only when props actually change
  if (currentSrc !== imgSrc) {
    setImgSrc(currentSrc);
    setHasError(false);
    setIsLoading(true);
  }

  const handleError = () => {
    if (!hasError) {
      if (fallbackSrc) {
        setImgSrc(fallbackSrc);
        setHasError(true);
        setIsLoading(false);
      } else {
        setHasError(true);
        setIsLoading(false);
      }
      onError?.();
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  // If no source at all, show placeholder
  if (!imgSrc && !fallbackSrc) {
    return (
      <div className={`${className} bg-white/[0.03] flex items-center justify-center`}>
        <div className="flex flex-col items-center gap-1">
          <ImageIcon className="w-6 h-6 text-gray-600" />
          <span className="text-gray-600 text-[10px]">No Image</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className || ''}`}>
      {/* Loading shimmer */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/[0.03] animate-pulse" />
      )}
      <img 
        src={imgSrc || fallbackSrc} 
        alt={alt} 
        className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
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
    <>
      {!imgLoaded && !imgError && (
        <span className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 absolute">
          {logoText}
        </span>
      )}
      <img 
        src={logoSrc} 
        alt={`${brandName} logo`}
        className={`w-full h-full object-contain p-1.5 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setImgLoaded(true)}
        onError={() => {
          if (!imgError) {
            setImgError(true);
          }
        }}
      />
      {imgError && !logoFallback && (
        <span className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500">
          {logoText}
        </span>
      )}
    </>
  );
};

// --- SMOOTH FRAMER MOTION CAROUSEL ---
const PremiumCarousel = ({ 
  brand, 
  onReelClick 
}: { 
  brand: BrandCaseStudy; 
  onReelClick?: (reelUrl: string, brandName: string, instagramHandle: string, views: string, description: string, thumbnail: string) => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides: Array<{
    id: string;
    type: "single" | "reel";
    img: string;
    fallbackImg?: string;
    label: string;
    reelUrl?: string;
  }> = [];
  
  if (brand.contentData) {
    const contentData = brand.contentData as ContentData;
    slides.push({
      id: "content",
      type: contentData.reelUrl ? "reel" : "single",
      img: contentData.image,
      fallbackImg: contentData.fallbackImage,
      label: "Content & Social",
      reelUrl: contentData.reelUrl
    });
  }
  if (brand.leadsData) {
    slides.push({
      id: "leads",
      type: "single",
      img: brand.leadsData.image,
      fallbackImg: brand.leadsData.fallbackImage,
      label: "Ads & Dashboard"
    });
  }
  if (brand.websiteData) {
    slides.push({
      id: "website",
      type: "single",
      img: brand.websiteData.image,
      fallbackImg: brand.websiteData.fallbackImage,
      label: "Website & Architecture"
    });
  }

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);

  if (slides.length === 0) return null;

  const currentSlide = slides[currentIndex];

  return (
    <div className="relative w-full h-[280px] lg:h-full lg:absolute lg:inset-0 bg-[#050505] overflow-hidden group">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          {currentSlide.type === "reel" ? (
            <div className="w-full h-full p-1.5">
              <div 
                className="w-full h-full rounded-[1.25rem] overflow-hidden relative cursor-pointer group/reel"
                onClick={() => {
                  if (currentSlide.reelUrl && onReelClick && brand.contentData) {
                    const cd = brand.contentData as ContentData;
                    onReelClick(
                      currentSlide.reelUrl,
                      brand.brandName,
                      cd.instagramHandle,
                      cd.views,
                      cd.description,
                      currentSlide.img
                    );
                  }
                }}
              >
                <SafeImage 
                  src={currentSlide.img} 
                  fallbackSrc={currentSlide.fallbackImg}
                  alt="Reel" 
                  className="w-full h-full group-hover/reel:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover/reel:bg-black/40 transition-all">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover/reel:scale-110 transition-transform">
                    <Play className="w-7 h-7 text-white ml-1" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full p-1.5">
              <div className="w-full h-full rounded-[1.25rem] overflow-hidden relative">
                <SafeImage 
                  src={currentSlide.img} 
                  fallbackSrc={currentSlide.fallbackImg}
                  alt={currentSlide.label} 
                  className="w-full h-full" 
                />
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Floating Label */}
      <div className="absolute top-4 right-4 z-20">
        <div className="px-3 py-1.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-full">
          <span className="text-[10px] font-semibold text-white uppercase tracking-wider">
            {currentSlide.label}
          </span>
        </div>
      </div>

      {slides.length > 1 && (
        <>
          <div className="absolute bottom-4 right-4 z-20 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button onClick={prevSlide} className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-[#D1513B]/80 hover:border-transparent transition-all">
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <button onClick={nextSlide} className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-[#D1513B]/80 hover:border-transparent transition-all">
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  currentIndex === idx ? "w-6 bg-white" : "w-1.5 bg-white/30"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// --- Service Detail Card Component ---
const ServiceDetailCard = ({ 
  icon: Icon, 
  title, 
  children 
}: { 
  icon: React.ComponentType<{ className?: string }>; 
  title: string; 
  children: React.ReactNode 
}) => (
  <div className="flex gap-3 group/line">
    <div className="mt-0.5 shrink-0">
      <Icon className="w-4 h-4 text-gray-500 group-hover/line:text-[#D1513B] transition-colors" />
    </div>
    <div className="min-w-0">
      <h4 className="text-white font-semibold text-xs mb-0.5">{title}</h4>
      <div className="text-gray-400 text-xs leading-relaxed">
        {children}
      </div>
    </div>
  </div>
);

// --- Content Stats Component ---
const ContentStats = ({ data }: { data: ContentData }) => (
  <ServiceDetailCard icon={InstagramIcon} title="Content & Social Media">
    <p className="mb-2">{data.description}</p>
    <div className="flex gap-2">
      <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/[0.03] border border-white/5">
        <Users className="w-3 h-3 text-[#D1513B]" />
        <span className="text-white font-bold text-xs">{data.followersGained}</span>
        <span className="text-gray-500 text-[10px]">Followers</span>
      </div>
      <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/[0.03] border border-white/5">
        <Eye className="w-3 h-3 text-[#D1513B]" />
        <span className="text-white font-bold text-xs">{data.views}</span>
        <span className="text-gray-500 text-[10px]">Views</span>
      </div>
    </div>
  </ServiceDetailCard>
);

// --- Leads Stats Component ---
const LeadsStats = ({ data }: { data: LeadsData }) => (
  <ServiceDetailCard icon={LineChart} title="Performance Marketing">
    <p className="mb-2">{data.description}</p>
    <div className="grid grid-cols-2 gap-1.5">
      <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/[0.03] border border-white/5">
        <Target className="w-3 h-3 text-[#D1513B]" />
        <span className="text-white font-bold text-xs">{data.leadsGenerated}</span>
        <span className="text-gray-500 text-[10px]">Leads</span>
      </div>
      <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/[0.03] border border-white/5">
        <TrendingUp className="w-3 h-3 text-emerald-400" />
        <span className="text-emerald-400 font-bold text-xs">{data.converted}</span>
        <span className="text-gray-500 text-[10px]">Converted</span>
      </div>
      <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/[0.03] border border-white/5">
        <Calendar className="w-3 h-3 text-[#D1513B]" />
        <span className="text-white font-bold text-xs">{data.months}m</span>
        <span className="text-gray-500 text-[10px]">Duration</span>
      </div>
      <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/[0.03] border border-white/5">
        <CreditCard className="w-3 h-3 text-emerald-400" />
        <span className="text-emerald-400 font-bold text-xs">{data.revenue}</span>
        <span className="text-gray-500 text-[10px]">Revenue</span>
      </div>
    </div>
  </ServiceDetailCard>
);

// --- Website Stats Component ---
const WebsiteStats = ({ data }: { data: WebsiteData }) => (
  <ServiceDetailCard icon={LayoutTemplate} title="Website Development">
    <p className="mb-2">{data.description}</p>
    <div className="flex flex-wrap gap-1.5">
      {data.features.map((feature, idx) => (
        <span
          key={idx}
          className="inline-flex items-center gap-1 px-2 py-1 bg-white/[0.03] border border-white/10 rounded-full text-[10px] font-medium text-gray-300"
        >
          <Wrench className="w-3 h-3 text-[#D1513B]" />
          {feature}
        </span>
      ))}
    </div>
    {data.websiteLink && (
      <a
        href={data.websiteLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 mt-2 text-[10px] text-[#D1513B] hover:text-[#e38777] transition-colors"
      >
        <ExternalLink className="w-3 h-3" />
        Visit Website
      </a>
    )}
  </ServiceDetailCard>
);

export default function CaseStudiesSection() {
  const [reelModal, setReelModal] = useState<{
    isOpen: boolean;
    videoUrl: string;
    thumbnail: string;
    brandName: string;
    instagramHandle: string;
    views: string;
    description: string;
  }>({
    isOpen: false,
    videoUrl: '',
    thumbnail: '',
    brandName: '',
    instagramHandle: '',
    views: '',
    description: ''
  });

  const handleReelClick = (
    reelUrl: string,
    brandName: string,
    instagramHandle: string,
    views: string,
    description: string,
    thumbnail: string
  ) => {
    setReelModal({
      isOpen: true,
      videoUrl: reelUrl,
      thumbnail,
      brandName,
      instagramHandle,
      views,
      description
    });
  };

  const closeReelModal = () => {
    setReelModal(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <section id="work" className="relative w-full bg-[#050505] text-white py-16 lg:py-24 overflow-hidden">
      
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#D1513B]/5 blur-[150px] rounded-full pointer-events-none" />
      
      {/* HEADER */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 mb-12 lg:mb-16 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 rounded-full border border-[#D1513B]/20 bg-[#D1513B]/5 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-[#D1513B] animate-pulse"></span>
          <span className="text-xs font-semibold tracking-widest text-[#D1513B] uppercase">
            Client Success Stories
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4">
          Growth that <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D1513B] to-[#e38777]">speaks.</span>
        </h2>
        <p className="text-gray-400 text-base max-w-xl mx-auto font-light leading-relaxed">
          We engineer complete digital ecosystems designed to dominate your market.
        </p>
      </div>

      {/* CASE STUDIES CARDS */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 flex flex-col gap-8 lg:gap-12 relative z-10">
        {brandsData.map((brand) => (
          <div
            key={brand.id}
            className="group relative flex flex-col lg:flex-row w-full bg-[#0a0a0a] border border-white/10 rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-[#D1513B]/30 hover:shadow-[0_0_60px_rgba(209,81,59,0.05)]"
          >
            {/* LEFT PANE */}
            <div className="w-full lg:w-[45%] p-6 sm:p-7 lg:p-8 flex flex-col justify-between relative z-10 border-b lg:border-b-0 lg:border-r border-white/5 bg-[#0a0a0a]">
              
              {/* Top Row: Logo & Brand Name */}
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#050505] border border-white/10 flex items-center justify-center shadow-xl shrink-0 overflow-hidden relative">
                  <SafeLogo 
                    logoImage={brand.logoImage}
                    logoFallback={brand.logoFallback}
                    logoText={brand.logoText}
                    brandName={brand.brandName}
                  />
                </div>
                <div className="text-right ml-4">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-tight">
                    {brand.brandName}
                  </h3>
                  {(brand.contentData as ContentData)?.instagramHandle && (
                    <a
                      href={`https://instagram.com/${(brand.contentData as ContentData).instagramHandle.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-1 text-xs text-gray-400 hover:text-[#D1513B] transition-colors duration-300 group/ig"
                    >
                      <InstagramIcon className="w-3.5 h-3.5 group-hover/ig:scale-110 transition-transform" />
                      <span>{(brand.contentData as ContentData).instagramHandle}</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Middle: Service Details */}
              <div className="space-y-3 lg:space-y-4 flex-1">
                {brand.contentData && (
                  <ContentStats data={brand.contentData as ContentData} />
                )}
                {brand.leadsData && (
                  <LeadsStats data={brand.leadsData as LeadsData} />
                )}
                {brand.websiteData && (
                  <WebsiteStats data={brand.websiteData as WebsiteData} />
                )}
              </div>

              {/* Bottom: Service Pills */}
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/5">
                {brand.services.includes("content") && (
                  <div className="px-3 py-1 bg-white/[0.03] border border-white/10 rounded-md text-[10px] font-semibold text-gray-300">
                    Content Marketing
                  </div>
                )}
                {brand.services.includes("leads") && (
                  <div className="px-3 py-1 bg-white/[0.03] border border-white/10 rounded-md text-[10px] font-semibold text-gray-300">
                    Lead Generation
                  </div>
                )}
                {brand.services.includes("website") && (
                  <div className="px-3 py-1 bg-white/[0.03] border border-white/10 rounded-md text-[10px] font-semibold text-gray-300">
                    Website Development
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT PANE: Carousel */}
            <div className="w-full lg:w-[55%] relative h-[280px] lg:h-auto lg:min-h-[320px]">
              <PremiumCarousel brand={brand} onReelClick={handleReelClick} />
            </div>
          </div>
        ))}
      </div>

      {/* Reel Modal */}
      <ReelModal
        isOpen={reelModal.isOpen}
        onClose={closeReelModal}
        videoUrl={reelModal.videoUrl}
        thumbnail={reelModal.thumbnail}
        brandName={reelModal.brandName}
        instagramHandle={reelModal.instagramHandle}
        views={reelModal.views}
        description={reelModal.description}
      />

      {/* FOOTER NOTE & CTA */}
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 mt-16 lg:mt-20 relative z-10">
        <div className="p-6 lg:p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 flex flex-col sm:flex-row items-center gap-4 justify-center text-center sm:text-left mb-12">
          <div className="w-12 h-12 rounded-full bg-[#D1513B]/10 flex items-center justify-center shrink-0">
            <Store className="w-6 h-6 text-[#D1513B]" />
          </div>
          <div>
            <h4 className="text-white font-bold text-lg mb-1">And many more industries...</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              We provide tailored digital solutions for all types of businesses including <strong className="text-gray-200">Shopping Malls, Home Theaters, Jewellery Shops, and Skincare Brands</strong>.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center text-center">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-6">
            Ready to become our next success story?
          </h3>
          <button className="group relative px-8 py-4 bg-gradient-to-r from-[#D1513B] to-[#e38777] text-white rounded-full font-bold text-base hover:shadow-[0_0_30px_rgba(209,81,59,0.4)] transition-all duration-300 flex items-center gap-2">
            Get a Free Growth Audit
            <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}