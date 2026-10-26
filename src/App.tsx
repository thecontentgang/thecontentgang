import { useEffect } from "react";
import { initSmoothScroll } from "./lib/smoothScroll";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import CaseStudiesSection from "./components/CaseStudiesSection";
import ServicesSection  from "./components/ServicesSection";
import SocialMediaBar from "./components/SocialMediaBar";

const App = () => {
  useEffect(() => initSmoothScroll(), []);

  return (
    <>
    <Navbar />
    <main>
      <HeroSection />
      <ServicesSection />
      <CaseStudiesSection />
      <AboutSection />
      <ContactSection />
    </main>
    <Footer />
    <SocialMediaBar />
    </>
  )
}

export default App