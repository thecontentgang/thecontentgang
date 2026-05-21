import React from 'react';
import { Monitor, Clapperboard, Target, Users, Search, ArrowUpRight } from 'lucide-react';

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

  <style>{`
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`}</style>
  
  // 1. REUSABLE HEADER TEXT
  const HeaderText = (
    <>
      <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-[#D1513B]/20 bg-[#D1513B]/5 backdrop-blur-sm">
        <span className="w-2 h-2 rounded-full bg-[#D1513B] animate-pulse"></span>
        <span className="text-sm font-medium tracking-[0.25em] text-[#D1513B] uppercase">
          What We Do
        </span>
      </div>

      <h2 className="text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight mb-6 lg:mb-8 leading-[1.05] lg:leading-[0.95]">
        <span className="block text-white">We build</span>
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
          brands people
        </span>
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#e38777] via-[#D1513B] to-[#ffb6a8]">
          remember.
        </span>
      </h2>

      <p className="text-gray-400 text-base md:text-lg lg:text-xl leading-relaxed max-w-md font-light">
        From viral content and performance marketing to stunning websites and lead generation — we create digital experiences that drive attention, trust, and real business growth.
      </p>
    </>
  );

  // 2. REUSABLE STATS & CTA
  const StatsAndCTA = (
    <div className="flex flex-col items-center lg:items-start w-full">
      <div className="flex flex-wrap justify-center lg:justify-start gap-6 lg:gap-8 mb-10 lg:mb-12">
        <div>
          <h3 className="text-3xl font-bold text-white">60+</h3>
          <p className="text-sm text-gray-500 mt-1">Brands Scaled</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-white">₹8.5Cr+</h3>
          <p className="text-sm text-gray-500 mt-1">Revenue Generated</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-white">70K+</h3>
          <p className="text-sm text-gray-500 mt-1">Followers Grown</p>
        </div>
      </div>

      <button className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#D1513B] to-[#e38777] text-white rounded-full font-bold text-lg hover:shadow-[0_0_30px_rgba(209,81,59,0.4)] transition-all duration-300 group">
        Let’s Scale Your Brand
        <ArrowUpRight className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
      </button>
    </div>
  );

  return (
    <section 
  id="services" 
  className="relative w-full py-20 lg:py-40 bg-black text-white selection:bg-[#D1513B] selection:text-white"
>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 relative">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-16 xl:gap-x-24">
          
          {/* --- LEFT COLUMN / MOBILE TOP --- */}
          {/* FIXED: Removed mobile sticky so it flows naturally and doesn't get covered by cards */}
          <div className="lg:col-span-5 flex flex-col items-center text-center lg:items-start lg:text-left relative lg:sticky lg:top-32 z-10 h-fit pb-4 lg:pb-0">
            
            {HeaderText}
            
            <div className="hidden lg:block mt-12 w-full">
              {StatsAndCTA}
            </div>
          </div>

          {/* --- RIGHT COLUMN / MOBILE CARDS --- */}
          <div className="lg:col-span-7 flex flex-col gap-6 lg:gap-24 z-10 relative">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.id}
                  style={{ '--card-idx': index } as React.CSSProperties}
                  className="
                    sticky
                    top-[calc(100px+var(--card-idx)*20px)] 
                    lg:top-[calc(120px+var(--card-idx)*35px)]
                    w-full
                    max-w-3xl
                    mx-auto
                    rounded-[2rem] lg:rounded-[2.5rem]
                    border border-white/10
                    bg-[#0a0a0a] lg:bg-black/80
                    backdrop-blur-xl
                    overflow-hidden
                    transition-all duration-500
                    group
                    hover:border-[#D1513B]/40
                    hover:-translate-y-1
                    shadow-2xl lg:shadow-[0_-10px_30px_rgba(0,0,0,0.5)]
                  "
                >
                  {/* GLOW */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                    <div className="absolute -top-32 right-0 w-72 h-72 bg-[#D1513B]/20 blur-[100px] lg:blur-[120px] rounded-full" />
                  </div>

                  {/* GRID LINES */}
                  <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

                  <div className="relative z-10 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-between min-h-[320px] lg:min-h-[380px]">
                    
                    {/* TOP AREA */}
                    <div className="flex items-start justify-between mb-8 lg:mb-12">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-5">
                        
                        {/* ICON */}
                        <div className="relative flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br from-[#D1513B] to-[#e38777] shadow-[0_10px_30px_rgba(209,81,59,0.35)] shrink-0">
                          <Icon className="w-5 h-5 lg:w-7 lg:h-7 text-white" />
                        </div>

                        {/* CATEGORY & TITLE */}
                        <div>
                          <span className="text-[10px] lg:text-xs uppercase tracking-[0.25em] text-[#e38777] font-semibold">
                            {service.category}
                          </span>
                          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mt-1 lg:mt-2 leading-tight">
                            {service.title}
                          </h3>
                        </div>
                      </div>

                      {/* BIG NUMBER */}
                      <span className="text-5xl lg:text-6xl font-black text-white/5 group-hover:text-[#D1513B]/10 transition-colors duration-500 absolute right-6 sm:right-8 top-6 sm:top-8 lg:static">
                        {service.id}
                      </span>
                    </div>

                    {/* DESCRIPTION */}
                    <div className="mb-8 lg:mb-10">
                      <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed font-light max-w-xl">
                        {service.description}
                      </p>
                    </div>

                    {/* TAGS */}
                    <div className="flex flex-wrap gap-2 lg:gap-3">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 lg:px-5 lg:py-2.5 text-[10px] lg:text-xs font-semibold tracking-wide text-white rounded-full bg-white/5 border border-white/10 group-hover:border-[#D1513B]/40 group-hover:bg-[#D1513B]/10 transition-all duration-300"
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

          {/* --- MOBILE BOTTOM CTA --- */}
          <div className="lg:hidden col-span-1 flex flex-col items-center text-center relative z-20 pt-8 w-full">
            {StatsAndCTA}
          </div>

        </div>
      </div>
    </section>
  );
}