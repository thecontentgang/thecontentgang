"use client";

import { useEffect, useRef } from 'react';
import { Monitor, Clapperboard, Target, Users, Search, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: '01',
    title: 'Content Creation',
    category: 'Creative',
    description: 'Engaging, high-retention storytelling designed to capture attention and build genuine authority for your brand.',
    tags: ['Script Writing', 'Shorts & Reels Edits', 'Video Production', 'Hosting'],
    icon: Clapperboard,
  },
  {
    id: '02',
    title: 'Lead Generation',
    category: 'Acquisition',
    description: 'Data-driven campaigns engineered to connect you with your ideal audience and build a reliable, high-quality pipeline.',
    tags: ['Google Ads', 'Meta (Facebook)', 'YouTube Ads'],
    icon: Target,
  },
  {
    id: '03',
    title: 'Social & Influencer',
    category: 'Community',
    description: 'Building authentic relationships and expanding your reach through thoughtful social media management and creator partnerships.',
    tags: ['Social Media Marketing', 'Influencer Marketing', 'Brand Strategy'],
    icon: Users,
  },
  {
    id: '04',
    title: 'Web Development',
    category: 'Engineering',
    description: 'Lightning-fast, beautifully designed, and highly responsive web experiences that serve as the perfect digital home for your business.',
    tags: ['Custom Websites', 'UI/UX Design', 'Web Apps'],
    icon: Monitor,
  },
  {
    id: '05',
    title: 'SEO Optimization',
    category: 'Organic Growth',
    description: 'Improving your digital footprint with sustainable search engine strategies so the right people find you effortlessly.',
    tags: ['On-Page SEO', 'Technical SEO', 'Keyword Strategy'],
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      if (cards.length === 0) return;

      const mm = gsap.matchMedia();

      const buildCardAnimation = (tl: gsap.core.Timeline) => {
        gsap.set(cards[0], { y: 0 });
        gsap.set(cards.slice(1), { y: () => window.innerHeight });

        cards.forEach((card, index) => {
          if (index === 0) {
            tl.to({}, { duration: 0.6 }); 
            return;
          }

          tl.to(card, {
            y: 0,
            duration: 1, 
            ease: 'power2.out',
          });

          tl.to({}, { duration: 0.6 }); 
        });
      };

      mm.add("(min-width: 1024px)", () => {
        if (!sectionRef.current) return;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=2500', 
            pin: true,
            scrub: 1, 
          },
        });
        buildCardAnimation(tl);
      });

      mm.add("(max-width: 1023px)", () => {
        if (!cardsContainerRef.current) return;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: 'top 12%',
            end: '+=2000', 
            pin: true,
            scrub: 1, 
          },
        });
        buildCardAnimation(tl);
      });

    }, sectionRef);

    return () => {
      ctx.revert(); 
    };
  }, []);

  const setCardRef = (el: HTMLDivElement | null, index: number) => {
    cardRefs.current[index] = el;
  };

  const HeaderText = (
    <>
      <div className="inline-flex items-center gap-2 mb-4 sm:mb-6 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-[#D1513B]/20 bg-[#D1513B]/5 backdrop-blur-sm">
        <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#D1513B] animate-pulse"></span>
        <span className="text-xs sm:text-sm font-medium tracking-[0.25em] text-[#D1513B] uppercase">
          What We Do
        </span>
      </div>

      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight mb-4 sm:mb-6 lg:mb-8 leading-[1.1] lg:leading-[0.95]">
        <span className="block text-white">We build</span>
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
          brands people
        </span>
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#e38777] via-[#D1513B] to-[#ffb6a8]">
          remember.
        </span>
      </h2>

      <p className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-sm sm:max-w-md font-light">
  We create content, run ads, build websites, and generate leads — everything you need to grow your brand and drive real revenue.
</p>
    </>
  );

  const StatsAndCTA = (
    <div className="flex flex-col items-center lg:items-start w-full">
      <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 lg:gap-8 mb-8 lg:mb-12">
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white">60+</h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">Brands Scaled</p>
        </div>
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white">₹12.5Cr+</h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">Revenue Generated</p>
        </div>
        
      </div>

      <button onClick={() => scrollTo("contact")} className="flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#D1513B] to-[#e38777] text-white rounded-full font-bold text-base sm:text-lg hover:shadow-[0_0_30px_rgba(209,81,59,0.4)] transition-all duration-300 group">
        Let's Scale Your Brand
        <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
      </button>
    </div>
  );

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative w-full py-10 lg:py-24 bg-black text-white selection:bg-[#D1513B] selection:text-white overflow-hidden max-w-[100vw]"
    >
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 relative w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-16 xl:gap-x-24">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-5 flex flex-col items-center text-center lg:items-start lg:text-left z-10 h-fit">
            {HeaderText}
            <div className="hidden lg:block mt-12 w-full">{StatsAndCTA}</div>
          </div>

          {/* RIGHT COLUMN - Cards Container */}
          <div 
            ref={cardsContainerRef}
            className="lg:col-span-7 relative h-[500px] sm:h-[550px] lg:h-[650px] w-full z-0"
          >
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  ref={(el) => setCardRef(el, index)}
                  className="
                    absolute left-0 w-full max-w-full sm:max-w-3xl mx-auto
                    rounded-2xl sm:rounded-[2rem] lg:rounded-[2.5rem]
                    border border-white/10
                    bg-[#0a0a0a] lg:bg-black/80
                    backdrop-blur-xl
                    overflow-hidden
                    transition-all duration-500
                    group
                    hover:border-[#D1513B]/40
                    shadow-2xl lg:shadow-[0_-10px_30px_rgba(0,0,0,0.5)]
                  "
                  style={{
                    top: `${index * 30}px`, 
                    zIndex: index + 1, 
                  }}
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                    <div className="absolute -top-20 right-0 w-48 sm:w-72 h-48 sm:h-72 bg-[#D1513B]/20 blur-[80px] lg:blur-[120px] rounded-full" />
                  </div>

                  {/* Grid lines */}
                  <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

                  <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col justify-between min-h-[280px] sm:min-h-[320px] lg:min-h-[380px]">
                    {/* Top area */}
                    <div className="flex items-start justify-between mb-6 sm:mb-8 lg:mb-12">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 lg:gap-5">
                        
                        {/* Icon */}
                        <div className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#D1513B] to-[#e38777] shadow-[0_10px_30px_rgba(209,81,59,0.35)] shrink-0">
                          <Icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-7 lg:h-7 text-white" />
                        </div>

                        {/* Category & Title */}
                        <div>
                          <span className="text-[9px] sm:text-[10px] lg:text-xs uppercase tracking-[0.25em] text-[#e38777] font-semibold">
                            {service.category}
                          </span>
                          <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mt-1 lg:mt-2 leading-tight">
                            {service.title}
                          </h3>
                        </div>
                      </div>

                      {/* Big number */}
                      <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-white/5 group-hover:text-[#D1513B]/10 transition-colors duration-500 absolute right-4 sm:right-6 top-4 sm:top-6 lg:static">
                        {service.id}
                      </span>
                    </div>

                    {/* Description */}
                    <div className="mb-6 sm:mb-8 lg:mb-10">
                      <p className="text-gray-300 text-xs sm:text-sm lg:text-base xl:text-lg leading-relaxed font-light max-w-xl">
                        {service.description}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 lg:gap-3">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 sm:px-3 py-1 sm:py-1.5 lg:px-5 lg:py-2.5 text-[9px] sm:text-[10px] lg:text-xs font-semibold tracking-wide text-white rounded-full bg-white/5 border border-white/10 group-hover:border-[#D1513B]/40 group-hover:bg-[#D1513B]/10 transition-all duration-300"
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
          <div className="lg:hidden col-span-1 flex flex-col items-center text-center relative z-20 pt-6 w-full">
            {StatsAndCTA}
          </div>
          
        </div>
      </div>
    </section>
  );
}