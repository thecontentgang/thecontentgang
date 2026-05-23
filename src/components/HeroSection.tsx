import { ArrowRight, Sparkles } from "lucide-react";
import { motion, type Variants } from "motion/react";
import RotatingText from "./RotatingText";

export default function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  // --- ANIMATION VARIANTS ---
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 20,
        mass: 1,
      },
    },
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-[100dvh] pt-14 md:pt-5 py-14 flex flex-col items-center justify-center overflow-hidden bg-[#050505] text-white selection:bg-[#D1513B]/30"
    >
      {/* === PREMIUM BACKGROUND === */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      <div className="absolute top-0 left-1/2 w-full max-w-[500px] sm:max-w-[800px] h-[50vh] sm:h-[60vh] -translate-x-1/2 -translate-y-1/4 bg-[#D1513B]/20 blur-[100px] sm:blur-[120px] rounded-[100%] pointer-events-none z-0" />

      {/* CONTENT CONTAINER */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 w-full px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center max-w-full"
      >
        
        {/* Top Badge */}
        <motion.div 
          variants={itemVariants} 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm font-medium text-gray-300 backdrop-blur-md mt-10 mb-1 sm:mb-10"
        >
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D1513B]" />
          <span>Strategic Content & Digital Growth</span>
        </motion.div>

        {/* HEADING */}
<motion.h1
  variants={itemVariants}
  className="
    relative z-10
    flex flex-col items-center justify-center
    w-full
    text-center
    font-extrabold
    tracking-tight
    leading-[1]
    sm:leading-[0.98]
    lg:leading-[0.92]
    text-white
    mb-5 sm:mb-6 lg:mb-8
    max-w-[95vw] sm:max-w-5xl mx-auto
  "
>
  
  {/* Top Line */}
  <span
    className="
      block
      text-[2.7rem]
      xs:text-5xl
      sm:text-6xl
      md:text-7xl
      lg:text-8xl
      xl:text-[8.5rem]
    "
  >
    Content that
  </span>

  {/* Rotating Gradient Text */}
  <div
    className="
      relative
      flex
      items-center
      justify-center
      w-full
      min-h-[70px]
      sm:min-h-[90px]
      md:min-h-[110px]
      lg:min-h-[140px]
      mt-2 sm:mt-3
      px-2
    "
  >
    <div
      className="
        relative
        flex
        items-center
        justify-center
        text-center
        overflow-visible
      "
    >
      <RotatingText
        texts={[
          "connects.",
          "inspires.",
          "converts.",
          "scales brands."
        ]}
        mainClassName="
          text-transparent
          bg-clip-text
          bg-gradient-to-r
          from-[#D1513B]
          via-[#e38777]
          to-[#ffc5bc]
          
          text-[2.4rem]
          xs:text-5xl
          sm:text-6xl
          md:text-7xl
          lg:text-8xl
          xl:text-[8.5rem]

          font-extrabold
          tracking-tight
          leading-none

          px-2 sm:px-3
          py-2 sm:py-3

          drop-shadow-[0_0_30px_rgba(209,81,59,0.18)]
        "
        splitLevelClassName="overflow-hidden pb-1"
        staggerFrom="last"
        initial={{ y: "110%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "-120%", opacity: 0 }}
        staggerDuration={0.025}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 400,
        }}
        rotationInterval={3000}
        splitBy="characters"
        auto={true}
        loop={true}
      />
    </div>
  </div>
</motion.h1>

        {/* SUBTEXT - Fixed width with Stats as Individual Buttons/Pills */}
<div className="w-full flex justify-center">
  <motion.div
    variants={itemVariants}
    className="mt-2 w-full max-w-[650px] mb-8 sm:mb-10 px-2 flex flex-col items-center text-center"
  >
    {/* Intro Text - Kept exactly as requested */}
    <p className="text-sm sm:text-base md:text-lg text-gray-400 font-light leading-relaxed mb-6">
      We help brands scale through strategic{" "}
      <strong className="font-semibold text-gray-200">Content</strong>
      , performance-driven{" "}
      <strong className="font-semibold text-gray-200">Marketing</strong>
      , <br /> and high-converting{" "}
      <strong className="font-semibold text-gray-200">Lead Generation</strong>.
    </p>

    {/* Context Text */}
    <p className="text-gray-400 text-sm sm:text-base mb-4">
      In the last <strong className="font-semibold text-gray-200">90 days</strong>, we've:
    </p>

    {/* Stats Buttons Container */}
<div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-[700px] mx-auto w-full">

  {/* Button 1 */}
  <div className="inline-flex w-[calc(50%-6px)] sm:w-fit items-center justify-center px-3 sm:px-4 py-2.5 bg-white/5 hover:bg-white/10 transition-colors border border-white/10 rounded-full backdrop-blur-sm shadow-sm">
    <svg
      className="w-4 h-4 text-[#e38777] mr-2.5 flex-shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>

    <span className="text-xs sm:text-base text-gray-300 leading-tight text-center">
      <strong className="font-semibold text-[#e38777]">
        28M+ views
      </strong>{" "}
      Generated
    </span>
  </div>

  {/* Button 2 */}
  <div className="inline-flex w-[calc(50%-6px)] sm:w-fit items-center justify-center px-3 sm:px-4 py-2.5 bg-white/5 hover:bg-white/10 transition-colors border border-white/10 rounded-full backdrop-blur-sm shadow-sm">
    <svg
      className="w-4 h-4 text-[#e38777] mr-2.5 flex-shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>

    <span className="text-xs sm:text-base text-gray-300 leading-tight text-center">
      <strong className="font-semibold text-[#e38777]">
        10,000+ leads
      </strong>{" "}
      Delivered
    </span>
  </div>

  {/* Button 3 */}
  <div className="inline-flex w-[calc(50%-6px)] sm:w-fit items-center justify-center px-3 sm:px-4 py-2.5 bg-white/5 hover:bg-white/10 transition-colors border border-white/10 rounded-full backdrop-blur-sm shadow-sm">
    <svg
      className="w-4 h-4 text-[#e38777] mr-2.5 flex-shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>

    <span className="text-xs sm:text-base text-gray-300 leading-tight text-center">
      <strong className="font-semibold text-[#e38777]">
        ₹12.5Cr+ revenue
      </strong>{" "}
      Generated
    </span>
  </div>

  {/* Button 4 */}
  <div className="inline-flex w-[calc(50%-6px)] sm:w-fit items-center justify-center px-3 sm:px-4 py-2.5 bg-white/5 hover:bg-white/10 transition-colors border border-white/10 rounded-full backdrop-blur-sm shadow-sm">
    <svg
      className="w-4 h-4 text-[#e38777] mr-2.5 flex-shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>

    <span className="text-xs sm:text-base text-gray-300 leading-tight text-center">
      <strong className="font-semibold text-[#e38777]">
        50+ brands
      </strong>{" "}
      Partnered
    </span>
  </div>

</div>
  </motion.div>
</div>

        {/* BUTTONS */}
        <motion.div 
          variants={itemVariants} 
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto z-30 px-4 sm:px-0"
        >
          <button
            onClick={() => scrollTo("contact")}
            className="group w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 bg-gradient-to-r from-[#D1513B] to-[#e38777] text-white rounded-full font-bold text-sm sm:text-base shadow-[0_0_25px_rgba(209,81,59,0.3)] hover:shadow-[0_0_35px_rgba(209,81,59,0.6)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Start Your Project
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>

          <button
            onClick={() => scrollTo("services")}
            className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 bg-[#ffffff08] border border-white/10 text-gray-200 rounded-full font-bold text-sm sm:text-base hover:bg-white/10 hover:text-white transition-all duration-300 backdrop-blur-md"
          >
            Explore Services
          </button>
        </motion.div>

        

      </motion.div>
    </section>
  );
}