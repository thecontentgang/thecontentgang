"use client";

import { useEffect, useLayoutEffect, useRef } from 'react';
import { Monitor, Clapperboard, Target, Users, Search, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 1. Use LayoutEffect on the client to avoid Flash of Unstyled Content (FOUC/Blank screens)
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const services = [
  {
    id: '01',
    title: 'Content Creation',
    category: 'Creative',
    description: 'Engaging, high-retention storytelling designed to capture attention and build genuine authority for your brand.',
    tags: ['Content Strategy', 'Host', 'Script Writing', 'Video Production', 'Post Production Edits', 'SEO Optimization', 'Thumbnail Design', 'Social Media Management', 'End to End Content Management'],
    icon: Clapperboard,
  },
  {
    id: '02',
    title: 'Lead Generation',
    category: 'Acquisition',
    description: 'Data-driven campaigns engineered to connect your brand with ideal audience and build a reliable, high-quality leads pipeline.',
    tags: ['Video Ads Creation', 'Landing Page Design', 'Campaign Execution & optimization', 'Budget Optimization', 'Lead Filteration', 'Omnichannel Retargeting', 'Leads Tracking System', 'Conversion Rate Optimization', 'End to End Media Buying Management'],
    icon: Target,
  },
  {
    id: '03',
    title: 'Influencer Marketing',
    category: 'Creator Partnership',
    description: 'Identifying, outreaching, and collaborating with creators whose audience aligns with your brand.',
    tags: ['Brand Collaborations', 'Mega / Macro / Micro / Nano / UGC Influencers', 'Authenticity & Engagement Focused Campaigns', 'Performance Tracking & Optimization', 'End to End Influencer Marketing Management'],
    icon: Users,
  },
  {
    id: '04',
    title: 'Web Design & Development',
    category: 'Engineering',
    description: 'Lightning-fast, beautifully designed websites that turn visitors into engaged customers. Your best sales rep, working 24/7.',
    tags: ['UI/UX Design', 'Custom Websites', 'Web Apps', 'Responsive Design', 'Fast Loading', 'E-commerce Solutions', 'SEO-Friendly', 'Sales Funnels', 'CMS Development', 'Full Stack Applications', 'User Tracking & Analytics', 'Security & Maintenance'],
    icon: Monitor,
  },
  {
    id: '05',
    title: 'SEO Optimization',
    category: 'Organic Growth',
    description: 'Attract the right audience effortlessly with sustainable, proven SEO strategies that dominate search results and turn every click into a customer.',
    tags: ['SEO Audits', 'Local SEO', 'On-Page SEO', 'Technical SEO', 'Keyword Strategy', 'Traffic Generation', 'Brand Visibility', 'Domain Authority', 'Content Optimization', 'Backlink Building'],
    icon: Search,
  }
];

export default function ServicesSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 2. Swapped useEffect for useIsomorphicLayoutEffect
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      if (cards.length === 0) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        if (!sectionRef.current) return;

        // Force initial states immediately before render to avoid "blank" gap
        gsap.set(cards[0], { y: 0 });
        // Use standard CSS '100vh' instead of window.innerHeight to prevent mobile URL bar jump lag
        gsap.set(cards.slice(1), { y: "100vh" }); 

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=2500',
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true, // Recalculate if user resizes the device
          },
        });

        cards.forEach((card, index) => {
          if (index === 0) {
            tl.to({}, { duration: 0.5 });
            return;
          }

          tl.to(card, {
            y: 0,
            duration: 1,
            ease: 'power2.out',
          });

          tl.to({}, { duration: 0.5 });
        });
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.set(cards, { clearProps: "all" });
      });

    }, sectionRef);

    // 3. Force ScrollTrigger to calculate heights AFTER dom is painted
    // This catches instances where custom fonts or late images push the layout down
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      ctx.revert();
      clearTimeout(timeout);
    };
  }, []);

  const setCardRef = (el: HTMLDivElement | null, index: number) => {
    cardRefs.current[index] = el;
  };

  const HeaderText = (
    <>
      <div className="inline-flex items-center gap-2 mb-4 px-3 sm:px-4 py-1.5 rounded-full border border-[#D1513B]/20 bg-[#D1513B]/5 backdrop-blur-sm">
        <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#D1513B] animate-pulse"></span>
        <span className="text-xs sm:text-sm font-medium tracking-[0.25em] text-[#D1513B] uppercase">
          What We Do
        </span>
      </div>

      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight mb-2 sm:mb-5 leading-[1.1] lg:leading-[0.95]">
        <span className="block text-white">We build</span>
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
          brands people
        </span>
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#e38777] via-[#D1513B] to-[#ffb6a8]">
          remember.
        </span>
      </h2>

      <p className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-sm sm:max-w-md font-light">
        We create content, run ads, build websites, generate leads and everything you need to grow your brand and drive real revenue.
      </p>
    </>
  );

  const StatsAndCTA = (
    <div className="flex flex-col items-center lg:items-start w-full">
      <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 lg:gap-8 mb-6 lg:mb-6">
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white">50+</h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">Brands Scaled</p>
        </div>
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white">28M+</h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">Views Generate</p>
        </div>
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white">₹12.5Cr+</h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">Revenue Generated</p>
        </div>
      </div>

      <button
        onClick={() => scrollTo("contact")}
        className="flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#D1513B] to-[#e38777] text-white rounded-full font-bold text-base sm:text-lg hover:shadow-[0_0_30px_rgba(209,81,59,0.4)] transition-all duration-300 group"
      >
        Let's Scale Your Brand
        <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
      </button>
    </div>
  );

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative w-full pt-14 sm:pt-28 md:pt-32 lg:pt-34 pb-12 sm:pb-16 bg-black text-white selection:bg-[#D1513B] selection:text-white overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 relative w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 lg:gap-x-16 xl:gap-x-24">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-5 flex flex-col items-center text-center lg:items-start lg:text-left z-10">
            {HeaderText}
            <div className="hidden lg:block mt-10 w-full">{StatsAndCTA}</div>
          </div>

          {/* RIGHT COLUMN - Cards Container */}
          <div
            ref={cardsContainerRef}
            className="
              lg:col-span-7
              relative
              w-full
              z-0
              h-auto
              lg:h-[620px]
              flex
              flex-col
              gap-5
              lg:block
            "
          >
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  ref={(el) => setCardRef(el, index)}
                  className="
                    relative lg:absolute
                    left-0
                    w-full
                    max-w-full
                    sm:max-w-3xl
                    mx-auto
                    rounded-2xl sm:rounded-3xl lg:rounded-[2.5rem]
                    border border-white/10
                    bg-[#0a0a0a] lg:bg-black/80
                    backdrop-blur-xl
                    overflow-hidden
                    transition-all duration-500
                    group
                    hover:border-[#D1513B]/40
                    shadow-2xl
                    transform-gpu will-change-transform /* 4. Added Hardware Acceleration classes */
                  "
                  style={{
                    top: typeof window !== 'undefined' && window.innerWidth >= 1024 ? `${index * 24}px` : "0px",
                    zIndex: index + 1,
                  }}
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                    <div className="absolute -top-20 right-0 w-48 sm:w-72 h-48 sm:h-72 bg-[#D1513B]/20 blur-[80px] lg:blur-[120px] rounded-full transform-gpu" />
                  </div>

                  {/* Grid lines */}
                  <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

                  <div className="relative z-10 p-5 sm:p-6 md:p-7 lg:p-10 flex flex-col justify-between min-h-[260px] sm:min-h-[300px] lg:min-h-[360px]">
                    {/* Top area */}
                    <div className="flex items-start justify-between mb-5 sm:mb-6 lg:mb-8">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                        {/* Icon */}
                        <div className="relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#D1513B] to-[#e38777] shadow-[0_10px_30px_rgba(209,81,59,0.35)] shrink-0">
                          <Icon className="w-5 h-5 sm:w-5 sm:h-5 lg:w-7 lg:h-7 text-white" />
                        </div>

                        {/* Category & Title */}
                        <div>
                          <span className="text-[10px] sm:text-[10px] lg:text-xs uppercase tracking-[0.2em] text-[#e38777] font-semibold">
                            {service.category}
                          </span>
                          <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mt-1 leading-tight">
                            {service.title}
                          </h3>
                        </div>
                      </div>

                      {/* Big number */}
                      <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-white/90 group-hover:text-[#D1513B]/10 transition-colors duration-500">
                        {service.id}
                      </span>
                    </div>

                    {/* Description */}
                    <div className="mb-4 sm:mb-5 lg:mb-7">
                      <p className="text-gray-300 text-xs sm:text-sm lg:text-base xl:text-lg leading-relaxed font-light">
                        {service.description}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 lg:gap-2.5">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 sm:px-3 py-1 sm:py-1.5 lg:px-4 lg:py-2 text-[9px] sm:text-[10px] lg:text-xs font-semibold tracking-wide text-white rounded-full bg-white/5 border border-white/10 group-hover:border-[#D1513B]/40 group-hover:bg-[#D1513B]/10 transition-all duration-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* MOBILE BOTTOM CTA */}
          <div className="lg:hidden col-span-1 flex flex-col items-center text-center relative z-20 w-full">
            {StatsAndCTA}
          </div>

        </div>
      </div>
    </section>
  );
}