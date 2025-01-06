import heroImage1 from "/hero-image-1.jfif";
import heroImage2 from "/hero-image-2.jfif";
import heroImage3 from "/hero-image-3.jfif";
import Button from "../../../components/Button";
import { Slide } from "react-slideshow-image";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
export default function HeroSection() {
  const [autoplay, setAutoplay] = useState(false);
  const slideshowRef = useRef(null);
  const nextSlide = () => {
    if (slideshowRef) slideshowRef.current.goNext();
  };
  const prevSlide = () => {
    if (slideshowRef) slideshowRef.current.goBack();
  };
  const properties = {
    duration: 1000,
    autoplay: autoplay,
    transitionDuration: 500,
    arrows: false,
    infinite: true,
    easing: "ease",
    // indicators: (i) => <div className="slide-indicator bg-primary"></div>,
  };
  const heroImages = [heroImage1, heroImage2, heroImage3];
  const navigate = useNavigate();
  useEffect(() => {
    setAutoplay(true);
    return () => {
      setAutoplay(false);
    };
  }, []);
  return (
    <section id="home-hero" className="md:flex relative mt-10 sm:mt-0">
      <div id="hero-slideshow" className="w-full relative">
        <button
          onClick={nextSlide}
          className="absolute right-0 top-2/4 bg-primary p-4 z-10"
        >
        <KeyboardArrowRightIcon/>
        </button>
        <button
          onClick={prevSlide}
          className="absolute left-0 top-2/4 bg-primary p-4 z-10"
          >
          <KeyboardArrowLeftIcon/>
        </button>
        <Slide {...properties} ref={slideshowRef}>
          {heroImages.map((image, key) => (
            <div key={key} className="relative">
              <img
                src={image}
                alt={`Hero-Image-${key + 1}`}
                className="h-[88.5vh]  xl:h-screen  w-full object-cover object-center"
              />
              <div className="absolute bottom-16 left-[50%] translate-x-[-50%] flex flex-col  items-center gap-4 w-full">
                <h3 className=" bg-primary  text-2xl md:text-5xl  xl:text-7xl   text-center p-4 pt-0">
                  Innovative Design, Bespoke Solutions
                </h3>

                <Button
                  onClick={
                    key === 1
                      ? () => navigate("/kitchen-price-calculator")
                      : () => {
                          return;
                        }
                  }
                  text={`${
                    key === 0
                      ? "Book an Appointment"
                      : key === 1
                      ? "Calculate Now"
                      : "Visit Us"
                  }`}
                  color="secondary"
                />
              </div>
            </div>
          ))}
        </Slide>
      </div>
      {/* <div className="absolute top-0 left-0 right-0   md:static  md:w-2/6  bg-primary bg-opacity-70 md:bg-opacity-100  flex flex-col p-4  lg:p-12 justify-center  lg:justify-end gap-10">
        <h3 className="text-2xl md:text-5xl  xl:text-[5.5rem]  text-center md:text-left ">
          Innovative Design, Bespoke Solutions
        </h3>
        <div className="hidden md:block">
        <Button text="Book an Appointment" color="secondary" />

        </div>


      </div>
      <div className="w-fit md:hidden absolute   bottom-6 left-[25%]">
        <Button text="Book an Appointment" color="secondary" />

        </div> */}
    </section>
  );
}
