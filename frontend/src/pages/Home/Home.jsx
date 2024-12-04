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
export default function Home() {
  return (
    <main className="relative">
      <img
        src={whatsappIcon}
        alt="whatsapp-icon"
        className="fixed bottom-28 right-0 z-10"
      />
      <img
        src={phoneIcon}
        alt="phone-icon"
        className="fixed bottom-0 right-0 z-10"
      />
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
