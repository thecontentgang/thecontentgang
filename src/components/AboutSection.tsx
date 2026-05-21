import { useEffect, useRef, useState, useCallback } from 'react';
import { Layers, Target, TrendingUp, Users, type LucideIcon } from 'lucide-react';

interface AboutCard {
  id: string;
  title: string;
  icon: LucideIcon;
  highlight: string | null;
  content: string;
  side: 'left' | 'right';
}

// Updated content focusing on the agency, results, and clear reasoning
const aboutCards: AboutCard[] = [
  {
    id: 'who-are-we',
    title: 'Who Are We?',
    icon: Users,
    highlight: null,
    content:
      "The Content Gang is a performance-driven digital marketing agency. We partner with ambitious brands to deliver modern web development, engaging content, and full-scale growth solutions.",
    side: 'left',
  },
  {
    id: 'the-results',
    title: 'The Results We Bring',
    icon: TrendingUp,
    highlight: '₹4.5 Crore in 4 months',
    content:
      "We focus on numbers that matter. We recently generated ₹4.5 crore in revenue for a premium interior design firm in just 4 months through targeted lead generation and high-converting funnels.",
    side: 'right',
  },
  {
    id: 'what-we-do',
    title: 'What We Do',
    icon: Layers,
    highlight: null,
    content:
      "We build complete digital ecosystems. From lightning-fast websites to content that ranks and converts, our team handles web development, engaging content,influencer marketing, paid ads, and SEO all under one roof.",
    side: 'left',
  },
  {
    id: 'why-us',
    title: 'Why We Are The Best',
    icon: Target,
    highlight: null,
    content:
      "We don't just chase likes and impressions—we chase real ROI. By combining technical web expertise with creative marketing, we make sure every rupee you spend translates into measurable business growth.",
    side: 'right',
  },
];

interface PathData {
  id: string;
  d: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export default function AboutSection() {
  const layoutRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  
  const [paths, setPaths] = useState<PathData[]>([]);

  // Calculate SVG paths from the center logo to each card
  const calculateLines = useCallback(() => {
    const layout = layoutRef.current;
    const center = centerRef.current;
    if (!layout || !center) return;

    const lr = layout.getBoundingClientRect();
    const cr = center.getBoundingClientRect();

    // Center point of the logo relative to the layout container
    const imgCenterX = cr.left - lr.left + cr.width / 2;
    const imgCenterY = cr.top - lr.top + cr.height / 2;

    const newPaths: PathData[] = [];

    aboutCards.forEach((card) => {
      const el = cardRefs.current[card.id];
      if (!el) return;
      const cardR = el.getBoundingClientRect();

      const isLeft = card.side === 'left';
      // Start point on the card edge
      const x1 = isLeft ? cardR.right - lr.left : cardR.left - lr.left;
      const y1 = cardR.top - lr.top + cardR.height / 2;
      
      // Control point for a smooth bezier curve
      const mx = (x1 + imgCenterX) / 2;

      newPaths.push({
        id: card.id,
        d: `M${imgCenterX},${imgCenterY} C${mx},${imgCenterY} ${mx},${y1} ${x1},${y1}`,
        x1: imgCenterX,
        y1: imgCenterY,
        x2: x1,
        y2: y1,
      });
    });

    setPaths(newPaths);
  }, []);

  useEffect(() => {
    // Slight delay to ensure DOM is fully rendered before calculating positions
    const timer = setTimeout(calculateLines, 100);
    window.addEventListener('resize', calculateLines);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculateLines);
    };
  }, [calculateLines]);

  const leftCards = aboutCards.filter((c) => c.side === 'left');
  const rightCards = aboutCards.filter((c) => c.side === 'right');

  const CardItem = ({ card }: { card: AboutCard }) => {
    const Icon = card.icon;
    const shiftClass = card.side === 'left' ? 'lg:translate-x-4' : 'lg:-translate-x-4';
    return (
      <div
        ref={(el) => { cardRefs.current[card.id] = el; }}
        className={`relative z-20 bg-[#0a0a0a] border border-white/10 rounded-[1.5rem] p-6 shadow-xl transition-all duration-500 hover:-translate-y-1 hover:border-[#e38777]/40 hover:shadow-[0_10px_30px_rgba(209,81,59,0.15)] group ${shiftClass}`}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-[38px] h-[38px] rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#D1513B]/10 transition-colors duration-300">
            <Icon className="w-5 h-5 text-[#D1513B]" />
          </div>
          <span className="font-bold text-lg text-white">
            {card.title}
          </span>
        </div>
        {card.highlight && (
          <span className="inline-block bg-[#D1513B]/10 border border-[#D1513B]/20 text-[#ffc5bc] text-[11px] font-bold px-2.5 py-1 rounded-md mb-3 tracking-wide">
            {card.highlight}
          </span>
        )}
        <p className="text-gray-400 text-sm leading-relaxed font-light">{card.content}</p>
      </div>
    );
  };

  return (
    <>
      {/* Light Beam Animation CSS */}
      <style>{`
        @keyframes drawBeam {
          0% { stroke-dashoffset: 150; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { stroke-dashoffset: -150; opacity: 0; }
        }
        .animate-beam {
          stroke-dasharray: 40 150;
          animation: drawBeam 4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>

      <section id="about-us" className="relative w-full py-20 md:py-32 bg-[#050505] text-white overflow-hidden">
        
        {/* Ambient Center Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none z-0"
          style={{ background: 'radial-gradient(circle, rgba(209,81,59,0.08) 0%, transparent 60%)' }}
        />

        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 md:px-16">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center gap-4 mb-16 md:mb-24 relative z-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
              <span className="text-xs font-semibold tracking-widest text-gray-300 uppercase">
                Behind The Agency
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
              The Engine Behind {' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D1513B] to-[#e38777]">
                The Content Gang.
              </span>
            </h2>
          </div>

          <div
            ref={layoutRef}
            className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-center gap-8 lg:gap-12 relative"
          >
            {/* Animated SVG Lines (Desktop Only) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
              style={{ zIndex: 10, overflow: 'visible' }}
            >
              {paths.map((path, i) => (
                <g key={path.id}>
                  {/* Faint base line */}
                  <path
                    d={path.d}
                    stroke="rgba(255, 255, 255, 0.05)"
                    strokeWidth="2"
                    fill="none"
                  />
                  {/* Animated Glowing Light Beam */}
                  <path
                    d={path.d}
                    stroke="url(#beam-gradient)"
                    strokeWidth="3"
                    fill="none"
                    className="animate-beam drop-shadow-[0_0_8px_rgba(209,81,59,0.8)]"
                    style={{ animationDelay: `${i * 0.5}s` }}
                  />
                  {/* Outer dot on the card */}
                  <circle cx={path.x2} cy={path.y2} r="4" fill="#e38777" className="drop-shadow-[0_0_6px_rgba(227,135,119,0.8)]" />
                </g>
              ))}
              
              {/* Center dot under logo */}
              {paths.length > 0 && (
                <circle cx={paths[0].x1} cy={paths[0].y1} r="6" fill="#D1513B" className="drop-shadow-[0_0_12px_rgba(209,81,59,1)]" />
              )}

              {/* Gradient Definition for Beams */}
              <defs>
                <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#D1513B" stopOpacity="0" />
                  <stop offset="50%" stopColor="#e38777" stopOpacity="1" />
                  <stop offset="100%" stopColor="#ffc5bc" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>

            {/* Left Cards */}
            <div className="flex flex-col gap-6 relative z-20">
              {leftCards.map((c) => <CardItem key={c.id} card={c} />)}
            </div>

            {/* Center Logo Hub */}
            <div
              ref={centerRef}
              className="relative z-30 flex justify-center order-first lg:order-none mb-4 lg:mb-0"
            >
              <div className="relative group flex items-center justify-center w-[140px] h-[140px] lg:w-[180px] lg:h-[180px]">
                {/* Outer pulsing ring */}
                <div className="absolute inset-0 rounded-full border border-[#D1513B]/30 bg-[#D1513B]/5 animate-pulse" />
                
                {/* Inner glowing core with Logo Image */}
                <div className="relative w-[100px] h-[100px] lg:w-[130px] lg:h-[130px] bg-black border border-white/10 rounded-full shadow-[0_0_40px_rgba(209,81,59,0.3)] flex items-center justify-center backdrop-blur-md transition-transform duration-500 group-hover:scale-105 p-3 overflow-hidden">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#D1513B]/20 to-transparent pointer-events-none" />
                  
                  {/* ADD YOUR LOGO IMAGE HERE */}
                  <img 
                    src="/Content-LOGO.png" /* <-- Change this path to your actual logo file */
                    alt="The Content Gang" 
                    className="w-full h-full object-contain relative z-10 drop-shadow-lg"
                  />
                  
                </div>
              </div>
            </div>

            {/* Right Cards */}
            <div className="flex flex-col gap-6 relative z-20">
              {rightCards.map((c) => <CardItem key={c.id} card={c} />)}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}