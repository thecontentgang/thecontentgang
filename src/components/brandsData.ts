// --- TYPES ---
export type ServiceType = "content" | "leads" | "website";

export interface ServiceDetails {
  image: string;
  description: string;
}

export interface ContentData extends ServiceDetails {
  instagramHandle: string;
  followersGained: string;
  views: string;
}

export interface LeadsData extends ServiceDetails {
  leadsGenerated: string;
  months: string;
  converted: string;
  revenue: string;
}

export interface WebsiteData extends ServiceDetails {
  pages: string;
  features: string[];
  websiteLink: string; // <-- Added website link property
}

export interface BrandCaseStudy {
  id: string;
  brandName: string;
  logoText: string;
  services: ServiceType[];
  contentData?: ContentData;
  leadsData?: LeadsData;
  websiteData?: WebsiteData;
}

// --- DATA ---
export const brandsData: BrandCaseStudy[] = [
  {
    id: "zen-craft",
    brandName: "ZenCraft Interiors",
    logoText: "ZC",
    services: ["content", "leads", "website"],
    contentData: {
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop",
      description: "We revamped their social presence with highly aesthetic interior design reels, transforming passive scrollers into dedicated brand advocates and design enthusiasts.",
      instagramHandle: "@thezencraftinteriors",
      followersGained: "+65K",
      views: "3.7M",
    },
    leadsData: {
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
      description: "Scaled targeted Meta and Google Ads specifically aimed at high-net-worth individuals, driving highly qualified interior project inquiries directly to their sales team.",
      leadsGenerated: "450+",
      months: "5",
      converted: "48",
      revenue: "₹4.5 Cr",
    },
    websiteData: {
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop",
      description: "Developed a premium, lightning-fast portfolio site designed to convert visitors into high-ticket clients with seamless lead capture mechanisms.",
      pages: "15+",
      features: [
        "Beautiful Premium Project Showcase",
        "Direct WhatsApp & Mobile Call Integration",
        "Form Data Redirected instantly to Email"
      ],
      websiteLink: "https://www.zencraftinteriors.com", // <-- Placeholder
    },
  },
  {
    id: "vogue",
    brandName: "Vogue Interiors",
    logoText: "VI",
    services: ["content", "website"],
    contentData: {
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
      description: "Built their profile from scratch to 20K followers in just 2.5 months completely organically. While the client was initially skeptical about digital marketing, our explosive visual results completely shifted their perspective.",
      instagramHandle: "@vogue.designstudio",
      followersGained: "+23K",
      views: "1.1M",
    },
    websiteData: {
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop",
      description: "Built an elegant, responsive website to serve as their digital storefront, ensuring an effortless user journey from viewing portfolios to booking consultations.",
      pages: "18+",
      features: [
        "High-Resolution Portfolio Galleries",
        "Integrated WhatsApp Lead Gen",
        "Automated Form-to-Email Routing"
      ],
      websiteLink: "https://www.vogueinteriors.com", // <-- Placeholder
    },
  },
  {
    id: "illusion",
    brandName: "Illusion Interiors",
    logoText: "II",
    services: ["content", "website"],
    contentData: {
      image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop",
      description: "Created high-impact social media assets and engaging walk-through videos to build trust and showcase their innovative spatial designs.",
      instagramHandle: "@illusion_interiors",
      followersGained: "+62K",
      views: "7.4M",
    },
    websiteData: {
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2000&auto=format&fit=crop",
      description: "Designed a sleek, modern website architecture optimized for visual storytelling and instant client communication.",
      pages: "15+",
      features: [
        "Interactive Design Lookbooks",
        "Mobile-First Call Buttons",
        "Secure Lead Capture Forms"
      ],
      websiteLink: "https://www.illusioninteriors.com", // <-- Placeholder
    },
  },
  {
    id: "bright-arena",
    brandName: "Bright Arena Interiors",
    logoText: "BA",
    services: ["content", "website"],
    contentData: {
      image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=2000&auto=format&fit=crop",
      description: "Grew a vibrant online community through educational design tips, before-and-after reels, and consistent brand storytelling.",
      instagramHandle: "@brightarena",
      followersGained: "+40K",
      views: "5.1M",
    },
    websiteData: {
      image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2000&auto=format&fit=crop",
      description: "Launched a highly functional service website that clearly communicates their offerings and effortlessly captures visitor details.",
      pages: "12+",
      features: [
        "Detailed Service Pages",
        "WhatsApp Floating Widget",
        "Instant Email Lead Notifications"
      ],
      websiteLink: "https://www.brightarenainteriors.com", // <-- Placeholder
    },
  },
  {
    id: "tvam",
    brandName: "Tvam Interiors",
    logoText: "TI",
    services: ["leads", "website"],
    leadsData: {
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop",
      description: "After losing faith in marketing due to disappointing experiences with previous agencies, the client onboarded with us. Within 4 months, we turned things around entirely, successfully closing 5 high-ticket interior design projects.",
      leadsGenerated: "620+",
      months: "5",
      converted: "85",
      revenue: "₹6.8 Cr",
    },
    websiteData: {
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000&auto=format&fit=crop",
      description: "Developed a landing-page-centric website optimized entirely for conversion rate optimization (CRO) to maximize ad spend efficiency.",
      pages: "15+",
      features: [
        "Dedicated Landing Pages per Service",
        "Click-to-Call Mobile Optimization",
        "Lead Gen Form Integrations"
      ],
      websiteLink: "https://www.tvaminteriors.com", // <-- Placeholder
    },
  },
  {
    id: "handover",
    brandName: "Handover Experts",
    logoText: "HE",
    services: ["content", "leads", "website"],
    contentData: {
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2000&auto=format&fit=crop",
      description: "Produced high-quality educational content highlighting inspection standards, building immense trust and authority in the property handover niche.",
      instagramHandle: "@handoverexperts",
      followersGained: "+57K",
      views: "6.5M",
    },
    leadsData: {
      image: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?q=80&w=2000&auto=format&fit=crop",
      description: "Deployed geo-targeted lead generation campaigns targeting recent homebuyers, ensuring a steady stream of inspection bookings.",
      leadsGenerated: "850+",
      months: "6",
      converted: "310",
      revenue: "₹30L/M",
    },
    websiteData: {
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2000&auto=format&fit=crop",
      description: "Built a robust, SEO-optimized platform that ranks organically for property inspection keywords, complete with integrated booking forms.",
      pages: "20+",
      features: [
        "Advanced SEO Architecture",
        "WhatsApp Automated Chatbot",
        "Dynamic Service Booking Forms"
      ],
      websiteLink: "https://www.handoverexperts.com", // <-- Placeholder
    },
  },
  {
    id: "jilamall",
    brandName: "Jilamall Sweets",
    logoText: "JM",
    services: ["content"],
    contentData: {
      image: "https://images.unsplash.com/photo-1559622214-f8a9850965bb?q=80&w=2000&auto=format&fit=crop",
      description: "Engineered an influencer marketing strategy that drove a single reel to an explosive 1.4 million views. The massive viral push completely shattered the client's initial skepticism and directly scaled their business revenue by 5x.",
      instagramHandle: "@jilamallsweets",
      followersGained: "+18K",
      views: "2.4M",
    },
  },
  {
    id: "krimmy-thickshake",
    brandName: "Krimmy Thickshake",
    logoText: "KT",
    services: ["content"],
    contentData: {
      image: "https://images.unsplash.com/photo-1572490122747-3968b75bf699?q=80&w=2000&auto=format&fit=crop",
      description: "Orchestrated a highly tactical influencer marketing campaign for four key product launches. The creative content went completely viral, generating massive hyper-local hype that completely cleared out an entire month's worth of inventory in just 3 to 4 days.",
      instagramHandle: "@krimmythickshake",
      followersGained: "+38K",
      views: "4.2M",
    },
  },
];