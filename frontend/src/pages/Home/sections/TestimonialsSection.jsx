import testimonial1 from "/testimonial1.jfif";
import testimonial2 from "/testimonial2.jfif";
import testimonial3 from "/testimonial3.jfif";
import testimonalStrip from "/testimonal-strips.svg";
import testimonialCircle from "/testimonial-circle.svg";
import { useState } from "react";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import useMediaQuery from "@mui/material/useMediaQuery";
export default function TestimonialsSection() {
  const testimonials = [
    {
      image: testimonial1,
      text: "Working with Interior Magnus was an absolute pleasure. They took our ideas and elevated them beyond what we could imagine. Our home now feels both luxurious and comfortable!",
      author: "Priya Malhotra",
    },
    {
      image: testimonial2,
      text: "The designers at Interior Magnus listened to every detail we wanted in our office space and brought it all together beautifully. They managed everything effortlessly. Highly recommend their services!",
      author: "Rajesh Kumar",
    },
    {
      image: testimonial3,
      text: "I couldn’t be happier with the transformation of our guest room and kitchen! The team created designs that are not only stunning but highly practical. They made our spaces feel fresh and modern.",
      author: "Vaibhav Vaish",
    },
  ];
  // const [reverse, setReverse] = useState(false);
  // const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  // const sliderContainerRef = useRef(null);
  // //Detect screen size change
  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth <= 768); // Check if screen width is <= 768px
  //   };

  //   window.addEventListener("resize", handleResize); // Add resize event listener

  //   return () => {
  //     window.removeEventListener("resize", handleResize); // Cleanup on component unmount
  //   };
  // }, []);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setReverse((prev) => !prev);
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, [isMobile]);

  // useEffect(() => {
  //   if (isMobile && sliderContainerRef.current) {
  //     sliderContainerRef.current.style.transform = reverse
  //       ? "translateX(-193%)"
  //       : "translateX(3%)";
  //   }
  // }, [reverse, isMobile]);
  const [activeIndex, setActiveIndex] = useState(0);
  const isMinWidth500 = useMediaQuery("(min-width:500px)");
  const nextIndex = () => {
    setActiveIndex((prev) => {
      if (prev >= testimonials.length - 1) return 0;
      return prev + 1;
    });
  };
  const previousIndex = () => {
    setActiveIndex((prev) => {
      if (prev < 1) return testimonials.length - 1;
      else return prev - 1;
    });
  };
  return (
    <section
      id="home-testimonials"
      className="min-h-[86.5vh]  relative z-[1] overflow-hidden  bg-white py-10  lg:py-20 px-5  lg:pl-28 lg:pr-0"
    >
      <div className=" absolute left-0 -top-8  -z-[1] flex ">
        <img
          src={testimonalStrip}
          alt="testimonial-strip"
          className="max-h-[75px]  lg:max-h-[200px] -ml-4"
        />
        <img
          src={testimonalStrip}
          alt="testimonial-strip"
          className="max-h-[75px]  lg:max-h-[200px] lg:-ml-4"
        />
      </div>

      <div className="lg:flex ">
        <div className="lg:w-2/5 self-end  text-center lg:text-left">
          <p className="text-secondary text-xl">Testimonials</p>
          <p className="text-3xl  lg:text-4xl">What Our Clients Say</p>
          <p className="lg:hidden text-center text-sm font-light">
            We take pride in exceeding expectations—hear from our clients how{" "}
            <span className="font-normal">Interior Magnus</span> brought their
            vision to life.
          </p>
          <p className="hidden lg:block  font-light mt-4 text-2xl text-slate-500 w-5/6">
            We take pride in creating spaces that exceed expectations. Hear from
            our clients about their experiences working with{" "}
            <span className="font-normal">Interior Magnus</span> and how we
            brought their vision to life. Your satisfaction is our greatest
            success.
          </p>
        </div>

        <div className="wrapper lg:w-3/5 overflow-x-hidden  ">
          <div
            id="testimonials"
            // ref={sliderContainerRef}
            className={`slider-container ${
              /* reverse ? "reversed" : ""*/ ""
            } lg:overflow-x-auto   mt-4 lg:gap-10 `}
          >
            <div
              style={{
                width: isMinWidth500 ? "100%" : `${testimonials.length * 100}%`,
                transform: isMinWidth500
                  ? "none"
                  : `translateX(-${
                      activeIndex * (100 / testimonials.length)
                    }%)`,
                transition: "transform .5s ease-in-out",
              }}
              id="testimonials"
              className=" flex gap-4  overflow-x-auto "
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`relative grid grid-rows-2 
                  ${
                    !isMinWidth500
                      ? index === activeIndex
                        ? "scale-100"
                        : "scale-0"
                      : ""
                  }
                  ${activeIndex === testimonials.length-1 && 'mr-1'}
                  transition-all duration-500 ease-in-out
                  h-auto w-full lg:min-w-[360px] lg:min-h-[350px] 
                  mb-4 border border-black rounded-3xl overflow-hidden shadow-buttonShadow`}
                >
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className={`h-full w-full    `}
                  />
                  <img
                    src={testimonialCircle}
                    alt="testimonialCircle"
                    className="absolute right-2 top-[40%] z-10 max-[500px]:h-20"
                  />

                  <div
                    className={` bg-secondary text-white p-4 pt-10  min-[500px]:pt-14`}
                  >
                    <p className="max-[500px]:text-sm">{testimonial.text}</p>
                    <p className="flex items-center text-lg">
                      <span className="w-8 h-0 px-2  border-t border-white"></span>
                      &nbsp; {testimonial.author}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full flex justify-between  min-[500px]:hidden z-10">
            <button
              onClick={previousIndex}
              className="border border-secondary text-secondary p-2"
            >
              <WestIcon />
            </button>
            <button onClick={nextIndex} className="bg-secondary text-white p-2">
              <EastIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
