// ============================================
// BRAND LOGO IMPORTS (with fallback handling)
// ============================================

// Helper function to create fallback image URLs
const createFallbackLogo = (text: string) => 
  `https://placehold.co/200x200/1a1a1a/D1513B?text=${text}&font=montserrat`;

const createFallbackImage = (type: string) => 
  `https://placehold.co/800x600/0a0a0a/666666?text=${type}&font=montserrat`;

// ============================================
// TYPES
// ============================================
export type ServiceType = "content" | "leads" | "website";

export interface ServiceDetails {
  image: string;
  description: string;
  fallbackImage?: string;
}

export interface ContentData extends ServiceDetails {
  instagramHandle: string;
  followersGained: string;
  views: string;
  reelUrl?: string;
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
  websiteLink: string; 
}

export interface BrandCaseStudy {
  id: string;
  brandName: string;
  logoText: string;
  logoImage?: string;
  logoFallback?: string;
  services: ServiceType[];
  contentData?: ContentData;
  leadsData?: LeadsData;
  websiteData?: WebsiteData;
}

// ============================================
// IMAGE PATHS (using public folder paths directly)
// Change these to match your actual file structure
// ============================================
const imagePaths = {
  logos: {
    zencraft: "/assets/zencraft/zencraft.jpg",
    vogue: "/brands/logos/vogue-logo.png",
    illusion: "/assets/illusion/illusion.png",
    brightArena: "/assets/bright-arena/bright-logo.webp",
    tvam: "/assets/tvam/tvamlogo.png",
    handover: "/brands/logos/handover-logo.png",
    jilamall: "/brands/logos/jilamall-logo.png",
    krimmy: "/brands/logos/krimmy-logo.png",
  },
  content: {
    zencraft: "/assets/zencraft/zencraft-content.jpg",
    vogue: "/brands/content/vogue-content.jpg",
    illusion: "/assets/illusion/illusion-content.jpg",
    brightArena: "/assets/bright-arena/bright-content.jpg",
    handover: "/brands/content/handover-content.jpg",
    jilamall: "/brands/content/jilamall-content.jpg",
    krimmy: "/brands/content/krimmy-content.jpg",
  },
  leads: {
    zencraft: "/assets/zencraft/zencraft-leads.jpg",
    tvam: "/assets/tvam/tvam-leads.jpg",
    handover: "/brands/leads/handover-leads.jpg",
  },
  website: {
    zencraft: "/assets/zencraft/zenweb.png",
    vogue: "/brands/website/vogue-website.jpg",
    illusion: "/assets/illusion/illusionweb.png",
    brightArena: "/assets/bright-arena/brightweb.png",
    tvam: "/assets/tvam/tvamweb.png",
    handover: "/brands/website/handover-website.jpg",
  },
  reels: {
    zencraft: "/assets/zencraft/zencraft-reel.mp4",
    illusion: "/assets/illusion/illusion-reel.mp4",
    jilamall: "/brands/reels/jilamall-reel.mp4",
  }
};

// ============================================
// HELPER FUNCTIONS
// ============================================
const getImagePath = (path: string): string => {
  return path;
};

const getVideoPath = (path: string): string | undefined => {
  return path || "https://www.w3schools.com/html/mov_bbb.mp4";
};

// ============================================
// BRANDS DATA
// ============================================
export const brandsData: BrandCaseStudy[] = [
  {
    id: "zen-craft",
    brandName: "ZenCraft Interiors",
    logoText: "ZC",
    logoImage: imagePaths.logos.zencraft,
    logoFallback: createFallbackLogo("ZC"),
    services: ["content", "leads", "website"],
    contentData: {
      image: getImagePath(imagePaths.content.zencraft),
      fallbackImage: createFallbackImage("Content+Social"),
      description: "Transformed passive scrollers into high-intent leads with aesthetic reels that generated",
      instagramHandle: "@thezencraftinteriors",
      followersGained: "+65K",
      views: "3.7M",
      reelUrl: getVideoPath(imagePaths.reels.zencraft),
    },
    leadsData: {
      image: getImagePath(imagePaths.leads.zencraft),
      fallbackImage: createFallbackImage("Leads+Dashboard"),
      description: "Scaled Meta & Google Ads targeting HNIs, driving",
      leadsGenerated: "450+",
      months: "5",
      converted: "48",
      revenue: "₹4.5 Cr",
    },
    websiteData: {
      image: getImagePath(imagePaths.website.zencraft),
      fallbackImage: createFallbackImage("Website"),
      description: "Premium portfolio site with seamless lead capture built in just",
      pages: "15+",
      features: [
        "Project Showcase",
        "WhatsApp & Call Integration",
        "Form-to-Email Routing"
      ],
      websiteLink: "https://www.thezencraftinteriors.com/",
    },
  },
  {
    id: "vogue",
    brandName: "Vogue Interiors",
    logoText: "VI",
    logoImage: imagePaths.logos.vogue,
    logoFallback: createFallbackLogo("VI"),
    services: ["content", "website"],
    contentData: {
      image: getImagePath(imagePaths.content.vogue),
      fallbackImage: createFallbackImage("Content+Social"),
      description: "Built their Instagram from zero to",
      instagramHandle: "@vogue.designstudio",
      followersGained: "+23K",
      views: "1.1M",
    },
    websiteData: {
      image: getImagePath(imagePaths.website.vogue),
      fallbackImage: createFallbackImage("Website"),
      description: "Elegant digital storefront designed for effortless portfolio browsing and",
      pages: "18+",
      features: [
        "HD Portfolio Galleries",
        "WhatsApp Lead Gen",
        "Form-to-Email Routing"
      ],
      websiteLink: "https://voguedesignstudios.com/",
    },
  },
  {
    id: "illusion",
    brandName: "Illusion Interiors",
    logoText: "II",
    logoImage: imagePaths.logos.illusion,
    logoFallback: createFallbackLogo("II"),
    services: ["content", "website"],
    contentData: {
      image: getImagePath(imagePaths.content.illusion),
      fallbackImage: createFallbackImage("Content+Social"),
      description: "High-impact walk-through videos and assets built trust, earning",
      instagramHandle: "@illusion_interiors",
      followersGained: "+62K",
      views: "7.4M",
      reelUrl: getVideoPath(imagePaths.reels.illusion),
    },
    websiteData: {
      image: getImagePath(imagePaths.website.illusion),
      fallbackImage: createFallbackImage("Website"),
      description: "Sleek visual-first website optimized for storytelling and",
      pages: "15+",
      features: [
        "Interactive Lookbooks",
        "Mobile-First CTA Buttons",
        "Secure Lead Capture"
      ],
      websiteLink: "https://www.interiorillusions.co.in/",
    },
  },
  {
    id: "bright-arena",
    brandName: "Bright Arena Interiors",
    logoText: "BA",
    logoImage: imagePaths.logos.brightArena,
    logoFallback: createFallbackLogo("BA"),
    services: ["content", "website"],
    contentData: {
      image: getImagePath(imagePaths.content.brightArena),
      fallbackImage: createFallbackImage("Content+Social"),
      description: "Educational design tips and before-after reels drove",
      instagramHandle: "@brightarena",
      followersGained: "+40K",
      views: "5.1M",
    },
    websiteData: {
      image: getImagePath(imagePaths.website.brightArena),
      fallbackImage: createFallbackImage("Website"),
      description: "Functional service site with clear offerings and instant lead capture, built across",
      pages: "12+",
      features: [
        "Detailed Service Pages",
        "WhatsApp Widget",
        "Email Notifications"
      ],
      websiteLink: "https://www.brightarenainteriors.com",
    },
  },
  {
    id: "tvam",
    brandName: "Tvam Interiors",
    logoText: "TI",
    logoImage: imagePaths.logos.tvam,
    logoFallback: createFallbackLogo("TI"),
    services: ["leads", "website"],
    leadsData: {
      image: getImagePath(imagePaths.leads.tvam),
      fallbackImage: createFallbackImage("Leads+Dashboard"),
      description: "Turned around a failing marketing strategy, closing 5 high-ticket projects and generating",
      leadsGenerated: "620+",
      months: "5",
      converted: "85",
      revenue: "₹6.8 Cr",
    },
    websiteData: {
      image: getImagePath(imagePaths.website.tvam),
      fallbackImage: createFallbackImage("Website"),
      description: "Conversion-optimized landing pages maximizing ad spend efficiency across",
      pages: "15+",
      features: [
        "Dedicated Landing Pages",
        "Click-to-Call Optimization",
        "Lead Gen Integrations"
      ],
      websiteLink: "https://www.tvaminteriors.com",
    },
  },
  {
    id: "handover",
    brandName: "Handover Experts",
    logoText: "HE",
    logoImage: imagePaths.logos.handover,
    logoFallback: createFallbackLogo("HE"),
    services: ["content", "leads", "website"],
    contentData: {
      image: getImagePath(imagePaths.content.handover),
      fallbackImage: createFallbackImage("Content+Social"),
      description: "Educational content on inspection standards built authority, generating",
      instagramHandle: "@handoverexperts",
      followersGained: "+57K",
      views: "6.5M",
    },
    leadsData: {
      image: getImagePath(imagePaths.leads.handover),
      fallbackImage: createFallbackImage("Leads+Dashboard"),
      description: "Geo-targeted campaigns to recent homebuyers delivered",
      leadsGenerated: "850+",
      months: "6",
      converted: "310",
      revenue: "₹30L/M",
    },
    websiteData: {
      image: getImagePath(imagePaths.website.handover),
      fallbackImage: createFallbackImage("Website"),
      description: "SEO-optimized platform ranking organically with integrated booking across",
      pages: "20+",
      features: [
        "Advanced SEO",
        "WhatsApp Chatbot",
        "Dynamic Booking Forms"
      ],
      websiteLink: "https://www.handoverexperts.com",
    },
  },
  {
    id: "jilamall",
    brandName: "Jilamall Sweets",
    logoText: "JM",
    logoImage: imagePaths.logos.jilamall,
    logoFallback: createFallbackLogo("JM"),
    services: ["content"],
    contentData: {
      image: getImagePath(imagePaths.content.jilamall),
      fallbackImage: createFallbackImage("Content+Social"),
      description: "A single viral reel hit 1.4M views, 5x'ing revenue and earning",
      instagramHandle: "@jilamallsweets",
      followersGained: "+18K",
      views: "2.4M",
      reelUrl: getVideoPath(imagePaths.reels.jilamall),
    },
  },
  {
    id: "krimmy-thickshake",
    brandName: "Krimmy Thickshake",
    logoText: "KT",
    logoImage: imagePaths.logos.krimmy,
    logoFallback: createFallbackLogo("KT"),
    services: ["content"],
    contentData: {
      image: getImagePath(imagePaths.content.krimmy),
      fallbackImage: createFallbackImage("Content+Social"),
      description: "Influencer launches sold out a month's inventory in 3 days, driving",
      instagramHandle: "@krimmythickshake",
      followersGained: "+38K",
      views: "4.2M",
    },
  },
];