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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    setTimeout(() => setFormState('success'), 1500);
  };

  return (
    <section id="contact" className="relative w-full py-12 sm:py-16 md:py-24 bg-black text-white selection:bg-[#e38777] selection:text-white overflow-hidden max-w-[100vw]">
      
      <div className="absolute top-0 right-0 w-[300px] sm:w-[400px] lg:w-[500px] h-[300px] sm:h-[400px] lg:h-[500px] bg-[#D1513B]/10 blur-[80px] sm:blur-[100px] lg:blur-[120px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/4" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          
          {/* Left Side */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
           <div className="inline-flex items-center gap-2 mb-3 sm:mb-4 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e38777] animate-pulse"></span>
              <span className="text-[10px] sm:text-xs font-medium tracking-widest text-gray-300 uppercase">
                Start Your Growth
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3 sm:mb-4">
              Ready to scale <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D1513B] to-[#e38777]">
                your brand?
              </span>
            </h2>

            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 max-w-sm font-light mx-auto lg:mx-0">
              Drop your details below. We'll audit your current digital presence and show you exactly how we can engineer explosive growth for your business.
            </p>

            <div className="flex flex-col gap-4 sm:gap-5">
              <a href="mailto:hello@thecontentgang.com" className="group flex items-center gap-3 w-fit mx-auto lg:mx-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#e38777]/20 group-hover:border-[#e38777]/50 transition-colors">
                  <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-gray-300 group-hover:text-[#e38777] transition-colors" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-gray-500 font-medium mb-0.5">Email Us</p>
                  <p className="text-sm sm:text-base font-semibold text-gray-200 group-hover:text-white transition-colors">bhanu@thecontentgang.com</p>
                </div>
              </a>

              <a href="tel:+919876543210" className="group flex items-center gap-3 w-fit mx-auto lg:mx-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#e38777]/20 group-hover:border-[#e38777]/50 transition-colors">
                  <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-gray-300 group-hover:text-[#e38777] transition-colors" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-gray-500 font-medium mb-0.5">Call Us</p>
                  <p className="text-sm sm:text-base font-semibold text-gray-200 group-hover:text-white transition-colors">+91 93814 41618</p>
                </div>
              </a>

              <div className="group flex items-center gap-3 w-fit mx-auto lg:mx-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-300" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-gray-500 font-medium mb-0.5">Location</p>
                  <p className="text-sm sm:text-base font-semibold text-gray-200">Asian Suncity, Kondapur, Hyd</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl sm:rounded-[2rem] p-4 sm:p-6 md:p-8 shadow-2xl relative max-w-full">
            
            {formState === 'success' ? (
              <div className="flex flex-col items-center justify-center text-center h-full min-h-[250px] sm:min-h-[300px] animate-in fade-in zoom-in duration-500">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4 sm:mb-5 border border-green-500/30">
                  <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">Request Received!</h3>
                <p className="text-gray-400 text-sm sm:text-base max-w-xs">
                  We'll be in touch shortly to discuss how we can scale your brand.
                </p>
                <button 
                  onClick={() => setFormState('idle')}
                  className="mt-4 sm:mt-6 px-4 sm:px-5 py-2 text-xs sm:text-sm rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors"
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4 relative z-10">
                
                <div className="flex flex-col gap-1 sm:gap-1.5">
                  <label className="text-[10px] sm:text-xs font-medium text-gray-400 px-1">Full Name *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="John Doe"
                    className="w-full bg-black/50 border border-white/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#e38777] focus:ring-1 focus:ring-[#e38777] transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="flex flex-col gap-1 sm:gap-1.5">
                    <label className="text-[10px] sm:text-xs font-medium text-gray-400 px-1">Email Address *</label>
                    <input 
                      type="email" 
                      required
                      placeholder="your email"
                      className="w-full bg-black/50 border border-white/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#e38777] focus:ring-1 focus:ring-[#e38777] transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1 sm:gap-1.5">
                    <label className="text-[10px] sm:text-xs font-medium text-gray-400 px-1">Phone Number *</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="+91 93814 41618"
                      className="w-full bg-black/50 border border-white/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#e38777] focus:ring-1 focus:ring-[#e38777] transition-all"
                    />
                  </div>
                </div>

                {/* Custom Dropdown */}
                <div className="flex flex-col gap-1 sm:gap-1.5" ref={dropdownRef}>
                  <label className="text-[10px] sm:text-xs font-medium text-gray-400 px-1">Service Needed *</label>
                  <div className="relative">
                    <div 
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={`w-full bg-black/50 border rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm flex items-center justify-between cursor-pointer transition-all ${
                        isDropdownOpen ? 'border-[#e38777] ring-1 ring-[#e38777]' : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <span className={selectedService ? 'text-white text-sm' : 'text-gray-600 text-sm'}>
                        {selectedService || 'Select a primary goal...'}
                      </span>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-[#e38777]' : ''}`} />
                    </div>

                    {isDropdownOpen && (
                      <div className="absolute top-[calc(100%+6px)] left-0 w-full bg-zinc-900 border border-white/10 rounded-lg sm:rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200">
                        <div className="flex flex-col max-h-[180px] sm:max-h-[200px] overflow-y-auto py-1 sm:py-1.5">
                          {serviceOptions.map((option) => (
                            <button
                              key={option}
                              type="button"
                              onClick={() => {
                                setSelectedService(option);
                                setIsDropdownOpen(false);
                              }}
                              className="w-full text-left px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-white hover:bg-white/5 transition-colors flex items-center justify-between group"
                            >
                              <span className="group-hover:text-[#e38777] transition-colors">{option}</span>
                              {selectedService === option && <Check className="w-3 h-3 sm:w-4 sm:h-4 text-[#e38777]" />}
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
                  className="mt-2 sm:mt-4 group w-full py-3 sm:py-3.5 bg-gradient-to-r from-[#D1513B] to-[#e38777] text-white rounded-lg sm:rounded-xl font-bold text-sm sm:text-base hover:shadow-[0_0_20px_rgba(209,81,59,0.4)] disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {formState === 'submitting' ? (
                    <span className="flex items-center gap-2">
                      Sending Details <span className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white"></span>
                    </span>
                  ) : (
                    <>
                      Get Your Strategy
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
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