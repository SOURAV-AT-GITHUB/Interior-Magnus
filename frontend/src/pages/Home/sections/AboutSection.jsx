import "react-slideshow-image/dist/styles.css";

import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import aboutImage1 from "/about-image-1.png";
import aboutImage2 from "/about-image-2.png";
import sliderHandle from "/sliderHandle.svg";
import { useEffect, useRef, useState } from "react";
import Button from "../../../components/Button";

export default function AboutSection() {
  const [compareImageSliderPosition, setCompareImageSliderPosition] =
    useState(0); // Slider position (from 0 to 100)
  const [direction, setDirection] = useState("forward"); // Track the direction of the animation
  // Automatically move the slider position at regular intervals
  useEffect(() => {
    const interval = setInterval(() => {
      setCompareImageSliderPosition((prevPosition) => {
        // If moving forward, increase the position
        if (direction === "forward" && prevPosition < 95) {
          return prevPosition + 1;
        }
        // If moving backward, decrease the position
        else if (direction === "backward" && prevPosition > 10) {
          return prevPosition - 1;
        }
        // Reverse direction at the end of the range
        return prevPosition;
      });
    }, 30); // Adjust the speed of the movement (lower value = faster movement)

    // Switch direction when reaching the endpoints
    if (compareImageSliderPosition >= 95) {
      setDirection("backward");
    } else if (compareImageSliderPosition <= 10) {
      setDirection("forward");
    }

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [compareImageSliderPosition, direction]);

  
  const [reverse, setReverse] = useState(false);
  const sliderContainerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Check if screen width is <= 768px
    };

    window.addEventListener("resize", handleResize); // Add resize event listener

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup on component unmount
    };
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setReverse((prev) => !prev);
    }, 4000);

    return () => clearInterval(interval);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile && sliderContainerRef.current) {
      sliderContainerRef.current.style.transform = reverse
        ? "translateX(-85%)"
        : "translateX(0%)";
    }
  }, [reverse, isMobile]);
  return (
    <section
      id="home-about"
      className="relative min-h-[85vh]  lg:py-20 lg:px-28 lg:flex justify-between gap-4"
    >
      <div className="lg:w-4/6  bg-white  flex flex-col justify-center  p-8 gap-2">
        <div className="">
          <p className="text-secondary text-xl">About</p>
          <h4 className="text-2xl  lg:text-5xl">
            Crafting Spaces with Purpose and Passion
          </h4>
        </div>
        <p className=" font-light text-justify text-lg">
          Welcome to <span className="font-normal">Interior Magnus,</span> where
          we believe that every space has the potential to inspire, comfort, and
          elevate daily living. As experts in interior design and consultancy.
         <span className="max-[500px]:hidden">
         our mission is to create spaces that reflect the unique personalities,
          tastes, and aspirations of our clients. </span> 
        </p>
        <div className="slider-wrapper  overflow-hidden">
          <div
            ref={sliderContainerRef}
            className={`slider-container   ${
              reverse ? "reversed" : ""
            }  flex justify-between gap-4  text-nowrap`}
          >
            <div>
              <h4 className="text-5xl  sm:text-6xl">
                130<span className="text-secondary">+</span>
              </h4>
              <p className="text-lg">Projects Completed</p>
            </div>

            <div>
              <h4 className="text-5xl  sm:text-6xl">
                4.5<span className="text-secondary">+</span>
              </h4>
              <p className="text-lg">Years of Experience</p>
            </div>

            <div>
              <h4 className="text-5xl  sm:text-6xl">
                1.5<span className="text-secondary">K</span>
              </h4>
              <p className="text-lg">Trusted Customers</p>
            </div>
          </div>
        </div>

        <div className="w-fit m-auto">
          <Button text="Get a Quote" color="primary" />
        </div>
      </div>
      <div className=" h-full self-center lg:border  border-black lg:shadow-buttonShadow">
        <ReactCompareSlider
          itemOne={
            <ReactCompareSliderImage src={aboutImage1} alt="Image one" />
          }
          itemTwo={
            <ReactCompareSliderImage src={aboutImage2} alt="Image two" />
          }
          position={compareImageSliderPosition}
          handle={
            <img
              src={sliderHandle}
              alt="Slider-Handle"
              className="  h-[60px] w-[60px] object-cover"
            />
          }
        />
      </div>
    </section>
  );
}
