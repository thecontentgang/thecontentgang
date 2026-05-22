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
  serviceLabel?: string;
  marketingDescription?: string;
  instagramHandle: string;
  followersGained: string;
  views: string;
  instagramUrl?: string;
}

export interface LeadsData extends ServiceDetails {
  marketingDescription?: string;
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
// BRANDS DATA
// ============================================
export const brandsData: BrandCaseStudy[] = [
  {
    id: "handover",
    brandName: "Handover Experts",
    logoText: "HE",
    logoImage: "/assets/handover-logo.jpg",
    services: ["content", "leads", "website"],
    contentData: {
      image: "",
      description: "Educational content on inspection standards",
      instagramHandle: "@handoverexperts",
      followersGained: "+57K",
      views: "6.5M",
      instagramUrl: "https://www.instagram.com/handover.expert/",
    },
    leadsData: {
      image: "/assets/zencraft/handoverads.png",
      description: "Geo-targeted campaigns to homebuyers",
      leadsGenerated: "850+",
      months: "10",
      converted: "310",
      revenue: "₹30L/M",
    },
    websiteData: {
      image: "/assets/handover-web.jpeg",
      description: "SEO-optimized platform with integrated booking",
      pages: "20+",
      features: ["Advanced SEO", "WhatsApp Chatbot", "Dynamic Booking Forms"],
      websiteLink: "https://www.handoverexperts.com",
    },
  },
  {
    id: "zen-craft",
    brandName: "ZenCraft Interiors",
    logoText: "ZC",
    logoImage: "/assets/zencraft/zencraft.jpg",
    services: ["content", "leads", "website"],
    contentData: {
      image: "",
      description: "Transformed passive scrollers into high-intent leads with aesthetic reels",
      instagramHandle: "@thezencraftinteriors",
      followersGained: "+65K",
      views: "3.7M",
      instagramUrl: "https://www.instagram.com/thezencraftinteriors/",
    },
    leadsData: {
      image: "/assets/zencraft/zenads.png",
      description: "Scaled Meta & Google Ads targeting HNIs",
      leadsGenerated: "450+",
      months: "9",
      converted: "48",
      revenue: "₹6 Cr",
    },
    websiteData: {
      image: "/assets/zencraft/zenweb.png",
      description: "Premium portfolio site with seamless lead capture",
      pages: "15+",
      features: ["Project Showcase", "WhatsApp Integration", "Email Routing"],
      websiteLink: "https://www.thezencraftinteriors.com/",
    },
  },
  {
    id: "vogue",
    brandName: "Vogue Interiors",
    logoText: "VI",
    logoImage: "/assets/vogue-logo.jpg",
    services: ["content", "website"],
    contentData: {
      image: "",
      description: "Built their Instagram from zero",
      instagramHandle: "@vogue.designstudio",
      followersGained: "+23K",
      views: "1.1M",
      instagramUrl: "https://www.instagram.com/vogue.designstudio/",
    },
    websiteData: {
      image: "/assets/vogue-web.jpeg",
      description: "Elegant digital storefront for portfolio browsing",
      pages: "18+",
      features: ["HD Portfolio Galleries", "WhatsApp Lead Gen", "Email Routing"],
      websiteLink: "https://voguedesignstudios.com/",
    },
  },
  {
    id: "krimmy-thickshake",
    brandName: "Krimmy Thickshake",
    logoText: "KT",
    logoImage: "/assets/krimmy-logo.jpg",
    services: ["content"],
   contentData: {
  serviceLabel: "Influencer Marketing",
   marketingDescription:
    "By implementing our influencer marketing strategy for this Shark Tank-featured thickshake brand's 4 new product launches, we helped sell out their entire 1-month inventory in just 3-4 days.",
  image: "/brands/content/krimmy-content.jpg",
  description: "Influencer launches sold out inventory in 3 days",
  instagramHandle: "@krimmythickshake",
  followersGained: "",
  views: "4.2M",
  instagramUrl: "https://www.instagram.com/krimmythickshakes_jubileehills/",
},
  },
  {
    id: "illusion",
    brandName: "Illusion Interiors",
    logoText: "II",
    logoImage: "/assets/illusion/illusion.jpg",
    services: ["content", "website"],
    contentData: {
      image: "",
      description: "High-impact walk-through videos built trust",
      instagramHandle: "@illusion_interiors",
      followersGained: "",
      views: "7.4M",
      instagramUrl: "https://www.instagram.com/interiorillusions_india/",
    },
    websiteData: {
      image: "/assets/illusion/illusionweb.png",
      description: "Sleek visual-first website for storytelling",
      pages: "15+",
      features: ["Interactive Lookbooks", "Mobile-First CTAs", "Secure Lead Capture"],
      websiteLink: "https://www.interiorillusions.co.in/",
    },
  },
  {
    id: "bright-arena",
    brandName: "Bright Arena Interiors",
    logoText: "BA",
    logoImage: "/assets/bright-arena/bright-logo.jpg",
    services: ["content", "website"],
    contentData: {
      image: "",
      description: "Educational tips and before-after reels",
      instagramHandle: "@brightarena",
      followersGained: "",
      views: "5.1M",
      instagramUrl: "https://www.instagram.com/brightarenainteriors/",
    },
    websiteData: {
      image: "/assets/bright-arena/brightweb.png",
      description: "Functional service site with instant lead capture",
      pages: "12+",
      features: ["Detailed Service Pages", "WhatsApp Widget", "Email Notifications"],
      websiteLink: "https://www.brightarenainteriors.com",
    },
  },
  {
    id: "tvam",
    brandName: "Tvam Interiors",
    logoText: "TI",
    logoImage: "/assets/tvam/tvamlogo.jpg",
    services: ["leads", "website"],
    leadsData: {
      image: "",
      description: "Turned around failing marketing strategy",
      marketingDescription:
  "After losing hope in marketing with previous agencies, we onboarded this Interiors brand and achieved ₹72.99 CPL through our strategic lead generation campaigns, closing 5 high-ticket projects within 4 months.",
      leadsGenerated: "620+",
      months: "",
      converted: "85",
      revenue: "",
    },
    websiteData: {
      image: "/assets/tvam/tvamweb.png",
      description: "Conversion-optimized landing pages",
      pages: "15+",
      features: ["Dedicated Landing Pages", "Click-to-Call", "Lead Gen Integrations"],
      websiteLink: "https://www.tvaminteriors.com",
    },
  },
  
  {
    id: "jilamall",
    brandName: "Jilamall Sweets",
    logoText: "JM",
    logoImage: "/assets/jilemal-logo.jpg",
    services: ["content"],
    contentData: {
  serviceLabel: "Influencer Marketing",
   marketingDescription:
    "By implementing our strategic influencer marketing approach for this dessert brand, we achieved 1.4M viral reel views and drove their revenue growth to 5x.",
  image: "/assets/jilamall-content.jpg",
  description: "A single viral reel hit 1.4M views",
  instagramHandle: "@jilamallsweets",
  followersGained: "",
  views: "2.4M",
  instagramUrl: "https://www.instagram.com/jilemaal/",
},
  },
  
];