"use client";

import { useState, useEffect } from 'react';
import {
  ArrowUpRight,
  Store,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  ImageIcon,
  LayoutTemplate,
  LineChart,

} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { brandsData, type BrandCaseStudy } from "./brandsData";

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
        className={`w-full h-full object-cover ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
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

// --- Desktop Carousel ---
const DesktopCarousel = ({ brand }: { brand: BrandCaseStudy }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides: Array<{
    id: string;
    img: string;
    fallbackImg?: string;
    label: string;
    linkUrl?: string;
  }> = [];

  // Only push if image exists
  if (brand.contentData?.image) {
    slides.push({
      id: "content",
      img: brand.contentData.image,
      fallbackImg: brand.contentData.fallbackImage,
      label: "Content & Social",
      linkUrl: brand.contentData.instagramUrl,
    });
  }

  if (brand.leadsData?.image) {
    slides.push({
      id: "leads",
      img: brand.leadsData.image,
      fallbackImg: brand.leadsData.fallbackImage,
      label: "Ads & Performance",
    });
  }

  if (brand.websiteData?.image) {
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
    }, 4000);

    return () => clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) return null;

  const currentSlide = slides[currentIndex];

  return (
    <div className="relative w-full h-full min-h-[350px] bg-[#0a0a0a] overflow-hidden group">
      
      <div className="absolute top-9 left-4 z-20">
        <h3 className="text-white text-sm italic tracking-wide">
          Results
        </h3>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 bg-[#0a0a0a] p-8"
        >
          <div
            className={`w-full h-full flex items-center justify-center ${
              currentSlide.linkUrl ? "cursor-pointer" : ""
            }`}
            onClick={() => {
              if (currentSlide.linkUrl) {
                window.open(currentSlide.linkUrl, "_blank");
              }
            }}
          >
            <img
              src={currentSlide.img}
              alt={currentSlide.label}
              className="w-full h-full object-contain"
            />

            <div className="absolute bottom-4 left-4">
              <span className="text-white text-sm font-medium bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full">
                {currentSlide.label}
              </span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {slides.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(
                (prev) => (prev - 1 + slides.length) % slides.length
              );
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/70"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex((prev) => (prev + 1) % slides.length);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/70"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  currentIndex === idx
                    ? "w-8 bg-white"
                    : "w-1.5 bg-white/40"
                }`}
              />
            ))}
          </div>
        </>
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

  // Only push if image exists
  if (brand.contentData?.image) {
    slides.push({
      id: "content",
      img: brand.contentData.image,
      fallbackImg: brand.contentData.fallbackImage,
      label: "Content & Social",
      linkUrl: brand.contentData.instagramUrl,
    });
  }

  if (brand.leadsData?.image) {
    slides.push({
      id: "leads",
      img: brand.leadsData.image,
      fallbackImg: brand.leadsData.fallbackImage,
      label: "Ads & Performance",
    });
  }

  if (brand.websiteData?.image) {
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
                window.open(currentSlide.linkUrl, "_blank");
              }
            }}
          >
            <SafeImage
              src={currentSlide.img}
              fallbackSrc={currentSlide.fallbackImg}
              alt={currentSlide.label}
              className="w-full h-full"
            />

            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
              <span className="text-white text-sm font-medium">
                {currentSlide.label}
              </span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {slides.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(
                (prev) => (prev - 1 + slides.length) % slides.length
              );
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex((prev) => (prev + 1) % slides.length);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-4 h-4 text-white" />
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                className={`h-1 rounded-full transition-all ${
                  currentIndex === idx
                    ? "w-5 bg-white"
                    : "w-1.5 bg-white/40"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
export default function CaseStudiesSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section id="casestudies" className="relative w-full bg-[#050505] text-white py-16 py-16 md:py-24 lg:py-24 overflow-hidden max-w-[100vw]">

      <div className="absolute top-0 right-0 w-[400px] sm:w-[600px] lg:w-[800px] h-[400px] sm:h-[600px] lg:h-[800px] bg-[#D1513B]/5 blur-[120px] sm:blur-[150px] rounded-full pointer-events-none" />

      {/* HEADER */}
      <div className="max-w-[650px] mx-auto px-5 sm:px-8 lg:px-12 mb-12 sm:mb-14 text-center relative z-10">
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
          Behind every success story is a strategy that refused to fail.
        </p>
      </div>

      {/* CASE STUDIES CARDS - Reduced from 750px to 600px */}
      <div className="max-w-[480px] mx-auto px-5 sm:px-6 lg:px-8 flex flex-col gap-6 sm:gap-8 relative z-10 md:w-2/3">
        {brandsData.map((brand, index) => (
          <motion.div
            key={brand.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="group relative flex flex-col lg:flex-row w-full bg-[#0a0a0a] border border-white/[0.08] rounded-2xl overflow-hidden transition-all duration-400 hover:border-[#D1513B]/20"
          >
            {/* CONTENT SECTION - Redesigned */}
            <div className="w-full lg:w-[50%] p-6 sm:p-8 flex flex-col bg-[#0a0a0a] border-b lg:border-b-0 lg:border-r border-white/[0.06]">

              {/* Top: Logo + Brand Name + Stats Row */}
              <div className="flex items-center gap-4 mb-5">
                {/* Logo */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white/10 p-0.5 shrink-0">
                  <div className="w-full h-full rounded-full overflow-hidden bg-[#111]">
                    <SafeLogo
                      logoImage={brand.logoImage}
                      logoFallback={brand.logoFallback}
                      logoText={brand.logoText}
                      brandName={brand.brandName}
                    />
                  </div>
                </div>

                {/* Brand Name + Stats */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                    {brand.brandName}
                  </h3>
                  <div className="flex flex-wrap gap-3 sm:gap-4">

                    {brand.contentData?.followersGained && (
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-[#e38777]">{brand.contentData.followersGained}</h3>
                        <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">Followers Gained</p>
                      </div>
                    )}

                    {brand.leadsData?.revenue && (
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-[#e38777]">{brand.leadsData.revenue}</h3>
                        <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">Revenue Generated</p>
                      </div>
                    )}
                    {brand.leadsData?.months && (
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-[#e38777]">{brand.leadsData.months}</h3>
                        <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">Months</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Service Icons Row */}
              <div className="flex flex-col gap-3 mb-5">
                {brand.services.includes("content") && (
                  <div className="flex items-start gap-3">
  <div className="mt-1 shrink-0">
    <svg
      className="w-4 h-4 text-[#D1513B]"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  </div>

  <div className="flex flex-col">
    <span className="text-gray-200 text-sm font-medium">
      {brand.contentData?.serviceLabel || "Content Marketing"}
    </span>

    {brand.contentData?.marketingDescription && (
      <p className="text-sm text-gray-300 leading-relaxed mt-1 max-w-[260px]">
        {brand.contentData.marketingDescription}
      </p>
    )}
  </div>
</div>
                  
                )}
                   {brand.services.includes("leads") && (
  <div className="flex items-start gap-3">
    <div className="mt-1 shrink-0">
      <LineChart className="w-4 h-4 text-[#D1513B]" />
    </div>

    <div className="flex flex-col">
      <span className="text-gray-200 text-sm font-medium">
        Performance Marketing
      </span>

      {brand.leadsData?.marketingDescription && (
        <p className="text-sm text-gray-300 leading-relaxed mt-1 max-w-[260px]">
          {brand.leadsData.marketingDescription}
        </p>
      )}
    </div>
  </div>
)}
                  
                {brand.services.includes("website") && (
                  <div className="flex items-center gap-2">
                    <LayoutTemplate className="w-4 h-4 text-[#D1513B]" />
                    <span className="text-gray-300 text-sm">Website Creation</span>
                  </div>
                )}
              </div>

              {/* Links Section */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-white/[0.06]">
                {brand.contentData?.instagramUrl && (
                  <a
                    href={brand.contentData.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs sm:text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                    </svg>
                    Instagram
                  </a>
                )}
                {brand.websiteData?.websiteLink && (
                  <a
                    href={brand.websiteData.websiteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs sm:text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Website
                  </a>
                )}
              </div>
            </div>

            {/* IMAGES SECTION - Carousel */}
            {brand.id !== "jilamall" && brand.id !== "krimmy-thickshake" && (
  <div className="w-full lg:w-[50%] bg-[#0a0a0a]">
    
    <div className="lg:hidden">
      <MobileCarousel brand={brand} />
    </div>

    <div className="hidden lg:block h-full">
      <DesktopCarousel brand={brand} />
    </div>

  </div>
)}
          </motion.div>
        ))}
      </div>

      {/* FOOTER */}
<div className="md:w-2/3 max-w-[700px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-6 relative z-10">

  {/* Industries Card */}
  <div className="
    relative overflow-hidden
    rounded-3xl
    border border-white/[0.08]
    bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent
    backdrop-blur-xl
    p-5 sm:p-7 lg:p-8
    mb-14 sm:mb-20
  ">
    
    {/* Glow */}
    <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#D1513B]/10 blur-[100px] rounded-full pointer-events-none" />

    <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 text-center sm:text-left">

      {/* Icon */}
      <div className="
        shrink-0
        w-14 h-14 sm:w-16 sm:h-16
        rounded-2xl
        bg-gradient-to-br from-[#D1513B]/20 to-[#e38777]/10
        border border-[#D1513B]/20
        flex items-center justify-center
        shadow-[0_0_30px_rgba(209,81,59,0.15)]
      ">
        <Store className="w-6 h-6 sm:w-7 sm:h-7 text-[#D1513B]" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="text-white font-bold text-xl sm:text-2xl mb-2">
          And many more industries...
        </h4>

        <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-[650px]">
          We provide tailored digital solutions for all types of businesses including{" "}
          <strong className="text-gray-200 font-semibold">
            Shopping Malls, Home Theaters, Jewellery Shops, and Skincare Brands
          </strong>.
        </p>
      </div>
    </div>
  </div>

  {/* CTA */}
  <div className="flex flex-col items-center justify-center text-center">

    <h3 className="
      text-3xl sm:text-4xl lg:text-5xl
      font-extrabold
      tracking-tight
      text-white
      mb-5 sm:mb-6
      leading-tight
      max-w-[700px]
    ">
      Ready to become our next{" "}
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D1513B] to-[#e38777]">
        success story?
      </span>
    </h3>

    <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-[550px] mb-8 sm:mb-10 leading-relaxed">
      Let’s create campaigns, content, and systems that drive real business growth for your brand.
    </p>

    <button
      onClick={() => scrollTo("contact")}
      className="
        group relative overflow-hidden
        px-7 sm:px-9
        py-3.5 sm:py-4
        rounded-full
        bg-gradient-to-r from-[#D1513B] to-[#e38777]
        text-white
        font-bold
        text-sm sm:text-base
        shadow-[0_10px_40px_rgba(209,81,59,0.25)]
        hover:shadow-[0_0_35px_rgba(209,81,59,0.45)]
        hover:-translate-y-1
        transition-all duration-300
        flex items-center gap-2.5
      "
    >
      <span className="relative z-10">
        Get a Free Growth Audit
      </span>

      <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />

      {/* Shine */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.15),transparent)] translate-x-[-100%] group-hover:translate-x-[100%]" />
    </button>
  </div>
</div>
    </section>
  );
}