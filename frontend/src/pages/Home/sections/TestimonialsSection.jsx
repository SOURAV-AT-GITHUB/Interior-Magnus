import testimonial1 from "/testimonials/testimonial1.jfif";
import testimonial2 from "/testimonials/testimonial2.jfif";
import testimonial3 from "/testimonials/testimonial3.jfif";
import testimonial1author from '/testimonials/testimonial1-author.png'
import testimonial2author from '/testimonials/testimonial2-author-test.png'
import testimonial3author from '/testimonials/testimonial3-author.png'
import testimonalStrip from "/testimonials/testimonal-strips.svg";
import testimonialCircle from "/testimonials/testimonial-circle.svg";
import { useState } from "react";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import useMediaQuery from "@mui/material/useMediaQuery";
export default function TestimonialsSection() {
  const testimonials = [
    {
      image: testimonial1,
      text: "Working with Interior Magnus was a pleasure. They understood our ideas and added creativity and expertise, transforming our vision into something beyond expectations. Their thoughtful suggestions and elegant solutions made our home feel luxurious and welcoming. Every detail was carefully considered, reflecting our style and creating a space we truly love.",
      author: "Pradyot and Shalini",
      authorImage:testimonial1author,
      property : "Elite Homz , Sector 77, Noida"
    },
    {
      image: testimonial2,
      text: "Choosing Interior Magnus for our renovation was the best decision. Their attentive team brought our vision to life with thoughtful guidance and suggestions that elevated our ideas. The attention to detail, craftsmanship, and quality exceeded expectations. Our home now feels like an elegant, comfortable sanctuary, perfectly capturing our style. We’re thrilled with the results!",
      author: "Shyam Singh",
      authorImage:testimonial2author,
      property : "CRC Sublimis , Noida Extension"
    },
    {
      image: testimonial3,
      text: "Interior Magnus transformed our dream home into reality. They listened to our preferences and created designs that reflected our tastes while adding unique elements. The process was smooth, professional, and detail-oriented. The team was creative, responsive, and dedicated to our satisfaction. Thanks to their expertise, our home feels luxurious, comfortable, and truly ours. Highly recommend!",
      author: "Dinesh & Shruti",
      authorImage:testimonial3author,
      property : "ATS Happy Trails, Noida Extension"
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
      className="relative z-[1] overflow-hidden  bg-white py-10  lg:py-20 px-5  lg:pl-28 lg:pr-0"
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
                  className={`relative flex flex-col
                  ${
                    !isMinWidth500
                      ? index === activeIndex
                        ? "scale-100"
                        : "scale-0"
                      : ""
                  }
                  ${activeIndex === testimonials.length-1 && 'mr-1'}
                  transition-all duration-500 ease-in-out
                  w-full min-w-[275px]  lg:min-w-[360px] lg:h-auto h-fit
                  mb-4 border border-black rounded-3xl overflow-hidden shadow-buttonShadow`}
                >
                  <div className="relative h-2/6 w-full ">

                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className={`w-full h-full object-cover object-center`}
                  />
                  <img src={testimonial.authorImage} 
                  alt=""
                  className="absolute h-full bottom-0 left-2/4 -translate-x-2/4"/>
                  <img
                    src={testimonialCircle}
                    alt="testimonialCircle"
                    className="absolute right-2 -bottom-8 z-10 h-20"
                  />
                  </div>

                  <div
                    className={`h-4/6 flex flex-col gap-2 bg-secondary text-white p-4 pt-6`}
                  >
                    <p className="">{testimonial.text}</p>
                    <p className="flex items-center text-lg">
                      <span className="w-8 h-0 px-2  border-t border-white"></span>
                      &nbsp; {testimonial.author}
                    </p>
                    <p className="">Property : {testimonial.property}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full flex justify-center gap-4  min-[500px]:hidden z-10">
            <button
              onClick={previousIndex}
              className="min-w-16 border border-secondary text-secondary p-2"
            >
              <WestIcon />
            </button>
            <button onClick={nextIndex} className="min-w-16 bg-secondary text-white p-2">
              <EastIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
