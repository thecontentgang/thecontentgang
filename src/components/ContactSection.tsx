import React, { useState, useRef, useEffect } from 'react';
import { Mail, Phone, MapPin, CheckCircle2, ArrowRight, ChevronDown, Check } from 'lucide-react';

const serviceOptions = [
  "Content Creation & Reels",
  "Lead Generation / Paid Ads",
  "Web Development & Design",
  "SEO & Organic Growth",
  "Full Digital Marketing Suite"
];

export default function ContactSection() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  
  // Custom Dropdown State
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) {
      alert("Please select a service.");
      return;
    }
    setFormState('submitting');
    // Simulate API call delay
    setTimeout(() => setFormState('success'), 1500);
  };

  return (
    <section id="contact" className="relative w-full py-16 md:py-24 bg-black text-white selection:bg-[#e38777] selection:text-white">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D1513B]/10 blur-[120px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/4" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Compact Copy & Contact Info */}
          <div className="flex flex-col">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e38777] animate-pulse"></span>
              <span className="text-xs font-medium tracking-widest text-gray-300 uppercase">
                Start Your Growth
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Ready to scale <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D1513B] to-[#e38777]">
                your brand?
              </span>
            </h2>

            <p className="text-gray-400 text-base leading-relaxed mb-8 max-w-sm font-light">
              Drop your details below. We'll audit your current digital presence and show you exactly how we can engineer explosive growth for your business.
            </p>

            {/* Direct Contact Methods - Compacted */}
            <div className="flex flex-col gap-5">
              <a href="mailto:hello@thecontentgang.com" className="group flex items-center gap-3 w-fit">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#e38777]/20 group-hover:border-[#e38777]/50 transition-colors">
                  <Mail className="w-4 h-4 text-gray-300 group-hover:text-[#e38777] transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-0.5">Email Us</p>
                  <p className="text-base font-semibold text-gray-200 group-hover:text-white transition-colors">bhanu@thecontentgang.com</p>
                </div>
              </a>

              <a href="tel:+919876543210" className="group flex items-center gap-3 w-fit">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#e38777]/20 group-hover:border-[#e38777]/50 transition-colors">
                  <Phone className="w-4 h-4 text-gray-300 group-hover:text-[#e38777] transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-0.5">Call Us</p>
                  <p className="text-base font-semibold text-gray-200 group-hover:text-white transition-colors">+91 93814 41618</p>
                </div>
              </a>

              <div className="group flex items-center gap-3 w-fit">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-gray-300" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-0.5">Location</p>
                  <p className="text-base font-semibold text-gray-200">Kondapur,Hyderabad</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Lead Generation Form (Removed overflow-hidden to fix dropdown) */}
          <div className="bg-white/[0.03] border border-white/10 rounded-[2rem] p-6 md:p-8 shadow-2xl relative">
            
            {formState === 'success' ? (
              // Success State
              <div className="flex flex-col items-center justify-center text-center h-full min-h-[300px] animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-5 border border-green-500/30">
                  <CheckCircle2 className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Request Received!</h3>
                <p className="text-gray-400 text-base max-w-xs">
                  We'll be in touch shortly to discuss how we can scale your brand.
                </p>
                <button 
                  onClick={() => setFormState('idle')}
                  className="mt-6 px-5 py-2 text-sm rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors"
                >
                  Submit Another
                </button>
              </div>
            ) : (
              // Clean Form State
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-10">
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-gray-400 px-1">Full Name *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="John Doe"
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#e38777] focus:ring-1 focus:ring-[#e38777] transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-gray-400 px-1">Email Address *</label>
                    <input 
                      type="email" 
                      required
                      placeholder="your email"
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#e38777] focus:ring-1 focus:ring-[#e38777] transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-gray-400 px-1">Phone Number *</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="+91 93814 41618"
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#e38777] focus:ring-1 focus:ring-[#e38777] transition-all"
                    />
                  </div>
                </div>

                {/* Custom Dropdown for Service Required */}
                <div className="flex flex-col gap-1.5" ref={dropdownRef}>
                  <label className="text-xs font-medium text-gray-400 px-1">Service Needed *</label>
                  <div className="relative">
                    <div 
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={`w-full bg-black/50 border rounded-xl px-4 py-3 text-sm flex items-center justify-between cursor-pointer transition-all ${
                        isDropdownOpen ? 'border-[#e38777] ring-1 ring-[#e38777]' : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <span className={selectedService ? 'text-white' : 'text-gray-600'}>
                        {selectedService || 'Select a primary goal...'}
                      </span>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-[#e38777]' : ''}`} />
                    </div>

                    {/* Dropdown Menu List - Will now overflow gracefully over the content below */}
                    {isDropdownOpen && (
                      <div className="absolute top-[calc(100%+6px)] left-0 w-full bg-zinc-900 border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200">
                        <div className="flex flex-col max-h-[200px] overflow-y-auto py-1.5">
                          {serviceOptions.map((option) => (
                            <button
                              key={option}
                              type="button"
                              onClick={() => {
                                setSelectedService(option);
                                setIsDropdownOpen(false);
                              }}
                              className="w-full text-left px-4 py-2.5 text-sm text-white hover:bg-white/5 transition-colors flex items-center justify-between group"
                            >
                              <span className="group-hover:text-[#e38777] transition-colors">{option}</span>
                              {selectedService === option && <Check className="w-4 h-4 text-[#e38777]" />}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="mt-4 group w-full py-3.5 bg-gradient-to-r from-[#D1513B] to-[#e38777] text-white rounded-xl font-bold text-base hover:shadow-[0_0_20px_rgba(209,81,59,0.4)] disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {formState === 'submitting' ? (
                    <span className="flex items-center gap-2">
                      Sending Details <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                    </span>
                  ) : (
                    <>
                      Get Your Strategy
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}