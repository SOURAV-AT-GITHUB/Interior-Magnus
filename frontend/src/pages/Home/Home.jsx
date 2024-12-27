import whatsappIcon from "/whatsapp.svg";
import phoneIcon from "/phone.svg";
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import PortfolioSection from "./sections/PortfolioSection";
import SolutionsSection from "./sections/SolutionsSection";
import OurProcessSection from "./sections/OurProcessSection";
import WhyUsSection from "./sections/WhyUsSection";
import The7DFrameWork from "./sections/The7DFrameWork";
import TestimonialsSection from "./sections/TestimonialsSection";
import FAQSection from "./sections/FAQSection";
import ContactUsSection from "./sections/ContactUsSection";
import { Fragment, useState } from "react";
// import { Fab } from "@mui/material";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <main className="relative">
      <div className={`fixed right-0 bottom-2  z-10 overflow-hidden `}>
        <div className={`${isOpen ? "h-auto " : "h-0"} transition-transform duration-300 ease-linear`}>
          
        <img
          src={whatsappIcon}
          className={`h-20 ${
            isOpen
              ? "translate-y-0 rotate-0"
              : "translate-y-[4.5rem] -rotate-45 opacity-0"
            } transition duration-200 ease-in-out z-0`}
        />

        <img
          src={phoneIcon}
          alt="phone-icon"
          className={`h-20 ${
            isOpen
            ? "translate-y-0 rotate-0 "
            : "translate-y-[4.5rem] -rotate-45 opacity-0"
          } transition duration-200 ease-in z-0`}
          />
          </div>

        <button
          onClick={toggleMenu}
          className="bg-secondary text-white p-3 ml-3  rounded-l-lg z-10"
        >
          <PermPhoneMsgIcon fontSize="large" />
        </button>
      </div>
      <HeroSection />
      <AboutSection />
      <PortfolioSection />
      <SolutionsSection />
      <OurProcessSection />
      <WhyUsSection />
      <The7DFrameWork />
      <TestimonialsSection />
      <FAQSection />
      <ContactUsSection />
    </main>
  );
}
